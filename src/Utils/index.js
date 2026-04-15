import notifee, {TriggerType} from '@notifee/react-native';

import AUTH_ROLES from '../auth/roles';
import {storage} from '../auth/sessionStorage';
import {API_RETRY_COUNT, API_TIMEOUT_MS} from '../constants';
import {STORAGE_KEYS} from '../constants';
import {apiClient, staffApiClient} from '../api';

const getActiveApiClient = async () => {
  const activeRole = await storage.getString(STORAGE_KEYS.activeAuthRole);
  return activeRole === AUTH_ROLES.staff ? staffApiClient : apiClient;
};

export const apiRequest = async (
  endpoint,
  method = 'GET',
  body = null,
  headers = {},
  timeout = API_TIMEOUT_MS,
) => {
  const client = await getActiveApiClient();

  if (method === 'GET') {
    return client.get(endpoint, {
      headers,
      retryCount: API_RETRY_COUNT,
      timeout,
    });
  }

  return client.post(endpoint, body, {
    headers,
    retryCount: API_RETRY_COUNT,
    timeout,
  });
};

export const staffApiRequest = async (
  endpoint,
  method = 'GET',
  body = null,
  headers = {},
  timeout = API_TIMEOUT_MS,
) => {
  if (method === 'GET') {
    return staffApiClient.get(endpoint, {
      headers,
      retryCount: API_RETRY_COUNT,
      timeout,
    });
  }

  return staffApiClient.post(endpoint, body, {
    headers,
    retryCount: API_RETRY_COUNT,
    timeout,
  });
};

export const uploadFile = async (
  endpoint,
  file = null,
  extraData = {},
  fileKey = 'file',
  headers = {},
  timeout = API_TIMEOUT_MS,
) => {
  const client = await getActiveApiClient();
  const formData = new FormData();

  if (file?.uri) {
    formData.append(fileKey, {
      uri: file.uri,
      name: file.name || 'upload.jpg',
      type: file.type || 'image/jpeg',
    });
  }

  Object.entries(extraData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return client.upload(endpoint, formData, {
    headers,
    retryCount: API_RETRY_COUNT,
    timeout,
  });
};

export const staffUploadFile = async (
  endpoint,
  file = null,
  extraData = {},
  fileKey = 'file',
  headers = {},
  timeout = API_TIMEOUT_MS,
) => {
  const formData = new FormData();

  if (file?.uri) {
    formData.append(fileKey, {
      uri: file.uri,
      name: file.name || 'upload.jpg',
      type: file.type || 'image/jpeg',
    });
  }

  Object.entries(extraData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return staffApiClient.upload(endpoint, formData, {
    headers,
    retryCount: API_RETRY_COUNT,
    timeout,
  });
};

let channelCreated = false;

const ensureChannel = async () => {
  if (channelCreated) {
    return;
  }

  await notifee.createChannel({
    id: 'planner',
    name: 'Planner Notifications',
  });

  channelCreated = true;
};

export const scheduleNotification = async ({id, title, body, date}) => {
  try {
    await ensureChannel();

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(date).getTime(),
    };

    await notifee.createTriggerNotification(
      {
        id,
        title,
        body,
        android: {
          channelId: 'planner',
          smallIcon: 'ic_launcher',
        },
      },
      trigger,
    );
  } catch (error) {
    // Notification scheduling should not break core flows.
  }
};

export const cancelNotification = async id => {
  await notifee.cancelNotification(id);
};
