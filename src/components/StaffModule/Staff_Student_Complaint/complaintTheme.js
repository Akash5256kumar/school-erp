import {Platform} from 'react-native';

import appBarTheme from '../../../constants/appBarTheme';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import {
  typeBold,
  typeMedium,
  typeRegular,
  typeSemiBold,
} from '../../../Utils/Constant';

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const scaleText = value => value * 0.9;
const scaleHeaderText = value => value * 0.7;
const scalePopupHeaderText = value => value * 0.7;

const COMPLAINT_COLORS = {
  accentHeaderEnd: '#7C3AED',
  accentHeaderStart: '#5E3BF9',
  approvedBadgeBackground: '#D1FAE5',
  approvedBadgeBorder: '#10B981',
  approvedBadgeText: '#065F46',
  backgroundGradientEnd: '#F4F2FF',
  backgroundGradientMiddle: '#F5F3FF',
  backgroundGradientStart: '#F8F7FF',
  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(94, 59, 249, 0.12)',
  fabBackground: '#5E3BF9',
  fabRing: '#FFFFFF',
  fabShadow: 'rgba(94, 59, 249, 0.28)',
  fieldBackground: '#FFFFFF',
  fieldBorder: '#E0D9FF',
  fieldIcon: '#9CA3AF',
  fieldPlaceholder: '#9CA3AF',
  fieldText: '#1E1B4B',
  headerTextSubtle: 'rgba(255,255,255,0.85)',
  infoPanelBackground: '#FAFAFE',
  infoPanelBorder: '#EDE9FF',
  modalOverlay: 'rgba(0, 0, 0, 0.42)',
  pendingBadgeBackground: '#FEF3C7',
  pendingBadgeBorder: '#FDE68A',
  pendingBadgeText: '#92400E',
  primaryButtonEnd: '#7C3AED',
  primaryButtonShadow: 'rgba(94, 59, 249, 0.24)',
  primaryButtonStart: '#5E3BF9',
  textDate: '#9CA3AF',
  textPrimary: '#1E1B4B',
  textSecondary: '#6B7280',
  whiteText: '#FFFFFF',
};

export const createComplaintTheme = ({height, width}) => {
  const viewport = Math.min(height, width);
  const screenHorizontal = clamp(width * 0.05, 20, 28);
  const contentWidth = Math.min(width - screenHorizontal * 2, 560);
  const cardRadius = clamp(contentWidth * 0.064, 24, 34);
  const fieldHeight = clamp(height * 0.066, 52, 58);
  const buttonHeight = clamp(height * 0.071, 54, 60);
  const headerHeight = appBarTheme.layout.height;
  const fabSize = clamp(viewport * 0.16, 72, 84);
  const infoPanelMinHeight = clamp(height * 0.098, 96, 132);

  return {
    colors: COMPLAINT_COLORS,
    spacing: {
      screenHorizontal,
      screenTop: spacing.lg + spacing.xs,
      cardGap: spacing.xl,
      cardBodyHorizontal: clamp(contentWidth * 0.07, 20, 36),
      cardBodyVertical: clamp(height * 0.032, 28, 40),
      cardHeaderHorizontal: clamp(contentWidth * 0.07, 20, 36),
      cardHeaderVertical: clamp(height * 0.008, 6, 9),
      cardSectionTop: spacing.lg,
      cardStatusTop: spacing.xs + spacing.xxs,
      contentBottom: clamp(height * 0.12, 88, 128),
      buttonBottom: clamp(height * 0.022, 18, 24),
      fieldGap: spacing.md + spacing.xxs,
      fieldInternalHorizontal: clamp(width * 0.038, 16, 20),
      fieldLabelBottom: spacing.xs + spacing.xxs,
      formButtonTop: spacing.lg,
      inlineGap: spacing.sm,
      infoPanelHorizontal: clamp(contentWidth * 0.05, 16, 28),
      infoPanelVertical: clamp(height * 0.018, 16, 22),
      modalCloseGap: spacing.xs,
      optionMenuTop: spacing.sm,
      optionPaddingHorizontal: spacing.md + spacing.xxs,
      optionPaddingVertical: spacing.sm + spacing.xxs,
      sectionTitleGap: spacing.xs + spacing.xxs,
      textareaPaddingTop: clamp(height * 0.016, 12, 16),
    },
    radii: {
      badge: clamp(height * 0.024, 16, 22),
      button: buttonHeight / 2,
      card: cardRadius,
      fab: fabSize / 2,
      field: fieldHeight / 2,
      infoPanel: clamp(cardRadius * 0.82, 18, 24),
      modal: clamp(cardRadius * 1.08, 24, 36),
    },
    shadows: {
      card: {
        elevation: 8,
        shadowColor: COMPLAINT_COLORS.cardShadow,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.16 : 0.2,
        shadowRadius: 18,
      },
      header: {
        elevation: 10,
        shadowColor: COMPLAINT_COLORS.cardShadow,
        shadowOffset: {
          width: 0,
          height: clamp(height * 0.012, 8, 14),
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.14 : 0.18,
        shadowRadius: 18,
      },
      button: {
        elevation: 10,
        shadowColor: COMPLAINT_COLORS.primaryButtonShadow,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.18 : 0.22,
        shadowRadius: 18,
      },
      fab: {
        elevation: 12,
        shadowColor: COMPLAINT_COLORS.fabShadow,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.24 : 0.28,
        shadowRadius: 18,
      },
      input: {
        elevation: 3,
        shadowColor: 'rgba(57, 67, 93, 0.08)',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.12,
        shadowRadius: 10,
      },
    },
    sizing: {
      badgeHeight: clamp(height * 0.034, 32, 38),
      badgeMinWidth: clamp(width * 0.2, 88, 118),
      buttonHeight: clamp(height * 0.069, 56, 60),
      dropdownIcon: clamp(width * 0.054, 22, 28),
      fabBorderWidth: clamp(viewport * 0.012, 4, 6),
      fabIcon: clamp(fabSize * 0.34, 22, 30),
      fabSize,
      fieldHeight,
      headerHeight,
      headerIcon: appBarTheme.iconSize.back,
      infoPanelMinHeight,
      modalCloseIcon: clamp(width * 0.045, 18, 24),
      modalMaxWidth: Math.min(contentWidth, 560),
      modalMaxHeight: clamp(height * 0.78, 480, 760),
      statusHorizontalPadding: clamp(width * 0.032, 14, 18),
      statusVerticalPadding: clamp(height * 0.004, 2, 4),
      textareaHeight: clamp(height * 0.16, 132, 156),
    },
    typography: {
      badge: {
        color: COMPLAINT_COLORS.pendingBadgeText,
        fontFamily: typeSemiBold,
        fontSize: scaleText(clamp(width * 0.041, 13.5, 16)),
      },
      body: {
        color: COMPLAINT_COLORS.textSecondary,
        fontFamily: typeRegular,
        fontSize: scaleText(clamp(width * 0.048, 16.5, 19)),
        lineHeight: scaleText(clamp(width * 0.071, 25, 31)),
      },
      buttonLabel: {
        color: COMPLAINT_COLORS.whiteText,
        fontFamily: typeBold,
        fontSize: scaleText(clamp(width * 0.054, 17, 20)),
      },
      cardTitle: {
        color: COMPLAINT_COLORS.whiteText,
        fontFamily: typeBold,
        fontSize: scaleHeaderText(scaleText(clamp(width * 0.056, 18, 22))),
        lineHeight: scaleHeaderText(scaleText(clamp(width * 0.073, 24, 30))),
      },
      date: {
        color: COMPLAINT_COLORS.whiteText,
        fontFamily: typeMedium,
        fontSize: scaleHeaderText(scaleText(clamp(width * 0.044, 14.5, 17))),
      },
      fieldLabel: {
        color: COMPLAINT_COLORS.textPrimary,
        fontFamily: typeBold,
        fontSize: scaleText(clamp(width * 0.048, 16, 19)),
      },
      fieldValue: {
        color: COMPLAINT_COLORS.fieldText,
        fontFamily: typeRegular,
        fontSize: scaleText(clamp(width * 0.05, 16, 18.5)),
      },
      headerTitle: {
        color: COMPLAINT_COLORS.whiteText,
        fontFamily: appBarTheme.fontFamily.title,
        fontSize: appBarTheme.typography.title,
      },
      modalHeaderTitle: {
        color: COMPLAINT_COLORS.whiteText,
        fontFamily: typeBold,
        fontSize: scalePopupHeaderText(
          scaleHeaderText(scaleText(clamp(width * 0.061, 20, 29))),
        ),
        lineHeight: scalePopupHeaderText(
          scaleHeaderText(scaleText(clamp(width * 0.081, 28, 36))),
        ),
      },
      modalDate: {
        color: COMPLAINT_COLORS.whiteText,
        fontFamily: typeRegular,
        fontSize: scalePopupHeaderText(
          scaleHeaderText(scaleText(clamp(width * 0.047, 15.5, 19))),
        ),
      },
      modalSection: {
        color: COMPLAINT_COLORS.headerTextSubtle,
        fontFamily: typeBold,
        fontSize: scaleHeaderText(scaleText(clamp(width * 0.056, 18, 22))),
        lineHeight: scaleHeaderText(scaleText(clamp(width * 0.073, 24, 30))),
      },
      sectionTitle: {
        color: COMPLAINT_COLORS.textPrimary,
        fontFamily: typeBold,
        fontSize: scaleText(clamp(width * 0.054, 17, 20)),
        lineHeight: scaleText(clamp(width * 0.069, 23, 27)),
      },
    },
  };
};

export const getComplaintStatusPalette = status => {
  const normalizedStatus = String(status || '').toLowerCase();

  if (normalizedStatus === 'approved') {
    return {
      backgroundColor: COMPLAINT_COLORS.approvedBadgeBackground,
      borderColor: COMPLAINT_COLORS.approvedBadgeBorder,
      textColor: COMPLAINT_COLORS.approvedBadgeText,
    };
  }

  return {
    backgroundColor: COMPLAINT_COLORS.pendingBadgeBackground,
    borderColor: COMPLAINT_COLORS.pendingBadgeBorder,
    textColor: COMPLAINT_COLORS.pendingBadgeText,
  };
};
