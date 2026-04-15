import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, STRINGS, typography } from "../../constants";

const ErrorState = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Something needs attention</Text>
    <Text style={styles.message}>{message}</Text>
    {onRetry ? (
      <Pressable onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>{STRINGS.common.retry}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontMedium,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.fontRegular,
    lineHeight: typography.fontMedium + spacing.xxs,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontRegular,
    fontWeight: typography.weights.bold,
  },
});

export default React.memo(ErrorState);
