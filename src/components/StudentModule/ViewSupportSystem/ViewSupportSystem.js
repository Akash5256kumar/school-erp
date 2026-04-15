import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  BackHandler,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, MessageCircle, Plus } from 'lucide-react-native';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';

// ─── Design tokens ────────────────────────────────────────────────────────────
const PURPLE = '#5E3BF9';
const PURPLE_DARK = '#4527D6';
const WHITE = '#FFFFFF';
const PAGE_BG = '#F5F4FF';
const SURFACE = '#FFFFFF';
const TEXT_STRONG = '#1E1B4B';
const TEXT_BODY = '#595975';
const TEXT_MUTED = '#9CA3AF';
const CARD_BORDER = '#EDE9FF';
const SHADOW_COLOR = 'rgba(94,59,249,0.10)';

const STATUS_COLORS = {
  pending: { bg: '#FFF7ED', text: '#C2540A', dot: '#F97316' },
  assigned: { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  solved: { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
};

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'solved', label: 'Solved' },
];

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
const TabBar = ({ activeTab, onTabChange }) => (
  <View style={s.tabRow}>
    {TABS.map(tab => {
      const isActive = tab.key === activeTab;
      return (
        <Pressable
          key={tab.key}
          accessibilityRole="button"
          onPress={() => onTabChange(tab.key)}
          style={[s.tabPill, isActive && s.tabPillActive]}>
          {isActive ? (
            <LinearGradient
              colors={['#C100FF', '#5B39F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.tabPillGradient}>
              <Text style={[s.tabLabel, s.tabLabelActive]}>{tab.label}</Text>
            </LinearGradient>
          ) : (
            <Text style={s.tabLabel}>{tab.label}</Text>
          )}
        </Pressable>
      );
    })}
  </View>
);

// ─── Ticket Card ──────────────────────────────────────────────────────────────
const TicketCard = ({ item, activeTab, onPress }) => {
  const statusStyle = STATUS_COLORS[activeTab] || STATUS_COLORS.pending;
  const formattedDate = moment(item.created_at).format('DD MMM YYYY');

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [s.card, pressed && s.cardPressed]}
      android_ripple={{ color: `${PURPLE}14` }}>
      {/* Left accent bar */}
      <View style={[s.cardAccent, { backgroundColor: statusStyle.dot }]} />

      <View style={s.cardBody}>
        {/* Top row: issue + status badge */}
        <View style={s.cardTopRow}>
          <Text style={s.issueTxt} numberOfLines={2}>
            {item.issue}
          </Text>
          <View style={[s.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <View style={[s.statusDot, { backgroundColor: statusStyle.dot }]} />
            <Text style={[s.statusTxt, { color: statusStyle.text }]}>
              {TABS.find(t => t.key === activeTab)?.label || ''}
            </Text>
          </View>
        </View>

        {/* Bottom row: date */}
        <View style={s.cardBottomRow}>
          <Text style={s.dateTxt}>{formattedDate}</Text>
          <ChevronRight color={PURPLE} size={17} strokeWidth={2.4} />
        </View>
      </View>
    </Pressable>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ activeTab }) => {
  const label = TABS.find(t => t.key === activeTab)?.label || '';
  return (
    <View style={s.emptyWrap}>
      <View style={s.emptyIconWrap}>
        <MessageCircle color={PURPLE} size={44} strokeWidth={1.5} />
      </View>
      <Text style={s.emptyTitle}>No {label} Tickets</Text>
      <Text style={s.emptyMsg}>
        {activeTab === 'pending'
          ? 'Tickets you raise will appear here as pending.'
          : activeTab === 'assigned'
          ? 'Tickets assigned to staff will show here.'
          : 'Resolved support tickets will appear here.'}
      </Text>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ViewSupportSystem = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [dataSource, setDataSource] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [solvedData, setSolvedData] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [stdRoll, setStdRoll] = useState('');

  // Back handler
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Dashboard');
        return true;
      });
      return () => sub.remove();
    }, [navigation]),
  );

  // Fetch on focus
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const value = await AsyncStorage.getItem('@std_roll');
        setStdRoll(value);
        setActiveTab('pending');
        viewSupportApi(value);
      };
      fetchData();
    }, []),
  );

  const showMessage = msg =>
    Snackbar.show({ text: msg, duration: Snackbar.LENGTH_SHORT, backgroundColor: '#f15270' });

  const handleTabChange = tab => {
    setActiveTab(tab);
    if (tab === 'pending') setDataSource(pendingData);
    else if (tab === 'assigned') setDataSource(assignedData);
    else if (tab === 'solved') setDataSource(solvedData);
  };

  const viewMoreButton = async item => {
    await AsyncStorage.setItem('@id', String(item.id));
    await AsyncStorage.setItem('@issue', item.issue || '');
    await AsyncStorage.setItem('@ticket_item', JSON.stringify(item));
    navigation.navigate('ViewMoreSupportSystem');
  };

  const viewSupportApi = roll => {
    const formData = new FormData();
    formData.append('admission_no', roll);

    fetch(myConst.BASEURL + 'viewsupport2', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: usertoken,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === true) {
          setDataSource(json.pending);
          setPendingData(json.pending);
          setAssignedData(json.assigned);
          setSolvedData(json.solved);
        } else {
          showMessage(json.message);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={s.root}>
      {/* Header */}
      <LinearGradient
        colors={['#C100FF', '#5B39F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[s.header, { paddingTop: insets.top + 12 }]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={s.backBtn}>
          <Image
            source={constant.Icons.backArrowIcon}
            style={s.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={s.headerTitle}>View Support</Text>
        <View style={s.headerRight} />
      </LinearGradient>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* List */}
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <TicketCard
            item={item}
            activeTab={activeTab}
            onPress={() => viewMoreButton(item)}
          />
        )}
        contentContainerStyle={[
          s.listContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState activeTab={activeTab} />}
      />

      {/* FAB */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add new support ticket"
        onPress={() => navigation.navigate('HelpSupport')}
        style={[s.fab, { bottom: insets.bottom + 24 }]}>
        <LinearGradient
          colors={['#C100FF', '#5B39F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={s.fabGradient}>
          <Plus color={WHITE} size={26} strokeWidth={2.2} />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: PAGE_BG },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    height: 18,
    width: 18,
    tintColor: WHITE,
  },
  headerTitle: {
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
    textAlign: 'center',
  },
  headerRight: { width: 38 },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 6,
    gap: 10,
  },
  tabPill: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  tabPillActive: {
    borderWidth: 0,
    elevation: 4,
  },
  tabPillGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  tabLabel: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font13,
    color: TEXT_BODY,
  },
  tabLabelActive: {
    fontFamily: constant.typeSemiBold,
    color: WHITE,
  },

  // List
  listContent: { paddingHorizontal: 16, paddingTop: 12 },

  // Card
  card: {
    backgroundColor: SURFACE,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    elevation: 3,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  cardPressed: { opacity: 0.92 },
  cardAccent: { width: 5 },
  cardBody: { flex: 1, padding: 14 },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  issueTxt: {
    flex: 1,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
    lineHeight: 22,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
    flexShrink: 0,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F0FF',
  },
  dateTxt: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font12,
    color: TEXT_MUTED,
  },

  // Empty
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 36,
  },
  emptyIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${PURPLE}12`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    color: TEXT_STRONG,
    textAlign: 'center',
  },
  emptyMsg: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  // FAB
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewSupportSystem;
