import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import ErrorState from '../../../src/components/common/ErrorState';
import {STRINGS} from '../../../src/constants';

describe('ErrorState', () => {
  it('renders the message and the retry action when provided', () => {
    const onRetry = jest.fn();
    const screen = render(<ErrorState message="Unable to load profile" onRetry={onRetry} />);

    fireEvent.press(screen.getByText(STRINGS.common.retry));

    expect(screen.getByText('Something needs attention')).toBeOnTheScreen();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('omits the retry action when none is supplied', () => {
    const screen = render(<ErrorState message="Unable to load profile" />);

    expect(screen.queryByText(STRINGS.common.retry)).not.toBeOnTheScreen();
  });
});
