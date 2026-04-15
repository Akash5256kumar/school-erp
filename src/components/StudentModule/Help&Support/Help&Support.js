import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Paperclip, Camera, Image as ImageIcon, X } from "lucide-react-native";

import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import SelectDropList from '../../SelectDropList';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

// ─── Design Tokens ───────────────────────────────────────────────────
const PURPLE = "#C100FF";
const PURPLE_DARK = "#5B39F6";
const WHITE = "#FFFFFF";
const PAGE_BG = "#F5F4FF";
const SURFACE = "#FFFFFF";
const TEXT_STRONG = "#1E1B4B";
const TEXT_BODY = "#595975";
const TEXT_MUTED = "#9CA3AF";
const INPUT_BG = "#F8FAFC";
const BORDER = "#E2E8F0";
const SHADOW_COLOR = "rgba(94,59,249,0.15)";

const HelpSupport = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();
  
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState('');
  const [fileName, setFileName] = useState('');
  const [uri, setUri] = useState('');
  const [fileType, setFileType] = useState('');
  const [isVisiblPickerDialog, setIsVisiblPickerDialog] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [stdRoll, setStdRoll] = useState('');
  const [name, setName] = useState('');
  const [loader, setLoader] = useState(false);

  const showMessage = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270'
    });
  };

  const supportTypeApi = () => {
    fetch(myConst.BASEURL + 'supporttype', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': usertoken
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
          const interest = ["Select Issue", ...responseJson.data];
          setOptions(interest);
        } else {
          showMessage(responseJson.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const selectFile = (type) => {
    const pickerOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      selectionLimit: 1,
    };

    const callback = (response) => {
      try {
        if (response?.assets?.[0]) {
          setFileName(response.assets[0].fileName);
          setUri(response.assets[0].uri);
          setFileType(response.assets[0].type);
        }
      } catch (error) {
        console.log(error);
      }
      setIsVisiblPickerDialog(false);
    };

    if (type === 'Gallery') {
      launchImageLibrary(pickerOptions, callback);
    } else if (type === 'Camera') {
      launchCamera(pickerOptions, callback);
    }
  };

  const helpSupportApi = () => {
    if (selectedValue === '' || selectedValue === 'Select Issue') {
      showMessage('Please select an issue type.');
      return;
    }
    if (issue.trim() === '') {
      showMessage('Please provide an issue description.');
      return;
    }
    if (uri === '') {
      showMessage('Please attach an issue picture.');
      return;
    }

    let formData = new FormData();
    formData.append('admission_no', stdRoll);
    formData.append('title', selectedValue);
    formData.append('issue', issue);
    formData.append('file', { uri, name: fileName, type: fileType });
    
    setLoader(true);
    fetch(myConst.BASEURL + 'support', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': usertoken
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
          navigation.goBack();
          showMessage('Issue submitted successfully.');
        } else {
          showMessage(responseJson.message);
        }
      })
      .catch((error) => console.log('error ' + JSON.stringify(error)))
      .finally(() => {
        setLoader(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const roll = await AsyncStorage.getItem('@std_roll');
        const studentName = await AsyncStorage.getItem('@name');
        setStdRoll(roll);
        setName(studentName);
        setIssue('');
        setUri('');
        setSelectedValue('');
        supportTypeApi();
      };
      fetchData();
    }, [])
  );

  return (
    <KeyboardAvoidingView 
      style={s.root} 
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {/* 1. Header Background */}
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.headerBg, { paddingTop: insets.top + 16 }]}
      />

      {/* 2. Header UI */}
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
          Help & Support
        </Text>
        <View style={s.headerRightPlaceholder} />
      </View>

      {/* 3. Main Content */}
      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={s.profileWrap}>
          <View style={s.avatarHalo}>
            <Image 
              style={s.avatarObj} 
              source={require('../../../assests/images/businessman.png')} 
            />
          </View>
          <Text style={s.studentName}>{name || 'Student'}</Text>
          <Text style={s.studentRoll}>Roll No: {stdRoll || '--'}</Text>
        </View>

        {/* Issue Form Card */}
        <View style={s.formCard}>
          <Text style={s.formLabel}>What is the issue about?</Text>
          <View style={s.dropdownWrap}>
            {options.length > 0 && (
              <SelectDropList
                list={options}
                title={selectedValue === '' ? 'Select Issue' : selectedValue}
                buttonExt={s.dropdownBtn}
                textExt={s.dropdownTxt}
                iconColor={TEXT_MUTED}
                type={1}
                on_Select={(d) => setSelectedValue(d)}
              />
            )}
          </View>

          <Text style={s.formLabel}>Description</Text>
          <TextInput
            style={s.textInput}
            placeholder="Please thoroughly detail the issue..."
            placeholderTextColor={TEXT_MUTED}
            multiline
            textAlignVertical="top"
            value={issue}
            onChangeText={setIssue}
          />

          <Text style={s.formLabel}>Attachment</Text>
          {uri !== '' ? (
            <View style={s.imagePreviewWrap}>
              <Image source={{ uri }} style={s.imagePreview} resizeMode="cover" />
              <Pressable style={s.removeImageBtn} onPress={() => { setUri(''); setFileName(''); }}>
                <X color={WHITE} size={16} strokeWidth={2.5} />
              </Pressable>
            </View>
          ) : (
            <Pressable 
              style={({pressed}) => [s.attachBox, pressed && { backgroundColor: '#F1F5F9' }]}
              onPress={() => setIsVisiblPickerDialog(true)}
            >
              <View style={s.attachIconWrap}>
                <Paperclip color={PURPLE_DARK} size={22} strokeWidth={2} />
              </View>
              <View style={{flex: 1}}>
                <Text style={s.attachTitle}>Upload Document/Image</Text>
                <Text style={s.attachSub}>Supports JPG, PNG formats</Text>
              </View>
            </Pressable>
          )}

          {/* Submit Button */}
          <Pressable onPress={helpSupportApi} style={s.submitWrapper}>
            <LinearGradient
              colors={[PURPLE, PURPLE_DARK]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.submitGradient}
            >
              <Text style={s.submitTxt}>Submit Ticket</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>

      {/* Attachment Bottom Sheet Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={isVisiblPickerDialog}
        onRequestClose={() => setIsVisiblPickerDialog(false)}
      >
        <View style={s.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsVisiblPickerDialog(false)} />
          <View style={s.modalContent}>
            <View style={s.modalDragBar} />
            <Text style={s.modalTitle}>Upload Attachment</Text>
            
            <View style={s.modalActionRow}>
              <Pressable style={s.modalActionBtn} onPress={() => selectFile('Camera')}>
                <View style={[s.modalActionIconWrap, { backgroundColor: '#EFF6FF' }]}>
                  <Camera color="#3B82F6" size={26} strokeWidth={2} />
                </View>
                <Text style={s.modalActionTxt}>Camera</Text>
              </Pressable>
              
              <Pressable style={s.modalActionBtn} onPress={() => selectFile('Gallery')}>
                <View style={[s.modalActionIconWrap, { backgroundColor: '#F0FDF4' }]}>
                  <ImageIcon color="#22C55E" size={26} strokeWidth={2} />
                </View>
                <Text style={s.modalActionTxt}>Gallery</Text>
              </Pressable>
            </View>

            <TouchableOpacity style={s.cancelBtn} onPress={() => setIsVisiblPickerDialog(false)}>
              <Text style={s.cancelBtnTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading Overlay */}
      {loader && (
        <View style={s.loaderOverlay}>
          <View style={s.loaderBox}>
            <ActivityIndicator color={PURPLE_DARK} size="large" />
            <Text style={s.loaderTxt}>Submitting...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default HelpSupport;

// ─── Styles ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: PAGE_BG },

  // Header Layers
  headerBg: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 140,
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
    paddingTop: 100, // Starts naturally right over the 140 Header
  },

  // Profile Section
  profileWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarHalo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    marginBottom: 12,
  },
  avatarObj: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E0F2FE', // subtle blue backdrop for the avatar
  },
  studentName: {
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: TEXT_STRONG,
    marginBottom: 2,
  },
  studentRoll: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font13,
    color: TEXT_MUTED,
  },

  // Form Card
  formCard: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  formLabel: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: TEXT_STRONG,
    marginBottom: 8,
    marginTop: 4,
  },
  
  dropdownWrap: {
    backgroundColor: INPUT_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownBtn: {
    width: '100%',
    height: 52,
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
  },
  dropdownTxt: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: TEXT_BODY,
    textAlign: 'left',
  },

  textInput: {
    backgroundColor: INPUT_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: TEXT_STRONG,
    paddingHorizontal: 14,
    paddingVertical: 14,
    height: 120,
    marginBottom: 16,
  },

  attachBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 8,
  },
  attachIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${PURPLE}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: TEXT_STRONG,
  },
  attachSub: {
    fontFamily: constant.typeMedium,
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },

  imagePreviewWrap: {
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: BORDER,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Submit Button
  submitWrapper: {
    marginTop: 24,
    marginBottom: 4,
  },
  submitGradient: {
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitTxt: {
    fontFamily: constant.typeBold,
    fontSize: constant.font16,
    color: WHITE,
  },

  // Modal (Bottom Sheet Design)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: SURFACE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalDragBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: TEXT_STRONG,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  modalActionBtn: {
    alignItems: 'center',
    gap: 8,
  },
  modalActionIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: TEXT_BODY,
  },
  cancelBtn: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: INPUT_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
  },

  // Loader
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  loaderBox: {
    backgroundColor: SURFACE,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    gap: 12,
  },
  loaderTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    color: TEXT_STRONG,
  },
});
