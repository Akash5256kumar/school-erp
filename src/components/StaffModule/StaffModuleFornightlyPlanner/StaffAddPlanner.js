import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

import CommonModal from '../../CommonModal/CommonModal';
import {useAppToast} from '../../common/AppToast';
import * as constant from '../../../Utils/Constant';
import {getPersistedAuthToken} from '../../../Utils/authSession';
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
  StaffContentUploadAction,
} from '../StaffContentShared/StaffContentFields';
import {STAFF_CONTENT_TEXT} from '../StaffContentShared/staffContentConfig';
import createStaffContentTheme from '../StaffContentShared/staffContentTheme';

const MODULE_TEXT = STAFF_CONTENT_TEXT.planner;

const StaffAddPlanner = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.userSlice.userData);
  const {showSuccessToast} = useAppToast();
  const {height, width} = useWindowDimensions();
  const theme = createStaffContentTheme({height, width, variant: 'planner'});
  const [publishDate, setPublishDate] = useState(new Date());
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stdClass, setStdClass] = useState(null);
  const [section, setSection] = useState(null);
  const [subject, setSubject] = useState(null);
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
        mediaType: 'mixed',
      });

      if (result?.assets?.length) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Gallery launch error:', error);
    }
  };

  const addPlanner = async () => {
    if (!publishDate || !stdClass || !section || !subject || !toDate || !fromDate) {
      constant.showAlert('Please fill all required fields');
      return;
    }

    try {
      const payload = {
        class: stdClass,
        date_of_publish: publishDate.toISOString().split('T')[0],
        from_date: fromDate.toISOString().split('T')[0],
        section,
        staff_id: userData?.staff_info_id,
        subject,
        to_date: toDate.toISOString().split('T')[0],
      };
      const authToken = await getPersistedAuthToken();

      const response = await uploadFile(
        'teacher-fortnightly-planner-store',
        selectedImage
          ? {
              name: 'planner.jpg',
              type: 'image/jpeg',
              uri: selectedImage,
            }
          : null,
        payload,
        'schedule_file',
        authToken ? {Authorization: authToken} : {},
      );

      if (response?.status) {
        const plannerId = response?.data?.id || Date.now();
        const reminderDate = new Date(toDate);
        reminderDate.setHours(8, 0, 0, 0);

        if (reminderDate > new Date()) {
          await scheduleNotification({
            body: `${subject} Planner for Class ${stdClass}-${section} are pending. Please publish now.`,
            date: reminderDate,
            id: `planner_reminder_${plannerId}`,
            title: 'Planner Publishing Reminder',
          });
        }

        showSuccessToast({
          message: 'The planner has been added successfully.',
          title: 'Planner Added',
        });
        navigation.goBack();
      } else {
        constant.showAlert(response?.message || 'Add failed');
      }
    } catch (error) {
      console.log('Add Planner Error:', error);
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

        <StaffContentSelectField
          label={MODULE_TEXT.labels.subject}
          onSelect={setSubject}
          options={subjectOptions}
          placeholder={MODULE_TEXT.placeholders.subject}
          selected={subject}
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
            <StaffContentDateField
              date={fromDate}
              label={MODULE_TEXT.labels.fromDate}
              onChange={setFromDate}
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
            <StaffContentDateField
              date={toDate}
              label={MODULE_TEXT.labels.toDate}
              onChange={setToDate}
              theme={theme}
            />
          </View>
        </View>

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
          onPress={addPlanner}
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

export default StaffAddPlanner;
