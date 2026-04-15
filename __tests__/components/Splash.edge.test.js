import React from 'react';
import {act} from '@testing-library/react-native';

import Splash from '../../src/components/Splash';
import {SPLASH_MIN_DURATION_MS, STORAGE_KEYS} from '../../src/constants';
import {storage} from '../../src/Utils/storage';
import {navigationMock} from '../../test-utils/navigation';
import {renderWithProviders} from '../../test-utils/renderWithProviders';

describe('Splash edge cases', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(storage, 'getString').mockImplementation(key => {
      const values = {
        [STORAGE_KEYS.stdRoll]: null,
        [STORAGE_KEYS.role]: null,
        [STORAGE_KEYS.token]: null,
      };

      return Promise.resolve(values[key]);
    });
    jest.spyOn(storage, 'getJSON').mockResolvedValue(null);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const flushSplash = async () => {
    await act(async () => {
      await jest.advanceTimersByTimeAsync(SPLASH_MIN_DURATION_MS);
    });
  };

  it('keeps an existing bearer token intact during hydration', async () => {
    storage.getString.mockImplementation(key => {
      const values = {
        [STORAGE_KEYS.stdRoll]: '1001',
        [STORAGE_KEYS.role]: null,
        [STORAGE_KEYS.token]: 'Bearer abc123',
      };

      return Promise.resolve(values[key]);
    });
    storage.getJSON.mockResolvedValue({id: 1, Student_name: 'Ava'});
    const screen = renderWithProviders(<Splash />);

    await flushSplash();

    expect(screen.store.getState().userSlice.token).toBe('Bearer abc123');
    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  });

  it('treats orphaned token/user data as an invalid session and avoids stale hydration', async () => {
    storage.getString.mockImplementation(key => {
      const values = {
        [STORAGE_KEYS.stdRoll]: null,
        [STORAGE_KEYS.role]: null,
        [STORAGE_KEYS.token]: 'abc123',
      };

      return Promise.resolve(values[key]);
    });
    storage.getJSON.mockResolvedValue({id: 1, Student_name: 'Ava'});
    const screen = renderWithProviders(<Splash />);

    await flushSplash();

    expect(screen.store.getState().userSlice.token).toBeNull();
    expect(screen.store.getState().userSlice.userData).toBeNull();
    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'RoleSelectionScreen'}],
    });
  });

  it('falls back to role selection if persisted session lookup throws', async () => {
    storage.getString.mockRejectedValueOnce(new Error('storage unavailable'));

    renderWithProviders(<Splash />);

    await flushSplash();

    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'RoleSelectionScreen'}],
    });
  });

  it('hydrates staff users and routes them to the staff tabs', async () => {
    storage.getString.mockImplementation(key => {
      const values = {
        [STORAGE_KEYS.stdRoll]: null,
        [STORAGE_KEYS.role]: 'teacher',
        [STORAGE_KEYS.token]: 'staff-token',
      };

      return Promise.resolve(values[key]);
    });
    storage.getJSON.mockResolvedValue({id: 22, staff_name: 'Teacher'});
    const screen = renderWithProviders(<Splash />);

    await flushSplash();

    expect(screen.store.getState().userSlice.token).toBe('Bearer staff-token');
    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'StaffModuleBottomTabs'}],
    });
  });

  it('does not navigate after the splash screen unmounts', async () => {
    const screen = renderWithProviders(<Splash />);

    screen.unmount();

    await flushSplash();

    expect(navigationMock.reset).not.toHaveBeenCalled();
  });
});
