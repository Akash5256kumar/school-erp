import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BusFront, MapPin, UserSquare2, Phone, Hash, Map } from 'lucide-react-native';

import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import AppLoader from '../../common/AppLoader';

// ─── Design Tokens ───────────────────────────────────────────────────
const PURPLE = "#C100FF";
const PURPLE_DARK = "#5B39F6";
const WHITE = "#FFFFFF";
const PAGE_BG = "#F5F4FF";
const SURFACE = "#FFFFFF";
const TEXT_STRONG = "#1E1B4B";
const TEXT_BODY = "#595975";
const TEXT_MUTED = "#9CA3AF";
const BORDER = "#F1F5F9";
const SHADOW_COLOR = "rgba(94,59,249,0.12)";
const ACCENT = "#f59e0b";

const Transport = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [busNo, setBusNo] = useState('');
  const [incharge, setIncharge] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [routeName, setRouteName] = useState('');
  const [routeNo, setRouteNo] = useState('');
  const [stopName, setStopName] = useState('');
  const [stopNo, setStopNo] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverNo, setDriverNo] = useState('');
  const [stdRoll, setStdRoll] = useState('');

  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  const TransportApi = useCallback(() => {
    let formData = new FormData();
    formData.append('std_roll', stdRoll);

    setLoading(true);
    fetch(myConst.BASEURL + 'viewtransport', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': usertoken
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === true) {
          const response = responseJson.data;
          setBusNo(response?.registration_no || 'Not Assigned');
          setIncharge(response?.incharge_name || '');
          setContactNo(response?.contact_no || '');
          setRouteName(response?.route_name || '');
          setRouteNo(response?.route_no || '');
          setStopName(response?.stop_name || '');
          setStopNo(response?.stop_no || '');
          setPickUpTime(response?.pickup_point || '');
          setDropTime(response?.drop_point || '');
          setDriverName(response?.driver_name || '');
          setDriverNo(response?.driver_mobile_no || '');
        } else {
          Snackbar.show({
            text: responseJson.message || 'Transport details not found',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [stdRoll, usertoken]);

  useEffect(() => {
    const getRoll = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      setStdRoll(value || '');
    };
    getRoll();
  }, []);

  useEffect(() => {
    if (stdRoll) {
      TransportApi();
    }
  }, [stdRoll, TransportApi]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  // Reusable card for sections
  const InfoCard = ({ title, icon: Icon, data }) => (
    <View style={s.card}>
      <View style={s.cardHeader}>
        <View style={s.iconWrap}>
          <Icon color={PURPLE_DARK} size={22} strokeWidth={2} />
        </View>
        <Text style={s.cardTitle}>{title}</Text>
      </View>
      <View style={s.cardBody}>
        {data.map((item, idx) => (
          <View key={idx} style={[s.infoRow, idx !== data.length - 1 && s.infoRowBorder]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={s.subIconWrap}>{item.icon}</View>
              <Text style={s.infoLabel}>{item.label}</Text>
            </View>
            <Text style={s.infoValue}>{item.value || 'N/A'}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={s.root}>
      {/* 1. Deep Gradient Background */}
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.headerBg, { paddingTop: insets.top + 16 }]}
      />

      {/* 2. Floating Header UI */}
      <View style={[s.headerUI, { paddingTop: insets.top + 16 }]} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={s.backBtn}
        >
          <Image
            source={constant.Icons.backArrowIcon}
            style={s.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={s.headerTitle} numberOfLines={1}>
          Transport
        </Text>
        <View style={s.headerRightPlaceholder} />
      </View>

      {/* 3. Main Overlapping Content */}
      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <AppLoader
            fullScreen
            color={PURPLE_DARK}
            size="large"
            label="Loading transport details..."
          />
        ) : (
          <>
            {/* Hero Card: Bus Number */}
            <View style={s.heroCard}>
              <View style={s.heroIconWrap}>
                <BusFront color={WHITE} size={32} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.heroLabel}>Registration No.</Text>
                <Text style={s.heroValue}>{busNo}</Text>
              </View>
            </View>

            {/* Bus Details */}
            <InfoCard
              title="Bus Details"
              icon={BusFront}
              data={[
                { label: 'Incharge Name', value: incharge, icon: <UserSquare2 color={TEXT_MUTED} size={16} /> },
                { label: 'Contact No', value: contactNo, icon: <Phone color={TEXT_MUTED} size={16} /> }
              ]}
            />

            {/* Route Details */}
            <InfoCard
              title="Route Details"
              icon={MapPin}
              data={[
                { label: 'Route No', value: routeNo, icon: <Hash color={TEXT_MUTED} size={16} /> },
                { label: 'Pick Up Point', value: pickUpTime, icon: <MapPin color={TEXT_MUTED} size={16} /> },
                { label: 'Drop Point', value: dropTime, icon: <MapPin color={TEXT_MUTED} size={16} /> },
              ]}
            />

            {/* Driver Details */}
            <InfoCard
              title="Driver Details"
              icon={UserSquare2}
              data={[
                { label: 'Driver Name', value: driverName, icon: <UserSquare2 color={TEXT_MUTED} size={16} /> },
                { label: 'Mobile No', value: driverNo, icon: <Phone color={TEXT_MUTED} size={16} /> }
              ]}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Transport;

// ─── Styles ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: PAGE_BG },

  // Header Layers
  headerBg: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 160,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerUI: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { height: 18, width: 18, tintColor: WHITE },
  headerTitle: {
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
    textAlign: "center",
  },
  headerRightPlaceholder: { width: 38 },

  // Content Array
  content: {
    paddingHorizontal: 16,
    paddingTop: 100, // Starts beautifully overlapping the 160 Header
  },

  // Hero Card
  heroCard: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    elevation: 4,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    marginBottom: 20,
  },
  heroIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  heroLabel: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: TEXT_MUTED,
  },
  heroValue: {
    fontFamily: constant.typeBold,
    fontSize: constant.font22,
    color: TEXT_STRONG,
    marginTop: 4,
  },

  // Info Cards
  card: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${PURPLE}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: constant.typeBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  subIconWrap: {
    width: 24,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: TEXT_BODY,
  },
  infoValue: {
    flex: 1,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: TEXT_STRONG,
    textAlign: 'right',
  },
});
