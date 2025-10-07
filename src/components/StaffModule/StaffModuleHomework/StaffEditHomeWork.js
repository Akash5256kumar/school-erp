import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Pressable,
    Platform,
    Image
} from 'react-native';
import React, { useState } from 'react';
import CommonHeader from '../../CommonHeader';
import { useNavigation } from '@react-navigation/native';
import LabelHeader from '../../labelHeader';
import {
    blackColor,
    resH,
    resW,
    whiteColor,
    font15,
    Blue,

} from '../../../Utils/Constant';
import * as constant from '../../../Utils/Constant';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInputField from '../../CommonInputField/CommonTextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../Button/CommonButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CommonModal from '../../CommonModal/CommonModal';

// --- Custom Date Picker Field ---
const DatePickerField = ({ date, setDate }) => {
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formattedDate = date ? date.toLocaleDateString() : 'Select Date';

    return (
        <View style={{ marginBottom: resH(2) }}>
            <View style={styles.dateInputContainer}>
                <Text style={[styles.dateText, !date && { color: blackColor }]}>
                    {formattedDate}
                </Text>
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
const StaffEditHomeWork = () => {
    const navigation = useNavigation();
    const [publishDate, setPublishDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // --- Camera Picker ---
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
                backgroundColor={Blue}
                textColor={whiteColor}
                IconColor={whiteColor}
                title={'Edit HomeWork'}
                onLeftClick={() => navigation.goBack()}
            />

            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: resW(4),
                    paddingBottom: resH(5),
                }}
                enableOnAndroid={true}
                keyboardOpeningTime={0}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ marginTop: resH(1) }} />
                <LabelHeader label={'Date of Publish'} />
                <View style={{ marginTop: resH(1) }} />
                <DatePickerField date={publishDate} setDate={setPublishDate} />

                <LabelHeader label={'Class'} />
                <CustomInputField inputStyle={styles.inputStyle} />

                <LabelHeader label={'Section'} />
                <CustomInputField inputStyle={styles.inputStyle} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: resH(1),
                    }}
                >
                    <View style={{ flex: 1, marginRight: resW(2) }}>
                        <LabelHeader label={'Subject'} />
                        <CustomInputField
                            inputStyle={[styles.inputStyle, { width: resW(40) }]}
                        />
                    </View>

                    <View style={{ flex: 1, marginLeft: resW(2) }}>
                        <LabelHeader label={'Book'} />
                        <CustomInputField
                            inputStyle={[styles.inputStyle, { width: resW(40) }]}
                        />
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: resH(1),
                    }}
                >
                    <View style={{ flex: 1, marginRight: resW(2) }}>
                        <LabelHeader label={'Topic'} />
                        <CustomInputField
                            inputStyle={[styles.inputStyle, { width: resW(40) }]}
                        />
                    </View>

                    <View style={{ flex: 1, marginLeft: resW(2) }}>
                        <LabelHeader label={'Chapter'} />
                        <CustomInputField
                            inputStyle={[styles.inputStyle, { width: resW(40) }]}
                        />
                    </View>
                </View>

                {/* Add File Button */}
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

            {/* Fixed button */}
            <View style={styles.fixedButton}>
                <CommonButton title="Add" />
            </View>

            {/* --- Modal --- */}
            {/* <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Option</Text>

                        <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
                            <Text style={styles.modalButtonText}>📷 Open Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
                            <Text style={styles.modalButtonText}>🖼️ Choose from Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal> */}
            <CommonModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  title="Select Option"
  options={[
    { label: '📷 Open Camera', onPress: openCamera },
    { label: '🖼️ Choose from Gallery', onPress: openGallery },
  ]}
/>


        </View>
    );
};

export default StaffEditHomeWork;

const styles = StyleSheet.create({
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.1,
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
        bottom: resH(1.5),
        left: resW(4),
        right: resW(4),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        backgroundColor: whiteColor,
        borderRadius: resH(2),
        paddingVertical: resH(3),
        paddingHorizontal: resW(5),
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },

    modalTitle: {
        fontSize: font15,
        fontWeight: '600',
        color: blackColor,
        marginBottom: resH(2.5),
        textAlign: 'center',
    },

    modalButton: {
        backgroundColor: '#E9F2FF',
        borderRadius: resH(1),
        paddingVertical: resH(1.4),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: resH(0.6),
        width: '100%',
    },
    modalButtonText: {
        color: blackColor,
        fontSize: font15,
        fontWeight: '500',
    },
    cancelButton: {
        backgroundColor: 'red',
        marginTop: resH(1.2),
    },

    cancelButtonText: {
        color: whiteColor,
        fontSize: font15,
        fontWeight: '500',
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
