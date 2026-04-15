import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

import CommonModal from '../../CommonModal/CommonModal';
import {useAppToast} from '../../common/AppToast';
import * as constant from '../../../Utils/Constant';
import {getPersistedAuthToken} from '../../../Utils/authSession';
import {uploadFile} from '../../../Utils';
import {
  fetchTeachingInfo,
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

const StaffEditFornightlyPlanner = props => {
  const {planner} = props?.route?.params;
  const navigation = useNavigation();
  const userData = useSelector(state => state.userSlice.userData);
  const {showSuccessToast} = useAppToast();
  const {height, width} = useWindowDimensions();
  const theme = createStaffContentTheme({height, width, variant: 'planner'});
  const [publishDate, setPublishDate] = useState(
    new Date(planner?.date_of_publish),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toDate, setToDate] = useState(new Date(planner?.to_date));
  const [fromDate, setFromDate] = useState(new Date(planner?.from_date));
  const [stdClass, setStdClass] = useState(planner?.class || null);
  const [section, setSection] = useState(planner?.section || null);
  const [subject, setSubject] = useState(planner?.subject || null);

  const [teachingInfo, setTeachingInfo] = useState(
    Array.isArray(userData?.teaching_info) ? userData.teaching_info : [],
  );

  useEffect(() => {
    setTeachingInfo(Array.isArray(userData?.teaching_info) ? userData.teaching_info : []);
  }, [userData?.teaching_info]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadTeachingInfo = async () => {
        try {
          const latestTeachingInfo = await fetchTeachingInfo();

          if (isActive) {
            setTeachingInfo(latestTeachingInfo);
          }
        } catch (error) {
          console.log('fetchTeachingInfo Error:', error);
        }
      };

      loadTeachingInfo();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const classOptions = useMemo(
    () => sortTeachingClasses([...new Set(teachingInfo.map(item => item.class).filter(Boolean))]),
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

  const prevClassRef = useRef(stdClass);
  const prevSectionRef = useRef(section);

  useEffect(() => {
    if (prevClassRef.current && prevClassRef.current !== stdClass) {
      setSection(null);
      setSubject(null);
    }
    prevClassRef.current = stdClass;
  }, [stdClass]);

  useEffect(() => {
    if (prevSectionRef.current && prevSectionRef.current !== section) {
      setSubject(null);
    }
    prevSectionRef.current = section;
  }, [section]);

  useEffect(() => {
    if (section && !sectionOptions.includes(section)) {
      setSection(null);
      setSubject(null);
    }
  }, [section, sectionOptions]);

  useEffect(() => {
    if (subject && !subjectOptions.includes(subject)) {
      setSubject(null);
    }
  }, [subject, subjectOptions]);

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

  const updatePlanner = async () => {
    if (!publishDate || !stdClass || !section || !subject || !toDate || !fromDate) {
      constant.showAlert('Please fill all required fields');
      return;
    }

    try {
      const payload = {
        class: stdClass,
        date_of_publish: publishDate.toISOString().split('T')[0],
        from_date: fromDate.toISOString().split('T')[0],
        id: planner?.id,
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
        showSuccessToast({
          message: 'The planner has been updated successfully.',
          title: 'Planner Updated',
        });
        navigation.pop(2);
      } else {
        constant.showAlert(response?.message || 'Update failed');
      }
    } catch (error) {
      console.log('Edit Planner Error:', error);
      constant.showAlert(error?.message || 'Something went wrong');
    }
  };

  const stackColumns = width < theme.layout.fullWidthBreakpoint;

  return (
    <StaffContentScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={MODULE_TEXT.editTitle}>
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
            {flexDirection: stackColumns ? 'column' : 'row'},
          ]}>
          <View
            style={[
              styles.formCell,
              !stackColumns ? {marginRight: theme.spacing.columnGap / 2} : null,
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
                ? {marginLeft: theme.spacing.columnGap / 2}
                : {marginTop: theme.spacing.fieldGap},
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
          onPress={updatePlanner}
          style={{marginTop: theme.spacing.buttonTop}}
          theme={theme}
          title={STAFF_CONTENT_TEXT.common.update}
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

export default StaffEditFornightlyPlanner;
