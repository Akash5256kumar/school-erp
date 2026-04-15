import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import CommonHeader from '../../CommonHeader';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import staffApiClient from '../../../api/staffClient';
import AppButton from '../../common/AppButton';
import {useAppToast} from '../../common/AppToast';
import {STRINGS} from '../../../constants';
import {whiteColor} from '../../../Utils/Constant';
import {apiRequest} from '../../../Utils';
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
} from '../../../Utils/teachingInfo';
import ComplaintDropdownField from './ComplaintDropdownField';
import ComplaintFormField from './ComplaintFormField';
import {createComplaintTheme} from './complaintTheme';

const normalizeStudentRecords = records =>
  records
    .map((student, index) => {
      const roll = String(
        student?.std_roll ?? student?.roll_no ?? student?.roll ?? '',
      ).trim();
      const name = String(
        student?.Student_name ??
          student?.student_name ??
          student?.name ??
          student?.full_name ??
          student?.Name ??
          '',
      ).trim();

      return {
        id: String(student?.id ?? roll ?? index),
        name,
        std_roll: roll,
      };
    })
    .filter(student => student.std_roll);

const AddComplaint = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();
  const {showSuccessToast} = useAppToast();
  const theme = createComplaintTheme({height, width});
  const complaintStrings = STRINGS.staffComplaints;
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentRecords, setStudentRecords] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [complaintText, setComplaintText] = useState('');
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  const [userId, setUserId] = useState('');
  const [classSectionMap, setClassSectionMap] = useState({});
  const [isAdmissionOpen, setAdmissionOpen] = useState(false);
  const [isClassOpen, setClassOpen] = useState(false);
  const [isSectionOpen, setSectionOpen] = useState(false);
  const [isComplaintTypeOpen, setComplaintTypeOpen] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const classOptions = useMemo(
    () =>
      getTeachingInfoClassOptions(classSectionMap).map(name => ({
        label: name,
        value: name,
      })),
    [classSectionMap],
  );
  const sectionOptions = useMemo(
    () =>
      getTeachingSectionsForClass(classSectionMap, selectedClass?.value).map(name => ({
        label: name,
        value: name,
      })),
    [classSectionMap, selectedClass?.value],
  );
  const admissionOptions = useMemo(
    () =>
      studentRecords.map(student => ({
        label: student.std_roll,
        value: student.std_roll,
      })),
    [studentRecords],
  );
  const selectedAdmission = useMemo(
    () => admissionOptions.find(option => option.value === admissionNo) || null,
    [admissionNo, admissionOptions],
  );

  const showMessage = useCallback(message => {
    Snackbar.show({
      backgroundColor: '#f15270',
      duration: Snackbar.LENGTH_SHORT,
      text: message,
    });
  }, []);

  const getTeachingInfoApi = useCallback(async () => {
    try {
      setLoadingClasses(true);
      setLoadingSections(true);
      const teachingInfo = await fetchTeachingInfo();
      setClassSectionMap(buildClassSectionMap(teachingInfo));
    } catch (error) {
      console.log(error);
      showMessage(complaintStrings.feedback.classLoadFailed);
    } finally {
      setLoadingClasses(false);
      setLoadingSections(false);
    }
  }, [complaintStrings.feedback.classLoadFailed, showMessage]);

  useEffect(() => {
    const loadInitialData = async () => {
      const storedUserId = await AsyncStorage.getItem('@id');
      setUserId(storedUserId || '');
      getTeachingInfoApi();
    };

    loadInitialData();
  }, [getTeachingInfoApi]);

  useEffect(() => {
    if (
      selectedSection?.value &&
      !sectionOptions.some(option => option.value === selectedSection.value)
    ) {
      setSelectedSection(null);
    }
  }, [sectionOptions, selectedSection]);

  useEffect(() => {
    if (!selectedClass?.value || !selectedSection?.value) {
      setStudentRecords([]);
      setAdmissionNo('');
      setStudentName('');
      setAdmissionOpen(false);
      setLoadingStudents(false);
    }
  }, [selectedClass?.value, selectedSection?.value]);

  useEffect(() => {
    let isActive = true;

    const loadStudents = async () => {
      if (!selectedClass?.value || !selectedSection?.value) {
        return;
      }

      try {
        setLoadingStudents(true);
        setStudentRecords([]);
        setAdmissionNo('');
        setStudentName('');
        setAdmissionOpen(false);

        const response = await apiRequest(
          `class-data?class=${encodeURIComponent(
            selectedClass.value,
          )}&section=${encodeURIComponent(selectedSection.value)}`,
          'GET',
        );

        if (!isActive) {
          return;
        }

        const records = Array.isArray(response?.data?.students?.records)
          ? response.data.students.records
          : [];
        setStudentRecords(normalizeStudentRecords(records));
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.log(error);
        setStudentRecords([]);
        showMessage(complaintStrings.feedback.studentsLoadFailed);
      } finally {
        if (isActive) {
          setLoadingStudents(false);
        }
      }
    };

    loadStudents();

    return () => {
      isActive = false;
    };
  }, [
    complaintStrings.feedback.studentsLoadFailed,
    selectedClass?.value,
    selectedSection?.value,
    showMessage,
  ]);

  const resetForm = useCallback(() => {
    setAdmissionNo('');
    setStudentName('');
    setStudentRecords([]);
    setSelectedClass(null);
    setSelectedSection(null);
    setComplaintText('');
    setSelectedComplaintType(null);
    setAdmissionOpen(false);
    setClassOpen(false);
    setSectionOpen(false);
    setComplaintTypeOpen(false);
  }, []);

  const submitComplaint = useCallback(async () => {
    const trimmedAdmissionNo = admissionNo.trim();
    const trimmedStudentName = studentName.trim();
    const trimmedComplaintText = complaintText.trim();

    if (!userId) {
      showMessage(complaintStrings.feedback.missingUser);
      return;
    }

    if (!selectedClass?.value) {
      showMessage(complaintStrings.feedback.missingClass);
      return;
    }

    if (!selectedSection?.value) {
      showMessage(complaintStrings.feedback.missingSection);
      return;
    }

    if (!trimmedAdmissionNo) {
      showMessage(complaintStrings.feedback.missingAdmissionNumber);
      return;
    }

    if (!trimmedStudentName) {
      showMessage(complaintStrings.feedback.missingStudentName);
      return;
    }

    if (!selectedComplaintType?.label) {
      showMessage(complaintStrings.feedback.missingComplaintType);
      return;
    }

    if (!trimmedComplaintText) {
      showMessage(complaintStrings.feedback.missingComplaint);
      return;
    }

    try {
      setSubmitting(true);
      const responseMessage = String(complaintStrings.feedback.submitSuccessMessage);

      const formData = new FormData();
      formData.append('user_id', String(userId));
      formData.append('admission_no', trimmedAdmissionNo);
      formData.append('name', trimmedStudentName);
      formData.append('section', selectedSection.value);
      formData.append('class', selectedClass.value);
      formData.append('type', selectedComplaintType.label);
      formData.append('reason', trimmedComplaintText);

      const responseJson = await staffApiClient.upload('issuedraise', formData);

      if (responseJson.status) {
        const serverMessage =
          typeof responseJson.message === 'string' ? responseJson.message.trim() : '';

        resetForm();
        showSuccessToast({
          message:
            serverMessage && serverMessage !== 'Success'
              ? serverMessage
              : responseMessage,
          title: complaintStrings.feedback.submitSuccessTitle,
        });
        navigation.goBack();
        return;
      }

      showMessage(responseJson.message || complaintStrings.feedback.submitFailed);
    } catch (error) {
      console.log(error);
      showMessage(complaintStrings.feedback.submitFailed);
    } finally {
      setSubmitting(false);
    }
  }, [
    admissionNo,
    complaintStrings.feedback,
    complaintText,
    navigation,
    resetForm,
    selectedClass,
    selectedComplaintType,
    selectedSection,
    showMessage,
    showSuccessToast,
    studentName,
    userId,
  ]);

  return (
    <LinearGradient
      colors={[
        theme.colors.backgroundGradientStart,
        theme.colors.backgroundGradientMiddle,
        theme.colors.backgroundGradientEnd,
      ]}
      style={styles.screen}>
      <CommonHeader
        compact
        title={STRINGS.staffComplaints.addTitle}
        IconColor={whiteColor}
        iconStyle={{
          height: theme.sizing.headerIcon,
          width: theme.sizing.headerIcon,
        }}
        gradientColors={[
          theme.colors.accentHeaderStart,
          theme.colors.accentHeaderEnd,
        ]}
        extStyle={[
          {
            height: theme.sizing.headerHeight,
          },
          theme.shadows.header,
        ]}
        onLeftClick={() => navigation.goBack()}
        textColor={whiteColor}
        titleStyle={theme.typography.headerTitle}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(
              theme.spacing.buttonBottom,
              insets.bottom + theme.spacing.fieldGap,
            ),
            paddingHorizontal: theme.spacing.screenHorizontal,
            paddingTop: theme.spacing.screenTop,
          },
        ]}
        enableOnAndroid
        extraScrollHeight={24}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <ComplaintDropdownField
          data={classOptions}
          disabled={loadingClasses || classOptions.length === 0}
          isOpen={isClassOpen}
          label={complaintStrings.form.className}
          onSelect={option => {
            setSelectedClass(option);
            setSelectedSection(null);
            setAdmissionNo('');
            setStudentName('');
            setStudentRecords([]);
            setAdmissionOpen(false);
            setClassOpen(false);
          }}
          onToggle={() => {
            if (loadingClasses || classOptions.length === 0) {
              return;
            }

            setAdmissionOpen(false);
            setSectionOpen(false);
            setComplaintTypeOpen(false);
            setClassOpen(current => !current);
          }}
          placeholder={
            loadingClasses
              ? 'Loading classes...'
              : classOptions.length > 0
                ? complaintStrings.form.placeholders.className
                : 'No classes available'
          }
          selected={selectedClass}
          theme={theme}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        <ComplaintDropdownField
          data={sectionOptions}
          disabled={!selectedClass?.value || loadingSections || sectionOptions.length === 0}
          isOpen={isSectionOpen}
          label={complaintStrings.form.section}
          mutedWhenDisabled={false}
          onSelect={option => {
            setSelectedSection(option);
            setAdmissionNo('');
            setStudentName('');
            setStudentRecords([]);
            setAdmissionOpen(false);
            setSectionOpen(false);
          }}
          onToggle={() => {
            if (loadingSections || sectionOptions.length === 0) {
              return;
            }

            setAdmissionOpen(false);
            setClassOpen(false);
            setComplaintTypeOpen(false);
            setSectionOpen(current => !current);
          }}
          placeholder={
            !selectedClass?.value
              ? 'Select Class First'
              : loadingSections
                ? 'Loading sections...'
                : sectionOptions.length > 0
                ? complaintStrings.form.placeholders.section
                : 'No Section Available'
          }
          selected={selectedSection}
          theme={theme}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        {loadingStudents ? (
          <View style={styles.loaderField}>
            <Text style={theme.typography.fieldLabel}>
              {complaintStrings.form.admissionNumber}
            </Text>
            <View
              style={[
                styles.loaderRow,
                {
                  backgroundColor: theme.colors.fieldBackground,
                  borderColor: theme.colors.fieldBorder,
                  borderRadius: theme.radii.field,
                  marginTop: theme.spacing.fieldLabelBottom,
                  minHeight: theme.sizing.fieldHeight,
                  paddingHorizontal: theme.spacing.fieldInternalHorizontal,
                },
                theme.shadows.input,
              ]}>
              <ActivityIndicator color={theme.colors.accentHeaderEnd} size="small" />
              <Text
                style={[
                  theme.typography.fieldValue,
                  {
                    color: theme.colors.fieldPlaceholder,
                    marginLeft: theme.spacing.inlineGap,
                  },
                ]}>
                Loading students...
              </Text>
            </View>
          </View>
        ) : (
          <ComplaintDropdownField
            data={
              admissionOptions.length > 0
                ? admissionOptions
                : [{label: 'No Students Available', value: '__no_students__'}]
            }
            disabled={
              !selectedClass?.value ||
              !selectedSection?.value ||
              admissionOptions.length === 0
            }
            isOpen={isAdmissionOpen}
            label={complaintStrings.form.admissionNumber}
            onSelect={option => {
              const selectedStudent = studentRecords.find(
                student => student.std_roll === option.value,
              );
              setAdmissionNo(selectedStudent?.std_roll || '');
              setStudentName(selectedStudent?.name || '');
              setAdmissionOpen(false);
            }}
            onToggle={() => {
              if (
                !selectedClass?.value ||
                !selectedSection?.value ||
                admissionOptions.length === 0
              ) {
                return;
              }

              setClassOpen(false);
              setSectionOpen(false);
              setComplaintTypeOpen(false);
              setAdmissionOpen(current => !current);
            }}
            placeholder={
              !selectedClass?.value || !selectedSection?.value
                ? 'Select Class & Section first'
                : admissionOptions.length > 0
                  ? complaintStrings.form.placeholders.admissionNumber
                  : 'No Students Available'
            }
            selected={selectedAdmission}
            theme={theme}
          />
        )}

        <View style={{height: theme.spacing.fieldGap}} />

        <ComplaintFormField
          editable={false}
          label={complaintStrings.form.studentName}
          onChangeText={() => {}}
          placeholder={complaintStrings.form.placeholders.studentName}
          theme={theme}
          value={studentName}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        <ComplaintDropdownField
          data={complaintStrings.form.complaintTypes}
          isOpen={isComplaintTypeOpen}
          label={complaintStrings.form.complaintType}
          onSelect={option => {
            setSelectedComplaintType(option);
            setComplaintTypeOpen(false);
          }}
          onToggle={() => {
            setAdmissionOpen(false);
            setClassOpen(false);
            setSectionOpen(false);
            setComplaintTypeOpen(current => !current);
          }}
          placeholder={complaintStrings.form.placeholders.complaintType}
          selected={selectedComplaintType}
          theme={theme}
        />

        <View style={{height: theme.spacing.fieldGap}} />

        <ComplaintFormField
          label={complaintStrings.form.complaint}
          multiline
          onChangeText={setComplaintText}
          placeholder={complaintStrings.form.placeholders.complaint}
          theme={theme}
          value={complaintText}
        />

        <View style={{height: theme.spacing.formButtonTop}} />

        <AppButton
          colors={[
            theme.colors.primaryButtonStart,
            theme.colors.primaryButtonEnd,
          ]}
          loading={submitting}
          onPress={submitComplaint}
          style={[
            styles.button,
            {
              borderRadius: theme.radii.button,
              marginBottom: Math.max(theme.spacing.buttonBottom, insets.bottom),
              minHeight: theme.sizing.buttonHeight,
            },
            theme.shadows.button,
          ]}
          textStyle={theme.typography.buttonLabel}
          title={complaintStrings.actions.add}
        />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default AddComplaint;

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  content: {
    width: '100%',
  },
  loaderField: {
    width: '100%',
  },
  loaderRow: {
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
  },
  screen: {
    flex: 1,
  },
});
