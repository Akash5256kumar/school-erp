import AsyncStorage from '@react-native-community/async-storage';

import {storage} from '../../src/Utils/storage';

describe('storage wrapper edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates getString directly to AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('token-1');

    await expect(storage.getString('@token')).resolves.toBe('token-1');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@token');
  });

  it('stringifies primitive values passed to setString', async () => {
    await storage.setString('@count', 42);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@count', '42');
  });

  it('serializes objects in setJSON', async () => {
    await storage.setJSON('@profile', {id: 7, name: 'Ava'});

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@profile',
      JSON.stringify({id: 7, name: 'Ava'}),
    );
  });

  it('passes multiSet entries through untouched', async () => {
    const entries = [
      ['@token', 'abc'],
      ['@role', 'student'],
    ];

    await storage.multiSet(entries);

    expect(AsyncStorage.multiSet).toHaveBeenCalledWith(entries);
  });

  it('removes keys through the AsyncStorage adapter', async () => {
    await storage.remove('@token');

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@token');
  });
});
