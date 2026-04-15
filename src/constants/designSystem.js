import {
  moderateScale,
  normalizeFont,
  verticalScale,
} from "../Utils/responsive";

const scaleSpace = (value) => Math.round(moderateScale(value, 0.18));
const scaleRadius = (value) => Math.round(moderateScale(value, 0.2));
const scaleControl = (value) =>
  Math.round(Math.max(value * 0.96, moderateScale(value, 0.16)));

export const spacing = {
  xxs: scaleSpace(2),
  xs: scaleSpace(4),
  sm: scaleSpace(8),
  md: scaleSpace(12),
  lg: scaleSpace(16),
  xl: scaleSpace(20),
  xxl: scaleSpace(24),
};

export const typography = {
  fontSmall: normalizeFont(12),
  fontRegular: normalizeFont(14),
  fontMedium: normalizeFont(16),
  fontLarge: normalizeFont(18),
  fontXL: normalizeFont(20),
  weights: {
    regular: "400",
    medium: "500",
    bold: "600",
  },
};

export const radii = {
  sm: scaleRadius(12),
  md: scaleRadius(16),
  lg: scaleRadius(20),
  pill: scaleRadius(24),
  round: 999,
};

export const shadows = {
  light: {
    elevation: 4,
    shadowColor: "rgba(15, 23, 42, 0.14)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
};

export const componentSizes = {
  appBarHeight: Math.round(Math.max(52, Math.min(56, verticalScale(54)))),
  appBarCompactTopInset: scaleSpace(8),
  buttonHeight: scaleControl(46),
  cardPadding: spacing.md,
  cardRadius: radii.md,
  controlHorizontalPadding: spacing.lg,
  controlVerticalPadding: spacing.md,
  iconMd: scaleControl(18),
  iconLg: scaleControl(22),
  inputHeight: scaleControl(46),
  modalRadius: radii.lg,
  screenHorizontalPadding: spacing.lg,
  searchHeight: scaleControl(46),
};

export const designSystem = {
  spacing,
  typography,
  radii,
  shadows,
  componentSizes,
};

export default designSystem;
