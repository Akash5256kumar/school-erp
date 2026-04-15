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
import { ArrowLeft, Camera, Image as ImageIcon } from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';

const { resW, typeBold, typeMedium, typeSemiBold, typeRegular,
  font12, font14, font15, font16, font18 } = constant;

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  gradStart:  '#C100FF',
  gradEnd:    '#5B39F6',
  pageBg:     '#F5F4FF',
  cardBg:     '#FFFFFF',
  inputBg:    '#F8F7FF',
  textStrong: '#1E1B4B',
  textBody:   '#595975',
  textMuted:  '#9CA3AF',
  divider:    '#EDE9FF',
  primary:    '#5B39F6',
  purple:     '#C100FF',
  shadow:     'rgba(94,59,249,0.10)',
  border:     '#E8E4FF',
  focusBorder:'#5B39F6',
};

const cardShadow = {
  elevation: 5,
  shadowColor: T.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 12,
};

// ─── FormField ────────────────────────────────────────────────────────────────
const FormField = ({ label, value, onChangeText, keyboardType = 'default',
  maxLength, multiline = false, last = false }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={fld.wrap}>
      <Text style={fld.label}>{label}</Text>
      <View style={[fld.inputWrap, focused && fld.inputWrapFocused,
        multiline && { height: resW(22) }]}>
        <TextInput
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          style={[fld.input, multiline && { textAlignVertical: 'top', height: '100%' }]}
          value={value}
        />
      </View>
      {!last && <View style={fld.divider} />}
    </View>
  );
};

const fld = StyleSheet.create({
  wrap: { paddingHorizontal: resW(4) },
  label: {
    color: T.textMuted, fontFamily: typeMedium, fontSize: font12,
    letterSpacing: 0.5, marginBottom: resW(1.2), marginTop: resW(3.5),
    textTransform: 'uppercase',
  },
  inputWrap: {
    backgroundColor: T.inputBg, borderColor: T.border,
    borderRadius: resW(3), borderWidth: 1.5,
    paddingHorizontal: resW(3.5), paddingVertical: resW(2.5),
  },
  inputWrapFocused: { borderColor: T.focusBorder, backgroundColor: '#FFFFFF' },
  input: { color: T.textStrong, fontFamily: typeMedium, fontSize: font15, padding: 0 },
  divider: { backgroundColor: T.divider, height: StyleSheet.hairlineWidth, marginTop: resW(3.5) },
});

// ─── SectionCard ──────────────────────────────────────────────────────────────
const SectionCard = ({ title, accentColor, children }) => (
  <View style={sec.outer}>
    <View style={sec.titleRow}>
      <View style={[sec.bar, { backgroundColor: accentColor }]} />
      <Text style={sec.title}>{title}</Text>
    </View>
    <View style={[sec.card, cardShadow]}>{children}</View>
  </View>
);

const sec = StyleSheet.create({
  outer:    { marginBottom: resW(5) },
  titleRow: { alignItems: 'center', columnGap: resW(2.5), flexDirection: 'row',
    marginBottom: resW(2.5), paddingHorizontal: resW(4) },
  bar:   { borderRadius: resW(1), height: resW(5), width: resW(1) },
  title: { color: T.textStrong, fontFamily: typeBold, fontSize: font18 },
  card:  { backgroundColor: T.cardBg, borderRadius: resW(4),
    marginHorizontal: resW(4), overflow: 'hidden', paddingBottom: resW(3) },
});

// ─── AvatarPicker ─────────────────────────────────────────────────────────────
const AvatarPicker = ({ uri, onPress }) => (
  <View style={av.outer}>
    <Pressable onPress={onPress} style={av.pressable}>
      <View style={[av.ring, cardShadow]}>
        <Image
          resizeMode="cover"
          source={uri ? { uri } : require('../../../assests/images/businessman.png')}
          style={av.img}
        />
      </View>
      <LinearGradient colors={[T.gradStart, T.gradEnd]} style={av.badge}>
        <Image source={constant.Icons.edit} style={av.editIcon} tintColor="#fff" />
      </LinearGradient>
    </Pressable>
  </View>
);

const av = StyleSheet.create({
  outer:    { alignItems: 'center', paddingBottom: resW(3), paddingTop: resW(5) },
  pressable:{ alignItems: 'flex-end' },
  ring:     { borderColor: T.divider, borderRadius: resW(14), borderWidth: resW(0.8), padding: resW(0.5) },
  img:      { borderRadius: resW(13), height: resW(26), width: resW(26) },
  badge:    { alignItems: 'center', borderRadius: resW(5), bottom: 0, height: resW(8),
    justifyContent: 'center', position: 'absolute', right: -resW(1), width: resW(8) },
  editIcon: { height: resW(4), width: resW(4) },
});

// ─── ImagePickerSheet ─────────────────────────────────────────────────────────
const ImagePickerSheet = ({ visible, onCamera, onGallery, onClose }) => (
  <Modal animationType="slide" onRequestClose={onClose}
    presentationStyle="overFullScreen" transparent visible={visible}>
    <Pressable onPress={onClose} style={sht.overlay}>
      <Pressable style={sht.sheet}>
        <View style={sht.handle} />
        <Text style={sht.title}>Choose Photo</Text>
        <Pressable onPress={onCamera} style={sht.option}>
          <LinearGradient colors={['#EDE9FF', '#F5F3FF']} style={sht.optIcon}>
            <Camera color={T.primary} size={resW(5)} strokeWidth={2} />
          </LinearGradient>
          <Text style={sht.optText}>Take Photo</Text>
        </Pressable>
        <View style={sht.divider} />
        <Pressable onPress={onGallery} style={sht.option}>
          <LinearGradient colors={['#EDE9FF', '#F5F3FF']} style={sht.optIcon}>
            <ImageIcon color={T.purple} size={resW(5)} strokeWidth={2} />
          </LinearGradient>
          <Text style={sht.optText}>Pick from Gallery</Text>
        </Pressable>
        <Pressable onPress={onClose} style={sht.cancel}>
          <Text style={sht.cancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const sht = StyleSheet.create({
  overlay: { backgroundColor: 'rgba(15,10,40,0.4)', flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff', borderTopLeftRadius: resW(6),
    borderTopRightRadius: resW(6),
    paddingBottom: Platform.OS === 'ios' ? resW(8) : resW(5),
    paddingHorizontal: resW(5), paddingTop: resW(3),
  },
  handle: { alignSelf: 'center', backgroundColor: '#D1D5DB', borderRadius: resW(1),
    height: resW(1), marginBottom: resW(3), width: resW(10) },
  title:  { color: T.textStrong, fontFamily: typeBold, fontSize: font16,
    marginBottom: resW(3), textAlign: 'center' },
  option: { alignItems: 'center', columnGap: resW(3), flexDirection: 'row', paddingVertical: resW(3) },
  optIcon:{ alignItems: 'center', borderRadius: resW(3), height: resW(11),
    justifyContent: 'center', width: resW(11) },
  optText:{ color: T.textStrong, fontFamily: typeMedium, fontSize: font16 },
  divider:{ backgroundColor: T.divider, height: StyleSheet.hairlineWidth },
  cancel: { alignItems: 'center', backgroundColor: T.inputBg, borderRadius: resW(3),
    marginTop: resW(4), paddingVertical: resW(3.5) },
  cancelText: { color: T.textBody, fontFamily: typeSemiBold, fontSize: font16 },
});

// ─── Main Component ───────────────────────────────────────────────────────────
const GuardianEditProfile = ({ navigation, route }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();
  const profileData = route.params.profileData;

  const [isVisiblPickerDialog, setIsVisiblPickerDialog] = useState(false);
  const [emptyLoader, setEmptyLoader] = useState(false);

  const [name,       setName]       = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [profilePicData, setProfilePicData] = useState([]);
  const [isEdit,     setIsEdit]     = useState(false);
  const [relation,   setRelation]   = useState('');
  const [mobile,     setMobile]     = useState('');
  const [whatsAppNo, setWhatsAppNo] = useState('');
  const [address,    setAddress]    = useState('');
  const [city,       setCity]       = useState('');
  const [state,      setState]      = useState('');
  const [country,    setCountry]    = useState('');
  const [pincode,    setPincode]    = useState('');

  useEffect(() => {
    setName(profileData?.L_name);
    setMobile(profileData?.L_mobile);
    setWhatsAppNo(profileData?.L_whatsup_no);
    setRelation(profileData?.L_relation);
    setAddress(profileData?.L_address);
    setCity(profileData?.L_city);
    setState(profileData?.L_state);
    setCountry(profileData?.L_country);
    setPincode(profileData?.L_pincode);
    if (profileData?.gaurdianimg) {
      setProfilePic('http://139.59.90.236:86/images/student_image/GUARDIAN/' + profileData.gaurdianimg);
    }
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.navigate('Profile');
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  const showMessage = (message) =>
    Snackbar.show({ text: message, duration: Snackbar.LENGTH_SHORT, backgroundColor: '#f15270' });

  const pickImage = (type, onDone) => {
    const options = {
      mediaType: 'photo', quality: 1, maxWidth: 0, maxHeight: 0,
      includeBase64: false, cameraType: 'back', selectionLimit: 1,
    };
    const launcher = type === 'Camera' ? launchCamera : launchImageLibrary;
    launcher(options, (response) => {
      try {
        setProfilePic(response.assets[0].uri);
        setProfilePicData(response);
        setIsEdit(true);
      } catch (e) { console.log(e); }
      onDone();
    });
  };

  const fn_UpdateProfile = () => {
    if (!name) return showMessage('Please enter Name');
    if (!relation) return showMessage('Please enter Relation');

    setEmptyLoader(true);
    const paramData = {
      id: profileData?.id,
      L_address: address, L_city: city, L_country: country,
      L_mobile: mobile, L_name: name, L_pincode: pincode,
      L_relation: relation, L_state: state, L_whatsup_no: whatsAppNo,
      ...(isEdit && { gaurdianimg: { uri: profilePicData?.assets[0].uri,
        type: profilePicData?.assets[0].type, name: profilePicData?.assets[0].fileName } }),
    };
    const formData = new FormData();
    Object.entries(paramData).forEach(([k, v]) => {
      if (v !== null && v !== undefined) formData.append(k, v);
    });

    fetch(myConst.BASEURL + 'updateStudentProfile', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: usertoken },
      body: formData,
    })
      .then(r => r.json())
      .then((json) => {
        setEmptyLoader(false);
        if (json.status === true) {
          navigation.goBack();
        } else {
          setTimeout(() => showMessage(json.message), 500);
        }
      })
      .catch(e => console.log(JSON.stringify(e)))
      .finally(() => setEmptyLoader(false));
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
          <Text style={hdr.title}>Guardian Profile</Text>
          <View style={hdr.spacer} />
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ paddingBottom: resW(12), paddingTop: resW(5) }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Avatar ── */}
        <AvatarPicker uri={profilePic} onPress={() => setIsVisiblPickerDialog(true)} />

        {/* ── Guardian Info ── */}
        <SectionCard title="Guardian Details" accentColor={T.purple}>
          <FormField label="Name"       value={name}       onChangeText={setName} />
          <FormField label="Relation"   value={relation}   onChangeText={setRelation} />
          <FormField label="Mobile No." value={mobile}     onChangeText={setMobile}
            keyboardType="numeric" maxLength={10} />
          <FormField label="WhatsApp No." value={whatsAppNo} onChangeText={setWhatsAppNo}
            keyboardType="numeric" maxLength={10} last />
        </SectionCard>

        {/* ── Address ── */}
        <SectionCard title="Address" accentColor={T.primary}>
          <FormField label="Address" value={address}  onChangeText={setAddress}  multiline />
          <FormField label="City"    value={city}     onChangeText={setCity} />
          <FormField label="State"   value={state}    onChangeText={setState} />
          <FormField label="Country" value={country}  onChangeText={setCountry} />
          <FormField label="Pincode" value={pincode}  onChangeText={setPincode}
            keyboardType="numeric" maxLength={6} last />
        </SectionCard>

        {/* ── Submit ── */}
        <LinearGradient
          colors={[T.gradStart, T.gradEnd]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={sub.gradient}
        >
          <Pressable onPress={fn_UpdateProfile} style={sub.btn}>
            <Text style={sub.text}>Save Changes</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>

      {/* Modals */}
      <ImagePickerSheet visible={isVisiblPickerDialog}
        onCamera={() => pickImage('Camera', () => setIsVisiblPickerDialog(false))}
        onGallery={() => pickImage('Gallery', () => setIsVisiblPickerDialog(false))}
        onClose={() => setIsVisiblPickerDialog(false)} />

      <Modal animationType="fade" presentationStyle="overFullScreen" transparent visible={emptyLoader}>
        <View style={ldr.overlay}>
          <View style={ldr.card}>
            <ActivityIndicator color={T.primary} size="large" />
            <Text style={ldr.text}>Saving...</Text>
          </View>
        </View>
      </Modal>
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
});

const sub = StyleSheet.create({
  gradient: { borderRadius: resW(3), marginHorizontal: resW(4), marginTop: resW(2), overflow: 'hidden' },
  btn:  { alignItems: 'center', justifyContent: 'center', paddingVertical: resW(4) },
  text: { color: '#fff', fontFamily: typeBold, fontSize: font16, letterSpacing: 0.3 },
});

const ldr = StyleSheet.create({
  overlay: { alignItems: 'center', backgroundColor: 'rgba(15,10,40,0.35)', flex: 1, justifyContent: 'center' },
  card: { alignItems: 'center', backgroundColor: '#fff', borderRadius: resW(4),
    flexDirection: 'row', columnGap: resW(3), paddingHorizontal: resW(8), paddingVertical: resW(5) },
  text: { color: T.textStrong, fontFamily: typeMedium, fontSize: font16 },
});

export default GuardianEditProfile;
