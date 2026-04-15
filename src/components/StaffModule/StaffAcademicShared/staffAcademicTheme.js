import { Platform, StyleSheet } from "react-native";

import { appBarTheme, colors } from "../../../constants";
import {
  typeBold,
  typeMedium,
  typeRegular,
  typeSemiBold,
} from "../../../Utils/Constant";
import { moderateScale, verticalScale } from "../../../Utils/responsive";
import { ACADEMIC_VARIANTS } from "./staffAcademicConfig";

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const BASE_COLORS = {
  border: "#E3E8F0",
  cardShadow: "rgba(31, 44, 69, 0.16)",
  fieldPlaceholder: "#9CA6B8",
  fieldText: "#1F2A3D",
  overlay: "rgba(14, 24, 40, 0.48)",
  pillSurface: "#FFFFFF",
  primaryText: "#233047",
  secondaryText: "#556277",
  subtleDivider: "#EDF1F6",
  surface: "#FFFFFF",
  surfaceMuted: "#F5F7FB",
};

export const createAcademicTheme = ({ height, variant, width }) => {
  const palette =
    ACADEMIC_VARIANTS[variant]?.colors || ACADEMIC_VARIANTS.resultGrades.colors;
  const isMultimedia = variant === "multimedia";
  const usesCompactCards = isMultimedia || variant === "studentPerformance";
  const viewport = Math.min(height, width);
  const screenHorizontal = clamp(width * 0.055, 18, 28);
  const contentMaxWidth = clamp(width - screenHorizontal * 2, 320, 780);
  const cardRadius = usesCompactCards
    ? clamp(moderateScale(18), 14, 20)
    : clamp(moderateScale(28), 24, 34);
  const fieldHeight = isMultimedia
    ? clamp(verticalScale(44), 40, 46)
    : clamp(verticalScale(58), 52, 64);
  const actionHeight = usesCompactCards
    ? clamp(verticalScale(44), 40, 46)
    : clamp(verticalScale(46), 42, 50);
  const buttonHeight = clamp(verticalScale(62), 58, 68);

  return {
    borderWidth: {
      hairline: StyleSheet.hairlineWidth,
      regular: 1,
    },
    colors: {
      ...BASE_COLORS,
      ...palette,
      white: colors.white,
    },
    gradients: {
      fab: [palette.fabStart, palette.fabEnd],
      header: [palette.headerStart, palette.headerEnd],
      primaryAction: [colors.secondary, colors.primary],
      reset: [palette.resetStart, palette.resetEnd],
      screen: [palette.screenStart, palette.screenEnd],
      tabActive: [palette.accent, palette.fabEnd],
    },
    layout: {
      actionHeight,
      buttonHeight,
      choicePaddingHorizontal: clamp(moderateScale(14), 12, 18),
      contentMaxWidth,
      fabRingWidth: clamp(moderateScale(5), 4, 6),
      fabSize: isMultimedia
        ? clamp(viewport * 0.15, 64, 74)
        : clamp(viewport * 0.18, 74, 90),
      fieldHeight,
      headerHeight: appBarTheme.layout.height,
      modalMaxWidth: clamp(contentMaxWidth * 0.92, 280, 420),
      optionMinHeight: clamp(verticalScale(42), 38, 46),
      tableInputHeight: clamp(verticalScale(42), 38, 46),
    },
    radius: {
      action: actionHeight / 2,
      button: buttonHeight / 2,
      card: cardRadius,
      fab: clamp(viewport * 0.09, 34, 44),
      field: fieldHeight / 2,
      modal: clamp(moderateScale(28), 24, 32),
    },
    shadows: {
      card: {
        elevation: 8,
        shadowColor: BASE_COLORS.cardShadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: Platform.OS === "ios" ? 0.16 : 0.22,
        shadowRadius: 20,
      },
      button: {
        elevation: 8,
        shadowColor: BASE_COLORS.cardShadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: Platform.OS === "ios" ? 0.15 : 0.2,
        shadowRadius: 18,
      },
      header: {
        elevation: 8,
        shadowColor: BASE_COLORS.cardShadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: Platform.OS === "ios" ? 0.12 : 0.18,
        shadowRadius: 18,
      },
    },
    spacing: {
      buttonTop: clamp(verticalScale(24), 20, 30),
      cardGap: usesCompactCards
        ? clamp(verticalScale(14), 10, 16)
        : clamp(verticalScale(18), 14, 22),
      cardHorizontal: usesCompactCards
        ? clamp(contentMaxWidth * 0.04, 12, 16)
        : clamp(contentMaxWidth * 0.055, 18, 28),
      cardVertical: usesCompactCards
        ? clamp(verticalScale(16), 12, 18)
        : clamp(verticalScale(20), 18, 24),
      columnGap: usesCompactCards
        ? clamp(moderateScale(10), 8, 12)
        : clamp(moderateScale(14), 12, 18),
      contentTop: usesCompactCards
        ? clamp(verticalScale(12), 8, 14)
        : clamp(verticalScale(18), 14, 22),
      fieldGap: clamp(verticalScale(16), 12, 20),
      footerBottom: clamp(verticalScale(24), 18, 28),
      labelGap: usesCompactCards
        ? clamp(verticalScale(8), 6, 10)
        : clamp(verticalScale(10), 8, 12),
      modalPadding: clamp(moderateScale(18), 16, 24),
      rowGap: usesCompactCards
        ? clamp(verticalScale(10), 8, 12)
        : clamp(verticalScale(14), 12, 18),
      screenHorizontal,
      tabGap: clamp(moderateScale(12), 10, 16),
      tableCellPadding: clamp(moderateScale(12), 10, 16),
    },
    typography: {
      body: {
        color: BASE_COLORS.secondaryText,
        fontFamily: typeRegular,
        fontSize: usesCompactCards
          ? clamp(moderateScale(14), 13, 15)
          : clamp(moderateScale(17), 15, 19),
        lineHeight: usesCompactCards
          ? clamp(moderateScale(20), 18, 22)
          : clamp(moderateScale(27), 23, 29),
      },
      buttonLabel: {
        color: colors.white,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(19), 17, 21),
      },
      cardTitle: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeBold,
        fontSize: usesCompactCards
          ? clamp(moderateScale(16), 15, 17)
          : clamp(moderateScale(22), 19, 24),
        lineHeight: usesCompactCards
          ? clamp(moderateScale(22), 20, 24)
          : clamp(moderateScale(34), 28, 36),
      },
      fieldLabel: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(17), 15, 19),
      },
      fieldPlaceholder: {
        color: BASE_COLORS.fieldPlaceholder,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      fieldValue: {
        color: BASE_COLORS.fieldText,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      headerTitle: {
        color: colors.white,
        fontFamily: appBarTheme.fontFamily.title,
        fontSize: appBarTheme.typography.title,
      },
      metaLabel: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeBold,
        fontSize: usesCompactCards
          ? clamp(moderateScale(13), 12, 14)
          : clamp(moderateScale(17), 15, 19),
      },
      metaValue: {
        color: BASE_COLORS.secondaryText,
        fontFamily: typeRegular,
        fontSize: usesCompactCards
          ? clamp(moderateScale(14), 13, 15)
          : clamp(moderateScale(18), 16, 20),
      },
      sectionTitle: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      smallAction: {
        color: colors.white,
        fontFamily: typeSemiBold,
        fontSize: usesCompactCards
          ? clamp(moderateScale(14), 13, 15)
          : clamp(moderateScale(16), 14, 18),
      },
      tabLabel: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeSemiBold,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      tableCell: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(17), 15, 19),
      },
      tableHeader: {
        color: BASE_COLORS.primaryText,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(16), 14, 18),
        lineHeight: clamp(moderateScale(24), 20, 26),
      },
      topRightAccent: {
        color: palette.accent,
        fontFamily: typeBold,
        fontSize: usesCompactCards
          ? clamp(moderateScale(16), 15, 17)
          : clamp(moderateScale(18), 16, 20),
      },
      topRightMuted: {
        color: "#A8B1C2",
        fontFamily: typeRegular,
        fontSize: usesCompactCards
          ? clamp(moderateScale(12), 11, 13)
          : clamp(moderateScale(16), 14, 18),
      },
    },
  };
};

export const getAcademicActionPalette = (theme, tone) => {
  if (tone === "delete") {
    return {
      backgroundColor: theme.colors.delete,
      textColor: theme.colors.white,
    };
  }

  if (tone === "outline") {
    return {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      textColor: theme.colors.primaryText,
    };
  }

  if (tone === "apply") {
    return {
      backgroundColor: theme.colors.apply,
      textColor: theme.colors.white,
    };
  }

  if (tone === "save") {
    return {
      backgroundColor: theme.colors.save,
      textColor: theme.colors.white,
    };
  }

  if (tone === "reset") {
    return {
      gradientColors: theme.gradients.reset,
      textColor: theme.colors.white,
    };
  }

  if (tone === "play") {
    return {
      backgroundColor: theme.colors.apply,
      textColor: theme.colors.white,
    };
  }

  return {
    backgroundColor: theme.colors.published,
    textColor: theme.colors.white,
  };
};

export default createAcademicTheme;
