import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import RoleSelectionScreen from '../../src/components/RoleScreen/RoleSelectionScreen';
import {navigationMock} from '../../test-utils/navigation';

describe('RoleSelectionScreen', () => {
  it('navigates to the student login flow', () => {
    const screen = render(<RoleSelectionScreen />);

    fireEvent.press(screen.getByText('Student login'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to the staff login flow', () => {
    const screen = render(<RoleSelectionScreen />);

    fireEvent.press(screen.getByText('Teacher login'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('StaffLogin');
  });
});
