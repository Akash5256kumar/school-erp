jest.mock('../../src/api', () => ({
  loginStudent: jest.fn(),
}));

import React from 'react';
import {BackHandler} from 'react-native';
import {act, fireEvent, waitFor} from '@testing-library/react-native';
import Snackbar from 'react-native-snackbar';

import {loginStudent} from '../../src/api';
import Login from '../../src/components/StudentModule/Login/Login';
import {STRINGS} from '../../src/constants';
import * as storageUtils from '../../src/Utils/storage';
import {renderWithProviders} from '../../test-utils/renderWithProviders';

describe('Login', () => {
  const navigation = {
    goBack: jest.fn(),
    reset: jest.fn(),
  };

  const renderLogin = async () => {
    const screen = renderWithProviders(<Login navigation={navigation} />);

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

  it('shows a validation message when admission number is missing', async () => {
    const screen = await renderLogin();

    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    expect(Snackbar.show).toHaveBeenCalledWith(
      expect.objectContaining({
        text: STRINGS.auth.missingAdmissionNumber,
      }),
    );
  });

  it('shows a validation message when date of birth is missing', async () => {
    const screen = await renderLogin();

    fireEvent.changeText(
      screen.getByPlaceholderText(STRINGS.auth.admissionNumberPlaceholder),
      '1001',
    );
    fireEvent.press(screen.getByText(STRINGS.auth.loginButton));

    expect(Snackbar.show).toHaveBeenCalledWith(
      expect.objectContaining({
        text: STRINGS.auth.missingDob,
      }),
    );
  });

  it('logs in successfully, persists the session, and resets navigation', async () => {
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
          deviceName: 'iOS',
          deviceToken: 'device-token',
          deviceType: 'iPhone',
          deviceVersion: '17.0',
          std_roll: '1001',
        }),
      );
    });

    expect(storageUtils.persistStudentSession).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'abc123',
        userData: {id: 7, Student_name: 'Ava'},
      }),
    );
    expect(screen.store.getState().userSlice.token).toBe('Bearer abc123');
    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  });

  it('shows a friendly error message when login fails', async () => {
    loginStudent.mockRejectedValueOnce(new Error('Network request failed'));
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
          text: STRINGS.common.networkError,
        }),
      );
    });
  });
});
