jest.mock('../../src/navigation/screenRegistry', () => [
  ['Home', () => null],
  ['Profile', () => null],
]);

import React from 'react';
import {render} from '@testing-library/react-native';

import AppNavigator from '../../src/navigation/AppNavigator';

describe('AppNavigator', () => {
  it('renders each registered screen route', () => {
    const screen = render(<AppNavigator />);

    expect(screen.getByText('Home')).toBeOnTheScreen();
    expect(screen.getByText('Profile')).toBeOnTheScreen();
  });
});
