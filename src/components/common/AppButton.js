import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { colors } from "../../constants";
import {
  componentSizes,
  radii,
  shadows,
  spacing,
  typography,
} from "../../constants";
import * as constant from "../../Utils/Constant";

const AppButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  colors: gradientColors = [colors.secondary, colors.primary],
}) => {
  const isDisabled = disabled || loading;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradient, isDisabled && styles.disabled, style]}
    >
      <Pressable
        accessibilityRole="button"
        disabled={isDisabled}
        onPress={onPress}
        style={styles.pressable}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.label, textStyle]}>{title}</Text>
        )}
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: radii.pill,
    minHeight: componentSizes.buttonHeight,
    overflow: "hidden",
  },
  pressable: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: componentSizes.buttonHeight,
    paddingHorizontal: componentSizes.controlHorizontalPadding,
  },
  disabled: {
    opacity: 0.65,
  },
  label: {
    color: colors.white,
    fontFamily: constant.typeBold,
    fontSize: typography.fontMedium,
    fontWeight: typography.weights.medium,
  },
});

export default React.memo(AppButton);
