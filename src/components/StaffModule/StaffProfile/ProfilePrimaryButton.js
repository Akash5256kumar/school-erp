import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const ProfilePrimaryButton = ({ disabled = false, onPress, theme, title }) => (
  <TouchableOpacity
    accessibilityRole="button"
    activeOpacity={disabled ? 1 : 0.9}
    disabled={disabled}
    onPress={disabled ? undefined : onPress}
    style={[
      styles.touchable,
      {
        borderRadius: theme.radii.primaryButton,
        opacity: disabled ? 0.7 : 1,
      },
      theme.shadows.primaryButton,
    ]}
  >
    <LinearGradient
      colors={[theme.colors.primaryButtonStart, theme.colors.primaryButtonEnd]}
      end={{ x: 1, y: 0 }}
      start={{ x: 0, y: 0 }}
      style={[
        styles.gradient,
        {
          borderRadius: theme.radii.primaryButton,
          height: theme.sizing.primaryButtonHeight,
        },
      ]}
    >
      <Text style={theme.typography.buttonLabel}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  touchable: {
    overflow: "hidden",
    width: "100%",
  },
});

export default memo(ProfilePrimaryButton);
