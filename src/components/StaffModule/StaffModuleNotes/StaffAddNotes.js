import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

import CommonModal from '../../CommonModal/CommonModal';
import * as constant from '../../../Utils/Constant';
import {
  scheduleNotification,
  uploadFile,
} from '../../../Utils';
import {
  fetchStaffProfileTeachingInfo,
  sortTeachingClasses,
  sortTeachingValues,
} from '../../../Utils/teachingInfo';
import StaffContentScaffold from '../StaffContentShared/StaffContentScaffold';
import {
  StaffContentPrimaryButton,
  StaffContentUploadPreview,
} from '../StaffContentShared/StaffContentPrimitives';
import {
  StaffContentDateField,
  StaffContentSelectField,
  StaffContentTextField,
  StaffContentUploadAction,
} from '../StaffContentShared/StaffContentFields';
import {STAFF_CONTENT_TEXT} from '../StaffContentShared/staffContentConfig';
import createStaffContentTheme from '../StaffContentShared/staffContentTheme';

const MODULE_TEXT = STAFF_CONTENT_TEXT.notes;

const StaffAddNotes = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.userSlice.userData);
  const {height, width} = useWindowDimensions();
  const theme = createStaffContentTheme({height, width, variant: 'notes'});
  const [publishDate, setPublishDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stdClass, setStdClass] = useState(null);
  const [section, setSection] = useState(null);
  const [subject, setSubject] = useState(null);
  const [book, setBook] = useState('');
  const [topic, setTopic] = useState('');
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.staff_info_id) {
      getTeachingInfo();
    }
  }, [userData?.staff_info_id]);

  const getTeachingInfo = async () => {
    try {
      setLoading(true);
      const info = await fetchStaffProfileTeachingInfo(userData?.staff_info_id);
      setTeachingInfo(info);
    } catch (error) {
      console.log('getTeachingInfo API Error', error);
    } finally {
      setLoading(false);
    }
  };

  const classOptions = useMemo(
    () =>
      sortTeachingClasses(
        [...new Set((teachingInfo || []).map(item => item.class).filter(Boolean))],
      ),
    [teachingInfo],
  );

  const sectionOptions = useMemo(() => {
    if (!stdClass) {
      return [];
    }

    return [
      ...sortTeachingValues(
        [
          ...new Set(
            teachingInfo
              .filter(item => item.class === stdClass)
              .map(item => item.section)
              .filter(Boolean),
          ),
        ],
      ),
    ];
  }, [stdClass, teachingInfo]);

  const subjectOptions = useMemo(() => {
    if (!stdClass || !section) {
      return [];
    }

    return [
      ...new Set(
        teachingInfo
          .filter(item => item.class === stdClass && item.section === section)
          .map(item => item.subject),
      ),
    ];
  }, [section, stdClass, teachingInfo]);

  useEffect(() => {
    setSection(null);
    setSubject(null);
  }, [stdClass]);

  useEffect(() => {
    setSubject(null);
  }, [section]);

  const openCamera = async () => {
    setModalVisible(false);
    try {
      const result = await launchCamera({
        includeBase64: false,
        mediaType: 'photo',
        saveToPhotos: true,
      });

      if (result?.assets?.length) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Camera launch error:', error);
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    try {
      const result = await launchImageLibrary({
        includeBase64: false,
        mediaType: 'photo',
      });

      if (result?.assets?.length) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Gallery launch error:', error);
    }
  };

  const addNotes = async () => {
    if (!publishDate || !stdClass || !section || !subject || !topic || !book) {
      constant.showAlert('Please fill all required fields');
      return;
    }

    try {
      const formattedDate = publishDate
        ? publishDate.toISOString().split('T')[0]
        : '';

      const payload = {
        as_date: formattedDate,
        book,
        staff_id: userData?.staff_info_id,
        std_class: stdClass,
        std_section: section,
        subject,
        topic,
      };

      const response = await uploadFile(
        'store-teacher-notes',
        selectedImage
          ? {
              name: 'homework.jpg',
              type: 'image/jpeg',
              uri: selectedImage,
            }
          : null,
        payload,
        'as_file',
      );

      if (response?.status) {
        const noteId = response?.data?.id || Date.now();
        const reminderDate = new Date(publishDate);
        reminderDate.setHours(8, 0, 0, 0);

        if (reminderDate > new Date()) {
          await scheduleNotification({
            body: `${subject} notes for Class ${stdClass}-${section} are pending. Please publish now.`,
            date: reminderDate,
            id: `notes_reminder_${noteId}`,
            title: 'Notes Publishing Reminder',
          });
        }

        constant.showAlert('Notes added successfully');
        navigation.goBack();
      } else {
        constant.showAlert(response?.message || 'Add failed');
      }
    } catch (error) {
      console.log('Add Notes Error:', error);
      constant.showAlert(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const stackColumns = width < theme.layout.fullWidthBreakpoint;

  return (
    <StaffContentScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={MODULE_TEXT.addTitle}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: theme.spacing.footerSafeBottom,
          paddingTop: theme.spacing.screenTop,
        }}
        enableOnAndroid
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <StaffContentDateField
          date={publishDate}
          label={MODULE_TEXT.labels.dateOfPublish}
          onChange={setPublishDate}
          theme={theme}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        <StaffContentSelectField
          label={MODULE_TEXT.labels.class}
          onSelect={setStdClass}
          options={classOptions}
          placeholder={MODULE_TEXT.placeholders.class}
          selected={stdClass}
          theme={theme}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        <StaffContentSelectField
          label={MODULE_TEXT.labels.section}
          onSelect={setSection}
          options={sectionOptions}
          placeholder={MODULE_TEXT.placeholders.section}
          selected={section}
          theme={theme}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        <View
          style={[
            styles.formRow,
            {
              flexDirection: stackColumns ? 'column' : 'row',
            },
          ]}>
          <View
            style={[
              styles.formCell,
              !stackColumns
                ? {
                    marginRight: theme.spacing.columnGap / 2,
                  }
                : null,
            ]}>
            <StaffContentSelectField
              label={MODULE_TEXT.labels.subject}
              onSelect={setSubject}
              options={subjectOptions}
              placeholder={MODULE_TEXT.placeholders.subject}
              selected={subject}
              theme={theme}
            />
          </View>
          <View
            style={[
              styles.formCell,
              !stackColumns
                ? {
                    marginLeft: theme.spacing.columnGap / 2,
                  }
                : {
                    marginTop: theme.spacing.fieldGap,
                  },
            ]}>
            <StaffContentTextField
              label={MODULE_TEXT.labels.book}
              onChangeText={setBook}
              placeholder={MODULE_TEXT.placeholders.book}
              theme={theme}
              value={book}
            />
          </View>
        </View>

        <View style={{height: theme.spacing.fieldGap}} />

        <StaffContentTextField
          label={MODULE_TEXT.labels.topic}
          onChangeText={setTopic}
          placeholder={MODULE_TEXT.placeholders.topic}
          theme={theme}
          value={topic}
        />

        <StaffContentUploadAction
          onPress={() => setModalVisible(true)}
          theme={theme}
          title={STAFF_CONTENT_TEXT.common.upload}
        />

        <StaffContentUploadPreview
          onRemove={() => setSelectedImage(null)}
          theme={theme}
          uri={selectedImage}
        />

        <StaffContentPrimaryButton
          onPress={addNotes}
          style={{
            marginTop: theme.spacing.buttonTop,
          }}
          theme={theme}
          title={STAFF_CONTENT_TEXT.common.add}
        />
      </KeyboardAwareScrollView>

      <CommonModal
        onClose={() => setModalVisible(false)}
        options={[
          {label: '📷 Open Camera', onPress: openCamera},
          {label: '🖼️ Choose from Gallery', onPress: openGallery},
        ]}
        title="Select Option"
        visible={modalVisible}
      />
    </StaffContentScaffold>
  );
};

const styles = StyleSheet.create({
  formCell: {
    flex: 1,
  },
  formRow: {
    width: '100%',
  },
});

export default StaffAddNotes;
