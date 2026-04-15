jest.mock('../../src/api', () => ({
  loginStudent: jest.fn(),
}));

import React from 'react';
import {BackHandler, Pressable} from 'react-native';
import {act, fireEvent, waitFor} from '@testing-library/react-native';
import Snackbar from 'react-native-snackbar';
import DeviceInfo from 'react-native-device-info';

import {loginStudent} from '../../src/api';
import Login from '../../src/components/StudentModule/Login/Login';
import {STRINGS} from '../../src/constants';
import * as storageUtils from '../../src/Utils/storage';
import {renderWithProviders} from '../../test-utils/renderWithProviders';

describe('Login edge cases', () => {
  const navigation = {
    goBack: jest.fn(),
    reset: jest.fn(),
  };

  const renderLogin = async (options = {}) => {
    const screen = renderWithProviders(<Login navigation={navigation} />, options);

    await act(async () => {
      await Promise.resolve();
    });

    return screen;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(BackHandler, 'addEventListener')
      .mockReturnValue({remove: jest.fn()});
    jest.spyOn(storageUtils.storage, 'getString').mockResolvedValue('device-token');
    jest.spyOn(storageUtils, 'persistStudentSession').mockResolvedValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses the hardware back handler to exit the app', async () => {
    const exitAppSpy = jest.spyOn(BackHandler, 'exitApp').mockImplementation(jest.fn());
    await renderLogin();

    const hardwareBackHandler =
      BackHandler.addEventListener.mock.calls[0][1];
    const handled = hardwareBackHandler();

    expect(handled).toBe(true);
    expect(exitAppSpy).toHaveBeenCalledTimes(1);
  });

  it('prevents API submission for whitespace-only admission numbers', async () => {
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '    ',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    expect(loginStudent).not.toHaveBeenCalled();
    expect(Snackbar.show).toHaveBeenCalledWith(
      expect.objectContaining({
        text: STRINGS.auth.missingAdmissionNumber,
      }),
    );
  });

  it('submits very long or special-character admission numbers without crashing', async () => {
    loginStudent.mockResolvedValueOnce({
      data: {id: 11, Student_name: 'Ava'},
      token: 'abc123',
    });
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '  @@STUDENT-0000000000000000001  ',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await waitFor(() => {
      expect(loginStudent).toHaveBeenCalledWith(
        expect.objectContaining({
          std_roll: '@@STUDENT-0000000000000000001',
        }),
      );
    });
  });

  it('shows a loading state and prevents duplicate submissions while login is pending', async () => {
    let resolveLogin;
    loginStudent.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveLogin = resolve;
        }),
    );
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.queryByText(STRINGS.auth.loginButton)).toBeNull();
    expect(loginStudent).toHaveBeenCalledTimes(1);

    const disabledButton = screen
      .UNSAFE_getAllByType(Pressable)
      .find(button => button.props.disabled);
    fireEvent.press(disabledButton);

    expect(loginStudent).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveLogin({
        data: {id: 7, Student_name: 'Ava'},
        token: 'abc123',
      });
    });

    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  });

  it('restores the button after a failed async login attempt', async () => {
    let rejectLogin;
    loginStudent.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          rejectLogin = reject;
        }),
    );
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.queryByText(STRINGS.auth.loginButton)).toBeNull();

    await act(async () => {
      rejectLogin(new Error('Network request failed'));
    });

    await waitFor(() => {
      expect(screen.getByText(STRINGS.auth.loginButton)).toBeTruthy();
    });
  });

  it('shows a fallback error and avoids navigation when the login response is malformed', async () => {
    loginStudent.mockResolvedValueOnce({
      data: null,
      token: null,
    });
    const screen = await renderLogin({
      preloadedState: {
        userSlice: {
          isPlayerIdUpdated: false,
          loading: false,
          playerId: null,
          token: 'Bearer stale-token',
          updatingProfile: false,
          userData: {id: 3, Student_name: 'Existing'},
        },
      },
    });

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await waitFor(() => {
      expect(Snackbar.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text: STRINGS.auth.loginFailed,
        }),
      );
    });

    expect(storageUtils.persistStudentSession).not.toHaveBeenCalled();
    expect(navigation.reset).not.toHaveBeenCalled();
    expect(screen.store.getState().userSlice.token).toBe('Bearer stale-token');
  });

  it('falls back to empty device information when device lookup fails', async () => {
    storageUtils.storage.getString.mockRejectedValueOnce(new Error('device token missing'));
    loginStudent.mockResolvedValueOnce({
      data: {id: 7, Student_name: 'Ava'},
      token: 'abc123',
    });
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await waitFor(() => {
      expect(loginStudent).toHaveBeenCalledWith(
        expect.objectContaining({
          deviceName: '',
          deviceToken: '',
          deviceType: '',
          deviceVersion: '',
        }),
      );
    });
  });

  it('normalizes missing device info values to empty strings before login', async () => {
    DeviceInfo.getSystemName.mockReturnValueOnce(null);
    DeviceInfo.getModel.mockReturnValueOnce(undefined);
    DeviceInfo.getSystemVersion.mockReturnValueOnce('');
    storageUtils.storage.getString.mockResolvedValueOnce(null);
    loginStudent.mockResolvedValueOnce({
      data: {id: 7, Student_name: 'Ava'},
      token: 'abc123',
    });
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await waitFor(() => {
      expect(loginStudent).toHaveBeenCalledWith(
        expect.objectContaining({
          deviceName: '',
          deviceToken: '',
          deviceType: '',
          deviceVersion: '',
        }),
      );
    });
  });

  it('shows an error and restores the button if session persistence fails', async () => {
    loginStudent.mockResolvedValueOnce({
      data: {id: 7, Student_name: 'Ava'},
      token: 'abc123',
    });
    storageUtils.persistStudentSession.mockRejectedValueOnce(new Error('persist failed'));
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Confirm'));
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    await waitFor(() => {
      expect(Snackbar.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'persist failed',
        }),
      );
    });

    expect(screen.getByText(STRINGS.auth.loginButton)).toBeTruthy();
    expect(navigation.reset).not.toHaveBeenCalled();
  });

  it('does not update device info state after the screen unmounts', async () => {
    let resolveToken;
    storageUtils.storage.getString.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveToken = resolve;
        }),
    );
    const screen = renderWithProviders(<Login navigation={navigation} />);

    screen.unmount();

    await act(async () => {
      resolveToken('late-token');
      await Promise.resolve();
    });

    expect(loginStudent).not.toHaveBeenCalled();
  });

  it('cleans up the hardware back subscription on unmount', async () => {
    const remove = jest.fn();
    BackHandler.addEventListener.mockReturnValueOnce({remove});
    const screen = await renderLogin();

    screen.unmount();

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('lets the user open and cancel the date picker without changing the placeholder', async () => {
    const screen = await renderLogin();

    fireEvent.press(screen.getByText(STRINGS.auth.dobPlaceholder));
    fireEvent.press(screen.getByText('Cancel'));

    expect(screen.getByText(STRINGS.auth.dobPlaceholder)).toBeTruthy();
  });

  it('toggles admission number visibility with the trailing icon', async () => {
    const screen = await renderLogin();
    const input = screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder);
    const iconButton = screen
      .UNSAFE_getAllByType(Pressable)
      .find(button => button.props.onPress && button.props.hitSlop);

    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(iconButton);

    expect(screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder).props.secureTextEntry).toBe(true);
  });

  it('lets the user go back through the header action', async () => {
    const screen = await renderLogin();
    const headerBackButton = screen
      .UNSAFE_getAllByType(Pressable)
      .find(button => button.props.accessibilityRole === 'button');

    fireEvent.press(headerBackButton);

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
