import { Platform, StyleSheet } from "react-native";

import { appBarTheme, colors, spacing } from "../../../constants";
import {
  typeBold,
  typeMedium,
  typeRegular,
  typeSemiBold,
  whiteColor,
} from "../../../Utils/Constant";
import { moderateScale, verticalScale } from "../../../Utils/responsive";
import { STAFF_CONTENT_VARIANTS } from "./staffContentConfig";

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const BASE_COLORS = {
  border: "#E1E6EF",
  cardShadow: "rgba(40, 49, 68, 0.16)",
  deleteText: whiteColor,
  emptyDescription: "#6A768A",
  fabRing: colors.white,
  fieldPlaceholder: "#9BA4B4",
  fieldText: "#1D1F24",
  metaLabel: "#39475E",
  metaValue: "#536178",
  screenOverlay: "rgba(24, 32, 53, 0.28)",
  softDivider: "#EEF1F5",
  surface: colors.surface,
  surfaceMuted: "#F5F7FB",
  title: "#2E3950",
};

export const createStaffContentTheme = ({ height, variant, width }) => {
  const viewport = Math.min(height, width);
  const variantColors = STAFF_CONTENT_VARIANTS[variant].colors;
  const usesCompactListCards = variant === "planner" || variant === "notes";
  const screenHorizontal = clamp(width * 0.06, 20, 28);
  const contentMaxWidth = clamp(width - screenHorizontal * 2, 320, 760);
  const buttonHeight = clamp(verticalScale(60), 56, 64);
  const fieldHeight = clamp(verticalScale(60), 56, 64);
  const compactFieldHeight = clamp(verticalScale(50), 46, 56);
  const cardRadius = clamp(moderateScale(32), 26, 36);

  return {
    borderWidth: {
      field: 1,
      thin: StyleSheet.hairlineWidth,
    },
    colors: {
      ...BASE_COLORS,
      accent: variantColors.accent,
      accentSoft: variantColors.accentSoft,
      delete: variantColors.delete,
      emptyActionEnd: variantColors.emptyActionEnd,
      emptyActionStart: variantColors.emptyActionStart,
      fabEnd: variantColors.fabEnd,
      fabStart: variantColors.fabStart,
      headerEnd: variantColors.headerEnd,
      headerStart: variantColors.headerStart,
      publish: variantColors.publish,
      published: variantColors.published,
      screenEnd: variantColors.screenEnd,
      screenStart: variantColors.screenStart,
      uploadAccent: variantColors.uploadAccent,
      white: colors.white,
    },
    gradients: {
      header: [variantColors.headerStart, variantColors.headerEnd],
      emptyAction: [
        variantColors.emptyActionStart,
        variantColors.emptyActionEnd,
      ],
      fab: [variantColors.fabStart, variantColors.fabEnd],
      primaryAction: [colors.secondary, colors.primary],
      screen: [variantColors.screenStart, variantColors.screenEnd],
    },
    layout: {
      buttonHeight,
      compactFieldHeight,
      contentMaxWidth,
      detailCardMinHeight: clamp(verticalScale(320), 280, 420),
      emptyCardMinHeight: clamp(verticalScale(460), 360, 520),
      fabSize: clamp(viewport * 0.18, 76, 92),
      fieldHeight,
      fullWidthBreakpoint: 360,
      headerHeight: appBarTheme.layout.height,
      listActionHeight: usesCompactListCards
        ? clamp(verticalScale(44), 40, 48)
        : clamp(verticalScale(48), 44, 54),
      maxMenuHeight: clamp(verticalScale(280), 220, 320),
      mediaPreviewHeight: clamp(verticalScale(160), 120, 180),
      mediaPreviewWidth: clamp(contentMaxWidth * 0.78, 220, 360),
    },
    radius: {
      action: clamp(moderateScale(20), 18, 24),
      button: buttonHeight / 2,
      card: cardRadius,
      fab: clamp(viewport * 0.09, 34, 44),
      field: fieldHeight / 2,
      menu: clamp(moderateScale(24), 20, 28),
    },
    shadows: {
      card: {
        elevation: 8,
        shadowColor: BASE_COLORS.cardShadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: Platform.OS === "ios" ? 0.18 : 0.22,
        shadowRadius: 20,
      },
      header: {
        elevation: 8,
        shadowColor: BASE_COLORS.cardShadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: Platform.OS === "ios" ? 0.12 : 0.16,
        shadowRadius: 18,
      },
      primaryButton: {
        elevation: 8,
        shadowColor: "rgba(88, 64, 246, 0.24)",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: Platform.OS === "ios" ? 0.18 : 0.22,
        shadowRadius: 18,
      },
    },
    spacing: {
      buttonTop: clamp(verticalScale(28), 20, 32),
      cardGap: usesCompactListCards
        ? clamp(verticalScale(16), 12, 20)
        : clamp(verticalScale(18), 14, 24),
      cardHorizontal: usesCompactListCards
        ? clamp(contentMaxWidth * 0.045, 16, 24)
        : clamp(contentMaxWidth * 0.05, 18, 28),
      cardVertical: usesCompactListCards
        ? clamp(verticalScale(18), 14, 22)
        : clamp(verticalScale(20), 18, 26),
      columnGap: usesCompactListCards
        ? clamp(moderateScale(14), 10, 18)
        : clamp(moderateScale(16), 12, 20),
      contentTop: clamp(verticalScale(18), 14, 22),
      detailRowVertical: clamp(verticalScale(20), 18, 24),
      emptyTop: clamp(verticalScale(58), 32, 70),
      fabInset: screenHorizontal,
      fieldGap: usesCompactListCards
        ? clamp(verticalScale(14), 10, 18)
        : clamp(verticalScale(18), 14, 22),
      fieldLabelGap: usesCompactListCards
        ? clamp(verticalScale(8), 6, 10)
        : clamp(verticalScale(10), 8, 12),
      fieldPaddingHorizontal: clamp(moderateScale(18), 16, 22),
      fieldPaddingVertical: clamp(verticalScale(14), 12, 16),
      footerSafeBottom: clamp(verticalScale(24), 18, 28),
      listBottom: clamp(verticalScale(120), 92, 144),
      menuOptionVertical: clamp(verticalScale(14), 12, 16),
      modalInset: clamp(moderateScale(24), 20, 28),
      screenHorizontal,
      screenTop: clamp(verticalScale(18), 12, 20),
      uploadTop: clamp(verticalScale(18), 14, 20),
    },
    typography: {
      cardTitle: {
        color: BASE_COLORS.title,
        fontFamily: typeBold,
        fontSize: usesCompactListCards
          ? clamp(moderateScale(18), 16, 20)
          : clamp(moderateScale(22), 18, 24),
        lineHeight: usesCompactListCards
          ? clamp(moderateScale(28), 22, 30)
          : clamp(moderateScale(32), 28, 34),
      },
      detailLabel: {
        color: BASE_COLORS.metaLabel,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(17), 16, 20),
      },
      detailValue: {
        color: BASE_COLORS.metaValue,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      emptyActionLabel: {
        color: colors.white,
        fontFamily: typeMedium,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      emptyDescription: {
        color: BASE_COLORS.emptyDescription,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(17), 15, 19),
        lineHeight: clamp(moderateScale(26), 22, 30),
      },
      emptyTitle: {
        color: BASE_COLORS.title,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(25), 22, 28),
      },
      fieldLabel: {
        color: BASE_COLORS.metaLabel,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(17), 16, 20),
      },
      fieldValue: {
        color: BASE_COLORS.fieldText,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      fieldPlaceholder: {
        color: BASE_COLORS.fieldPlaceholder,
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(18), 16, 20),
      },
      headerTitle: {
        color: colors.white,
        fontFamily: appBarTheme.fontFamily.title,
        fontSize: appBarTheme.typography.title,
      },
      listMetaLabel: {
        color: BASE_COLORS.metaLabel,
        fontFamily: typeBold,
        fontSize: usesCompactListCards
          ? clamp(moderateScale(14), 13, 16)
          : clamp(moderateScale(16), 15, 18),
      },
      listMetaValue: {
        color: BASE_COLORS.metaValue,
        fontFamily: typeRegular,
        fontSize: usesCompactListCards
          ? clamp(moderateScale(14), 13, 16)
          : clamp(moderateScale(16), 14, 18),
      },
      listTopDate: {
        color: "#A9B2C2",
        fontFamily: typeRegular,
        fontSize: clamp(moderateScale(15), 13, 17),
      },
      primaryButtonLabel: {
        color: colors.white,
        fontFamily: typeBold,
        fontSize: clamp(moderateScale(19), 17, 21),
      },
      statusButtonLabel: {
        color: colors.white,
        fontFamily: typeMedium,
        fontSize: usesCompactListCards
          ? clamp(moderateScale(14), 13, 16)
          : clamp(moderateScale(16), 14, 18),
      },
      uploadAction: {
        color: variantColors.uploadAccent,
        fontFamily: typeSemiBold,
        fontSize: clamp(moderateScale(17), 15, 19),
      },
    },
  };
};

export const getStaffContentActionPalette = (theme, tone) => {
  if (tone === "delete") {
    return {
      backgroundColor: theme.colors.delete,
      textColor: theme.colors.deleteText,
    };
  }

  if (tone === "published") {
    return {
      backgroundColor: theme.colors.published,
      textColor: theme.colors.white,
    };
  }

  return {
    backgroundColor: theme.colors.publish,
    textColor: theme.colors.white,
  };
};

export default createStaffContentTheme;
