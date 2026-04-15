import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ChevronRight} from 'lucide-react-native';

const ProfileActionCard = ({
  action,
  onPress,
  theme,
}) => {
  const Icon = action.Icon;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.actionCardBackground,
          borderRadius: theme.radii.actionCard,
          maxWidth: theme.sizing.maxWidth,
          minHeight: Math.max(
            theme.iconContainerSize + theme.spacing.actionGap,
            theme.sizing.minimumTouchHeight,
          ),
          paddingHorizontal: theme.spacing.contentHorizontal * 0.6,
          paddingVertical: theme.spacing.labelGap,
        },
        theme.shadows.actionCard,
      ]}>
      <LinearGradient
        colors={action.gradient}
        end={{x: 1, y: 1}}
        start={{x: 0, y: 0}}
        style={[
          styles.leadingIcon,
          {
            borderRadius: theme.radii.iconContainer,
            height: theme.iconContainerSize,
            marginRight: theme.spacing.actionIconGap,
            width: theme.iconContainerSize,
          },
        ]}>
        <Icon
          color={theme.colors.headerText}
          size={theme.iconContainerSize * theme.sizing.iconGlyphRatio}
          strokeWidth={2.2}
        />
      </LinearGradient>

      <Text numberOfLines={1} style={[styles.label, theme.typography.actionLabel]}>
        {action.label}
      </Text>

      <View style={styles.chevronWrapper}>
        <ChevronRight
          color={theme.colors.chevron}
          size={theme.sizing.chevronSize}
          strokeWidth={2.1}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  chevronWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    flexShrink: 1,
  },
  leadingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ProfileActionCard);
