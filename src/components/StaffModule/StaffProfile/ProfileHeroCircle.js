import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileHeroCircle = ({
  Icon,
  iconSize,
  imageUri,
  onOverlayPress,
  overlayColors,
  OverlayIcon,
  overlayIconSize,
  size,
  theme,
}) => (
  <View
    style={[
      styles.wrapper,
      {
        height: size,
        width: size,
      },
    ]}>
    <LinearGradient
      colors={[
        theme.colors.avatarGradientStart,
        theme.colors.avatarGradientEnd,
      ]}
      end={{x: 1, y: 1}}
      start={{x: 0, y: 0}}
      style={[
        styles.heroCircle,
        {
          borderColor: theme.colors.avatarBorderSurface,
          borderRadius: size / 2,
          borderWidth: theme.sizing.heroBorderWidth,
          height: size,
          width: size,
        },
        theme.shadows.hero,
      ]}>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={[styles.heroImage, {borderRadius: size / 2}]} />
      ) : null}

      {!imageUri && Icon ? (
        <Icon
          color={theme.colors.headerText}
          size={iconSize}
          strokeWidth={2.6}
        />
      ) : null}
    </LinearGradient>

    {OverlayIcon && onOverlayPress ? (
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.88}
        onPress={onOverlayPress}
        style={[
          styles.overlayButton,
          {
            borderRadius: theme.sizing.avatarHeroActionSize / 2,
            bottom: theme.spacing.heroOverlayOffset,
            height: theme.sizing.avatarHeroActionSize,
            right: theme.spacing.heroOverlayOffset,
            width: theme.sizing.avatarHeroActionSize,
          },
        ]}>
        <LinearGradient
          colors={overlayColors}
          end={{x: 1, y: 1}}
          start={{x: 0, y: 0}}
          style={[
            styles.overlayGradient,
            {
              borderColor: theme.colors.avatarBorderSurface,
              borderRadius: theme.sizing.avatarHeroActionSize / 2,
              borderWidth: theme.sizing.heroOverlayBorderWidth,
            },
          ]}>
          <OverlayIcon
            color={theme.colors.headerText}
            size={overlayIconSize}
            strokeWidth={2.4}
          />
        </LinearGradient>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  heroCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    height: '100%',
    width: '100%',
  },
  overlayButton: {
    overflow: 'hidden',
    position: 'absolute',
  },
  overlayGradient: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ProfileHeroCircle);
