jest.mock('../../src/api', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    upload: jest.fn(),
  },
}));

describe('utility helpers', () => {
  let apiClient;
  let notifee;
  let utils;

  beforeEach(() => {
    jest.resetModules();
    ({apiClient} = require('../../src/api'));
    notifee = require('@notifee/react-native').default || require('@notifee/react-native');
    utils = require('../../src/Utils');
    apiClient.get.mockReset();
    apiClient.post.mockReset();
    apiClient.upload.mockReset();
    notifee.createChannel.mockClear();
    notifee.createTriggerNotification.mockClear();
    notifee.cancelNotification.mockClear();
  });

  it('routes GET requests through the api client', async () => {
    apiClient.get.mockResolvedValueOnce({status: true});

    await utils.apiRequest('dashboard');

    expect(apiClient.get).toHaveBeenCalledWith('dashboard', {
      headers: {},
      retryCount: 2,
      timeout: 15000,
    });
  });

  it('routes POST requests through the api client', async () => {
    apiClient.post.mockResolvedValueOnce({status: true});

    await utils.apiRequest('login', 'POST', {id: 2}, {Accept: 'application/json'}, 9000);

    expect(apiClient.post).toHaveBeenCalledWith('login', {id: 2}, {
      headers: {Accept: 'application/json'},
      retryCount: 2,
      timeout: 9000,
    });
  });

  it('builds form-data uploads and appends only defined values', async () => {
    const append = jest.fn();
    global.FormData = jest.fn(() => ({append}));
    apiClient.upload.mockResolvedValueOnce({status: true});

    await utils.uploadFile(
      'upload',
      {name: 'avatar.png', type: 'image/png', uri: 'file://avatar.png'},
      {studentId: '1', optional: null},
      'image',
      {Authorization: 'Bearer x'},
      7000,
    );

    expect(append).toHaveBeenNthCalledWith(1, 'image', {
      name: 'avatar.png',
      type: 'image/png',
      uri: 'file://avatar.png',
    });
    expect(append).toHaveBeenNthCalledWith(2, 'studentId', '1');
    expect(apiClient.upload).toHaveBeenCalledWith(
      'upload',
      expect.any(Object),
      {
        headers: {Authorization: 'Bearer x'},
        retryCount: 2,
        timeout: 7000,
      },
    );
  });

  it('uploads without attaching a file when only extra form data is provided', async () => {
    const append = jest.fn();
    global.FormData = jest.fn(() => ({append}));
    apiClient.upload.mockResolvedValueOnce({status: true});

    await utils.uploadFile('upload', null, {studentId: '1'});

    expect(append).toHaveBeenCalledTimes(1);
    expect(append).toHaveBeenCalledWith('studentId', '1');
  });

  it('creates the planner channel once before scheduling notifications', async () => {
    await utils.scheduleNotification({
      body: 'Math homework',
      date: '2026-03-24T10:00:00.000Z',
      id: 'planner-1',
      title: 'Reminder',
    });
    await utils.scheduleNotification({
      body: 'Science',
      date: '2026-03-24T11:00:00.000Z',
      id: 'planner-2',
      title: 'Second Reminder',
    });

    expect(notifee.createChannel).toHaveBeenCalledTimes(1);
    expect(notifee.createTriggerNotification).toHaveBeenCalledTimes(2);
  });

  it('swallows notification scheduling errors', async () => {
    notifee.createChannel.mockRejectedValueOnce(new Error('channel failure'));

    await expect(
      utils.scheduleNotification({
        body: 'Math homework',
        date: '2026-03-24T10:00:00.000Z',
        id: 'planner-3',
        title: 'Reminder',
      }),
    ).resolves.toBeUndefined();
  });

  it('cancels notifications by id', async () => {
    await utils.cancelNotification('planner-1');

    expect(notifee.cancelNotification).toHaveBeenCalledWith('planner-1');
  });
});
