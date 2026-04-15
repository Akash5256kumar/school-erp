jest.mock('lucide-react-native', () => ({
  CheckCircle2: () => null,
}));

import React from 'react';
import {Pressable, Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {AppToastProvider, useAppToast} from '../../../src/components/common/AppToast';

const TriggerToast = () => {
  const {showSuccessToast} = useAppToast();

  return (
    <Pressable
      onPress={() =>
        showSuccessToast({
          message: 'All records have been updated.',
          title: 'Attendance submitted successfully',
        })
      }>
      <Text>Show Toast</Text>
    </Pressable>
  );
};

describe('AppToastProvider', () => {
  it('renders a branded success toast with title and subtext', () => {
    const screen = render(
      <AppToastProvider>
        <TriggerToast />
      </AppToastProvider>,
    );

    fireEvent.press(screen.getByText('Show Toast'));

    expect(screen.getByText('Attendance submitted successfully')).toBeOnTheScreen();
    expect(screen.getByText('All records have been updated.')).toBeOnTheScreen();
  });
});
