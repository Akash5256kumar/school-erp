import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import CommonHeader from '../../CommonHeader';
import { Blue, whiteColor } from '../../../Utils/Constant';
import * as constant from '../../../Utils/Constant';
import CustomInputField from '../../CommonInputField/CommonTextField';
import LabelHeader from '../../labelHeader';
import CommonButton from '../../Button/CommonButton';
import CommonModal from '../../CommonModal/CommonModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
const EditStaffProfile = () => {
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherRole, setTeacherRole] = useState('');
  const [assignClass, setAssignClass] = useState('');
  const [assignSection, setAssignSection] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
const [selectedImage, setSelectedImage] = useState(null);
const navigation=useNavigation()
  const [isVisible, setVisible] = useState(false)
  const openCamera = async () => {
    setVisible(false);
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      });

      if (result.didCancel) {
        console.log('User cancelled camera');
        return;
      }
      if (result.errorCode) {
        console.log('Camera error: ', result.errorMessage);
        return;
      }

      if (result?.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Captured image: ', imageUri);
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.log('Camera launch error:', error);
    }
  };
  const openGallery = async () => {
    setVisible(false);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (result.didCancel) {
        console.log('User cancelled gallery picker');
        return;
      }
      if (result.errorCode) {
        console.log('Gallery error: ', result.errorMessage);
        return;
      }

      if (result?.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Selected image: ', imageUri);
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.log('Gallery launch error:', error);
    }
  };
  const loadData = async () => {
    try {
      const name = await AsyncStorage.getItem('@name');
      const email = await AsyncStorage.getItem('@email');
      const role = await AsyncStorage.getItem('@role');
      const assignclass = await AsyncStorage.getItem('@aclass');
      const assignsection = await AsyncStorage.getItem('@asection');

      if (name) {
        const first = name.split(' ').slice(0, -1).join(' ');
        const last = name.split(' ').slice(-1).join(' ');
        setFirstName(first);
        setLastName(last);
      }

      setTeacherEmail(email || '');
      setTeacherRole(role || '');
      setAssignClass(assignclass || '');
      setAssignSection(assignsection || '');
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <CommonHeader
        title="Edit Profile"
        backgroundColor={Blue}
        textColor={whiteColor}
        IconColor={whiteColor}
                     onLeftClick={() => navigation.goBack()} 
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: constant.resH(5), paddingTop: constant.resH(2) }}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={constant.resH(10)}
      >
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
  <Image
    source={selectedImage ? { uri: selectedImage } : constant.Icons.profileimg}
    style={styles.profileImage}
  />
  <TouchableOpacity style={styles.edit} onPress={() => setVisible(true)}>
    <Image
      source={constant.Icons.edit}
      style={{
        width: constant.resW(4),
        height: constant.resW(4),
        tintColor: Blue,
      }}
    />
  </TouchableOpacity>
</View>

        </View>

        <View style={styles.formContainer}>


          <LabelHeader label="Name" textstyle={{ marginTop: constant.resW(2) }} />
          <CustomInputField value={lastName} onChangeText={setLastName} inputStyle={{ height: constant.resH(6) }} />

          <LabelHeader label="Email" textstyle={{ marginTop: constant.resW(2) }} />
          <CustomInputField value={teacherEmail} editable={false} inputStyle={{ height: constant.resH(6) }} />

          <LabelHeader label="Contact" textstyle={{ marginTop: constant.resW(2) }} />
          <CustomInputField value={assignClass} onChangeText={setAssignClass} inputStyle={{ height: constant.resH(6) }} />

          <View style={{ marginTop: constant.resW(5) }} />
          <CommonButton title="Update" buttonClick={() => console.log("update")} />
        </View>

        <CommonModal visible={isVisible} onClose={() => setVisible(false)}
          title="Select Option"
          options={[
            { label: '📷 Open Camera', onPress: openCamera },
            { label: '🖼️ Choose from Gallery', onPress: openGallery },
          ]} />
      </KeyboardAwareScrollView>

    </View>
  );
};

export default EditStaffProfile;

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: constant.resH(4),
  },
  imageWrapper: {
    position: 'relative',
  },
  formContainer: {
    marginHorizontal: constant.resW(5),
  },
  profileImage: {
    width: constant.resW(35),
    height: constant.resW(35),
    borderRadius: constant.resW(17.5),
    // borderWidth: 2,
    // borderColor: Blue,
  },
  edit: {
    position: 'absolute',
    bottom: -constant.resH(0.5),
    right: constant.resW(6),
    width: constant.resW(8),
    height: constant.resW(8),
    backgroundColor: whiteColor,
    borderRadius: constant.resW(4),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  horizontalSpace: {
    marginHorizontal: constant.resW(5),
    height: constant.resW(18)
  }
});
