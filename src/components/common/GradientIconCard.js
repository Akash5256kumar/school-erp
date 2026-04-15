import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {
  colors,
  componentSizes,
  radii,
  shadows,
  spacing,
  typography,
} from "../../constants";
import * as constant from "../../Utils/Constant";

const GradientIconCard = ({ colors, Icon, label, onPress, style }) => {
  return (
    <Pressable
      accessibilityRole="button"
      android_ripple={{ color: "rgba(59,130,246,0.12)", borderless: false }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        style,
        pressed && styles.cardPressed,
      ]}
    >
      <LinearGradient
        colors={colors}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.iconBox}
      >
        <Icon
          color="#FFFFFF"
          size={componentSizes.iconLg + spacing.sm}
          strokeWidth={2.2}
        />
      </LinearGradient>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: constant.whiteColor,
    borderRadius: radii.md,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: componentSizes.buttonHeight * 2.75,
    padding: spacing.lg,
    ...shadows.light,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  iconBox: {
    alignItems: "center",
    borderRadius: radii.md,
    display: "flex",
    flexDirection: "column",
    height: componentSizes.buttonHeight + spacing.xs,
    justifyContent: "center",
    marginBottom: spacing.md,
    width: componentSizes.buttonHeight + spacing.xs,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontRegular,
    fontWeight: typography.weights.bold,
    lineHeight: typography.fontMedium,
    textAlign: "center",
  },
});

export default GradientIconCard;
