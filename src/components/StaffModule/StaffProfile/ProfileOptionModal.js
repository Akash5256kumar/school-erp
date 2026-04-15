import React, {memo} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileOptionModal = ({
  closeLabel,
  modalTheme,
  onClose,
  options,
  theme,
  title,
  visible,
}) => {
  const popupTheme = modalTheme || {};
  const cardRadius = popupTheme.cardRadius || theme.radii.modal;
  const cardPadding = popupTheme.cardPadding || theme.spacing.modalCardPadding;
  const cardMaxWidth =
    popupTheme.cardMaxWidth || theme.sizing.formMaxWidth + theme.spacing.labelGap;
  const optionRadius = popupTheme.optionRadius || theme.radii.imageOption;
  const optionHeight = popupTheme.optionHeight || theme.sizing.optionCardHeight;
  const optionIconSize = popupTheme.iconSize || theme.sizing.optionIconSize;
  const optionIconSymbolSize =
    popupTheme.iconSymbolSize || theme.sizing.optionIconSymbolSize;
  const optionGap = popupTheme.optionsGap || theme.spacing.modalOptionGap;
  const optionListTop = popupTheme.optionListTop || theme.spacing.heroSectionGap;
  const labelGap = popupTheme.labelGap || theme.spacing.optionContentGap;
  const titleSize = popupTheme.titleSize;
  const optionLabelSize = popupTheme.optionLabelSize;
  const closeButtonRadius = popupTheme.closeButtonRadius || theme.radii.primaryButton;
  const closeButtonHeight =
    popupTheme.closeButtonHeight || theme.sizing.primaryButtonHeight;
  const closeButtonTop = popupTheme.closeButtonTop || theme.spacing.heroSectionGap;
  const closeButtonTitleSize = popupTheme.closeButtonTitleSize;
  const overlayHorizontal =
    popupTheme.overlayHorizontal || theme.spacing.modalOverlayHorizontal;
  const iconBorderRadius = popupTheme.iconBorderRadius || optionRadius * 0.62;

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}>
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: theme.colors.modalOverlay,
            paddingHorizontal: overlayHorizontal,
          },
        ]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.modalSurface,
              borderRadius: cardRadius,
              maxWidth: cardMaxWidth,
              padding: cardPadding,
            },
            theme.shadows.actionCard,
          ]}>
          <Text
            style={[
              styles.title,
              theme.typography.optionTitle,
              titleSize && {
                fontSize: titleSize,
              },
            ]}>
            {title}
          </Text>

          <View
            style={[
              styles.optionList,
              {
                gap: optionGap,
                marginTop: optionListTop,
              },
            ]}>
            {options.map(option => {
              const OptionIcon = option.Icon;

              return (
                <TouchableOpacity
                  accessibilityRole="button"
                  activeOpacity={0.9}
                  key={option.key}
                  onPress={option.onPress}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: option.backgroundColor,
                      borderRadius: optionRadius,
                      minHeight: optionHeight,
                      paddingHorizontal: theme.spacing.headerHorizontal,
                    },
                  ]}>
                  <LinearGradient
                    colors={option.iconGradient}
                    end={{x: 1, y: 1}}
                    start={{x: 0, y: 0}}
                    style={[
                      styles.optionIcon,
                      {
                        borderRadius: iconBorderRadius,
                        height: optionIconSize,
                        width: optionIconSize,
                      },
                    ]}>
                    <OptionIcon
                      color={theme.colors.headerText}
                      size={optionIconSymbolSize}
                      strokeWidth={2.4}
                    />
                  </LinearGradient>

                  <Text
                    style={[
                      styles.optionLabel,
                      theme.typography.optionLabel,
                      {
                        marginLeft: labelGap,
                      },
                      optionLabelSize && {
                        fontSize: optionLabelSize,
                      },
                    ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.9}
            onPress={onClose}
            style={[
              styles.closeButton,
              {
                borderRadius: closeButtonRadius,
                marginTop: closeButtonTop,
              },
              theme.shadows.primaryButton,
            ]}>
            <LinearGradient
              colors={[
                theme.colors.closeButtonStart,
                theme.colors.closeButtonEnd,
              ]}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={[
                styles.closeGradient,
                {
                  borderRadius: closeButtonRadius,
                  height: closeButtonHeight,
                },
              ]}>
              <Text
                style={[
                  theme.typography.buttonLabel,
                  closeButtonTitleSize && {
                    fontSize: closeButtonTitleSize,
                  },
                ]}>
                {closeLabel}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  closeButton: {
    overflow: 'hidden',
    width: '100%',
  },
  closeGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  optionCard: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  optionIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    flex: 1,
  },
  optionList: {
    width: '100%',
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});

export default memo(ProfileOptionModal);
