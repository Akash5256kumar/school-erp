import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

import {useAppToast} from '../../common/AppToast';
import * as constant from '../../../Utils/Constant';
import {apiRequest} from '../../../Utils';
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
  sortTeachingValues,
} from '../../../Utils/teachingInfo';
import StaffContentScaffold from '../StaffContentShared/StaffContentScaffold';
import {StaffContentPrimaryButton} from '../StaffContentShared/StaffContentPrimitives';
import {
  StaffContentDateField,
  StaffContentSelectField,
  StaffContentTextField,
} from '../StaffContentShared/StaffContentFields';
import {STAFF_CONTENT_TEXT} from '../StaffContentShared/staffContentConfig';
import createStaffContentTheme from '../StaffContentShared/staffContentTheme';

const StaffEditMultiMedia = props => {
  const {media} = props?.route?.params;
  const navigation = useNavigation();
  const userData = useSelector(state => state.userSlice.userData);
  const {showSuccessToast} = useAppToast();
  const {height, width} = useWindowDimensions();
  const theme = createStaffContentTheme({height, width, variant: 'homework'});

  const [publishDate, setPublishDate] = useState(media?.date ? new Date(media.date) : new Date());
  const [stdClass, setStdClass] = useState(media?.std_class || null);
  const [section, setSection] = useState(media?.section || null);
  const [subject, setSubject] = useState(media?.subject || null);
  const [topic, setTopic] = useState(media?.topic || '');
  const [link, setLink] = useState(media?.link || '');
  const [submitting, setSubmitting] = useState(false);

  const [classSectionMap, setClassSectionMap] = useState({});
  const [teachingInfo, setTeachingInfo] = useState([]);

  const classOptions = useMemo(() => getTeachingInfoClassOptions(classSectionMap), [classSectionMap]);
  const sectionOptions = useMemo(() => getTeachingSectionsForClass(classSectionMap, stdClass), [classSectionMap, stdClass]);
  const subjectOptions = useMemo(() => {
    if (!stdClass) { return []; }
    const subjects = teachingInfo
      .filter(item => item?.class === stdClass)
      .map(item => item?.subject || item?.name)
      .filter(Boolean);
    return sortTeachingValues([...new Set(subjects)]);
  }, [stdClass, teachingInfo]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const load = async () => {
        try {
          const info = await fetchTeachingInfo();
          if (active) {
            setTeachingInfo(info);
            setClassSectionMap(buildClassSectionMap(info));
          }
        } catch (error) {
          console.log('fetchTeachingInfo Error:', error);
        }
      };
      load();
      return () => { active = false; };
    }, []),
  );

  const handleClassSelect = useCallback(value => {
    setStdClass(value);
    setSection(null);
    setSubject(null);
  }, []);

  const handleUpdate = async () => {
    if (!stdClass || !section || !subject || !link.trim() || !topic.trim() || !publishDate) {
      constant.showAlert('Please fill all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        id: media?.id,
        std_class: stdClass,
        section,
        subject,
        staff_id: userData?.staff_info_id ? String(userData.staff_info_id) : '',
        link: link.trim(),
        topic: topic.trim(),
        date: publishDate.toISOString().split('T')[0],
      };

      const response = await apiRequest('store-multimedia', 'POST', payload);
      showSuccessToast({
        message: response?.message || 'Multimedia updated successfully.',
        title: 'Multimedia Updated',
      });
      navigation.pop(2);
    } catch (error) {
      console.log('Edit Multimedia Error:', error);
      constant.showAlert(error?.userMessage || error?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const stackColumns = width < theme.layout.fullWidthBreakpoint;

  return (
    <StaffContentScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title="Edit Multimedia">
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
          label="Date of Publish"
          onChange={setPublishDate}
          theme={theme}
        />
        <View style={{height: theme.spacing.fieldGap}} />

        <StaffContentSelectField
          label="Class"
          onSelect={handleClassSelect}
          options={classOptions}
          placeholder="Select Class"
          selected={stdClass}
          theme={theme}
        />
        <View style={{height: theme.spacing.fieldGap}} />

        <StaffContentSelectField
          label="Section"
          onSelect={setSection}
          options={sectionOptions}
          placeholder={!stdClass ? 'Select Class First' : 'Select Section'}
          selected={section}
          theme={theme}
        />
        <View style={{height: theme.spacing.fieldGap}} />

        <View style={[styles.formRow, {flexDirection: stackColumns ? 'column' : 'row'}]}>
          <View style={[styles.formCell, !stackColumns ? {marginRight: theme.spacing.columnGap / 2} : null]}>
            <StaffContentSelectField
              label="Subject"
              onSelect={setSubject}
              options={subjectOptions}
              placeholder={!stdClass ? 'Select Class First' : 'Select Subject'}
              selected={subject}
              theme={theme}
            />
          </View>
          <View style={[styles.formCell, !stackColumns ? {marginLeft: theme.spacing.columnGap / 2} : {marginTop: theme.spacing.fieldGap}]}>
            <StaffContentTextField
              label="Topic"
              onChangeText={setTopic}
              placeholder="Enter topic"
              theme={theme}
              value={topic}
            />
          </View>
        </View>
        <View style={{height: theme.spacing.fieldGap}} />

        <StaffContentTextField
          label="Video Link"
          onChangeText={setLink}
          placeholder="Enter video link"
          theme={theme}
          value={link}
        />

        <StaffContentPrimaryButton
          onPress={submitting ? undefined : handleUpdate}
          style={{marginTop: theme.spacing.buttonTop}}
          theme={theme}
          title={submitting ? 'Updating...' : STAFF_CONTENT_TEXT.common.update}
        />
      </KeyboardAwareScrollView>
    </StaffContentScaffold>
  );
};

const styles = StyleSheet.create({
  formCell: {flex: 1},
  formRow: {width: '100%'},
});

export default StaffEditMultiMedia;
