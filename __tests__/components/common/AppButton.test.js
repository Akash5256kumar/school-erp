import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import AppButton from '../../../src/components/common/AppButton';

describe('AppButton', () => {
  it('renders the title and fires presses when enabled', () => {
    const onPress = jest.fn();
    const screen = render(<AppButton onPress={onPress} title="Continue" />);

    fireEvent.press(screen.getByRole('button'));

    expect(screen.getByText('Continue')).toBeOnTheScreen();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables interactions while loading', () => {
    const onPress = jest.fn();
    const screen = render(<AppButton loading onPress={onPress} title="Continue" />);

    fireEvent.press(screen.getByRole('button'));

    expect(screen.queryByText('Continue')).not.toBeOnTheScreen();
    expect(onPress).not.toHaveBeenCalled();
  });
});
