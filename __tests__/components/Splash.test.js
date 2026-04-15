import React from 'react';
import {act} from '@testing-library/react-native';

import Splash from '../../src/components/Splash';
import {SPLASH_MIN_DURATION_MS, STORAGE_KEYS, STRINGS} from '../../src/constants';
import {storage} from '../../src/Utils/storage';
import {navigationMock} from '../../test-utils/navigation';
import {renderWithProviders} from '../../test-utils/renderWithProviders';

describe('Splash', () => {
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

  const finishSplash = async () => {
    await act(async () => {
      await jest.advanceTimersByTimeAsync(SPLASH_MIN_DURATION_MS);
    });
  };

  it('routes signed-in students to the dashboard and hydrates the store', async () => {
    storage.getString.mockImplementation(key => {
      const values = {
        [STORAGE_KEYS.stdRoll]: '1001',
        [STORAGE_KEYS.role]: null,
        [STORAGE_KEYS.token]: 'abc123',
      };

      return Promise.resolve(values[key]);
    });
    storage.getJSON.mockResolvedValue({id: 7, Student_name: 'Ava'});

    const screen = renderWithProviders(<Splash />);

    await finishSplash();

    expect(screen.getByText(STRINGS.splash.welcome)).toBeOnTheScreen();
    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
    expect(screen.store.getState().userSlice.token).toBe('Bearer abc123');
  });

  it('routes staff users to the staff tabs when a role is stored', async () => {
    storage.getString.mockImplementation(key => {
      const values = {
        [STORAGE_KEYS.stdRoll]: null,
        [STORAGE_KEYS.role]: 'teacher',
        [STORAGE_KEYS.token]: null,
      };

      return Promise.resolve(values[key]);
    });

    renderWithProviders(<Splash />);

    await finishSplash();

    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'StaffModuleBottomTabs'}],
    });
  });

  it('routes new users to role selection when there is no stored session', async () => {
    renderWithProviders(<Splash />);

    await finishSplash();

    expect(navigationMock.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'RoleSelectionScreen'}],
    });
  });
});
