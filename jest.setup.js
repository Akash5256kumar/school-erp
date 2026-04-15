import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

import React from 'react';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock(
  '@react-native-community/async-storage',
  () => require('@react-native-community/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-fast-image', () => 'FastImage');
jest.mock('react-native-device-info', () => ({
  getSystemName: jest.fn(() => 'iOS'),
  getModel: jest.fn(() => 'iPhone'),
  getSystemVersion: jest.fn(() => '17.0'),
}));
jest.mock('react-native-date-picker', () => {
  const {Pressable, Text, View} = require('react-native');

  return ({date, onCancel, onConfirm, open}) =>
    open ? (
      <View>
        <Text>Date Picker</Text>
        <Pressable onPress={() => onConfirm(date || new Date('2024-01-15'))}>
          <Text>Confirm</Text>
        </Pressable>
        <Pressable onPress={onCancel}>
          <Text>Cancel</Text>
        </Pressable>
      </View>
    ) : null;
});
jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 3500,
  LENGTH_SHORT: 2000,
  show: jest.fn(),
}));

jest.mock('react-native-version-check', () => ({
  needUpdate: jest.fn().mockResolvedValue({isNeeded: false}),
}));

jest.mock('@notifee/react-native', () => ({
  TriggerType: {
    TIMESTAMP: 'TIMESTAMP',
  },
  createChannel: jest.fn().mockResolvedValue('planner'),
  createTriggerNotification: jest.fn().mockResolvedValue(undefined),
  cancelNotification: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}) => <>{children}</>,
  useSafeAreaInsets: () => ({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  }),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}) => <>{children}</>,
  useNavigation: () => require('./test-utils/navigation').navigationMock,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    const {Text} = require('react-native');
    const Navigator = ({children}) => <>{children}</>;
    const Screen = ({name}) => <Text>{name}</Text>;
    return {Navigator, Screen};
  },
}));

jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: () => {
    const {Text} = require('react-native');
    const Navigator = ({children, drawerContent}) => (
      <>
        {drawerContent ? drawerContent({}) : null}
        {children}
      </>
    );
    const Screen = ({name}) => <Text>{name}</Text>;
    return {Navigator, Screen};
  },
}));

beforeEach(() => {
  const {navigationMock} = require('./test-utils/navigation');
  fetchMock.resetMocks();
  navigationMock.goBack.mockReset();
  navigationMock.navigate.mockReset();
  navigationMock.reset.mockReset();
});
