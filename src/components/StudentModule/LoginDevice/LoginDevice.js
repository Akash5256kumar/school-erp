import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Monitor, Smartphone, Tablet, Info, Hash, Cpu } from 'lucide-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

const { resW, typeBold, typeMedium, typeSemiBold, font12, font13, font14, font15, font16, font18 } = constant;

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  gradStart:  '#C100FF',
  gradEnd:    '#5B39F6',
  pageBg:     '#F5F4FF',
  cardBg:     '#FFFFFF',
  textStrong: '#1E1B4B',
  textBody:   '#595975',
  textMuted:  '#9CA3AF',
  divider:    '#EDE9FF',
  primary:    '#5B39F6',
  purple:     '#C100FF',
  shadow:     'rgba(94,59,249,0.10)',
  border:     '#EDE9FF',
};

// ─── Device icon helper ───────────────────────────────────────────────────────
const getDeviceIcon = (type) => {
  const t = String(type || '').toLowerCase();
  if (t.includes('tablet') || t.includes('ipad')) return Tablet;
  if (t.includes('mobile') || t.includes('phone') || t.includes('android') || t.includes('ios')) return Smartphone;
  return Monitor;
};

// ─── Device Card ──────────────────────────────────────────────────────────────
const DeviceCard = ({ item, index }) => {
  const DeviceIcon = getDeviceIcon(item.deviceType);
  const isCurrentDevice = index === 0;

  const rows = [
    { icon: Hash,       label: 'Serial No.',   value: item.id },
    { icon: Info,       label: 'App Version',  value: item.deviceVersion },
    { icon: Smartphone, label: 'Device Name',  value: item.deviceName },
    { icon: Cpu,        label: 'Device Type',  value: item.deviceType },
  ];

  return (
    <View style={card.wrapper}>
      {/* Card top accent */}
      <LinearGradient
        colors={[T.gradStart, T.gradEnd]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={card.accent}
      />

      {/* Header row */}
      <View style={card.header}>
        <View style={card.iconWrap}>
          <DeviceIcon color={T.primary} size={24} strokeWidth={1.8} />
        </View>
        <View style={card.headerText}>
          <Text style={card.deviceName} numberOfLines={1}>
            {item.deviceName || 'Unknown Device'}
          </Text>
          <Text style={card.deviceType} numberOfLines={1}>
            {item.deviceType || 'Device'}
          </Text>
        </View>
        {isCurrentDevice && (
          <View style={card.activeBadge}>
            <View style={card.activeDot} />
            <Text style={card.activeBadgeText}>Active</Text>
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={card.divider} />

      {/* Detail rows */}
      <View style={card.details}>
        {rows.map((row, i) => {
          const RowIcon = row.icon;
          return (
            <View key={i} style={card.row}>
              <View style={card.rowLeft}>
                <RowIcon color={T.textMuted} size={14} strokeWidth={2} />
                <Text style={card.rowLabel}>{row.label}</Text>
              </View>
              <Text style={card.rowValue} numberOfLines={1}>
                {row.value ?? '—'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const card = StyleSheet.create({
  wrapper: {
    backgroundColor: T.cardBg,
    borderRadius: resW(4),
    marginHorizontal: resW(4),
    marginBottom: resW(4),
    overflow: 'hidden',
    elevation: 5,
    shadowColor: T.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  accent: { height: resW(1.2) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: resW(4),
    paddingBottom: resW(3),
    gap: resW(3),
  },
  iconWrap: {
    width: resW(12), height: resW(12), borderRadius: resW(3),
    backgroundColor: `${T.primary}14`,
    alignItems: 'center', justifyContent: 'center',
  },
  headerText: { flex: 1 },
  deviceName: { color: T.textStrong, fontFamily: typeSemiBold, fontSize: font15 },
  deviceType: { color: T.textMuted, fontFamily: typeMedium, fontSize: font12, marginTop: resW(0.5) },
  activeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: resW(1.5),
    backgroundColor: '#F0FDF4', borderRadius: resW(5),
    paddingHorizontal: resW(2.5), paddingVertical: resW(1),
  },
  activeDot: { width: resW(2), height: resW(2), borderRadius: resW(1), backgroundColor: '#22C55E' },
  activeBadgeText: { color: '#15803D', fontFamily: typeSemiBold, fontSize: font12 },
  divider: { height: 1, backgroundColor: T.divider, marginHorizontal: resW(4) },
  details: { padding: resW(4), gap: resW(3) },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: resW(2) },
  rowLabel: { color: T.textBody, fontFamily: typeMedium, fontSize: font13 },
  rowValue: { color: T.textStrong, fontFamily: typeSemiBold, fontSize: font13, maxWidth: '55%', textAlign: 'right' },
});

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <View style={empty.wrap}>
    <View style={empty.circle}>
      <Monitor color={T.primary} size={36} strokeWidth={1.5} />
    </View>
    <Text style={empty.title}>No Devices Found</Text>
    <Text style={empty.sub}>No login devices are registered for your account.</Text>
  </View>
);

const empty = StyleSheet.create({
  wrap:   { alignItems: 'center', paddingTop: resW(20), paddingHorizontal: resW(10) },
  circle: { width: resW(20), height: resW(20), borderRadius: resW(10),
    backgroundColor: `${T.primary}14`, alignItems: 'center', justifyContent: 'center', marginBottom: resW(4) },
  title:  { color: T.textStrong, fontFamily: typeBold, fontSize: font18, marginBottom: resW(2) },
  sub:    { color: T.textMuted, fontFamily: typeMedium, fontSize: font14, textAlign: 'center', lineHeight: font14 * 1.5 },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
const LoginDevice = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });
    return () => handler.remove();
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('@std_roll');
        if (value) loginDeviceApi(value);
      } catch (e) { console.log(e); }
    };
    fetchData();
  }, []);

  const loginDeviceApi = async (roll) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('std_roll', roll);
    try {
      const response = await fetch(myConst.BASEURL + 'logindevices', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: usertoken },
        body: formData,
      });
      const json = await response.json();
      if (json?.data) setDataSource(json.data);
    } catch (e) { console.log(e); }
    finally { setIsLoading(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: T.pageBg }}>
      {/* ── Gradient Header ── */}
      <LinearGradient
        colors={[T.gradStart, T.gradEnd]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={[hdr.bg, { paddingTop: insets.top + 14 }]}
      >
        <View style={hdr.row}>
          <TouchableOpacity activeOpacity={0.8} style={hdr.backBtn}
            onPress={() => navigation.goBack()}>
            <ArrowLeft color="#FFFFFF" size={22} strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={hdr.title}>Login Devices</Text>
          <View style={hdr.spacer} />
        </View>
      </LinearGradient>

      {/* ── Summary chip ── */}
      {!isLoading && dataSource.length > 0 && (
        <View style={hdr.chipRow}>
          <View style={hdr.chip}>
            <Monitor color={T.primary} size={14} strokeWidth={2} />
            <Text style={hdr.chipText}>{dataSource.length} device{dataSource.length !== 1 ? 's' : ''} found</Text>
          </View>
        </View>
      )}

      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={T.primary} />
          <Text style={{ color: T.textMuted, fontFamily: typeMedium, fontSize: font14, marginTop: resW(3) }}>
            Loading devices...
          </Text>
        </View>
      ) : (
        <FlatList
          data={dataSource}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => <DeviceCard item={item} index={index} />}
          contentContainerStyle={{ paddingTop: resW(4), paddingBottom: resW(10) }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      )}
    </View>
  );
};

const hdr = StyleSheet.create({
  bg:     { paddingHorizontal: 16, paddingBottom: 22 },
  row:    { flexDirection: 'row', alignItems: 'center' },
  backBtn:{ width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  title:  { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: constant.typeBold, color: '#FFFFFF' },
  spacer: { width: 38 },
  chipRow:{ paddingHorizontal: resW(4), paddingTop: resW(4) },
  chip:   { flexDirection: 'row', alignItems: 'center', gap: resW(1.5),
    backgroundColor: `${T.primary}14`, alignSelf: 'flex-start',
    borderRadius: resW(5), paddingHorizontal: resW(3), paddingVertical: resW(1.5) },
  chipText: { color: T.primary, fontFamily: typeSemiBold, fontSize: font12 },
});

export default LoginDevice;
