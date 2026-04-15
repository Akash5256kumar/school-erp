import { API_BASE_URL, API_RETRY_COUNT, API_TIMEOUT_MS } from "../constants";
import getErrorMessage from "../Utils/errorMessages";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
    ),
  ]);

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return { message: text };
  }
};

export const createApiClient = ({
  getAuthToken,
  onUnauthorized,
  shouldHandleUnauthorized,
} = {}) => {
  const requestInterceptors = [];
  const responseInterceptors = [];

  const runRequestInterceptors = async (config) => {
    let nextConfig = { ...config };

    for (const interceptor of requestInterceptors) {
      nextConfig = await interceptor(nextConfig);
    }

    return nextConfig;
  };

  const runResponseInterceptors = async (payload) => {
    let nextPayload = payload;

    for (const interceptor of responseInterceptors) {
      nextPayload = await interceptor(nextPayload);
    }

    return nextPayload;
  };

  const buildHeaders = async (options) => {
    const tokenFromStorage = (await getAuthToken?.()) || "";
    const explicitToken =
      options?.headers?.Authorization || options?.token || tokenFromStorage;
    const normalizedToken =
      explicitToken && !String(explicitToken).startsWith("Bearer ")
        ? `Bearer ${explicitToken}`
        : explicitToken;

    const headers = {
      Accept: "application/json",
      ...(options?.isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    };

    if (options?.skipAuth || !normalizedToken) {
      return headers;
    }

    return {
      ...headers,
      Authorization: normalizedToken,
    };
  };

  const request = async (endpoint, options = {}, attempt = 0) => {
    const preparedOptions = await runRequestInterceptors(options);
    const headers = await buildHeaders(preparedOptions);

    const config = {
      method: preparedOptions.method || "GET",
      headers,
      body: preparedOptions.body,
    };

    try {
      const response = await withTimeout(
        fetch(`${API_BASE_URL}${endpoint}`, config),
        preparedOptions.timeout || API_TIMEOUT_MS
      );
      const data = await parseResponse(response);
      const payload = await runResponseInterceptors({ response, data });

      if (shouldHandleUnauthorized?.({ data: payload?.data, response })) {
        await onUnauthorized?.();
      }

      if (!response.ok || payload?.data?.status === false) {
        const error = new Error(
          payload?.data?.message ||
            response.statusText ||
            "The server could not process the request."
        );
        error.status = response.status;
        error.data = payload?.data;
        error.userMessage = getErrorMessage(error);
        throw error;
      }

      return payload?.data;
    } catch (error) {
      const retries = preparedOptions.retryCount ?? API_RETRY_COUNT;

      if (attempt < retries) {
        await wait((attempt + 1) * 400);
        return request(endpoint, options, attempt + 1);
      }

      error.userMessage = getErrorMessage(error);
      throw error;
    }
  };

  const jsonBody = (body) => (body ? JSON.stringify(body) : undefined);

  return {
    addRequestInterceptor: (interceptor) => requestInterceptors.push(interceptor),
    addResponseInterceptor: (interceptor) =>
      responseInterceptors.push(interceptor),
    delete: (endpoint, options) =>
      request(endpoint, { ...options, method: "DELETE" }),
    get: (endpoint, options) =>
      request(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options) =>
      request(endpoint, {
        ...options,
        method: "POST",
        body: jsonBody(body),
      }),
    upload: async (endpoint, formData, options = {}) =>
      request(endpoint, {
        ...options,
        method: "POST",
        body: formData,
        isFormData: true,
        headers: {
          Accept: "application/json",
          ...options.headers,
        },
      }),
  };
};

export default createApiClient;
