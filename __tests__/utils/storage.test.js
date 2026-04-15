import AsyncStorage from '@react-native-community/async-storage';

import {STORAGE_KEYS} from '../../src/constants';
import {persistStudentSession, storage} from '../../src/Utils/storage';

describe('storage utilities', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('returns parsed JSON values', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({id: 1}));

    await expect(storage.getJSON('profile')).resolves.toEqual({id: 1});
  });

  it('returns null when there is no stored JSON value', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    await expect(storage.getJSON('profile')).resolves.toBeNull();
  });

  it('returns null when stored JSON is invalid', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('not-json');

    await expect(storage.getJSON('profile')).resolves.toBeNull();
  });

  it('persists the normalized student session keys together', async () => {
    await persistStudentSession({
      date: '10/1/2026',
      time: '10:20 am',
      token: 'session-token',
      userData: {
        Student_class: '10',
        Student_name: 'Ava',
        Student_section: 'A',
        id: 17,
        std_roll: '1001',
      },
    });

    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      [STORAGE_KEYS.id, '17'],
      [STORAGE_KEYS.userData, JSON.stringify({
        Student_class: '10',
        Student_name: 'Ava',
        Student_section: 'A',
        id: 17,
        std_roll: '1001',
      })],
      [STORAGE_KEYS.class, '10'],
      [STORAGE_KEYS.section, 'A'],
      [STORAGE_KEYS.name, 'Ava'],
      [STORAGE_KEYS.stdRoll, '1001'],
      [STORAGE_KEYS.date, '10/1/2026'],
      [STORAGE_KEYS.time, '10:20 am'],
      [STORAGE_KEYS.token, 'session-token'],
    ]);
  });

  it('falls back to safe empty values when optional session fields are missing', async () => {
    await persistStudentSession({
      date: '10/1/2026',
      time: '10:20 am',
      userData: {},
    });

    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      [STORAGE_KEYS.id, ''],
      [STORAGE_KEYS.userData, JSON.stringify({})],
      [STORAGE_KEYS.class, ''],
      [STORAGE_KEYS.section, ''],
      [STORAGE_KEYS.name, ''],
      [STORAGE_KEYS.stdRoll, ''],
      [STORAGE_KEYS.date, '10/1/2026'],
      [STORAGE_KEYS.time, '10:20 am'],
      [STORAGE_KEYS.token, ''],
    ]);
  });
});
