import React from 'react';
import {render} from '@testing-library/react-native';

const mockUseAppVersionCheck = jest.fn();

jest.mock('../src/hooks/useAppVersionCheck', () => ({
  __esModule: true,
  default: () => mockUseAppVersionCheck(),
}));

jest.mock('../src/navigation/AppNavigator', () => {
  const React = require('react');
  const {Text} = require('react-native');

  return function MockAppNavigator() {
    return <Text>App Navigator</Text>;
  };
});

import App from '../App';

describe('App', () => {
  it('renders the navigator inside the app shell and runs the version check hook', () => {
    const screen = render(<App />);

    expect(screen.getByText('App Navigator')).toBeOnTheScreen();
    expect(mockUseAppVersionCheck).toHaveBeenCalledTimes(1);
  });
});
