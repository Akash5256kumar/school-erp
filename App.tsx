import "react-native-gesture-handler";

import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { configureRoleAwareFetch } from "./src/api/authHandling";
import { AppToastProvider } from "./src/components/common/AppToast";
import AppNavigator from "./src/navigation/AppNavigator";
import useAppVersionCheck from "./src/hooks/useAppVersionCheck";
import store from "./src/store";

configureRoleAwareFetch();

const AppShell = () => {
  useAppVersionCheck();

  return (
    <SafeAreaProvider style={styles.root}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <AppToastProvider>
        <AppNavigator />
      </AppToastProvider>
    </SafeAreaProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <View style={styles.root}>
      <AppShell />
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default App;
