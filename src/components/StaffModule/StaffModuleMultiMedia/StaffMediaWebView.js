import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";

const StaffMediaWebView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url, title } = route.params || {};
  const { height, width } = useWindowDimensions();
  const theme = createAcademicTheme({ height, width, variant: "multimedia" });

  const [loadError, setLoadError] = useState(false);
  const isValidUrl = typeof url === "string" && url.trim().length > 0;

  return (
    <StaffAcademicScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={title || "Media"}>
      {!isValidUrl ? (
        <View style={styles.centeredMessage}>
          <Text style={styles.errorText}>
            No media URL available for this item.
          </Text>
        </View>
      ) : loadError ? (
        <View style={styles.centeredMessage}>
          <Text style={styles.errorText}>
            Unable to load content. Please check your connection and try again.
          </Text>
        </View>
      ) : (
        <WebView
          source={{ uri: url.trim() }}
          style={styles.webview}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator color={theme.colors.accent} size="large" />
            </View>
          )}
          onError={() => setLoadError(true)}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            if (nativeEvent.statusCode >= 400) { setLoadError(true); }
          }}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          scalesPageToFit
        />
      )}
    </StaffAcademicScaffold>
  );
};

const styles = StyleSheet.create({
  centeredMessage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  loaderOverlay: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  webview: {
    flex: 1,
  },
});

export default StaffMediaWebView;
