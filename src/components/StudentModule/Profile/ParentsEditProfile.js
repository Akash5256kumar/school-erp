import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import Snackbar from 'react-native-snackbar';

import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

const {
  resW,
  typeBold,
  typeMedium,
  typeSemiBold,
  typeRegular,
  font12,
  font14,
  font15,
  font16,
  font18,
  font20,
  whiteColor,
  blackColor,
  baseColor,
} = constant;

/* ─── Theme ─────────────────────────────────────────────────────────────────── */
const T = {
  gradStart: '#C100FF',
  gradEnd: '#5B39F6',
  pageBg: '#F5F4FF',
  cardBg: '#FFFFFF',
  inputBg: '#F8F7FF',
  textStrong: '#1E1B4B',
  textBody: '#595975',
  textMuted: '#9CA3AF',
  divider: '#EDE9FF',
  primary: '#5B39F6',
  purple: '#C100FF',
  shadow: 'rgba(94, 59, 249, 0.10)',
  border: '#E8E4FF',
  focusBorder: '#5B39F6',
};

const cardShadow = {
  elevation: 6,
  shadowColor: T.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 12,
};

/* ─── FormField ──────────────────────────────────────────────────────────────── */
const FormField = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  last = false,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={fieldStyles.wrap}>
      <Text style={fieldStyles.label}>{label}</Text>
      <View
        style={[
          fieldStyles.inputWrap,
          focused && fieldStyles.inputWrapFocused,
        ]}
      >
        <TextInput
          keyboardType={keyboardType}
          maxLength={maxLength}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          style={fieldStyles.input}
          value={value}
        />
      </View>
      {!last && <View style={fieldStyles.divider} />}
    </View>
  );
};

const fieldStyles = StyleSheet.create({
  wrap: {
    paddingHorizontal: resW(4),
  },
  label: {
    color: T.textMuted,
    fontFamily: typeMedium,
    fontSize: font12,
    letterSpacing: 0.5,
    marginBottom: resW(1.2),
    marginTop: resW(3.5),
    textTransform: 'uppercase',
  },
  inputWrap: {
    backgroundColor: T.inputBg,
    borderColor: T.border,
    borderRadius: resW(3),
    borderWidth: 1.5,
    paddingHorizontal: resW(3.5),
    paddingVertical: resW(2.5),
  },
  inputWrapFocused: {
    borderColor: T.focusBorder,
    backgroundColor: '#FFFFFF',
  },
  input: {
    color: T.textStrong,
    fontFamily: typeMedium,
    fontSize: font15,
    padding: 0,
  },
  divider: {
    backgroundColor: T.divider,
    height: StyleSheet.hairlineWidth,
    marginTop: resW(3.5),
  },
});

/* ─── AvatarPicker ───────────────────────────────────────────────────────────── */
const AvatarPicker = ({ uri, onPress }) => (
  <View style={avatarStyles.outer}>
    <Pressable onPress={onPress} style={avatarStyles.pressable}>
      <View style={[avatarStyles.ring, cardShadow]}>
        <Image
          resizeMode="cover"
          source={
            uri
              ? { uri }
              : require('../../../assests/images/businessman.png')
          }
          style={avatarStyles.img}
        />
      </View>
      {/* Edit badge */}
      <LinearGradient
        colors={[T.gradStart, T.gradEnd]}
        style={avatarStyles.badge}
      >
        <Image
          source={constant.Icons.edit}
          style={avatarStyles.editIcon}
          tintColor="#fff"
        />
      </LinearGradient>
    </Pressable>
  </View>
);

const avatarStyles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    paddingBottom: resW(3),
    paddingTop: resW(4),
  },
  pressable: {
    alignItems: 'flex-end',
  },
  ring: {
    borderColor: T.divider,
    borderRadius: resW(14),
    borderWidth: resW(0.8),
    padding: resW(0.5),
  },
  img: {
    borderRadius: resW(13),
    height: resW(26),
    width: resW(26),
  },
  badge: {
    alignItems: 'center',
    borderRadius: resW(5),
    bottom: 0,
    height: resW(8),
    justifyContent: 'center',
    position: 'absolute',
    right: -resW(1),
    width: resW(8),
  },
  editIcon: {
    height: resW(4),
    width: resW(4),
  },
});

/* ─── SectionCard ────────────────────────────────────────────────────────────── */
const SectionCard = ({ title, accentColor, children }) => (
  <View style={sectionStyles.outer}>
    {/* Section title */}
    <View style={sectionStyles.titleRow}>
      <View style={[sectionStyles.bar, { backgroundColor: accentColor }]} />
      <Text style={sectionStyles.title}>{title}</Text>
    </View>
    {/* Card body */}
    <View style={[sectionStyles.card, cardShadow]}>{children}</View>
  </View>
);

const sectionStyles = StyleSheet.create({
  outer: {
    marginBottom: resW(5),
  },
  titleRow: {
    alignItems: 'center',
    columnGap: resW(2.5),
    flexDirection: 'row',
    marginBottom: resW(2.5),
    paddingHorizontal: resW(4),
  },
  bar: {
    borderRadius: resW(1),
    height: resW(5),
    width: resW(1),
  },
  title: {
    color: T.textStrong,
    fontFamily: typeBold,
    fontSize: font18,
  },
  card: {
    backgroundColor: T.cardBg,
    borderRadius: resW(4),
    marginHorizontal: resW(4),
    overflow: 'hidden',
    paddingBottom: resW(3),
  },
});

/* ─── ImagePickerSheet ───────────────────────────────────────────────────────── */
const ImagePickerSheet = ({ visible, onCamera, onGallery, onClose }) => (
  <Modal
    animationType="slide"
    onRequestClose={onClose}
    presentationStyle="overFullScreen"
    transparent
    visible={visible}
  >
    <Pressable
      onPress={onClose}
      style={sheetStyles.overlay}
    >
      <Pressable style={sheetStyles.sheet}>
        <View style={sheetStyles.handle} />
        <Text style={sheetStyles.sheetTitle}>Choose Photo</Text>

        <Pressable onPress={onCamera} style={sheetStyles.option}>
          <LinearGradient
            colors={['#EDE9FF', '#F5F3FF']}
            style={sheetStyles.optionIcon}
          >
            <Image
              source={constant.Icons.edit}
              style={{ height: resW(5), width: resW(5) }}
              tintColor={T.primary}
            />
          </LinearGradient>
          <Text style={sheetStyles.optionText}>Take Photo</Text>
        </Pressable>

        <View style={sheetStyles.optionDivider} />

        <Pressable onPress={onGallery} style={sheetStyles.option}>
          <LinearGradient
            colors={['#EDE9FF', '#F5F3FF']}
            style={sheetStyles.optionIcon}
          >
            <Image
              source={constant.Icons.edit}
              style={{ height: resW(5), width: resW(5) }}
              tintColor={T.purple}
            />
          </LinearGradient>
          <Text style={sheetStyles.optionText}>Pick from Gallery</Text>
        </Pressable>

        <Pressable onPress={onClose} style={sheetStyles.cancelBtn}>
          <Text style={sheetStyles.cancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const sheetStyles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(15, 10, 40, 0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: resW(6),
    borderTopRightRadius: resW(6),
    paddingBottom: Platform.OS === 'ios' ? resW(8) : resW(5),
    paddingHorizontal: resW(5),
    paddingTop: resW(3),
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#D1D5DB',
    borderRadius: resW(1),
    height: resW(1),
    marginBottom: resW(3),
    width: resW(10),
  },
  sheetTitle: {
    color: T.textStrong,
    fontFamily: typeBold,
    fontSize: font16,
    marginBottom: resW(3),
    textAlign: 'center',
  },
  option: {
    alignItems: 'center',
    columnGap: resW(3),
    flexDirection: 'row',
    paddingVertical: resW(3),
  },
  optionIcon: {
    alignItems: 'center',
    borderRadius: resW(3),
    height: resW(11),
    justifyContent: 'center',
    width: resW(11),
  },
  optionText: {
    color: T.textStrong,
    fontFamily: typeMedium,
    fontSize: font16,
  },
  optionDivider: {
    backgroundColor: T.divider,
    height: StyleSheet.hairlineWidth,
  },
  cancelBtn: {
    alignItems: 'center',
    backgroundColor: T.inputBg,
    borderRadius: resW(3),
    marginTop: resW(4),
    paddingVertical: resW(3.5),
  },
  cancelText: {
    color: T.textBody,
    fontFamily: typeSemiBold,
    fontSize: font16,
  },
});

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const ParentsEditProfile = ({ navigation, route }) => {
  const { token: usertoken } = useStudentAuth();
  const profileData = route.params.profileData;

  const [isVisiblPickerDialog, setIsVisiblPickerDialog] = useState(false);
  const [certifModal, setCertifModal] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [emptyLoader, setEmptyLoader] = useState(false);

  // Father fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [profilePicData, setProfilePicData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [org, setOrg] = useState('');
  const [occup, setOccup] = useState('');
  const [desig, setDesig] = useState('');
  const [officeNo, setOfficeNo] = useState('');
  const [officeAdd, setOfficeAdd] = useState('');
  const [mobile, setMobile] = useState('');

  // Mother fields
  const [M_name, setM_Name] = useState('');
  const [M_email, setM_Email] = useState('');
  const [M_mobile, setM_Mobile] = useState('');
  const [certif_Copy, setCertif_Copy] = useState('');
  const [certifData, setCertifData] = useState([]);
  const [certifEdit, setCertiEdit] = useState(false);
  const [M_org, setM_Org] = useState('');
  const [M_occup, setM_Occup] = useState('');
  const [M_desig, setM_Desig] = useState('');
  const [M_officeNo, setM_OfficeNo] = useState('');
  const [M_officeAdd, setM_OfficeAdd] = useState('');

  useEffect(() => {
    setName(profileData?.F_name);
    setMobile(profileData?.F_mobile);
    setOccup(profileData?.F_occupation);
    setOrg(profileData?.F_organization);
    setEmail(profileData?.F_email);
    setDesig(profileData?.F_designation);
    setOfficeAdd(profileData?.Fofficeaddress);
    setOfficeNo(profileData?.Foficemobile);
    if (profileData?.fatherimage) {
      setProfilePic('http://139.59.90.236:86/images/student_image/FATHER/' + profileData.fatherimage);
    }
    setM_Name(profileData?.M_name);
    setM_Mobile(profileData?.M_mobile);
    setM_Occup(profileData?.M_occupation);
    setM_Org(profileData?.M_organization);
    setM_Email(profileData?.M_email);
    setM_Desig(profileData?.M_designation);
    setM_OfficeAdd(profileData?.Mofficeaddress);
    setM_OfficeNo(profileData?.Mofficemobile);
    if (profileData?.motherimage) {
      setCertif_Copy('http://139.59.90.236:86/images/student_image/MOTHER/' + profileData.motherimage);
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

  const pickImage = (type, onSuccess) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 0,
      maxHeight: 0,
      includeBase64: false,
      cameraType: 'back',
      selectionLimit: 1,
    };
    const launcher = type === 'Camera' ? launchCamera : launchImageLibrary;
    launcher(options, (response) => {
      try {
        onSuccess(response);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const selectFile = (type) => {
    pickImage(type, (response) => {
      setProfilePic(response.assets[0].uri);
      setProfilePicData(response);
      setIsEdit(true);
      setIsVisiblPickerDialog(false);
    });
  };

  const selectCertFile = (type) => {
    pickImage(type, (response) => {
      setCertif_Copy(response.assets[0].uri);
      setCertifData(response);
      setCertiEdit(true);
      setCertifModal(false);
    });
  };

  const showMessage = (message) =>
    Snackbar.show({ text: message, duration: Snackbar.LENGTH_SHORT, backgroundColor: '#f15270' });

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const fn_UpdateProfile = () => {
    if (!name) return showMessage('Please enter Father name');
    if (!email) return showMessage('Please enter Father email');
    if (!validateEmail(email)) return showMessage('Please enter a valid Father email');
    if (!mobile) return showMessage('Please enter Father mobile no');
    if (!M_name) return showMessage('Please enter Mother name');
    if (!M_email) return showMessage('Please enter Mother email');
    if (!M_mobile) return showMessage('Please enter Mother mobile no');

    const imageParam = isEdit
      ? { uri: profilePicData?.assets[0].uri, type: profilePicData?.assets[0].type, name: profilePicData?.assets[0].fileName }
      : undefined;
    const certifImageParam = certifEdit
      ? { uri: certifData?.assets[0].uri, type: certifData?.assets[0].type, name: certifData?.assets[0].fileName }
      : undefined;

    setEmptyLoader(true);
    const paramData = {
      id: profileData?.id,
      F_designation: desig, F_email: email, F_mobile: mobile, F_name: name,
      F_occupation: occup, F_organization: org, Fofficeaddress: officeAdd, Foficemobile: officeNo,
      M_designation: M_desig, M_email, M_mobile, M_name,
      M_occupation: M_occup, M_organization: M_org, Mofficeaddress: M_officeAdd, Mofficemobile: M_officeNo,
      ...(isEdit && { fatherimage: imageParam }),
      ...(certifEdit && { motherimage: certifImageParam }),
    };
    const formData = new FormData();
    Object.entries(paramData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value);
    });

    fetch(myConst.BASEURL + 'updateStudentProfile', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: usertoken },
      body: formData,
    })
      .then((r) => r.json())
      .then((json) => {
        setEmptyLoader(false);
        if (json.status === true) {
          navigation.goBack();
        } else {
          setTimeout(() => showMessage(json.message), 500);
        }
      })
      .catch((e) => console.log(JSON.stringify(e)))
      .finally(() => setEmptyLoader(false));
  };

  return (
    <View style={{ backgroundColor: T.pageBg, flex: 1 }}>
      {/* ── Gradient header ───────────────────────────────────────────────── */}
      <LinearGradient
        colors={[T.gradStart, T.gradEnd]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={headerStyles.gradient}
      >
        <View pointerEvents="none" style={headerStyles.circleRight} />
        <View style={{ height: Platform.OS === 'ios' ? resW(8) : 0 }} />
        <View style={headerStyles.row}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={headerStyles.backBtn}
          >
            <Image
              source={require('../../../assests/images/leftarrow.png')}
              style={headerStyles.backIcon}
            />
          </Pressable>
          <Text style={headerStyles.title}>Parents Profile</Text>
          <View style={{ width: resW(10) }} />
        </View>
      </LinearGradient>

      {/* ── Scrollable form ───────────────────────────────────────────────── */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: resW(10), paddingTop: resW(5) }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Father Section */}
        <SectionCard accentColor={T.purple} title="Father Details">
          <AvatarPicker
            onPress={() => setIsVisiblPickerDialog(true)}
            uri={profilePic}
          />
          <View style={sectionStyles.fieldsWrap}>
            <FormField label="Name" onChangeText={setName} value={name} />
            <FormField label="Email ID" keyboardType="email-address" onChangeText={setEmail} value={email} />
            <FormField label="Mobile No." keyboardType="numeric" maxLength={10} onChangeText={setMobile} value={mobile} />
            <FormField label="Organization" onChangeText={setOrg} value={org} />
            <FormField label="Occupation" onChangeText={setOccup} value={occup} />
            <FormField label="Designation" onChangeText={setDesig} value={desig} />
            <FormField label="Office No." keyboardType="numeric" maxLength={10} onChangeText={setOfficeNo} value={officeNo} />
            <FormField label="Office Address" onChangeText={setOfficeAdd} value={officeAdd} last />
          </View>
        </SectionCard>

        {/* Mother Section */}
        <SectionCard accentColor={T.primary} title="Mother Details">
          <AvatarPicker
            onPress={() => setCertifModal(true)}
            uri={certif_Copy}
          />
          <View style={sectionStyles.fieldsWrap}>
            <FormField label="Name" onChangeText={setM_Name} value={M_name} />
            <FormField label="Email ID" keyboardType="email-address" onChangeText={setM_Email} value={M_email} />
            <FormField label="Mobile No." keyboardType="numeric" maxLength={10} onChangeText={setM_Mobile} value={M_mobile} />
            <FormField label="Organization" onChangeText={setM_Org} value={M_org} />
            <FormField label="Occupation" onChangeText={setM_Occup} value={M_occup} />
            <FormField label="Designation" onChangeText={setM_Desig} value={M_desig} />
            <FormField label="Office No." keyboardType="numeric" maxLength={10} onChangeText={setM_OfficeNo} value={M_officeNo} />
            <FormField label="Office Address" onChangeText={setM_OfficeAdd} value={M_officeAdd} last />
          </View>
        </SectionCard>

        {/* Submit button */}
        <LinearGradient
          colors={[T.gradStart, T.gradEnd]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={submitStyles.gradient}
        >
          <Pressable onPress={fn_UpdateProfile} style={submitStyles.btn}>
            <Text style={submitStyles.text}>Save Changes</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>

      {/* ── Image picker sheet — Father ──────────────────────────────────── */}
      <ImagePickerSheet
        onCamera={() => selectFile('Camera')}
        onClose={() => setIsVisiblPickerDialog(false)}
        onGallery={() => selectFile('Gallery')}
        visible={isVisiblPickerDialog}
      />

      {/* ── Image picker sheet — Mother ──────────────────────────────────── */}
      <ImagePickerSheet
        onCamera={() => selectCertFile('Camera')}
        onClose={() => setCertifModal(false)}
        onGallery={() => selectCertFile('Gallery')}
        visible={certifModal}
      />

      {/* ── Loading overlay ───────────────────────────────────────────────── */}
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent
        visible={emptyLoader}
      >
        <View style={loaderStyles.overlay}>
          <View style={loaderStyles.card}>
            <ActivityIndicator color={T.primary} size="large" />
            <Text style={loaderStyles.text}>Saving...</Text>
          </View>
        </View>
      </Modal>

      <DatePicker
        cancelBtnText="Cancel"
        confirmBtnText="Confirm"
        date={new Date()}
        format="YYYY-MM-DD"
        modal
        mode="date"
        onCancel={() => {}}
        onConfirm={(date) => { console.log(date); }}
        open={openPicker}
        placeholder="Type Date Of Birth"
        showIcon={false}
      />
    </View>
  );
};

/* ─── Remaining styles ───────────────────────────────────────────────────────── */
const headerStyles = StyleSheet.create({
  gradient: {
    borderBottomLeftRadius: resW(6),
    borderBottomRightRadius: resW(6),
    overflow: 'hidden',
    paddingBottom: resW(4),
  },
  circleRight: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: resW(30),
    height: resW(50),
    position: 'absolute',
    right: -resW(12),
    top: -resW(12),
    width: resW(50),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: resW(3),
    paddingVertical: resW(2),
  },
  backBtn: {
    padding: resW(2),
    width: resW(10),
  },
  backIcon: {
    height: resW(7),
    width: resW(7),
  },
  title: {
    color: '#fff',
    fontFamily: typeBold,
    fontSize: font18,
    letterSpacing: 0.2,
  },
});

Object.assign(sectionStyles, {
  fieldsWrap: {
    paddingBottom: resW(2),
  },
});

const submitStyles = StyleSheet.create({
  gradient: {
    borderRadius: resW(3),
    marginHorizontal: resW(4),
    marginTop: resW(2),
    overflow: 'hidden',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: resW(4),
  },
  text: {
    color: '#fff',
    fontFamily: typeBold,
    fontSize: font16,
    letterSpacing: 0.3,
  },
});

const loaderStyles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 10, 40, 0.35)',
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: resW(4),
    columnGap: resW(3),
    flexDirection: 'row',
    paddingHorizontal: resW(8),
    paddingVertical: resW(5),
  },
  text: {
    color: T.textStrong,
    fontFamily: typeMedium,
    fontSize: font16,
  },
});

export default ParentsEditProfile;
