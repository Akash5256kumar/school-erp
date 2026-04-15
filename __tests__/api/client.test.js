import {STRINGS} from '../../src/constants';

describe('apiClient', () => {
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

  it('adds the stored bearer token to GET requests', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue('stored-token');
    fetchMock.mockResponseOnce(JSON.stringify({status: true, items: [1, 2]}), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    const response = await apiClient.get('students', {retryCount: 0});

    expect(response).toEqual({status: true, items: [1, 2]});
    expect(fetchMock).toHaveBeenCalledWith(
      'http://139.59.90.236:86/api/students',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/json',
          Authorization: 'Bearer stored-token',
          'Content-Type': 'application/json',
        }),
        method: 'GET',
      }),
    );
  });

  it('skips auth headers when skipAuth is enabled', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue('stored-token');
    fetchMock.mockResponseOnce(JSON.stringify({status: true}), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    await apiClient.post('login', {username: 'student'}, {skipAuth: true, retryCount: 0});

    expect(fetchMock).toHaveBeenCalledWith(
      'http://139.59.90.236:86/api/login',
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.anything(),
        }),
      }),
    );
  });

  it('retries failed requests and resolves on the next successful response', async () => {
    jest.useFakeTimers();
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock
      .mockRejectOnce(new Error('Network request failed'))
      .mockResponseOnce(JSON.stringify({status: true, ok: true}), {
        headers: {'content-type': 'application/json'},
        status: 200,
      });

    const request = apiClient.get('retry-endpoint', {retryCount: 1});

    await jest.advanceTimersByTimeAsync(400);

    await expect(request).resolves.toEqual({status: true, ok: true});
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('maps timeout failures to a user-friendly network message', async () => {
    jest.useFakeTimers();
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockImplementation(
      () => new Promise(() => {}),
    );

    const request = apiClient.get('slow-endpoint', {
      retryCount: 0,
      timeout: 100,
    });
    const expectation = expect(request).rejects.toMatchObject({
      message: 'Request timeout',
      userMessage: STRINGS.common.networkError,
    });

    await jest.advanceTimersByTimeAsync(100);

    await expectation;
  });

  it('throws API payload failures with a normalized user message', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockResponseOnce(
      JSON.stringify({status: false, message: 'Bad request'}),
      {
        headers: {'content-type': 'application/json'},
        status: 200,
      },
    );

    await expect(apiClient.get('broken', {retryCount: 0})).rejects.toMatchObject({
      data: {status: false, message: 'Bad request'},
      userMessage: 'Bad request',
    });
  });

  it('parses non-json text responses into a message payload', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue(null);
    fetchMock.mockResponseOnce('Created successfully', {
      headers: {'content-type': 'text/plain'},
      status: 200,
    });

    await expect(apiClient.get('text-response', {retryCount: 0})).resolves.toEqual({
      message: 'Created successfully',
    });
  });

  it('omits content-type headers for uploads and preserves custom headers', async () => {
    jest.spyOn(storage, 'getString').mockResolvedValue('upload-token');
    fetchMock.mockResponseOnce(JSON.stringify({status: true}), {
      headers: {'content-type': 'application/json'},
      status: 200,
    });

    await apiClient.upload(
      'upload-endpoint',
      {append: jest.fn()},
      {
        headers: {Accept: 'image/*', 'X-Trace': '1'},
        retryCount: 0,
      },
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'http://139.59.90.236:86/api/upload-endpoint',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'image/*',
          Authorization: 'Bearer upload-token',
          'X-Trace': '1',
        }),
      }),
    );
    expect(fetchMock.mock.calls[0][1].headers['Content-Type']).toBeUndefined();
  });
});
