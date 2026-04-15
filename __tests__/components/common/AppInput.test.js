import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import AppInput from '../../../src/components/common/AppInput';

describe('AppInput', () => {
  it('renders the label and forwards text changes', () => {
    const onChangeText = jest.fn();
    const screen = render(
      <AppInput
        label="Admission No."
        onChangeText={onChangeText}
        placeholder="Type admission number"
        value=""
      />,
    );

    fireEvent.changeText(screen.getByPlaceholderText('Type admission number'), '1001');

    expect(screen.getByText('Admission No.')).toBeOnTheScreen();
    expect(onChangeText).toHaveBeenCalledWith('1001');
  });

  it('renders and handles the right-side action', () => {
    const onRightIconPress = jest.fn();
    const screen = render(
      <AppInput
        onRightIconPress={onRightIconPress}
        placeholder="Type admission number"
        rightIcon="eye-icon"
        value=""
      />,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(onRightIconPress).toHaveBeenCalledTimes(1);
  });
});
