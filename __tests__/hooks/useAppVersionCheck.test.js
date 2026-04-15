import React from 'react';
import {Alert, BackHandler, Linking} from 'react-native';
import {render} from '@testing-library/react-native';
import VersionCheck from 'react-native-version-check';

import {useAppVersionCheck} from '../../src/hooks/useAppVersionCheck';

const TestComponent = () => {
  useAppVersionCheck();
  return null;
};

describe('useAppVersionCheck', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing when no update is needed', async () => {
    VersionCheck.needUpdate.mockResolvedValueOnce({isNeeded: false});
    const alertSpy = jest.spyOn(Alert, 'alert');

    render(<TestComponent />);

    await Promise.resolve();

    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('shows a blocking update alert and opens the store URL', async () => {
    VersionCheck.needUpdate.mockResolvedValueOnce({
      isNeeded: true,
      storeUrl: 'https://store.example/app',
    });
    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, description, buttons) => {
        buttons[0].onPress();
      });
    const exitSpy = jest.spyOn(BackHandler, 'exitApp').mockImplementation(jest.fn());
    const openUrlSpy = jest.spyOn(Linking, 'openURL').mockResolvedValueOnce();

    render(<TestComponent />);

    await Promise.resolve();

    expect(alertSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledTimes(1);
    expect(openUrlSpy).toHaveBeenCalledWith('https://store.example/app');
  });
});
