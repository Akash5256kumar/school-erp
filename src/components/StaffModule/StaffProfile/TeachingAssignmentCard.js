import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BookOpen,
  GraduationCap,
  UserRound,
  UsersRound,
} from 'lucide-react-native';

const TeachingInfoItem = ({Icon, label, theme, value}) => (
  <View style={styles.infoRow}>
    <LinearGradient
      colors={theme.iconGradient}
      end={{x: 1, y: 1}}
      start={{x: 0, y: 0}}
      style={[
        styles.iconShell,
        {
          borderRadius: theme.cardTheme.radii.imageOption,
          height: theme.cardTheme.sizing.teachingInfoIconSize,
          width: theme.cardTheme.sizing.teachingInfoIconSize,
        },
      ]}>
      <Icon
        color={theme.cardTheme.colors.headerText}
        size={theme.cardTheme.sizing.teachingInfoSymbolSize}
        strokeWidth={2.2}
      />
    </LinearGradient>

    <View
      style={[
        styles.infoCopy,
        {
          marginLeft: theme.cardTheme.spacing.optionContentGap,
        },
      ]}>
      <Text style={theme.cardTheme.typography.profileSubtitle}>{label}</Text>
      <Text
        style={[
          theme.cardTheme.typography.profileName,
          {
            marginTop: theme.cardTheme.spacing.teachingValueGap,
          },
        ]}>
        {value}
      </Text>
    </View>
  </View>
);

const TeachingAssignmentCard = ({item, theme}) => {
  const pairItems = [
    {
      Icon: GraduationCap,
      key: 'class',
      label: theme.labels.class,
      value: item.class,
    },
    {
      Icon: UsersRound,
      key: 'section',
      label: theme.labels.section,
      value: item.section,
    },
  ];

  const fullWidthItems = [
    {
      Icon: BookOpen,
      key: 'subject',
      label: theme.labels.subject,
      value: item.subject,
    },
    {
      Icon: UserRound,
      key: 'teacherName',
      label: theme.labels.teacherName,
      value: item.teacher,
    },
  ];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardTheme.colors.profileCardBackground,
          borderRadius: theme.cardTheme.radii.profileCard,
          paddingBottom: theme.cardTheme.spacing.teachingCardHorizontal,
          paddingHorizontal: theme.cardTheme.spacing.teachingCardHorizontal,
          paddingTop: theme.cardTheme.spacing.teachingCardTopInset,
        },
        theme.cardTheme.shadows.profileCard,
      ]}>
      <LinearGradient
        colors={theme.iconGradient}
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        style={[
          styles.stripe,
          {
            borderTopLeftRadius: theme.cardTheme.radii.profileCard,
            borderTopRightRadius: theme.cardTheme.radii.profileCard,
            height: theme.cardTheme.sizing.teachingCardStripeHeight,
          },
        ]}
      />

      <View
        style={[
          styles.pairRow,
          {
            marginBottom: theme.cardTheme.spacing.teachingRowGap,
          },
        ]}>
        {pairItems.map(pairItem => (
          <View
            key={pairItem.key}
            style={[
              styles.pairColumn,
              {
                marginRight:
                  pairItem.key === 'class'
                    ? theme.cardTheme.spacing.teachingPairGap
                    : 0,
              },
            ]}>
            <TeachingInfoItem
              Icon={pairItem.Icon}
              label={pairItem.label}
              theme={theme}
              value={pairItem.value}
            />
          </View>
        ))}
      </View>

      <View
        style={[
          styles.column,
          {
            gap: theme.cardTheme.spacing.teachingRowGap,
          },
        ]}>
        {fullWidthItems.map(fullItem => (
          <TeachingInfoItem
            Icon={fullItem.Icon}
            key={fullItem.key}
            label={fullItem.label}
            theme={theme}
            value={fullItem.value}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: '100%',
  },
  column: {
    width: '100%',
  },
  iconShell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCopy: {
    flex: 1,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  pairColumn: {
    flex: 1,
  },
  pairRow: {
    flexDirection: 'row',
    width: '100%',
  },
  stripe: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default memo(TeachingAssignmentCard);
