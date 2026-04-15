import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  User,
  MapPin,
  School,
  Pencil,
  ChevronDown,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectDropList from '../../SelectDropList';
import DatePicker from 'react-native-date-picker';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';

const {
  resW, typeBold, typeMedium, typeSemiBold,
  font12, font14, font15, font16, font18, font20,
} = constant;

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  gradStart:   '#C100FF',
  gradEnd:     '#5B39F6',
  pageBg:      '#F5F4FF',
  cardBg:      '#FFFFFF',
  inputBg:     '#F8F7FF',
  textStrong:  '#1E1B4B',
  textBody:    '#595975',
  textMuted:   '#9CA3AF',
  divider:     '#EDE9FF',
  primary:     '#5B39F6',
  purple:      '#C100FF',
  shadow:      'rgba(94,59,249,0.10)',
  border:      '#E8E4FF',
  focusBorder: '#5B39F6',
};

const CARD_SHADOW = {
  elevation: 6,
  shadowColor: T.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 14,
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const bloodGroupList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genderList = ['Male', 'Female', 'Other'];

// ─── FormField ────────────────────────────────────────────────────────────────
const FormField = ({
  label, value, onChangeText,
  keyboardType = 'default', maxLength,
  editable = true, multiline = false, last = false,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={fld.wrap}>
      <Text style={fld.label}>{label}</Text>
      <View style={[
        fld.inputBox,
        focused && fld.inputBoxFocused,
        !editable && fld.inputBoxDisabled,
        multiline && { height: resW(24), alignItems: 'flex-start' },
      ]}>
        <TextInput
          editable={editable}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          style={[fld.input, multiline && { textAlignVertical: 'top', flex: 1, paddingTop: 4 }]}
          value={value ?? ''}
        />
      </View>
      {!last && <View style={fld.sep} />}
    </View>
  );
};

const fld = StyleSheet.create({
  wrap: { paddingHorizontal: resW(4.5) },
  label: {
    color: T.textMuted,
    fontFamily: typeMedium,
    fontSize: font12,
    letterSpacing: 0.6,
    marginBottom: resW(1.5),
    marginTop: resW(4),
    textTransform: 'uppercase',
  },
  inputBox: {
    backgroundColor: T.inputBg,
    borderColor: T.border,
    borderRadius: resW(3),
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: resW(3.5),
    paddingVertical: Platform.OS === 'ios' ? resW(3) : resW(2.5),
  },
  inputBoxFocused: { borderColor: T.focusBorder, backgroundColor: '#FFFFFF' },
  inputBoxDisabled: { backgroundColor: '#F0EFF8', borderColor: '#E8E4FF' },
  input: {
    color: T.textStrong,
    flex: 1,
    fontFamily: typeMedium,
    fontSize: font15,
    padding: 0,
  },
  sep: {
    backgroundColor: T.divider,
    height: StyleSheet.hairlineWidth,
    marginTop: resW(4),
  },
});

// ─── DropdownField ────────────────────────────────────────────────────────────
const DropdownField = ({ label, value, list, onSelect, last = false }) => (
  <View style={fld.wrap}>
    <Text style={fld.label}>{label}</Text>
    <View style={{ height: resW(13) }}>
      <SelectDropList
        list={list}
        title={value || `Select ${label}`}
        buttonExt={drp.btn}
        textExt={drp.txt}
        on_Select={onSelect}
      />
    </View>
    {!last && <View style={fld.sep} />}
  </View>
);

const drp = StyleSheet.create({
  btn: {
    height: '100%', width: '100%',
    borderWidth: 1.5, borderColor: T.border,
    backgroundColor: T.inputBg, borderRadius: resW(3),
  },
  txt: {
    color: T.textStrong,
    fontFamily: typeMedium,
    fontSize: font15,
    marginLeft: resW(1),
  },
});

// ─── SectionCard ──────────────────────────────────────────────────────────────
const SectionCard = ({ title, Icon, accentColor, children }) => (
  <View style={sec.outer}>
    <View style={sec.headerRow}>
      <View style={[sec.iconWrap, { backgroundColor: `${accentColor}18` }]}>
        <Icon color={accentColor} size={16} strokeWidth={2.2} />
      </View>
      <Text style={sec.title}>{title}</Text>
    </View>
    <View style={[sec.card, CARD_SHADOW]}>
      {children}
      <View style={{ height: resW(3) }} />
    </View>
  </View>
);

const sec = StyleSheet.create({
  outer: { marginBottom: resW(5) },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: resW(2.5),
    marginBottom: resW(2.5),
    paddingHorizontal: resW(4),
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: resW(2.5),
    height: resW(8),
    justifyContent: 'center',
    width: resW(8),
  },
  title: {
    color: T.textStrong,
    fontFamily: typeBold,
    fontSize: font16,
  },
  card: {
    backgroundColor: T.cardBg,
    borderRadius: resW(4),
    marginHorizontal: resW(4),
    overflow: 'visible',
  },
});

// ─── CertificateField ─────────────────────────────────────────────────────────
const CertificateField = ({ uri, onPress }) => (
  <View style={fld.wrap}>
    <Text style={fld.label}>Transfer Certificate</Text>
    <Pressable onPress={onPress} style={certi.btn}>
      {uri ? (
        <Image source={{ uri }} style={certi.img} resizeMode="cover" />
      ) : (
        <View style={certi.empty}>
          <View style={certi.uploadIcon}>
            <ImageIcon color={T.primary} size={22} strokeWidth={1.8} />
          </View>
          <Text style={certi.hint}>Tap to upload image</Text>
          <Text style={certi.hintSub}>JPG, PNG supported</Text>
        </View>
      )}
    </Pressable>
  </View>
);

const certi = StyleSheet.create({
  btn: {
    marginTop: resW(2),
    borderWidth: 1.5,
    borderColor: T.border,
    borderStyle: 'dashed',
    borderRadius: resW(3),
    height: resW(32),
    width: resW(40),
    overflow: 'hidden',
    backgroundColor: T.inputBg,
  },
  img: { height: '100%', width: '100%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: resW(1.5) },
  uploadIcon: {
    width: resW(10), height: resW(10), borderRadius: resW(2.5),
    backgroundColor: `${T.primary}14`,
    alignItems: 'center', justifyContent: 'center',
  },
  hint:    { color: T.textBody, fontFamily: typeMedium, fontSize: font13 },
  hintSub: { color: T.textMuted, fontFamily: typeMedium, fontSize: font12 },
});

// ─── PickerSheet (bottom sheet) ───────────────────────────────────────────────
const PickerSheet = ({ visible, onCamera, onGallery, onClose }) => (
  <Modal
    animationType="slide" transparent visible={visible}
    presentationStyle="overFullScreen" onRequestClose={onClose}
  >
    <Pressable style={psh.overlay} onPress={onClose}>
      <Pressable style={psh.sheet}>
        <View style={psh.pill} />
        <Text style={psh.heading}>Choose Photo</Text>

        <TouchableOpacity style={psh.row} onPress={onCamera} activeOpacity={0.8}>
          <LinearGradient colors={['#EDE9FF', '#F0EEFF']} style={psh.rowIcon}>
            <Camera color={T.primary} size={resW(5)} strokeWidth={2} />
          </LinearGradient>
          <View style={psh.rowText}>
            <Text style={psh.rowTitle}>Take Photo</Text>
            <Text style={psh.rowSub}>Use your camera</Text>
          </View>
        </TouchableOpacity>

        <View style={psh.divider} />

        <TouchableOpacity style={psh.row} onPress={onGallery} activeOpacity={0.8}>
          <LinearGradient colors={['#EDE9FF', '#F0EEFF']} style={psh.rowIcon}>
            <ImageIcon color={T.purple} size={resW(5)} strokeWidth={2} />
          </LinearGradient>
          <View style={psh.rowText}>
            <Text style={psh.rowTitle}>Pick from Gallery</Text>
            <Text style={psh.rowSub}>Choose from your photos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={psh.cancel} onPress={onClose} activeOpacity={0.8}>
          <Text style={psh.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  </Modal>
);

const psh = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(15,10,40,0.45)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: resW(7),
    borderTopRightRadius: resW(7),
    paddingBottom: Platform.OS === 'ios' ? resW(9) : resW(6),
    paddingHorizontal: resW(5),
    paddingTop: resW(3),
  },
  pill: {
    alignSelf: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: resW(1.5),
    height: resW(1.2),
    marginBottom: resW(4),
    width: resW(12),
  },
  heading: {
    color: T.textStrong,
    fontFamily: typeBold,
    fontSize: font18,
    marginBottom: resW(4),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: resW(3.5),
    paddingVertical: resW(3),
  },
  rowIcon: {
    alignItems: 'center',
    borderRadius: resW(3),
    height: resW(12),
    justifyContent: 'center',
    width: resW(12),
  },
  rowText: { flex: 1 },
  rowTitle: { color: T.textStrong, fontFamily: typeSemiBold, fontSize: font15 },
  rowSub:   { color: T.textMuted,  fontFamily: typeMedium,   fontSize: font12, marginTop: resW(0.5) },
  divider:  { backgroundColor: T.divider, height: StyleSheet.hairlineWidth, marginVertical: resW(1) },
  cancel: {
    alignItems: 'center',
    backgroundColor: T.inputBg,
    borderRadius: resW(3),
    marginTop: resW(5),
    paddingVertical: resW(3.5),
  },
  cancelTxt: { color: T.textBody, fontFamily: typeSemiBold, fontSize: font15 },
});

// ─── Main Component ───────────────────────────────────────────────────────────
const EditProfile = ({ navigation, route }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();
  const profileData = route.params.profileData;

  // ── UI state ──
  const [isVisiblPickerDialog, setIsVisiblPickerDialog] = useState(false);
  const [certifModal,  setCertifModal]  = useState(false);
  const [openPicker,   setOpenPicker]   = useState(false);
  const [emptyLoader,  setEmptyLoader]  = useState(false);

  // ── Form state ──
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [profilePic,  setProfilePic]  = useState('');
  const [profilePicData, setProfilePicData] = useState([]);
  const [isEdit,      setIsEdit]      = useState(false);
  const [gender,      setGender]      = useState('');
  const [dob,         setDob]         = useState('');
  const [religious,   setReligious]   = useState('');
  const [category,    setCategory]    = useState('');
  const [bloodGroup,  setBloodGroup]  = useState('');
  const [medicalCond, setMedicalCond] = useState('');
  const [allergy,     setAllergy]     = useState('');
  const [address,     setAddress]     = useState('');
  const [city,        setCity]        = useState('');
  const [state,       setState]       = useState('');
  const [country,     setCountry]     = useState('');
  const [pincode,     setPincode]     = useState('');
  const [per_Address, setPer_Address] = useState('');
  const [per_city,    setper_City]    = useState('');
  const [per_state,   setPer_State]   = useState('');
  const [per_country, setPer_Country] = useState('');
  const [per_pincode, setper_Pincode] = useState('');
  const [schoolName,  setSchoolName]  = useState('');
  const [certif_Copy, setCertif_Copy] = useState('');
  const [certifEdit,  setCertiEdit]   = useState(false);
  const [certifData,  setCertifData]  = useState([]);

  // ── Seed form from route params ──
  useEffect(() => {
    setName(profileData?.name ?? '');
    setEmail(profileData?.email ?? '');
    setDob(profileData?.dob ?? '');
    setCategory(profileData?.category ?? '');
    setReligious(profileData?.religious ?? '');
    setMedicalCond(profileData?.medical_condition ?? '');
    setAllergy(profileData?.allergy ?? '');
    setAddress(profileData?.address ?? '');
    setCity(profileData?.city ?? '');
    setState(profileData?.state ?? '');
    setCountry(profileData?.country ?? '');
    setPincode(profileData?.pincode ?? '');
    setPer_Address(profileData?.perm_address ?? '');
    setper_City(profileData?.perm_city ?? '');
    setPer_State(profileData?.perm_state ?? '');
    setPer_Country(profileData?.perm_country ?? '');
    setper_Pincode(profileData?.perm_pincode ?? '');
    setSchoolName(profileData?.previous_scl_name ?? '');

    if (profileData?.prev_certificate) {
      setCertif_Copy('http://139.59.90.236:86/images/student_image/prev_certificate/' + profileData.prev_certificate);
    }
    if (profileData?.studentimage) {
      setProfilePic('http://139.59.90.236:86/images/student_image/STUDENT/' + profileData.studentimage);
    }
    if (profileData?.bloodgroup) {
      setBloodGroup(profileData.bloodgroup);
    }
    if (profileData?.gender) {
      const g = profileData.gender;
      const match = genderList.find(s => s.toLowerCase() === g.toLowerCase());
      if (match) setGender(match);
    }
  }, []);

  // ── Hardware back ──
  const handleBackPress = useCallback(() => {
    navigation.navigate('Profile');
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  // ── Image picker ──
  const pickImage = (type, onSuccess, onDone) => {
    const options = {
      mediaType: 'photo', quality: 1,
      maxWidth: 0, maxHeight: 0,
      includeBase64: false, cameraType: 'back', selectionLimit: 1,
    };
    const launch = type === 'Camera' ? launchCamera : launchImageLibrary;
    launch(options, (res) => {
      try { onSuccess(res); } catch (e) { console.log(e); }
      onDone();
    });
  };

  const selectFile = (type) =>
    pickImage(type,
      (r) => { setProfilePic(r.assets[0].uri); setProfilePicData(r); setIsEdit(true); },
      () => setIsVisiblPickerDialog(false),
    );

  const selectCertFile = (type) =>
    pickImage(type,
      (r) => { setCertif_Copy(r.assets[0].uri); setCertifData(r); setCertiEdit(true); },
      () => setCertifModal(false),
    );

  // ── Submit ──
  const fn_UpdateProfile = async () => {
    setEmptyLoader(true);
    const paramData = {
      id: profileData?.id,
      bloodgroup: bloodGroup,
      phoneno: profileData?.phoneno,
      address, religious, category, gender,
      allergy, medical_condition: medicalCond,
      city, state, pincode, country,
      perm_address: per_Address, perm_pincode: per_pincode,
      perm_city: per_city, perm_state: per_state, perm_country: per_country,
      previous_scl_name: schoolName,
      ...(isEdit && {
        studentimage: {
          uri:  profilePicData?.assets[0].uri,
          type: profilePicData?.assets[0].type,
          name: profilePicData?.assets[0].fileName,
        },
      }),
      ...(certifEdit && {
        prev_certificate: {
          uri:  certifData?.assets[0].uri,
          type: certifData?.assets[0].type,
          name: certifData?.assets[0].fileName,
        },
      }),
    };

    const formData = new FormData();
    Object.entries(paramData).forEach(([k, v]) => {
      if (v !== null && v !== undefined) formData.append(k, v);
    });

    fetch(myConst.BASEURL + 'updateStudentProfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: usertoken,
      },
      body: formData,
    })
      .then(r => r.json())
      .then(async (json) => {
        if (json.status === true) {
          await AsyncStorage.setItem('userData', JSON.stringify(json?.data));
          navigation.goBack();
        }
      })
      .catch(e => console.log(JSON.stringify(e)))
      .finally(() => setEmptyLoader(false));
  };

  // ── Render ──
  const avatarLetter = (name || 'S').charAt(0).toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: T.pageBg }}>

      {/* ── Gradient Header ─────────────────────────────────────────────── */}
      <LinearGradient
        colors={[T.gradStart, T.gradEnd]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={[hdr.gradient, { paddingTop: insets.top + 12 }]}
      >
        {/* Decorative circles */}
        <View style={hdr.circleA} pointerEvents="none" />
        <View style={hdr.circleB} pointerEvents="none" />

        {/* Nav row */}
        <View style={hdr.navRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={hdr.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="#FFFFFF" size={22} strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={hdr.navTitle}>Edit Profile</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Avatar hero — sits at bottom of gradient, overlaps card below */}
        <View style={hdr.avatarHero}>
          <Pressable
            onPress={() => setIsVisiblPickerDialog(true)}
            style={hdr.avatarPressable}
          >
            {profilePic ? (
              <Image
                source={{ uri: profilePic }}
                style={hdr.avatarImg}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.15)']}
                style={[hdr.avatarImg, hdr.avatarFallback]}
              >
                <Text style={hdr.avatarLetter}>{avatarLetter}</Text>
              </LinearGradient>
            )}
            {/* Edit badge */}
            <View style={hdr.editBadge}>
              <LinearGradient
                colors={['#FFFFFF', '#EDE9FF']}
                style={hdr.editBadgeGrad}
              >
                <Pencil color={T.primary} size={12} strokeWidth={2.5} />
              </LinearGradient>
            </View>
          </Pressable>
          <Text style={hdr.avatarName} numberOfLines={1}>{name || 'Student'}</Text>
          <Text style={hdr.avatarRoll}>{profileData?.std_roll || ''}</Text>
        </View>
      </LinearGradient>

      {/* ── Scrollable Form ─────────────────────────────────────────────── */}
      <ScrollView
        contentContainerStyle={[
          scrl.content,
          { paddingBottom: insets.bottom + resW(12) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* ── Personal Info ── */}
        <SectionCard title="Personal Info" Icon={User} accentColor={T.purple}>
          <FormField label="Date of Birth" value={dob}  onChangeText={setDob}  editable={false} />
          <FormField label="Email ID"      value={email} onChangeText={setEmail} keyboardType="email-address" />
          <DropdownField label="Gender" value={gender} list={genderList}
            onSelect={d => setGender(d)} />
          <FormField label="Religious" value={religious} onChangeText={setReligious} editable={false} />
          <FormField label="Category"  value={category}  onChangeText={setCategory}  editable={false} />
          <DropdownField label="Blood Group" value={bloodGroup} list={bloodGroupList}
            onSelect={d => setBloodGroup(d)} />
          <FormField label="Medical Condition" value={medicalCond}
            onChangeText={setMedicalCond} multiline />
          <FormField label="Allergies" value={allergy} onChangeText={setAllergy} last />
        </SectionCard>

        {/* ── Correspondence Address ── */}
        <SectionCard title="Correspondence Address" Icon={MapPin} accentColor={T.primary}>
          <FormField label="Address" value={address} onChangeText={setAddress} multiline />
          <FormField label="City"    value={city}    onChangeText={setCity} />
          <FormField label="State"   value={state}   onChangeText={setState} />
          <FormField label="Country" value={country} onChangeText={setCountry} />
          <FormField label="Pincode" value={pincode} onChangeText={setPincode}
            keyboardType="numeric" maxLength={6} last />
        </SectionCard>

        {/* ── Permanent Address ── */}
        <SectionCard title="Permanent Address" Icon={MapPin} accentColor={T.purple}>
          <FormField label="Address" value={per_Address} onChangeText={setPer_Address} multiline />
          <FormField label="City"    value={per_city}    onChangeText={setper_City} />
          <FormField label="State"   value={per_state}   onChangeText={setPer_State} />
          <FormField label="Country" value={per_country} onChangeText={setPer_Country} />
          <FormField label="Pincode" value={per_pincode} onChangeText={setper_Pincode}
            keyboardType="numeric" maxLength={6} last />
        </SectionCard>

        {/* ── Previous School ── */}
        <SectionCard title="Previous School" Icon={School} accentColor={T.primary}>
          <FormField label="School Name" value={schoolName} onChangeText={setSchoolName} last />
          <CertificateField uri={certif_Copy} onPress={() => setCertifModal(true)} />
        </SectionCard>

        {/* ── Save Button ── */}
        <LinearGradient
          colors={[T.gradStart, T.gradEnd]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={btn.gradient}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={fn_UpdateProfile}
            style={btn.inner}
          >
            <Text style={btn.label}>Save Changes</Text>
          </TouchableOpacity>
        </LinearGradient>

      </ScrollView>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <PickerSheet
        visible={isVisiblPickerDialog}
        onCamera={() => selectFile('Camera')}
        onGallery={() => selectFile('Gallery')}
        onClose={() => setIsVisiblPickerDialog(false)}
      />
      <PickerSheet
        visible={certifModal}
        onCamera={() => selectCertFile('Camera')}
        onGallery={() => selectCertFile('Gallery')}
        onClose={() => setCertifModal(false)}
      />

      {/* Loading overlay */}
      <Modal animationType="fade" transparent visible={emptyLoader} presentationStyle="overFullScreen">
        <View style={ldr.overlay}>
          <View style={ldr.card}>
            <ActivityIndicator color={T.primary} size="large" />
            <Text style={ldr.txt}>Saving changes…</Text>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      <DatePicker
        date={new Date()} open={openPicker} mode="date" modal
        placeholder="Date Of Birth" format="YYYY-MM-DD"
        confirmBtnText="Confirm" cancelBtnText="Cancel" showIcon={false}
        onConfirm={date => { console.log(date); setOpenPicker(false); }}
        onCancel={() => setOpenPicker(false)}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const font13 = resW(3.3); // local constant — not in the imported set

const hdr = StyleSheet.create({
  gradient: {
    paddingHorizontal: 16,
    paddingBottom: resW(10),
    overflow: 'hidden',
  },
  circleA: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: resW(30),
    height: resW(48),
    position: 'absolute',
    right: -resW(10),
    top: -resW(10),
    width: resW(48),
  },
  circleB: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: resW(20),
    height: resW(32),
    left: -resW(8),
    position: 'absolute',
    bottom: resW(8),
    width: resW(32),
  },
  navRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: resW(5),
  },
  backBtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  navTitle: {
    color: '#FFFFFF',
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: font18,
    textAlign: 'center',
  },
  avatarHero: {
    alignItems: 'center',
  },
  avatarPressable: {
    alignItems: 'flex-end',
  },
  avatarImg: {
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: resW(14),
    borderWidth: 3,
    height: resW(27),
    width: resW(27),
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontFamily: constant.typeBold,
    fontSize: font20,
  },
  editBadge: {
    bottom: 0,
    position: 'absolute',
    right: -resW(1),
  },
  editBadgeGrad: {
    alignItems: 'center',
    borderRadius: resW(4),
    height: resW(7.5),
    justifyContent: 'center',
    width: resW(7.5),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  avatarName: {
    color: '#FFFFFF',
    fontFamily: constant.typeBold,
    fontSize: font16,
    marginTop: resW(2.5),
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  avatarRoll: {
    color: 'rgba(255,255,255,0.75)',
    fontFamily: typeMedium,
    fontSize: font13,
    marginTop: resW(0.8),
  },
});

const scrl = StyleSheet.create({
  content: {
    paddingTop: resW(6),
  },
});

const btn = StyleSheet.create({
  gradient: {
    borderRadius: resW(3.5),
    marginHorizontal: resW(4),
    marginTop: resW(2),
    overflow: 'hidden',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: resW(4.2),
  },
  label: {
    color: '#FFFFFF',
    fontFamily: typeBold,
    fontSize: font16,
    letterSpacing: 0.4,
  },
});

const ldr = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15,10,40,0.4)',
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: resW(4),
    flexDirection: 'row',
    gap: resW(3),
    paddingHorizontal: resW(8),
    paddingVertical: resW(5),
    elevation: 8,
    shadowColor: T.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  txt: {
    color: T.textStrong,
    fontFamily: typeMedium,
    fontSize: font15,
  },
});

export default EditProfile;
