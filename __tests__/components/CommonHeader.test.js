import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import CommonHeader from '../../src/components/CommonHeader';

describe('CommonHeader', () => {
  it('renders the title and handles both header actions', () => {
    const onLeftClick = jest.fn();
    const onPressData = jest.fn();
    const screen = render(
      <CommonHeader
        imageSource="right-icon"
        onLeftClick={onLeftClick}
        onPressData={onPressData}
        title="Dashboard"
      />,
    );

    fireEvent.press(screen.getAllByRole('button')[0]);
    fireEvent.press(screen.getAllByRole('button')[1]);

    expect(screen.getByText('Dashboard')).toBeOnTheScreen();
    expect(onLeftClick).toHaveBeenCalledTimes(1);
    expect(onPressData).toHaveBeenCalledTimes(1);
  });

  it('renders safely without an optional right-side action', () => {
    const onLeftClick = jest.fn();
    const screen = render(
      <CommonHeader IconColor="#fff" onLeftClick={onLeftClick} textColor="#111" title="Profile" />,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(screen.getByText('Profile')).toBeOnTheScreen();
    expect(onLeftClick).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});
