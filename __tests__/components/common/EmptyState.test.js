import React from 'react';
import {render} from '@testing-library/react-native';

import EmptyState from '../../../src/components/common/EmptyState';
import {STRINGS} from '../../../src/constants';

describe('EmptyState', () => {
  it('shows the shared fallback copy by default', () => {
    const screen = render(<EmptyState />);

    expect(screen.getByText(STRINGS.common.noDataTitle)).toBeOnTheScreen();
    expect(screen.getByText(STRINGS.common.noDataDescription)).toBeOnTheScreen();
  });

  it('shows custom empty-state copy when provided', () => {
    const screen = render(
      <EmptyState description="Try again later" title="No timetable yet" />,
    );

    expect(screen.getByText('No timetable yet')).toBeOnTheScreen();
    expect(screen.getByText('Try again later')).toBeOnTheScreen();
  });
});
