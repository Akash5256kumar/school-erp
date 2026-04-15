import {STRINGS} from '../../src/constants';

describe('apiClient edge cases', () => {
  let apiClient;
  let storage;

  beforeEach(() => {
    jest.resetModules();
    jest.useRealTimers();
    ({default: apiClient} = require('../../src/api/client'));
    ({storage} = require('../../src/Utils/storage'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('surfaces 400 errors with the server status text', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockResponseOnce(JSON.stringify({status: true}), {
      headers: {'content-type': 'application/json'},
      status: 400,
      statusText: 'Bad Request',
    });

    await expect(apiClient.get('bad-request', {retryCount: 0})).rejects.toMatchObject({
      status: 400,
      userMessage: 'Bad Request',
    });
  });

  it('surfaces 500 errors with a safe fallback error message', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockResponseOnce('', {
      headers: {'content-type': 'text/plain'},
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(apiClient.get('server-error', {retryCount: 0})).rejects.toMatchObject({
      status: 500,
      userMessage: 'Internal Server Error',
    });
  });

  it('maps offline network failures to the shared network error copy', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockRejectOnce(new Error('Network request failed'));

    await expect(apiClient.get('offline', {retryCount: 0})).rejects.toMatchObject({
      userMessage: STRINGS.common.networkError,
    });
  });

  it('does not crash when the server sends malformed JSON', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        headers: {
          get: () => 'application/json',
        },
        json: jest.fn().mockRejectedValue(new SyntaxError('Unexpected token <')),
        ok: true,
        status: 200,
        statusText: 'OK',
        text: jest.fn().mockResolvedValue('<html>broken</html>'),
      }),
    );

    await expect(apiClient.get('malformed-json', {retryCount: 0})).rejects.toMatchObject({
      userMessage: 'Unexpected token <',
    });
  });

  it('returns null payloads without crashing when the API response is empty', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockResponseOnce('null', {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    await expect(apiClient.get('empty-null', {retryCount: 0})).resolves.toBeNull();
  });

  it('returns array payloads intact for large datasets', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    const largePayload = Array.from({length: 500}, (_, index) => ({
      id: index + 1,
      label: `item-${index + 1}`,
    }));
    fetchMock.mockResponseOnce(JSON.stringify(largePayload), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    const response = await apiClient.get('large-dataset', {retryCount: 0});

    expect(response).toHaveLength(500);
    expect(response[0]).toEqual({id: 1, label: 'item-1'});
    expect(response[499]).toEqual({id: 500, label: 'item-500'});
  });

  it('applies request and response interceptors to the final payload', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    apiClient.addRequestInterceptor(async config => ({
      ...config,
      headers: {
        ...config.headers,
        'X-Test-Trace': 'trace-id',
      },
      token: 'interceptor-token',
    }));
    apiClient.addResponseInterceptor(async payload => ({
      ...payload,
      data: {
        ...payload.data,
        decorated: true,
      },
    }));
    fetchMock.mockResponseOnce(JSON.stringify({status: true}), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    const response = await apiClient.get('intercepted', {retryCount: 0});

    expect(fetchMock).toHaveBeenCalledWith(
      'http://139.59.90.236:86/api/intercepted',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer interceptor-token',
          'X-Test-Trace': 'trace-id',
        }),
      }),
    );
    expect(response).toEqual({decorated: true, status: true});
  });

  it('returns an empty object for empty non-json bodies', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockResponseOnce('', {
      headers: {'content-type': 'text/plain'},
      status: 200,
    });

    await expect(apiClient.get('empty-text', {retryCount: 0})).resolves.toEqual({});
  });

  it('prefers an explicit authorization header over the stored token', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue('stored-token');
    fetchMock.mockResponseOnce(JSON.stringify({status: true}), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    await apiClient.get('authorized', {
      headers: {
        Authorization: 'Bearer explicit-token',
      },
      retryCount: 0,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://139.59.90.236:86/api/authorized',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer explicit-token',
        }),
      }),
    );
  });

  it('prefixes explicit plain-text token options and omits empty post bodies', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue('stored-token');
    fetchMock.mockResponseOnce(JSON.stringify({status: true}), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    await apiClient.post('submit', null, {
      retryCount: 0,
      token: 'plain-token',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://139.59.90.236:86/api/submit',
      expect.objectContaining({
        body: undefined,
        headers: expect.objectContaining({
          Authorization: 'Bearer plain-token',
        }),
      }),
    );
  });

  it('uses the default retry count when none is provided', async () => {
    jest.useFakeTimers();
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock
      .mockRejectOnce(new Error('Network request failed'))
      .mockRejectOnce(new Error('Network request failed'))
      .mockResponseOnce(JSON.stringify({status: true, recovered: true}), {
        headers: {'content-type': 'application/json'},
        status: 200,
      });

    const request = apiClient.get('default-retry');

    await jest.advanceTimersByTimeAsync(1200);

    await expect(request).resolves.toEqual({status: true, recovered: true});
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
