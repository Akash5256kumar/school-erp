import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

import {getDashboardSummary} from '../../../api';
import AppLoader from '../../../components/common/AppLoader';
import EmptyState from '../../../components/common/EmptyState';
import ErrorState from '../../../components/common/ErrorState';
import {colors, STRINGS} from '../../../constants';
import getErrorMessage from '../../../Utils/errorMessages';
import * as constant from '../../../Utils/Constant';

const QuickActionCard = React.memo(({item, onPress}) => (
  <Pressable onPress={() => onPress(item)} style={[styles.card, {borderColor: item.borderColor}]}>
    <View style={[styles.cardAccent, {backgroundColor: item.accentColor}]} />
    <View style={styles.cardTopRow}>
      <View style={[styles.iconWrap, {backgroundColor: item.iconBackground}]}>
        <FastImage resizeMode="contain" source={item.pic} style={styles.cardImage} />
      </View>
      <View style={[styles.cardBadge, {backgroundColor: item.badgeBackground}]}>
        <Text style={[styles.cardBadgeText, {color: item.badgeTextColor}]}>
          {item.badge}
        </Text>
      </View>
    </View>

    <View style={styles.cardBody}>
      <Text style={styles.cardLabel}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.cardDescription}>{item.description}</Text>
      ) : null}
    </View>

    <View style={styles.cardFooter}>
      <Text style={[styles.cardFooterText, {color: item.accentColor}]}>
        Tap to open
      </Text>
    </View>
  </Pressable>
));

const HomeMenu = ({navigation}) => {
  const {userData} = useStudentAuth();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDashboardSummary = useCallback(async () => {
    if (!userData?.std_roll || !userData?.Student_class) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await getDashboardSummary({
        std_roll: userData.std_roll,
        class: userData.Student_class,
      });

      setCount(Number(response?.count || 0));
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [userData?.Student_class, userData?.std_roll]);

  useEffect(() => {
    loadDashboardSummary();
  }, [loadDashboardSummary]);

  const quickActions = useMemo(
    () => [
      {
        accentColor: '#2E7CF6',
        badge: 'Today',
        badgeBackground: '#E8F1FF',
        badgeTextColor: '#2E7CF6',
        borderColor: '#CFE0FF',
        description: `${STRINGS.home.todayCountLabel}: ${count}`,
        iconBackground: '#EEF5FF',
        key: 'homework',
        path: 'SubjectScreen',
        pic: constant.Icons.studHomeImage,
        title: 'Home Work',
      },
      {
        accentColor: '#7B3FF6',
        badge: 'Study',
        badgeBackground: '#EDE9FF',
        badgeTextColor: '#5E3BF9',
        borderColor: '#D8CDFF',
        description: 'Access your study materials',
        iconBackground: '#F5F4FF',
        key: 'notes',
        path: 'Notes',
        pic: constant.Icons.notesIcon,
        title: 'Notes',
      },
    ],
    [count],
  );

  const handlePress = useCallback(
    item => {
      navigation.navigate(item.path);
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}) => <QuickActionCard item={item} onPress={handlePress} />,
    [handlePress],
  );

  if (loading) {
    return <AppLoader label="Fetching dashboard summary..." />;
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} onRetry={loadDashboardSummary} />;
  }

  if (!quickActions.length) {
    return <EmptyState description={STRINGS.home.quickActionsEmpty} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{STRINGS.home.quickActionsTitle}</Text>
      </View>
      <FlatList
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        data={quickActions}
        initialNumToRender={2}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.key}
        numColumns={2}
        removeClippedSubviews
        renderItem={renderItem}
        scrollEnabled={false}
        windowSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: constant.whiteColor,
    marginTop: constant.resW(5),
  },
  sectionHeader: {
    marginBottom: constant.resW(2.5),
    marginHorizontal: constant.resW(4),
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    lineHeight: constant.resW(7),
  },
  listContent: {
    paddingBottom: constant.resW(10),
    paddingHorizontal: constant.resW(4),
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: constant.resW(4),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: constant.resW(3),
    borderWidth: 1,
    flex: 0.48,
    minHeight: constant.resW(50),
    overflow: 'hidden',
    paddingHorizontal: constant.resW(3),
    paddingTop: constant.resW(3),
    paddingBottom: constant.resW(2.8),
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardAccent: {
    borderRadius: constant.resW(1),
    height: constant.resW(1),
    marginBottom: constant.resW(2.6),
    width: constant.resW(12),
  },
  cardTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: constant.resW(4),
    height: constant.resW(18),
    justifyContent: 'center',
    width: constant.resW(18),
  },
  cardImage: {
    height: constant.resW(13),
    width: constant.resW(13),
  },
  cardBadge: {
    alignItems: 'center',
    borderRadius: constant.resW(5),
    justifyContent: 'center',
    paddingHorizontal: constant.resW(2.3),
    paddingVertical: constant.resW(0.9),
  },
  cardBadgeText: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font10,
  },
  cardBody: {
    marginTop: constant.resW(3),
  },
  cardLabel: {
    color: constant.blackColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font15,
    lineHeight: constant.resW(5.5),
  },
  cardDescription: {
    color: colors.textSecondary,
    fontFamily: constant.typeMedium,
    fontSize: constant.font12,
    lineHeight: constant.resW(4.7),
    marginTop: constant.resW(1.2),
  },
  cardFooter: {
    marginTop: constant.resW(3),
  },
  cardFooterText: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },
});

export default React.memo(HomeMenu);
