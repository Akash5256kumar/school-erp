import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing, STRINGS, typography } from "../../constants";

const AppLoader = ({ label = STRINGS.common.loading, fullScreen = false, color = colors.primary, size = 'small' }) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size={size} color={color} />
    {label ? <Text style={styles.label}>{label}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  fullScreen: {
    flex: 1,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontRegular,
    marginTop: spacing.sm,
  },
});

export default React.memo(AppLoader);
