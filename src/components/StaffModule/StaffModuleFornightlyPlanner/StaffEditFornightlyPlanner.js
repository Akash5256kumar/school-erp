import { StyleSheet, Text, View, TouchableOpacity, Platform,Image } from 'react-native';
import React, { useState } from 'react';
import CommonHeader from '../../CommonHeader';
import { useNavigation } from '@react-navigation/native';
import LabelHeader from '../../labelHeader';
import { blackColor, resH, resW, whiteColor, font15, Blue } from '../../../Utils/Constant';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInputField from '../../CommonInputField/CommonTextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../Button/CommonButton';
import CommonModal from '../../CommonModal/CommonModal';
import * as constant from '../../../Utils/Constant';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const DatePickerField = ({ label, date, setDate }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = date ? date.toLocaleDateString() : 'Select Date';

  return (
    <View style={{ marginBottom: resH(2) }}>
      {label && <LabelHeader label={label} />}
      <View style={styles.dateInputContainer}>
        <Text style={[styles.dateText, !date && { color: blackColor }]}>{formattedDate}</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateButtonText}>▼</Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

// --- Main Component ---
const StaffEditFornightlyPlanner = () => {
  const navigation = useNavigation();
  const [publishDate, setPublishDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
          const openCamera = async () => {
                setModalVisible(false);
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
        
            // --- Gallery Picker ---
            const openGallery = async () => {
                setModalVisible(false);
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
  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <CommonHeader
        title={"Edit Planner"}
        backgroundColor={Blue}
        textColor={whiteColor}
        IconColor={whiteColor}
        onLeftClick={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: resW(4), paddingBottom: resH(5) }}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: resH(1) }} />
        <DatePickerField label="Date of Publish" date={publishDate} setDate={setPublishDate} />

        <LabelHeader label={"Class"} />
        <CustomInputField inputStyle={styles.inputStyle} />

        <LabelHeader label={"Section"} />
        <CustomInputField inputStyle={styles.inputStyle} />

        <LabelHeader label={"Subject"} />
        <CustomInputField inputStyle={styles.inputStyle} />

        {/* To Date and From Date Pickers */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, marginRight: resW(2) }}>
            <DatePickerField label="To Date" date={toDate} setDate={setToDate} />
          </View>
          <View style={{ flex: 1, marginLeft: resW(2) }}>
            <DatePickerField label="From Date" date={fromDate} setDate={setFromDate} />
          </View>
        </View>

        <View style={{ marginTop: resH(5) }} />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <LabelHeader label={'Add file +'} />
                </TouchableOpacity>
                   {selectedImage && (
                    <View style={styles.imagePreviewContainer}>
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.imagePreview}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            onPress={() => setSelectedImage(null)}
                            style={styles.removeImageButton}
                        >
                            <Image source={constant.Icons.CrossIcon} style={{
                                width: resW(12), height
                                    : resW(12), resizeMode: "contain"
                            }} />
                        </TouchableOpacity>
                    </View>
                )}
      </KeyboardAwareScrollView>
<CommonModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  title="Select Option"
  options={[
    { label: '📷 Open Camera', onPress: openCamera },
    { label: '🖼️ Choose from Gallery', onPress: openGallery },
  ]}
/>
      <View style={styles.fixedButton}>
        <CommonButton title="Update" buttonClick={() => console.log("Update pressed")} />
      </View>
    </View>
  );
};

export default StaffEditFornightlyPlanner;

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.1,
    marginTop:resH(1),
    borderColor: blackColor,
    borderRadius: resH(0.3),
    overflow: 'hidden',
    height: resH(5.5),
  },
  inputStyle: {
    height: resH(5.5),
    color: blackColor,
  },
  dateText: {
    flex: 1,
    paddingHorizontal: resW(2),
    color: blackColor,
    fontSize: font15,
  },
  dateButton: {
    paddingHorizontal: resW(3),
    justifyContent: 'center',
    alignItems: 'center',
    height: resH(5.5),
  },
  dateButtonText: {
    color: blackColor,
    fontSize: font15,
  },
  fixedButton: {
    // Optional: position button at bottom
  },
   imagePreviewContainer: {
        marginTop: resH(2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },

    imagePreview: {
        width: resW(70),
        height: resH(20),
        borderRadius: resH(1),
        borderWidth: 1,
        borderColor: '#ccc',
    },

    removeImageButton: {
        //   marginTop: resH(1),

        paddingVertical: resH(0.8),
        paddingHorizontal: resW(4),
        borderRadius: resH(1),
    },

    removeImageText: {
        color: whiteColor,
        fontSize: font15,
        fontWeight: '500',
    },

});
