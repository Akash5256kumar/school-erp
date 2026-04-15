import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus, Search } from "lucide-react-native";

import {
  colors,
  componentSizes,
  radii,
  shadows,
  spacing,
} from "../../constants";

const SIZE_VARIANTS = {
  compact: componentSizes.buttonHeight + spacing.sm,
  regular: componentSizes.buttonHeight + spacing.lg,
};

const AppFloatingButton = ({
  accessibilityLabel,
  backgroundColor = colors.info,
  bottomOffset = spacing.xxl * 4,
  icon = "plus",
  iconColor = colors.white,
  onPress,
  rightOffset = spacing.lg,
  sizeVariant = "regular",
  style,
}) => {
  const insets = useSafeAreaInsets();
  const buttonSize = SIZE_VARIANTS[sizeVariant] || SIZE_VARIANTS.regular;
  const iconSize = Math.round(buttonSize * 0.34);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor,
          borderRadius: radii.round,
          bottom: bottomOffset + insets.bottom,
          height: buttonSize,
          right: rightOffset,
          width: buttonSize,
        },
        shadows.light,
        style,
      ]}
    >
      {icon === "search" ? (
        <Search color={iconColor} size={iconSize} strokeWidth={2.2} />
      ) : (
        <Plus color={iconColor} size={iconSize} strokeWidth={2.2} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export default React.memo(AppFloatingButton);
