import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import * as constant from '../../../Utils/Constant';

const {width} = Dimensions.get('window');

// Position helpers
const getPositionLabel = positionKey => {
  switch (positionKey) {
    case 'i_point':
      return '🥇 1st Position';
    case 'ii_point':
      return '🥈 2nd Position';
    case 'iii_point':
      return '🥉 3rd Position';
    default:
      return positionKey || '—';
  }
};

const getPositionColors = positionKey => {
  switch (positionKey) {
    case 'i_point':
      return {bg: '#FFF8E7', text: '#B8860B', border: '#FFD700'};
    case 'ii_point':
      return {bg: '#F5F5F5', text: '#707070', border: '#C0C0C0'};
    case 'iii_point':
      return {bg: '#FFF0E8', text: '#A0522D', border: '#CD7F32'};
    default:
      return {bg: '#EEF2FF', text: '#4F6EF7', border: '#C7D2FE'};
  }
};

// Format date nicely
const formatDate = dateStr => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const AchievementCard = ({item}) => {
  const posColors = getPositionColors(item.position);

  return (
    <View style={cardStyles.wrapper}>
      {/* Accent stripe */}
      <LinearGradient
        colors={['#4F6EF7', '#7C3AED']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={cardStyles.accentBar}
      />

      <View style={cardStyles.body}>
        {/* Title row */}
        <View style={cardStyles.titleRow}>
          <View style={cardStyles.trophyCircle}>
            <Text style={cardStyles.trophyEmoji}>🏆</Text>
          </View>
          <View style={cardStyles.titleTextBlock}>
            <Text style={cardStyles.achievementName} numberOfLines={2}>
              {item.achievements_name || '—'}
            </Text>
            <Text style={cardStyles.levelText}>
              {item.achievement_level || '—'}
            </Text>
          </View>
          {/* Position badge */}
          <View
            style={[
              cardStyles.positionBadge,
              {
                backgroundColor: posColors.bg,
                borderColor: posColors.border,
              },
            ]}>
            <Text style={[cardStyles.positionBadgeText, {color: posColors.text}]}>
              {getPositionLabel(item.position)}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={cardStyles.divider} />

        {/* Info grid */}
        <View style={cardStyles.grid}>
          <InfoCell
            icon="📅"
            label="Date"
            value={formatDate(item.achievement_date)}
          />
          <InfoCell
            icon="🎫"
            label="Admission No."
            value={item.admission_no || '—'}
          />
          <InfoCell
            icon="📊"
            label="Marks"
            value={item.marks ? `${item.marks}` : '—'}
          />
          <InfoCell
            icon="🏫"
            label="Level"
            value={item.achievement_level || '—'}
          />
        </View>
      </View>
    </View>
  );
};

const InfoCell = ({icon, label, value}) => (
  <View style={cardStyles.infoCell}>
    <Text style={cardStyles.infoCellIcon}>{icon}</Text>
    <Text style={cardStyles.infoCellLabel}>{label}</Text>
    <Text style={cardStyles.infoCellValue} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────
const Achievement = ({navigation}) => {
  const {token: usertoken} = useStudentAuth();
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [originalDataSource, setOriginalDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleBackPress = useCallback(() => {
    navigation.navigate('Home');
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      achievementApi(value);
    };
    fetchData();
  }, []);

  const achievementApi = async roll => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append('std_roll', roll);
      const response = await fetch(myConst.BASEURL + 'viewachievements', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: usertoken,
        },
        body: formData,
      });
      const responseJson = await response.json();
      const data = responseJson?.data || [];
      setDataSource(data);
      setOriginalDataSource(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = text => {
    setSearchText(text);
    if (!text) {
      setDataSource(originalDataSource);
    } else {
      setDataSource(
        originalDataSource.filter(item =>
          (item.achievements_name || '')
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          (item.achievement_level || '')
            .toLowerCase()
            .includes(text.toLowerCase()),
        ),
      );
    }
  };

  return (
    <View style={s.root}>
      {/* Gradient header */}
      <LinearGradient
        colors={['#1a3a8f', '#4F6EF7']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={s.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={s.backBtn}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerEmoji}>🏆</Text>
          <Text style={s.headerTitle}>Achievements</Text>
          <Text style={s.headerSubtitle}>Your proud moments</Text>
        </View>
        <View style={s.headerStats}>
          <Text style={s.statNum}>{originalDataSource.length}</Text>
          <Text style={s.statLabel}>Total</Text>
        </View>
      </LinearGradient>

      {/* Search bar */}
      <View style={s.searchContainer}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search achievements..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={onSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => onSearch('')}>
            <Text style={s.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body */}
      {loading ? (
        <View style={s.loaderContainer}>
          <ActivityIndicator size="large" color="#4F6EF7" />
          <Text style={s.loaderText}>Loading achievements...</Text>
        </View>
      ) : (
        <FlatList
          data={dataSource}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <AchievementCard item={item} />}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          ListEmptyComponent={() => (
            <View style={s.emptyState}>
              <Text style={s.emptyEmoji}>🎖️</Text>
              <Text style={s.emptyTitle}>No Achievements Yet</Text>
              <Text style={s.emptySubtitle}>
                {searchText
                  ? 'No results match your search.'
                  : 'Your achievements will appear here once added.'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// ─── Card Styles ─────────────────────────────────────────────────────────────
const cardStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#4F6EF7',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  accentBar: {
    width: 5,
  },
  body: {
    flex: 1,
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  trophyCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyEmoji: {
    fontSize: 22,
  },
  titleTextBlock: {
    flex: 1,
  },
  achievementName: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: '#1E293B',
    lineHeight: 22,
  },
  levelText: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font12,
    color: '#64748B',
    marginTop: 2,
  },
  positionBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  positionBadgeText: {
    fontFamily: constant.typeSemiBold,
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoCell: {
    width: (width - 32 - 5 - 28 - 8) / 2,
    backgroundColor: '#F8FAFF',
    borderRadius: 10,
    padding: 10,
  },
  infoCellIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  infoCellLabel: {
    fontFamily: constant.typeRegular,
    fontSize: 10,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  infoCellValue: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: '#1E293B',
    marginTop: 2,
  },
});

// ─── Screen Styles ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 22,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  backArrow: {
    fontSize: 20,
    color: '#fff',
    fontFamily: constant.typeSemiBold,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 2,
  },
  headerTitle: {
    fontFamily: constant.typeBold,
    fontSize: constant.font20,
    color: '#fff',
  },
  headerSubtitle: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  headerStats: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 48,
  },
  statNum: {
    fontFamily: constant.typeBold,
    fontSize: constant.font20,
    color: '#fff',
  },
  statLabel: {
    fontFamily: constant.typeRegular,
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: '#1E293B',
    padding: 0,
  },
  clearBtn: {
    fontSize: 14,
    color: '#94A3B8',
    paddingHorizontal: 4,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 30,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loaderText: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: '#64748B',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    color: '#1E293B',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});

export default Achievement;
