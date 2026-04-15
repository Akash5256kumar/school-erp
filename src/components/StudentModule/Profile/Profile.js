import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

import * as myConst from '../../Baseurl';
import {
  resW,
  typeBold,
  typeMedium,
  typeSemiBold,
  typeRegular,
  font12,
  font14,
  font16,
  font18,
} from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

/* ─── Theme ─────────────────────────────────────────────────────────────────── */
const T = {
  gradientStart: '#C100FF',
  gradientEnd: '#5B39F6',
  pageBg: '#F5F4FF',
  cardBg: '#FFFFFF',
  textStrong: '#1E1B4B',
  textBody: '#595975',
  textMuted: '#9CA3AF',
  divider: '#EDE9FF',
  primaryBlue: '#5B39F6',
  primaryPurple: '#C100FF',
  shadow: 'rgba(94, 59, 249, 0.12)',
};

const cardShadow = {
  elevation: 8,
  shadowColor: T.shadow,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 1,
  shadowRadius: 16,
};

/* ─── InfoRow ────────────────────────────────────────────────────────────────── */
const InfoRow = ({ label, value, last = false }) => (
  <View>
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={rowStyles.value}>{value || '----'}</Text>
    </View>
    {!last && <View style={rowStyles.divider} />}
  </View>
);

const rowStyles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: resW(4),
    paddingVertical: resW(3.5),
  },
  label: {
    color: T.textBody,
    flex: 1,
    fontFamily: typeMedium,
    fontSize: font14,
    marginRight: resW(3),
  },
  value: {
    color: T.textStrong,
    flex: 1.3,
    fontFamily: typeSemiBold,
    fontSize: font14,
    textAlign: 'right',
  },
  divider: {
    backgroundColor: T.divider,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: resW(4),
  },
});

/* ─── SubSectionLabel ────────────────────────────────────────────────────────── */
const SubSectionLabel = ({ label }) => (
  <View style={subStyles.wrap}>
    <View style={subStyles.bar} />
    <Text style={subStyles.text}>{label}</Text>
  </View>
);

const subStyles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: resW(1),
    marginHorizontal: resW(4),
    marginTop: resW(3),
    columnGap: resW(2),
  },
  bar: {
    backgroundColor: T.primaryBlue,
    borderRadius: 2,
    height: resW(3.5),
    opacity: 0.6,
    width: resW(0.8),
  },
  text: {
    color: T.textStrong,
    fontFamily: typeSemiBold,
    fontSize: font14,
  },
});

/* ─── SectionCard ────────────────────────────────────────────────────────────── */
const SectionCard = ({ title, children, onEdit }) => (
  <View style={cardStyles.outer}>
    <Text style={cardStyles.title}>{title}</Text>
    <View style={[cardStyles.card, cardShadow]}>{children}</View>
    {onEdit && (
      <LinearGradient
        colors={[T.gradientStart, T.gradientEnd]}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={cardStyles.editGradient}
      >
        <Pressable onPress={onEdit} style={cardStyles.editPressable}>
          <Text style={cardStyles.editText}>Edit</Text>
        </Pressable>
      </LinearGradient>
    )}
  </View>
);

const cardStyles = StyleSheet.create({
  outer: {
    marginBottom: resW(4),
  },
  title: {
    color: T.textMuted,
    fontFamily: typeSemiBold,
    fontSize: font12,
    letterSpacing: 0.9,
    marginBottom: resW(2),
    marginHorizontal: resW(4),
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: T.cardBg,
    borderRadius: resW(4),
    marginHorizontal: resW(4),
    overflow: 'hidden',
  },
  editGradient: {
    borderRadius: resW(3),
    marginHorizontal: resW(4),
    marginTop: resW(3),
    overflow: 'hidden',
  },
  editPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: resW(3.5),
  },
  editText: {
    color: '#fff',
    fontFamily: typeSemiBold,
    fontSize: font16,
  },
});

/* ─── ParentPhoto ────────────────────────────────────────────────────────────── */
const ParentPhoto = ({ uri }) => {
  const [imageError, setImageError] = useState(false);
  const source = !imageError && uri ? { uri } : require('../../../assests/images/businessman.png');

  return (
    <View style={photoStyles.wrap}>
      <View style={[photoStyles.ring, cardShadow]}>
        <Image
          source={source}
          style={photoStyles.img}
          onError={() => setImageError(true)}
        />
      </View>
    </View>
  );
};

const photoStyles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: resW(4),
  },
  ring: {
    borderColor: T.divider,
    borderRadius: resW(12),
    borderWidth: 3,
    padding: 2,
  },
  img: {
    borderRadius: resW(11),
    height: resW(22),
    width: resW(22),
  },
});

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const Profile = ({ navigation }) => {
  const { token: usertoken, userData } = useStudentAuth();
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [dob, setDob] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [section, setSection] = useState('');
  const [residental, setResidental] = useState('');
  const [staff, setStaff] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [parentPhnNum, setParentPhnNum] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [Foccupation, setFoccupation] = useState('');
  const [dayScholar, setDayScholar] = useState('');
  const [id, setId] = useState('');
  const [profileData, setProfileData] = useState({});
  const [active, setActive] = useState(1);
  const [profilePic, setProfilePic] = useState('');
  const [M_ProfilePic, setM_ProfilePic] = useState('');
  const [F_ProfilePic, setF_ProfilePic] = useState('');
  const [G_ProfilePic, setG_ProfilePic] = useState('');

  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  const ProfileApi = useCallback(async () => {
    setLoading(true);
    try {
      const storedId = await AsyncStorage.getItem('@id');
      const dynamicId = String(userData?.id || storedId || '');

      console.log('🔍 Retrieved ID from login userData:', userData?.id);
      console.log('🔍 Retrieved ID from AsyncStorage:', storedId);
      console.log('🔍 Using dynamic student ID:', dynamicId);

      if (!dynamicId) {
        console.warn('❌ No student ID available from login or storage');
        setLoading(false);
        return;
      }

      if (storedId) {
        setId(storedId);
      } else if (userData?.id) {
        setId(String(userData.id));
      }

      const formData = new FormData();
      formData.append('id', dynamicId);
      console.log('📤 Sending ID to API:', dynamicId);

      const response = await fetch(myConst.BASEURL + 'studentprofile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: usertoken,
        },
        body: formData,
      });
      const responseJson = await response.json();
      console.log('📥 API Response:', responseJson);

      if (responseJson.status === true) {
        const d = responseJson.data;
        setDayScholar(d.day_scholar === 1 ? 'Day Scholar' : d.day_scholar === 2 ? 'Residential' : '');
        setStudentName(d.Student_name);
        setRollNo(d.std_roll);
        setStudentClass(d.Student_class);
        setSection(d.Student_section);
        setResidental(d.Student_name);
        setDob(d.dob);
        setPhoneNum(d.phoneno);
        setStaff(d.staff);
        setFatherName(d.F_name);
        setMotherName(d.M_name);
        setParentAddress(d.Fofficeaddress);
        setParentPhnNum(d.F_mobile);
        setFoccupation(d.F_occupation);
        setProfileData(responseJson?.data);
        if (d?.studentimage) setProfilePic('http://139.59.90.236:86/images/student_image/STUDENT/' + d.studentimage);
        if (d?.fatherimage) setF_ProfilePic('http://139.59.90.236:86/images/student_image/FATHER/' + d.fatherimage);
        if (d?.motherimage) setM_ProfilePic('http://139.59.90.236:86/images/student_image/MOTHER/' + d.motherimage);
        if (d?.gaurdianimg) setG_ProfilePic('http://139.59.90.236:86/images/student_image/GUARDIAN/' + d.gaurdianimg);
      } else {
        Snackbar.show({ text: responseJson.message, duration: Snackbar.LENGTH_SHORT, backgroundColor: '#f15270' });
      }
    } catch (error) {
      console.log('ProfileApi Error:', error);
    } finally {
      setLoading(false);
    }
  }, [usertoken, userData?.id]);

  useEffect(() => {
    const init = async () => {
      const value = await AsyncStorage.getItem('@id');
      if (value) setId(value);
      ProfileApi();
    };
    init();
    const unsubscribe = navigation.addListener('focus', ProfileApi);
    return unsubscribe;
  }, [navigation, ProfileApi]);

  const getText = (title) =>
    title ? title.charAt(0).toUpperCase() + title.slice(1) : '----';

  const TABS = [
    { key: 1, label: 'Student' },
    { key: 2, label: 'Parents' },
    { key: 3, label: 'Guardian' },
  ];

  return (
    <View style={{ backgroundColor: T.pageBg, flex: 1 }}>

      {/* ── Gradient hero (fixed) ───────────────────────────────────────────── */}
      <LinearGradient
        colors={[T.gradientStart, T.gradientEnd]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={heroStyles.gradient}
      >
        {/* Decorative faint circles */}
        <View pointerEvents="none" style={heroStyles.circleTopRight} />
        <View pointerEvents="none" style={heroStyles.circleBottomLeft} />

        {/* Back arrow */}
        <View style={{ height: Platform.OS === 'ios' ? resW(8) : 0 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={heroStyles.backBtn}
        >
          <Image
            source={require('../../../assests/images/leftarrow.png')}
            style={heroStyles.backIcon}
          />
        </TouchableOpacity>

        {/* Avatar */}
        <View style={heroStyles.avatarWrap}>
          <View style={[heroStyles.avatarRing, cardShadow]}>
            <Image
              source={
                profilePic ? { uri: profilePic } : require('../../../assests/images/businessman.png')
              }
              style={heroStyles.avatar}
              onError={() => setProfilePic('')}
            />
          </View>
        </View>

        {/* Name + roll */}
        <Text style={heroStyles.name}>{studentName || 'Student'}</Text>
        <View style={heroStyles.rollPill}>
          <Text style={heroStyles.rollText}>{rollNo}</Text>
        </View>

        {/* Class / Section / Day Scholar badges */}
        <View style={heroStyles.badgeRow}>
          {studentClass ? (
            <View style={heroStyles.badge}>
              <Text style={heroStyles.badgeText}>Class {studentClass}</Text>
            </View>
          ) : null}
          {section ? (
            <View style={heroStyles.badge}>
              <Text style={heroStyles.badgeText}>Section {section}</Text>
            </View>
          ) : null}
          {dayScholar ? (
            <View style={heroStyles.badge}>
              <Text style={heroStyles.badgeText}>{dayScholar}</Text>
            </View>
          ) : null}
        </View>

        {/* Tabs */}
        <View style={heroStyles.tabRow}>
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActive(tab.key)}
                style={[
                  heroStyles.tab,
                  isActive ? heroStyles.tabActive : heroStyles.tabInactive,
                ]}
              >
                <Text
                  style={[
                    heroStyles.tabText,
                    { color: isActive ? T.primaryBlue : 'rgba(255,255,255,0.92)' },
                    isActive && { fontFamily: typeBold },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </LinearGradient>

      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: resW(6), paddingTop: resW(5) }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >

        {/* ── Student tab ─────────────────────────────────────────────────── */}
        {active === 1 && (
          <>
            <SectionCard title="General">
              <InfoRow label="Date of Birth" value={dob ? moment(dob).format('DD-MM-YYYY') : null} />
              <InfoRow label="Email ID" value={getText(profileData?.email)} />
              <InfoRow label="Gender" value={getText(profileData?.gender)} />
              <InfoRow label="Religious Belief" value={getText(profileData?.religious)} />
              <InfoRow label="Category" value={getText(profileData?.category)} last />
            </SectionCard>

            <SectionCard title="Educational Details">
              <InfoRow label="Admission No" value={profileData?.std_roll} />
              <InfoRow label="Date of Admission" value={profileData?.admission_date || null} />
              <InfoRow label="Student Type" value={profileData?.student_type} />
              <InfoRow label="APAAR ID" value={profileData?.apaar_id || null} />
              <InfoRow label="PEN ID" value={profileData?.pan_id || null} />
              <InfoRow label="Class" value={profileData?.std_class} />
              <InfoRow label="Section" value={profileData?.std_section} />
              <InfoRow label="Stream Chosen" value={profileData?.stream || null} />
              <InfoRow label="Optional Subject" value={profileData?.optional_sub || null} />
              <InfoRow label="Subject Combination" value={profileData?.subject_combination || null} />
              <InfoRow label="Class Teacher" value={getText(profileData?.staff)} last />
            </SectionCard>

            <SectionCard title="Medical Details">
              <InfoRow label="Blood Group" value={profileData?.bloodgroup} />
              <InfoRow label="Medical Condition" value={profileData?.medical_condition || null} />
              <InfoRow label="Allergies" value={profileData?.allergy || null} last />
            </SectionCard>

            <SectionCard title="Address Details">
              <SubSectionLabel label="Correspondence Address" />
              <InfoRow label="Address" value={getText(profileData?.address)} />
              <InfoRow label="City" value={getText(profileData?.city)} />
              <InfoRow label="State" value={getText(profileData?.state)} />
              <InfoRow label="Country" value={getText(profileData?.country)} />
              <InfoRow label="Pin Code" value={profileData?.pincode || null} />
              <View style={{ backgroundColor: T.divider, height: resW(0.3), marginTop: resW(2) }} />
              <SubSectionLabel label="Permanent Address" />
              <InfoRow label="Address" value={getText(profileData?.perm_address)} />
              <InfoRow label="City" value={getText(profileData?.perm_city)} />
              <InfoRow label="State" value={getText(profileData?.perm_state)} />
              <InfoRow label="Country" value={getText(profileData?.perm_country)} />
              <InfoRow label="Pin Code" value={profileData?.perm_pincode || null} last />
            </SectionCard>

            <SectionCard
              title="Previous School Details"
              onEdit={() => navigation.navigate('EditProfile', { profileData })}
            >
              <InfoRow label="School Name" value={getText(profileData?.previous_scl_name)} />
              {profileData?.prev_certificate ? (
                <View style={{ paddingHorizontal: resW(4), paddingBottom: resW(3) }}>
                  <Text style={{ color: T.textBody, fontFamily: typeMedium, fontSize: font14, marginBottom: resW(2) }}>
                    Transfer Certificate
                  </Text>
                  <Image
                    source={{ uri: 'http://139.59.90.236:86/images/student_image/prev_certificate/' + profileData.prev_certificate }}
                    resizeMode="stretch"
                    style={{ borderRadius: resW(2), height: resW(18), width: resW(18) }}
                  />
                </View>
              ) : (
                <InfoRow label="Transfer Certificate" value={null} last />
              )}
            </SectionCard>
          </>
        )}

        {/* ── Parents tab ─────────────────────────────────────────────────── */}
        {active === 2 && (
          <>
            <SectionCard title="Father's Details">
              <ParentPhoto uri={F_ProfilePic} />
              <InfoRow label="Name" value={getText(profileData?.F_name)} />
              <InfoRow label="Mobile No" value={profileData?.F_mobile || null} />
              <InfoRow label="Email ID" value={getText(profileData?.F_email)} />
              <View style={{ backgroundColor: T.divider, height: resW(0.3) }} />
              <SubSectionLabel label="Official Details" />
              <InfoRow label="Organization" value={getText(profileData?.F_organization)} />
              <InfoRow label="Occupation" value={getText(profileData?.F_occupation)} />
              <InfoRow label="Designation" value={getText(profileData?.F_designation)} />
              <InfoRow label="Office No" value={profileData?.Foficemobile || null} />
              <InfoRow label="Office Address" value={getText(profileData?.Fofficeaddress)} last />
            </SectionCard>

            <SectionCard
              title="Mother's Details"
              onEdit={() => navigation.navigate('ParentsEditProfile', { profileData })}
            >
              <ParentPhoto uri={M_ProfilePic} />
              <InfoRow label="Name" value={getText(profileData?.M_name)} />
              <InfoRow label="Mobile No" value={profileData?.M_mobile} />
              <InfoRow label="Email ID" value={getText(profileData?.M_email)} />
              <View style={{ backgroundColor: T.divider, height: resW(0.3) }} />
              <SubSectionLabel label="Official Details" />
              <InfoRow label="Organization" value={getText(profileData?.M_organization)} />
              <InfoRow label="Occupation" value={getText(profileData?.M_occupation)} />
              <InfoRow label="Designation" value={getText(profileData?.M_designation)} />
              <InfoRow label="Office No" value={profileData?.Mofficemobile || null} />
              <InfoRow label="Office Address" value={getText(profileData?.Mofficeaddress)} last />
            </SectionCard>
          </>
        )}

        {/* ── Guardian tab ────────────────────────────────────────────────── */}
        {active === 3 && (
          <SectionCard
            title="Guardian Details"
            onEdit={() => navigation.navigate('GuardianEditProfile', { profileData })}
          >
            <ParentPhoto uri={G_ProfilePic} />
            <InfoRow label="Name" value={getText(profileData?.L_name)} />
            <InfoRow label="Relation" value={getText(profileData?.L_relation)} />
            <InfoRow label="Mobile No" value={profileData?.L_mobile} />
            <InfoRow label="WhatsApp No" value={profileData?.L_whatsup_no} />
            <InfoRow label="Email ID" value={getText(profileData?.L_email)} />
            <View style={{ backgroundColor: T.divider, height: resW(0.3) }} />
            <SubSectionLabel label="Residential Details" />
            <InfoRow label="Address" value={getText(profileData?.L_address)} />
            <InfoRow label="City" value={getText(profileData?.L_city)} />
            <InfoRow label="State" value={getText(profileData?.L_state)} />
            <InfoRow label="Country" value={getText(profileData?.L_country)} />
            <InfoRow label="Pin Code" value={getText(profileData?.L_pincode)} last />
          </SectionCard>
        )}

      </ScrollView>
    </View>
  );
};

/* ─── Hero styles ────────────────────────────────────────────────────────────── */
const heroStyles = StyleSheet.create({
  gradient: {
    borderBottomLeftRadius: resW(8),
    borderBottomRightRadius: resW(8),
    overflow: 'hidden',
    paddingBottom: resW(5),
  },
  circleTopRight: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: resW(40),
    height: resW(60),
    position: 'absolute',
    right: -resW(16),
    top: -resW(16),
    width: resW(60),
  },
  circleBottomLeft: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: resW(30),
    bottom: -resW(10),
    height: resW(46),
    left: -resW(12),
    position: 'absolute',
    width: resW(46),
  },
  backBtn: {
    marginLeft: resW(3),
    marginTop: resW(1),
    paddingVertical: resW(2),
    paddingHorizontal: resW(2),
    alignSelf: 'flex-start',
  },
  backIcon: {
    height: resW(8),
    width: resW(8),
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: resW(2),
  },
  avatarRing: {
    borderColor: 'rgba(255,255,255,0.85)',
    borderRadius: resW(16),
    borderWidth: resW(1),
    padding: resW(0.5),
  },
  avatar: {
    borderRadius: resW(15),
    height: resW(28),
    width: resW(28),
  },
  name: {
    color: '#fff',
    fontFamily: typeBold,
    fontSize: font18,
    letterSpacing: 0.3,
    marginTop: resW(3),
    textAlign: 'center',
  },
  rollPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: resW(5),
    marginTop: resW(1.5),
    paddingHorizontal: resW(4),
    paddingVertical: resW(1),
  },
  rollText: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: typeMedium,
    fontSize: font14,
  },
  badgeRow: {
    columnGap: resW(2),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: resW(2.5),
    paddingHorizontal: resW(4),
    rowGap: resW(1.5),
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: resW(5),
    paddingHorizontal: resW(3),
    paddingVertical: resW(0.8),
  },
  badgeText: {
    color: '#fff',
    fontFamily: typeSemiBold,
    fontSize: font12,
  },
  tabRow: {
    columnGap: resW(3),
    flexDirection: 'row',
    marginTop: resW(4),
    paddingHorizontal: resW(4),
  },
  tab: {
    alignItems: 'center',
    borderRadius: resW(6),
    flex: 1,
    justifyContent: 'center',
    paddingVertical: resW(3),
  },
  tabActive: {
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  tabInactive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tabText: {
    fontFamily: typeMedium,
    fontSize: font16,
  },
});

export default Profile;
