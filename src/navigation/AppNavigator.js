import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationRef } from "./navigationService";
import screenRegistry from "./screenRegistry";

const Stack = createNativeStackNavigator();

// Force white background on every screen so dark mode never shows a black flash
// between native launch and the first JS screen rendering.
const NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef} theme={NAV_THEME}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      {screenRegistry.map(([name, component]) => (
        <Stack.Screen key={name} component={component} name={name} />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
