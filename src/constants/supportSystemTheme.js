import { Platform } from "react-native";

import * as constant from "../Utils/Constant";
import colors from "./colors";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createScale = (input, base, min, max) =>
  clamp(Math.min(input, base * max) / base, min, max);

export const createSupportSystemTheme = ({ width, height }) => {
  const horizontalScale = createScale(width, BASE_WIDTH, 0.88, 1.22);
  const verticalScale = createScale(height, BASE_HEIGHT, 0.84, 1.16);

  const scale = (value) => Math.round(value * horizontalScale);
  const vertical = (value) => Math.round(value * verticalScale);
  const moderate = (value, factor = 0.45) =>
    Math.round(value + (scale(value) - value) * factor);

  const palette = {
    headerGradient: ["#149B97", "#149B97", "#0F95B7"],
    pageGradient: ["#ECFEFF", "#EEF9FF", "#F4F2FF"],
    pageBase: "#EFFAFC",
    surface: colors.surface,
    surfaceRaised: "#FFFFFF",
    textStrong: "#334158",
    textBody: "#667488",
    textMuted: "#95A0B2",
    tabActive: "#2D3B54",
    tabInactive: "#FFFFFF",
    tabInactiveText: "#3A465C",
    emptyIconBg: "#C8F7F7",
    emptyIconStroke: "#0B9A96",
    cardBorder: "#E7EDF6",
    shadow: "rgba(28, 44, 76, 0.14)",
    divider: "#E6EEF5",
    accent: "#149B97",
    chevron: "#2D3B54",
    headerText: colors.white,
  };

  return {
    palette,
    metrics: {
      width,
      height,
      scale,
      vertical,
      moderate,
    },
    spacing: {
      screenHorizontal: scale(24),
      sectionTop: vertical(18),
      sectionGap: vertical(14),
      cardGap: vertical(12),
      cardPadding: scale(16),
      cardPaddingTight: scale(12),
      headerTop: Platform.OS === "ios" ? vertical(8) : vertical(12),
      headerBottom: vertical(22),
      headerHorizontal: scale(22),
      iconGap: scale(12),
      textGap: vertical(6),
      listBottom: vertical(48),
      emptyTopOffset: vertical(108),
      tabGap: scale(12),
      emptyDescriptionWidth: scale(220),
      rowGap: vertical(8),
      emptyTitleGap: vertical(12),
      emptyDescriptionGap: vertical(6),
    },
    radii: {
      card: scale(18),
      pill: scale(22),
      iconCircle: scale(48),
      button: scale(22),
    },
    sizes: {
      headerIcon: scale(31),
      headerButton: scale(40),
      tabHeight: vertical(44),
      emptyIconWrap: scale(144),
      emptyIcon: scale(60),
      chevron: scale(18),
    },
    typography: {
      header: moderate(32),
      tab: moderate(15, 0.24),
      emptyTitle: moderate(18, 0.24),
      emptyDescription: moderate(14, 0.18),
      cardLabel: moderate(13, 0.18),
      cardValue: moderate(14, 0.18),
      cardIssue: moderate(16, 0.24),
    },
    fonts: {
      regular: constant.typeRegular,
      medium: constant.typeMedium,
      semiBold: constant.typeSemiBold,
      bold: constant.typeBold,
    },
    shadows: {
      header: {
        elevation: 10,
        shadowColor: palette.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.18,
        shadowRadius: 22,
      },
      card: {
        elevation: 10,
        shadowColor: palette.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.14,
        shadowRadius: 18,
      },
      pill: {
        elevation: 6,
        shadowColor: palette.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
    },
  };
};
