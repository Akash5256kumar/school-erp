import colors from "../../../constants/colors";
import appBarTheme from "../../../constants/appBarTheme";
import spacing from "../../../constants/spacing";
import {
  typeBold,
  typeMedium,
  typeSemiBold,
  typeRegular,
} from "../../../Utils/Constant";

const SCALE = {
  avatarBorder: 4,
  avatarHeroSizeRatio: 0.34,
  avatarShadowRadius: 18,
  bannerHeightRatioLandscape: 0.22,
  bannerHeightRatioPortrait: 0.16,
  buttonHeightRatio: 0.072,
  buttonRadiusRatio: 0.14,
  cardMaxWidth: 560,
  cardRadiusRatio: 0.055,
  chevronSizeRatio: 0.06,
  contentPaddingBottomRatio: 0.1,
  contentPaddingHorizontalRatio: 0.075,
  contentPaddingTopRatio: 0.024,
  fieldHeightRatio: 0.075,
  fieldRadiusRatio: 0.085,
  fieldShadowRadius: 10,
  formTopRatio: 0.03,
  headerHeightRatioLandscape: 0.14,
  headerHeightRatioPortrait: 0.11,
  heroIconRatio: 0.34,
  horizontalInsetRatioLandscape: 0.14,
  horizontalInsetRatioPortrait: 0.055,
  iconContainerScaleFactor: 1,
  iconGlyphRatio: 0.42,
  iconContainerSizeRatio: 0.12,
  lockHeroSizeRatio: 0.23,
  minimumTouchHeight: 48,
  modalHorizontalPaddingRatio: 0.06,
  optionCardHeightRatio: 0.095,
  optionIconSizeRatio: 0.18,
  shadowOpacity: 0.12,
  shadowOffsetHeight: 10,
  subtitleSizeRatio: 0.047,
  teachingInfoIconScaleFactor: 0.72,
  textScaleFactor: 0.77,
  titleSizeRatio: 0.054,
  topCardPaddingBottomRatio: 0.07,
  topCardPaddingHorizontalRatio: 0.065,
  topCardPaddingTopRatio: 0.105,
  userNameSizeRatio: 0.052,
};

const PROFILE_COLORS = {
  actionCardBackground: colors.surface,
  actionCardShadow: "rgba(34, 26, 72, 0.18)",
  avatarBorderSurface: colors.white,
  avatarGradientEnd: "#2487FF",
  avatarGradientStart: "#27BDF4",
  cameraOptionBackground: "#EAF1FF",
  cameraOptionIconEnd: "#2148DB",
  cameraOptionIconStart: "#2F6CFF",
  chevron: "#A5AEBC",
  closeButtonEnd: "#F9000E",
  closeButtonStart: "#FF1B2A",
  disabledText: "#737B90",
  fieldBackground: colors.surface,
  fieldBorder: "#E3E6F0",
  fieldIcon: "#9AA3B5",
  fieldLabel: "#3B475C",
  fieldShadow: "rgba(35, 44, 86, 0.12)",
  fieldText: "#1F2937",
  galleryOptionBackground: "#F9EFFA",
  galleryOptionIconEnd: "#F1008D",
  galleryOptionIconStart: "#8C1EFF",
  headerGradientEnd: "#274FDE",
  headerGradientStart: "#2D66F7",
  headerText: colors.white,
  lockHeroEnd: "#FF2F32",
  lockHeroStart: "#FF6A00",
  logoutGradientEnd: "#FF1D2B",
  logoutGradientStart: "#FF3746",
  modalCancelBackground: "#EEF1F7",
  modalCancelText: "#4A5568",
  modalConfirmGradientEnd: "#2148DB",
  modalConfirmGradientStart: "#2F6CFF",
  modalOverlay: colors.overlay,
  modalSurface: colors.surface,
  optionLabel: "#253047",
  passwordGradientEnd: "#FF5A00",
  passwordGradientStart: "#FF8D18",
  placeholder: "#767C92",
  primaryActionGradientEnd: "#2554F3",
  primaryActionGradientStart: "#3575FF",
  primaryButtonEnd: "#7B29FF",
  primaryButtonShadow: "rgba(122, 41, 255, 0.24)",
  primaryButtonStart: "#B315F3",
  profileCardBackground: colors.surface,
  profileCardShadow: "rgba(29, 21, 63, 0.18)",
  screenBackground: "#F7F2FF",
  teachingGradientEnd: "#9A29F3",
  teachingGradientStart: "#A742FF",
  teachingInfoBlueEnd: "#275EF4",
  teachingInfoBlueStart: "#3C82FF",
  teachingInfoGreenEnd: "#06A76D",
  teachingInfoGreenStart: "#10BC83",
  teachingInfoPurpleEnd: "#9A21F1",
  teachingInfoPurpleStart: "#B040FF",
  teachingInfoStripeShadow: "rgba(31, 46, 102, 0.08)",
  textPrimary: "#263042",
  textSecondary: "#5E6574",
};

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const scaledFont = (value, minimum, maximum) =>
  clamp(
    value * SCALE.textScaleFactor,
    minimum * SCALE.textScaleFactor,
    maximum * SCALE.textScaleFactor
  );

export const createStaffProfileTheme = ({ height, width }) => {
  const isLandscape = width > height;
  const viewport = Math.min(width, height);
  const headerHeight = appBarTheme.layout.height;
  const contentWidth = Math.min(
    width -
      width *
        (isLandscape
          ? SCALE.horizontalInsetRatioLandscape
          : SCALE.horizontalInsetRatioPortrait),
    SCALE.cardMaxWidth
  );
  const cardRadius = contentWidth * SCALE.cardRadiusRatio;
  const iconContainerSize =
    contentWidth *
    SCALE.iconContainerSizeRatio *
    SCALE.iconContainerScaleFactor;
  const fieldHeight = clamp(height * SCALE.fieldHeightRatio, 64, 78);
  const buttonHeight = clamp(height * SCALE.buttonHeightRatio, 64, 76);
  const avatarHeroSize = clamp(viewport * SCALE.avatarHeroSizeRatio, 148, 244);
  const lockHeroSize = clamp(viewport * SCALE.lockHeroSizeRatio, 136, 192);
  const fieldRadius = fieldHeight * SCALE.fieldRadiusRatio;
  const avatarHeroActionSize = clamp(
    avatarHeroSize * 0.3 * SCALE.iconContainerScaleFactor,
    46,
    60
  );
  const optionIconSize =
    clamp(contentWidth * SCALE.optionIconSizeRatio, 72, 96) *
    SCALE.iconContainerScaleFactor;
  const teachingInfoIconSize =
    clamp(contentWidth * 0.11, 64, 84) * SCALE.teachingInfoIconScaleFactor;
  const changePasswordHeroSize = clamp(viewport * 0.22, 96, 110);
  const changePasswordFieldHeight = clamp(fieldHeight * 0.88, 56, 64);
  const changePasswordFieldRadius = changePasswordFieldHeight / 2;
  const changePasswordButtonHeight = clamp(buttonHeight * 0.9, 56, 64);

  return {
    colors: PROFILE_COLORS,
    contentWidth,
    iconContainerSize,
    isLandscape,
    radii: {
      actionCard: cardRadius,
      avatar: viewport * 0.11,
      avatarBorder: SCALE.avatarBorder,
      formField: fieldRadius,
      iconContainer: iconContainerSize * 0.3,
      imageOption: fieldRadius * 0.92,
      modal: spacing.xl,
      modalButton: clamp(buttonHeight * 0.34, 22, 26),
      primaryButton: buttonHeight * SCALE.buttonRadiusRatio,
      profileCard: cardRadius * 1.12,
    },
    screens: {
      editProfile: {
        buttonHeight: changePasswordButtonHeight,
        buttonLabelFontSize: scaledFont(width * 0.06, 20, 24),
        buttonRadius: changePasswordButtonHeight * 0.48,
        buttonTop: spacing.xxl + spacing.sm,
        fieldGap: spacing.lg,
        fieldHeight: changePasswordFieldHeight,
        fieldLabelFontSize: scaledFont(width * 0.056, 18, 22),
        fieldRadius: changePasswordFieldRadius,
        fieldValueFontSize: scaledFont(width * 0.062, 18, 22),
        formTop: spacing.lg,
        headerHeight,
        headerIconSize: appBarTheme.iconSize.back,
        headerTitleFontSize: appBarTheme.typography.title,
        heroGap: spacing.xl,
        inputTopGap: spacing.xs,
        imagePicker: {
          cardMaxWidth: Math.min(contentWidth * 0.96, 420),
          cardPadding: spacing.xl,
          cardRadius: spacing.xl + spacing.sm,
          closeButtonHeight: 42,
          closeButtonRadius: 21,
          closeButtonTitleSize: 15,
          closeButtonTop: spacing.lg + spacing.xs,
          iconBorderRadius: 16,
          iconSize: 46,
          iconSymbolSize: 22,
          labelGap: spacing.md,
          optionHeight: 80,
          optionLabelSize: 15,
          optionListTop: spacing.lg,
          optionRadius: 18,
          optionsGap: spacing.md,
          overlayHorizontal: Math.max(width * 0.08, 24),
          titleSize: 16,
        },
      },
      changePassword: {
        backgroundGradientEnd: "#FDF2F8",
        backgroundGradientMiddle: "#F5F0FF",
        backgroundGradientStart: "#EEF2FF",
        buttonGradientEnd: "#7C3AED",
        buttonGradientStart: "#9333EA",
        buttonHeight: changePasswordButtonHeight,
        buttonLabelFontSize: scaledFont(width * 0.06, 20, 24),
        buttonRadius: changePasswordButtonHeight * 0.48,
        buttonTop: spacing.xxl + spacing.sm,
        eyeIconSize: contentWidth * SCALE.chevronSizeRatio,
        fieldGap: spacing.lg,
        fieldHeight: changePasswordFieldHeight,
        fieldLabelFontSize: scaledFont(width * 0.056, 18, 22),
        fieldRadius: changePasswordFieldRadius,
        fieldValueFontSize: scaledFont(width * 0.062, 18, 22),
        formTop: spacing.lg,
        headerGradientEnd: "#1D4ED8",
        headerGradientStart: "#2563EB",
        headerHeight,
        headerIconSize: appBarTheme.iconSize.back,
        headerTitleFontSize: appBarTheme.typography.title,
        heroGap: spacing.xl,
        heroIconSize: clamp(changePasswordHeroSize * 0.46, 40, 52),
        heroSize: changePasswordHeroSize,
        inputTopGap: spacing.xs,
      },
    },
    shadows: {
      actionCard: {
        elevation: 8,
        shadowColor: PROFILE_COLORS.actionCardShadow,
        shadowOffset: {
          width: 0,
          height: SCALE.shadowOffsetHeight,
        },
        shadowOpacity: SCALE.shadowOpacity,
        shadowRadius: SCALE.avatarShadowRadius,
      },
      hero: {
        elevation: 10,
        shadowColor: PROFILE_COLORS.profileCardShadow,
        shadowOffset: {
          width: 0,
          height: SCALE.shadowOffsetHeight,
        },
        shadowOpacity: SCALE.shadowOpacity,
        shadowRadius: SCALE.avatarShadowRadius,
      },
      inputField: {
        elevation: 4,
        shadowColor: PROFILE_COLORS.fieldShadow,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.9,
        shadowRadius: SCALE.fieldShadowRadius,
      },
      primaryButton: {
        elevation: 8,
        shadowColor: PROFILE_COLORS.primaryButtonShadow,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 18,
      },
      profileCard: {
        elevation: 10,
        shadowColor: PROFILE_COLORS.profileCardShadow,
        shadowOffset: {
          width: 0,
          height: SCALE.shadowOffsetHeight,
        },
        shadowOpacity: SCALE.shadowOpacity,
        shadowRadius: SCALE.avatarShadowRadius,
      },
      modalPrimaryButton: {
        elevation: 8,
        shadowColor: PROFILE_COLORS.primaryButtonShadow,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 18,
      },
    },
    sizing: {
      avatarHeroActionIconSize: avatarHeroActionSize * SCALE.iconGlyphRatio,
      avatarHeroActionSize,
      avatarHeroSize,
      avatarSize: viewport * 0.22,
      bannerHeight: clamp(
        height *
          (isLandscape
            ? SCALE.bannerHeightRatioLandscape
            : SCALE.bannerHeightRatioPortrait),
        96,
        136
      ),
      chevronSize: contentWidth * SCALE.chevronSizeRatio,
      fieldHeight,
      formMaxWidth: contentWidth,
      headerHeight,
      heroBorderWidth: spacing.xs - 2,
      heroOverlayBorderWidth: spacing.xs - 3,
      iconCircleIconSize: clamp(lockHeroSize * SCALE.heroIconRatio, 28, 44),
      iconGlyphRatio: SCALE.iconGlyphRatio,
      lockHeroSize,
      maxWidth: contentWidth,
      modalButtonHeight: clamp(height * 0.062, 48, 54),
      modalMaxWidth: Math.min(contentWidth * 0.96, 520),
      minimumTouchHeight: SCALE.minimumTouchHeight,
      optionCardHeight: clamp(height * SCALE.optionCardHeightRatio, 92, 122),
      optionIconSize,
      optionIconSymbolSize: optionIconSize * SCALE.iconGlyphRatio,
      primaryButtonHeight: buttonHeight,
      scrollMinHeight: Math.max(height - headerHeight, 0),
      teachingCardStripeHeight: clamp(height * 0.012, 12, 18),
      teachingInfoIconSize,
      teachingInfoSymbolSize: teachingInfoIconSize * SCALE.iconGlyphRatio,
      topCardPaddingBottom: height * SCALE.topCardPaddingBottomRatio,
      topCardPaddingHorizontal:
        contentWidth * SCALE.topCardPaddingHorizontalRatio,
      topCardPaddingTop: height * SCALE.topCardPaddingTopRatio,
    },
    spacing: {
      actionGap: spacing.md,
      actionIconGap: spacing.md,
      buttonTop: spacing.xxl + spacing.sm,
      contentBottom: Math.max(
        height * SCALE.contentPaddingBottomRatio,
        spacing.xxl
      ),
      contentHorizontal: width * SCALE.contentPaddingHorizontalRatio,
      contentTop: height * SCALE.contentPaddingTopRatio,
      fieldGap: spacing.lg,
      formBottom: Math.max(
        height * SCALE.contentPaddingBottomRatio,
        spacing.xxl
      ),
      formTop: Math.max(height * SCALE.formTopRatio, spacing.lg),
      headerBackGap: spacing.md,
      headerHorizontal: spacing.lg,
      heroSectionGap: spacing.xl + spacing.sm,
      heroOverlayOffset: -(spacing.xs / 2),
      labelGap: spacing.sm,
      listGap: spacing.md,
      modalButtonGap: spacing.sm,
      modalCardPadding: spacing.xl,
      modalDescriptionGap: spacing.md,
      modalOptionGap: spacing.lg,
      modalOverlayHorizontal: width * SCALE.modalHorizontalPaddingRatio,
      modalPadding: spacing.lg,
      modalTitleGap: spacing.xl,
      optionContentGap: spacing.lg,
      profileMetaGap: spacing.xs,
      sectionGap: spacing.xl,
      teachingCardGap: spacing.xl + spacing.xs,
      teachingCardHorizontal: spacing.xl,
      teachingCardTopInset: spacing.xxl + spacing.sm,
      teachingPairGap: spacing.lg,
      teachingRowGap: spacing.lg,
      teachingValueGap: spacing.xs,
      topCardGap: spacing.lg,
    },
    typography: {
      actionLabel: {
        color: PROFILE_COLORS.textPrimary,
        fontFamily: typeSemiBold,
        fontSize: scaledFont(width * SCALE.titleSizeRatio, 16, 20),
      },
      buttonLabel: {
        color: PROFILE_COLORS.headerText,
        fontFamily: typeBold,
        fontSize: scaledFont(width * 0.06, 20, 24),
      },
      fieldLabel: {
        color: PROFILE_COLORS.fieldLabel,
        fontFamily: typeBold,
        fontSize: scaledFont(width * 0.056, 18, 22),
      },
      fieldValue: {
        color: PROFILE_COLORS.fieldText,
        fontFamily: typeRegular,
        fontSize: scaledFont(width * 0.062, 18, 22),
      },
      headerTitle: {
        color: PROFILE_COLORS.headerText,
        fontFamily: appBarTheme.fontFamily.title,
        fontSize: appBarTheme.typography.title,
      },
      modalAction: {
        fontFamily: typeBold,
        fontSize: scaledFont(width * 0.042, 14, 17),
      },
      modalDescription: {
        color: PROFILE_COLORS.textSecondary,
        fontFamily: typeRegular,
        fontSize: scaledFont(width * 0.044, 14, 17),
      },
      modalTitle: {
        color: PROFILE_COLORS.textPrimary,
        fontFamily: typeBold,
        fontSize: scaledFont(width * 0.058, 18, 22),
      },
      optionLabel: {
        color: PROFILE_COLORS.optionLabel,
        fontFamily: typeSemiBold,
        fontSize: scaledFont(width * 0.06, 18, 22),
      },
      optionTitle: {
        color: PROFILE_COLORS.textPrimary,
        fontFamily: typeBold,
        fontSize: scaledFont(width * 0.075, 22, 28),
      },
      profileName: {
        color: PROFILE_COLORS.textPrimary,
        fontFamily: typeBold,
        fontSize: scaledFont(width * SCALE.userNameSizeRatio, 18, 28),
      },
      profileSubtitle: {
        color: PROFILE_COLORS.textSecondary,
        fontFamily: typeMedium,
        fontSize: scaledFont(width * SCALE.subtitleSizeRatio, 14, 19),
      },
    },
  };
};

export default createStaffProfileTheme;
