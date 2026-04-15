import { API_BASE_URL, STORAGE_KEYS } from "../constants";
import { AUTH_ROLES } from "../auth/roles";
import { storage } from "../auth/sessionStorage";
import {
  getPersistedStaffToken,
  clearStaffSession,
} from "../auth/staffSessionController";
import {
  getPersistedStudentToken,
  clearStudentSession,
} from "../auth/studentSessionController";
import {
  resetToStaffLogin,
  resetToStudentLogin,
} from "../navigation/navigationService";

let unauthorizedHandled = false;
let fetchConfigured = false;

const AUTH_EXEMPT_ENDPOINT_MARKERS = ["/login", "/staff_login"];

const UNAUTHORIZED_MARKERS = [
  "unauthenticated",
  "unauthorized",
  "token expired",
  "expired token",
  "invalid token",
  "token is invalid",
  "token has expired",
  "not authorized",
  "forbidden",
  "permission denied",
];

const isUnauthorizedMessage = (message) => {
  const normalized = String(message || "").toLowerCase();
  return UNAUTHORIZED_MARKERS.some((marker) => normalized.includes(marker));
};

const isApiRequest = (input) => {
  const url = typeof input === "string" ? input : input?.url;
  return typeof url === "string" && url.startsWith(API_BASE_URL);
};

const isAuthExemptRequest = (input) => {
  const url = typeof input === "string" ? input : input?.url;
  return (
    typeof url === "string" &&
    AUTH_EXEMPT_ENDPOINT_MARKERS.some((marker) => url.includes(marker))
  );
};

const getActiveRoleToken = async () => {
  const activeRole = await storage.getString(STORAGE_KEYS.activeAuthRole);

  if (activeRole === AUTH_ROLES.staff) {
    return getPersistedStaffToken();
  }

  if (activeRole === AUTH_ROLES.student) {
    return getPersistedStudentToken();
  }

  return "";
};

export const isUnauthorizedResponsePayload = ({ data, response }) => {
  if (
    response?.status === 401 ||
    response?.status === 403 ||
    response?.status === 419
  ) {
    return true;
  }

  if (!response?.ok || response?.status === 422) {
    return false;
  }

  return [data?.message, data?.error]
    .filter(Boolean)
    .some(isUnauthorizedMessage);
};

const guardUnauthorizedHandling = async (handler) => {
  if (unauthorizedHandled) {
    return;
  }

  unauthorizedHandled = true;

  try {
    await handler();
  } finally {
    setTimeout(() => {
      unauthorizedHandled = false;
    }, 300);
  }
};

export const handleStudentUnauthorizedSession = async () =>
  guardUnauthorizedHandling(async () => {
    await clearStudentSession();
    resetToStudentLogin();
  });

export const handleStaffUnauthorizedSession = async () =>
  guardUnauthorizedHandling(async () => {
    await clearStaffSession();
    resetToStaffLogin();
  });

export const configureRoleAwareFetch = () => {
  if (fetchConfigured || typeof global.fetch !== "function") {
    return;
  }

  fetchConfigured = true;
  const originalFetch = global.fetch.bind(global);

  global.fetch = async (input, init = {}) => {
    const shouldAttachAuth =
      isApiRequest(input) && !isAuthExemptRequest(input) && !init?.skipAuth;
    let nextInit = init;

    if (shouldAttachAuth) {
      const token = await getActiveRoleToken();

      if (token) {
        const headers = new Headers(init?.headers || {});
        headers.set("Authorization", token);

        nextInit = {
          ...init,
          headers,
        };
      }
    }

    const response = await originalFetch(input, nextInit);

    if (!shouldAttachAuth) {
      return response;
    }

    try {
      const activeRole = await storage.getString(STORAGE_KEYS.activeAuthRole);
      const clonedResponse = response.clone();
      const contentType = clonedResponse.headers.get("content-type") || "";
      let data = null;

      if (contentType.includes("application/json")) {
        data = await clonedResponse.json();
      }

      if (!isUnauthorizedResponsePayload({ data, response })) {
        return response;
      }

      if (activeRole === AUTH_ROLES.staff) {
        await handleStaffUnauthorizedSession();
      } else {
        await handleStudentUnauthorizedSession();
      }
    } catch (error) {
      // Ignore wrapper-level parsing failures so the original request can proceed.
    }

    return response;
  };
};
