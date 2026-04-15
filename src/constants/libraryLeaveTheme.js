import { Platform } from "react-native";

import colors from "./colors";
import * as constant from "../Utils/Constant";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const buildHorizontalScale = (width) =>
  clamp(Math.min(width, BASE_WIDTH * 1.3) / BASE_WIDTH, 0.88, 1.22);

const buildVerticalScale = (height) =>
  clamp(Math.min(height, BASE_HEIGHT * 1.2) / BASE_HEIGHT, 0.84, 1.16);

export const createLibraryLeaveTheme = ({ width, height }) => {
  const horizontalScale = buildHorizontalScale(width);
  const verticalScale = buildVerticalScale(height);
  const scale = (value) => Math.round(value * horizontalScale);
  const vertical = (value) => Math.round(value * verticalScale);
  const moderate = (value, factor = 0.5) =>
    Math.round(value + (scale(value) - value) * factor);

  const palette = {
    headerGradient: ["#C100FF", "#5B39F6"],
    pageGradient: ["#F5F4FF", "#F5F4FF", "#F8FAFC"],
    pageBase: "#F5F4FF",
    surface: colors.surface,
    surfaceRaised: "#FFFFFF",
    surfaceMutedBlue: "#EDE9FF", // Subtle purple instead of blue
    surfaceMutedPurple: "#F5F3FF", // Subtle very light purple
    textStrong: "#1E1B4B",
    textBody: "#595975",
    textMuted: "#9CA3AF",
    primaryBlue: "#5B39F6", // Repurposed primary to our new unified Purple
    primaryBlueDark: "#4527D6",
    primaryPurple: "#C100FF",
    primaryGreen: "#08A744",
    primaryRed: "#f15270",
    divider: "#EDE9FF",
    headerText: colors.white,
    shadow: "rgba(94, 59, 249, 0.15)", // Premium purple-tinted soft shadow
    badgeDangerBg: "#FFE4E6",
    badgeDangerText: "#E11D48",
    badgeSuccessBg: "#DCFCE7",
    badgeSuccessText: "#166534",
    badgePendingBg: "#FEF3C7",
    badgePendingText: "#B45309",
    link: "#5B39F6",
    attachmentBg: "#EDE9FF",
    attachmentBadgeBg: colors.white,
  };

  return {
    isCompactWidth: width < 360,
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
      formRowVertical: vertical(16),
      leaveFormRowVertical: vertical(14),
      leaveFormTop: vertical(14),
      leaveFormButtonTop: vertical(20),
      leaveFormButtonBottom: vertical(22),
      headerTop: Platform.OS === "ios" ? vertical(8) : vertical(12),
      headerBottom: vertical(22),
      headerHorizontal: scale(22),
      iconGap: scale(12),
      textGap: vertical(6),
      leaveFormTextGap: vertical(4),
      listBottom: vertical(24),
      floatingInset: scale(18),
      floatingBottomOffset: vertical(88),
      dividerInset: scale(92),
      statGap: scale(12),
      leaveSummaryTop: vertical(14),
      leaveListTop: vertical(18),
      leaveSummaryPaddingVertical: vertical(12),
      leaveSummaryLabelTop: vertical(8),
      leaveHeaderGap: vertical(8),
      leaveMetaGap: vertical(6),
      leaveFooterGap: vertical(6),
      leaveBadgeHorizontal: scale(10),
    },
    radii: {
      card: scale(18),
      pill: scale(22),
      button: scale(22),
      iconWrap: scale(14),
      statCard: scale(22),
      sheet: scale(28),
      input: scale(22),
      attachment: scale(20),
    },
    sizes: {
      headerIcon: scale(31),
      headerButton: scale(40),
      tabHeight: vertical(44),
      iconBadge: scale(28),
      listGlyphWrap: scale(52),
      floatingButton: scale(74),
      floatingIcon: scale(22),
      statCardHeight: vertical(128),
      statusBadgeHeight: vertical(34),
      statusBadgeMinWidth: scale(78),
      arrowIcon: scale(20),
      formIconWrap: scale(52),
      attachmentPreview: scale(76),
      attachmentAddBadge: scale(30),
      detailRemarkHeight: vertical(126),
      primaryButtonHeight: vertical(60),
    },
    typography: {
      header: moderate(32, 0.45),
      sectionTitle: moderate(22, 0.4),
      tabLabel: moderate(15, 0.24),
      cardTitle: moderate(16, 0.24),
      body: moderate(14, 0.18),
      caption: moderate(12, 0.16),
      statValue: moderate(22, 0.34),
      statLabel: moderate(13, 0.24),
      detailLabel: moderate(18, 0.34),
      detailValue: moderate(18, 0.28),
      formLabel: moderate(15, 0.2),
      formValue: moderate(14, 0.18),
      button: moderate(16, 0.22),
      status: moderate(13, 0.22),
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
        shadowRadius: 20,
      },
      pill: {
        elevation: 6,
        shadowColor: palette.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      floating: {
        elevation: 14,
        shadowColor: palette.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
    },
  };
};

export const getLeaveStatusAppearance = (theme, status) => {
  switch ((status || "").toLowerCase()) {
    case "approved":
      return {
        backgroundColor: theme.palette.badgeSuccessBg,
        color: theme.palette.badgeSuccessText,
      };
    case "cancelled":
    case "canceled":
      return {
        backgroundColor: theme.palette.badgeDangerBg,
        color: theme.palette.badgeDangerText,
      };
    default:
      return {
        backgroundColor: theme.palette.badgePendingBg,
        color: theme.palette.badgePendingText,
      };
  }
};
