import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowRight, BookOpen, Calendar, Plus} from 'lucide-react-native';

import AppButton from '../../common/AppButton';
import {Icons, typeSemiBold, typeRegular, typeMedium, typeBold} from '../../../Utils/Constant';
import {getStaffContentActionPalette} from './staffContentTheme';

// ─── Surface card (generic container) ────────────────────────────────────────
export const StaffContentSurfaceCard = ({children, style, theme}) => (
  <View
    style={[
      styles.surfaceCard,
      {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.card,
        paddingHorizontal: theme.spacing.cardHorizontal,
        paddingVertical: theme.spacing.cardVertical,
      },
      theme.shadows.card,
      style,
    ]}>
    {children}
  </View>
);

// ─── Primary gradient button ──────────────────────────────────────────────────
export const StaffContentPrimaryButton = ({colors, onPress, style, theme, title}) => (
  <AppButton
    colors={colors || theme.gradients.primaryAction}
    onPress={onPress}
    style={[
      {
        borderRadius: theme.radius.button,
        minHeight: theme.layout.buttonHeight,
      },
      theme.shadows.primaryButton,
      style,
    ]}
    textStyle={theme.typography.primaryButtonLabel}
    title={title}
  />
);

// ─── Empty state ──────────────────────────────────────────────────────────────
export const StaffContentEmptyState = ({actionLabel, description, onActionPress, theme, title}) => (
  <StaffContentSurfaceCard
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.emptyTop,
      minHeight: theme.layout.emptyCardMinHeight,
    }}
    theme={theme}>
    <View
      style={[
        styles.iconSurface,
        {
          backgroundColor: theme.colors.accentSoft,
          borderRadius: theme.layout.fabSize / 2,
          height: theme.layout.fabSize,
          width: theme.layout.fabSize,
        },
      ]}>
      <BookOpen
        color={theme.colors.accent}
        size={theme.layout.fabSize * 0.36}
        strokeWidth={2.3}
      />
    </View>
    <Text style={[theme.typography.emptyTitle, styles.emptyTitle]}>{title}</Text>
    <Text style={[theme.typography.emptyDescription, styles.emptyDescription, {maxWidth: '78%'}]}>
      {description}
    </Text>
    <StaffContentPrimaryButton
      colors={theme.gradients.emptyAction}
      onPress={onActionPress}
      style={{
        minHeight: theme.layout.listActionHeight + theme.spacing.fieldLabelGap,
        minWidth: theme.layout.contentMaxWidth * 0.44,
      }}
      theme={theme}
      title={actionLabel}
    />
  </StaffContentSurfaceCard>
);

// ─── Modern list card (reference-style) ──────────────────────────────────────
export const StaffContentListCard = ({
  actions = [],
  actionsLayout = 'inline',
  density = 'regular',
  metaLabel,
  metaValue,
  onPress,
  theme,
  title,
  topRightText,
}) => {
  const Container = onPress ? Pressable : View;
  const containerStyle = onPress
    ? ({pressed}) => [styles.cardPressable, {opacity: pressed ? 0.97 : 1, transform: [{scale: pressed ? 0.99 : 1}]}]
    : undefined;

  // Derive a short category label from metaLabel for the pill badge
  const badgeLabel = metaLabel || '';

  return (
    <Container
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={containerStyle}>
      <View
        style={[
          styles.modernCard,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.card,
            marginBottom: theme.spacing.cardGap,
          },
          theme.shadows.card,
        ]}>

        {/* Top accent line */}
        <View style={[styles.topAccentLine, {backgroundColor: theme.colors.accent}]} />

        <View style={styles.cardInner}>
          {/* Row 1: badge pill + date */}
          <View style={styles.badgeDateRow}>
            {badgeLabel ? (
              <View style={[styles.badgePill, {backgroundColor: theme.colors.accentSoft}]}>
                <Text style={[styles.badgePillText, {color: theme.colors.accent}]}>
                  {badgeLabel}
                </Text>
              </View>
            ) : null}
            {topRightText ? (
              <View style={styles.dateChip}>
                <Calendar color="#9CA3AF" size={11} strokeWidth={2} />
                <Text style={styles.dateChipText}>{topRightText}</Text>
              </View>
            ) : null}
          </View>

          {/* Row 2: title */}
          <Text
            numberOfLines={2}
            style={[styles.cardTitle, {color: theme.colors.title || '#1E1B4B'}]}>
            {title}
          </Text>

          {/* Row 3: meta value chip */}
          {metaValue ? (
            <View style={styles.metaChipRow}>
              <View style={[styles.metaChip, {backgroundColor: theme.colors.surfaceMuted || '#F5F7FB'}]}>
                <Text style={[styles.metaChipText, {color: theme.colors.metaValue || '#536178'}]}>
                  {metaValue}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Divider */}
          <View style={[styles.divider, {backgroundColor: theme.colors.softDivider || '#EEF1F5'}]} />

          {/* Row 4: actions + view arrow */}
          <View style={styles.footerRow}>
            <View style={styles.actionsGroup}>
              {actions.map(action => (
                <ModernActionButton action={action} key={action.label} theme={theme} />
              ))}
            </View>
            {onPress ? (
              <View style={[styles.viewArrow, {backgroundColor: theme.colors.accentSoft}]}>
                <ArrowRight color={theme.colors.accent} size={14} strokeWidth={2.5} />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Container>
  );
};

// ─── Modern pill action button ────────────────────────────────────────────────
const ModernActionButton = ({action, theme}) => {
  const palette = getStaffContentActionPalette(theme, action.tone);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={action.disabled}
      onPress={action.onPress}
      style={({pressed}) => [
        styles.modernActionBtn,
        {
          backgroundColor: palette.backgroundColor,
          borderRadius: 999,
          opacity: action.disabled ? 0.6 : pressed ? 0.88 : 1,
        },
      ]}>
      <Text
        numberOfLines={1}
        style={[styles.modernActionBtnText, {color: palette.textColor}]}>
        {action.label}
      </Text>
    </Pressable>
  );
};

// ─── Detail card ──────────────────────────────────────────────────────────────
export const StaffContentDetailCard = ({rows, theme}) => (
  <View
    style={[
      styles.detailCard,
      {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.card,
        minHeight: theme.layout.detailCardMinHeight,
        overflow: 'hidden',
      },
      theme.shadows.card,
    ]}>
    {/* Gradient header strip */}
    <LinearGradient
      colors={theme.gradients.header}
      end={{x: 1, y: 0}}
      start={{x: 0, y: 0}}
      style={styles.detailHeaderStrip}
    />
    <View style={{paddingHorizontal: theme.spacing.cardHorizontal}}>
      {rows.map((row, index) => (
        <View key={row.label}>
          <View style={[styles.detailRow, {paddingVertical: theme.spacing.detailRowVertical}]}>
            <Text style={[styles.detailLabel, {color: theme.colors.metaLabel, fontSize: theme.typography.detailLabel.fontSize}]}>
              {row.label}
            </Text>
            <Text style={[styles.detailValue, {color: theme.colors.metaValue, fontSize: theme.typography.detailValue.fontSize}]}>
              {row.value}
            </Text>
          </View>
          {index !== rows.length - 1 ? (
            <View style={[styles.divider, {backgroundColor: theme.colors.softDivider}]} />
          ) : null}
        </View>
      ))}
    </View>
  </View>
);

// ─── FAB ──────────────────────────────────────────────────────────────────────
export const StaffContentFab = ({onPress, theme}) => (
  <LinearGradient
    colors={theme.gradients.fab}
    end={{x: 1, y: 1}}
    start={{x: 0, y: 0}}
    style={[
      styles.fabOuter,
      {
        borderColor: theme.colors.fabRing,
        borderRadius: theme.radius.fab,
        bottom: theme.spacing.fabInset,
        height: theme.layout.fabSize,
        right: theme.spacing.fabInset,
        width: theme.layout.fabSize,
      },
      theme.shadows.primaryButton,
    ]}>
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.fabInner}>
      <Plus color={theme.colors.white} size={theme.layout.fabSize * 0.34} />
    </Pressable>
  </LinearGradient>
);

// ─── Upload preview ───────────────────────────────────────────────────────────
export const StaffContentUploadPreview = ({onRemove, theme, uri}) =>
  uri ? (
    <View style={[styles.previewRow, {marginTop: theme.spacing.uploadTop}]}>
      <Image
        resizeMode="cover"
        source={{uri}}
        style={[
          styles.previewImage,
          {
            borderColor: theme.colors.border,
            borderRadius: theme.radius.menu,
            height: theme.layout.mediaPreviewHeight,
            width: theme.layout.mediaPreviewWidth,
          },
        ]}
      />
      <Pressable accessibilityRole="button" onPress={onRemove} style={styles.previewRemove}>
        <Image resizeMode="contain" source={Icons.CrossIcon} style={styles.removeIcon} />
      </Pressable>
    </View>
  ) : null;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Generic surface card
  surfaceCard: {
    width: '100%',
  },

  // Modern list card
  cardPressable: {
    width: '100%',
  },
  modernCard: {
    overflow: 'hidden',
    width: '100%',
  },
  topAccentLine: {
    height: 3,
    width: '100%',
  },
  cardInner: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
  },
  badgeDateRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badgePill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgePillText: {
    fontFamily: typeSemiBold,
    fontSize: 11,
    letterSpacing: 0.2,
  },
  dateChip: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  dateChipText: {
    color: '#9CA3AF',
    fontFamily: typeRegular,
    fontSize: 11,
  },
  cardTitle: {
    fontFamily: typeBold,
    fontSize: 16,
    letterSpacing: 0.1,
    lineHeight: 22,
    marginBottom: 10,
  },
  metaChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  metaChip: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  metaChipText: {
    fontFamily: typeMedium,
    fontSize: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 12,
    width: '100%',
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionsGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  modernActionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  modernActionBtnText: {
    fontFamily: typeSemiBold,
    fontSize: 12,
    letterSpacing: 0.2,
  },
  viewArrow: {
    alignItems: 'center',
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    marginLeft: 8,
    width: 28,
  },

  // Detail card
  detailCard: {
    width: '100%',
  },
  detailHeaderStrip: {
    height: 5,
    marginBottom: 4,
    width: '100%',
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailLabel: {
    flex: 1,
    fontFamily: typeBold,
    marginRight: 12,
  },
  detailValue: {
    flexShrink: 0,
    fontFamily: typeRegular,
    maxWidth: '46%',
    textAlign: 'right',
  },

  // Empty state
  emptyDescription: {
    marginBottom: 28,
    marginTop: 14,
    textAlign: 'center',
  },
  emptyTitle: {
    marginTop: 28,
  },
  iconSurface: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // FAB
  fabInner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fabOuter: {
    borderWidth: 5,
    overflow: 'hidden',
    position: 'absolute',
  },

  // Upload preview
  previewImage: {
    borderWidth: 1,
  },
  previewRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  previewRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  removeIcon: {
    height: 34,
    width: 34,
  },
});

export default {
  StaffContentDetailCard,
  StaffContentEmptyState,
  StaffContentFab,
  StaffContentListCard,
  StaffContentPrimaryButton,
  StaffContentSurfaceCard,
  StaffContentUploadPreview,
};
