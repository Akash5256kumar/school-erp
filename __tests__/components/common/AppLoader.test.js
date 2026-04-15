import React from 'react';
import {render} from '@testing-library/react-native';

import AppLoader from '../../../src/components/common/AppLoader';
import {STRINGS} from '../../../src/constants';

describe('AppLoader', () => {
  it('renders the default loading label', () => {
    const screen = render(<AppLoader />);

    expect(screen.getByText(STRINGS.common.loading)).toBeOnTheScreen();
  });

  it('supports a custom label', () => {
    const screen = render(<AppLoader label="Loading dashboard" />);

    expect(screen.getByText('Loading dashboard')).toBeOnTheScreen();
  });

  it('can hide the loading label entirely', () => {
    const screen = render(<AppLoader label={null} />);

    expect(screen.queryByText(STRINGS.common.loading)).not.toBeOnTheScreen();
  });

  it('supports the fullScreen layout mode', () => {
    const screen = render(<AppLoader fullScreen />);

    expect(screen.getByText(STRINGS.common.loading)).toBeTruthy();
  });
});
