import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, STRINGS, typography } from "../../constants";

const EmptyState = ({
  title = STRINGS.common.noDataTitle,
  description = STRINGS.common.noDataDescription,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
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
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontRegular,
    textAlign: "center",
    lineHeight: typography.fontMedium + spacing.xxs,
  },
});

export default React.memo(EmptyState);
