import colors from "./colors";
import {
  componentSizes,
  radii,
  shadows,
  spacing,
  typography,
} from "./designSystem";

export const bottomBarTheme = {
  palette: {
    active: "#14B6D6",
    border: "#ECEAFA",
    centerGradient: ["#18D0C8", "#14B6D6"],
    centerRipple: "rgba(20,182,214,0.16)",
    iconInactive: "#98A2B3",
    labelInactive: "#667085",
    surface: colors.white,
  },
  sizes: {
    centerButton: componentSizes.buttonHeight + spacing.sm,
    centerHalo: componentSizes.buttonHeight + spacing.lg,
    centerIcon: componentSizes.iconLg + spacing.xs,
    centerOffset: spacing.lg,
    containerMinHeight: componentSizes.appBarHeight + spacing.xl,
    containerRadius: radii.lg + spacing.sm,
    sideIcon: componentSizes.iconLg,
    sideIconSlot: componentSizes.iconLg + spacing.md,
    sideItemMinHeight: componentSizes.buttonHeight - spacing.xs,
    sideLabel: typography.fontSmall,
  },
  spacing: {
    containerHorizontal: spacing.md,
    containerTop: spacing.sm,
    itemBottom: spacing.xs,
    itemHorizontal: spacing.xs,
    itemTop: spacing.xs,
    labelTop: spacing.xs,
  },
  shadows: {
    container: {
      ...shadows.light,
      elevation: 14,
      shadowColor: "#C7D5E5",
      shadowOffset: {
        width: 0,
        height: -6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    centerHalo: {
      ...shadows.light,
      elevation: 12,
      shadowColor: "#B9C7D9",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.22,
      shadowRadius: 12,
    },
  },
};

export const bottomBarItemColors = {
  activeLabelColor: bottomBarTheme.palette.active,
  activeTintColor: bottomBarTheme.palette.active,
  inactiveLabelColor: bottomBarTheme.palette.labelInactive,
  inactiveTintColor: bottomBarTheme.palette.iconInactive,
};

export default bottomBarTheme;
