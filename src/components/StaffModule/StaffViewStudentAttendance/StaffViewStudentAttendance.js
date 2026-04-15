import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Snackbar from "react-native-snackbar";

import staffApiClient from "../../../api/staffClient";
import { STRINGS } from "../../../constants";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import AttendancePickerField from "../AttendanceShared/AttendancePickerField";
import AttendanceScreen, {
  AttendanceSurfaceCard,
} from "../AttendanceShared/AttendanceScreen";
import AttendanceSelectField from "../AttendanceShared/AttendanceSelectField";
import AttendanceStudentRow from "../AttendanceShared/AttendanceStudentRow";
import AttendanceStudentsCard from "../AttendanceShared/AttendanceStudentsCard";
import {
  formatAttendanceApiDate,
  formatAttendanceDate,
} from "../AttendanceShared/attendanceHelpers";
import attendanceTheme from "../AttendanceShared/attendanceTheme";
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  filterAttendanceTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
} from "../../../Utils/teachingInfo";

const StaffViewStudentAttendance = ({ navigation, route }) => {
  const initialSelectedDate = route?.params?.selectedDate
    ? new Date(route.params.selectedDate)
    : null;
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [classSectionMap, setClassSectionMap] = useState({});
  const [selectedClass, setSelectedClass] = useState(
    route?.params?.selectedClass || ""
  );
  const [selectedSection, setSelectedSection] = useState(
    route?.params?.selectedSection || ""
  );
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [students, setStudents] = useState([]);
  const classOptions = useMemo(
    () => getTeachingInfoClassOptions(classSectionMap),
    [classSectionMap]
  );
  const sectionOptions = useMemo(
    () => getTeachingSectionsForClass(classSectionMap, selectedClass),
    [classSectionMap, selectedClass]
  );

  const attendanceStrings = STRINGS.attendance;

  const showMessage = useCallback((message) => {
    Snackbar.show({
      backgroundColor: attendanceTheme.colors.absent,
      duration: Snackbar.LENGTH_SHORT,
      text: message,
    });
  }, []);

  const handleClassSelect = useCallback((value) => {
    setSelectedClass(value);
    setSelectedSection("");
    setStudents([]);
  }, []);

  const getTeachingInfoApi = useCallback(async () => {
    try {
      setLoadingClasses(true);
      setLoadingSections(true);
      const allTeachingInfo = await fetchTeachingInfo();
      // Attendance: restrict to classes where this teacher is the class teacher
      setClassSectionMap(buildClassSectionMap(filterAttendanceTeachingInfo(allTeachingInfo)));
    } catch (error) {
      console.log(error);
      showMessage("Unable to load teaching information right now.");
    } finally {
      setLoadingClasses(false);
      setLoadingSections(false);
    }
  }, [showMessage]);

  useEffect(() => {
    getTeachingInfoApi();
  }, [getTeachingInfoApi]);

  useEffect(() => {
    if (!route?.params) {
      return;
    }

    if (route.params.selectedClass) {
      setSelectedClass(route.params.selectedClass);
    }

    if (route.params.selectedSection) {
      setSelectedSection(route.params.selectedSection);
    }

    if (route.params.selectedDate) {
      setSelectedDate(new Date(route.params.selectedDate));
    }
  }, [route?.params]);

  useEffect(() => {
    if (selectedSection && !sectionOptions.includes(selectedSection)) {
      setSelectedSection("");
      setStudents([]);
    }
  }, [sectionOptions, selectedSection]);

  const getViewAttendanceApi = useCallback(async () => {
    try {
      setLoadingStudents(true);

      const responseJson = await staffApiClient.post("viewattendance_studentlist", {
        class_name: selectedClass,
        class_section: selectedSection,
        date: formatAttendanceApiDate(selectedDate),
      });

      if (responseJson.status) {
        const normalizedStudents = (responseJson.data || []).map((student) => ({
          ...student,
          isPresent: student.attendance === 1,
        }));

        setStudents(normalizedStudents);
        return;
      }

      setStudents([]);
      showMessage(responseJson.message);
    } catch (error) {
      console.log(error);
      setStudents([]);
      showMessage(attendanceStrings.unableToLoadStudents);
    } finally {
      setLoadingStudents(false);
    }
  }, [
    attendanceStrings.unableToLoadStudents,
    selectedClass,
    selectedDate,
    selectedSection,
    showMessage,
  ]);

  useEffect(() => {
    if (!selectedClass || !selectedSection || !selectedDate) {
      setStudents([]);
      return;
    }

    getViewAttendanceApi();
  }, [getViewAttendanceApi, selectedClass, selectedDate, selectedSection]);

  const refreshAttendanceData = useCallback(async () => {
    await getTeachingInfoApi();

    if (selectedClass && selectedSection && selectedDate) {
      await getViewAttendanceApi();
    }
  }, [
    getTeachingInfoApi,
    getViewAttendanceApi,
    selectedClass,
    selectedDate,
    selectedSection,
  ]);

  const { onRefresh, refreshing } = usePullToRefresh(refreshAttendanceData);

  return (
    <AttendanceScreen
      onBackPress={() => navigation.goBack()}
      title={attendanceStrings.viewTitle}
    >
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <AttendanceSurfaceCard style={styles.formCard}>
          <View style={styles.fieldStack}>
            <AttendanceSelectField
              disabled={loadingClasses || classOptions.length === 0}
              label={attendanceStrings.fields.class}
              onSelect={handleClassSelect}
              options={classOptions}
              placeholder={
                classOptions.length > 0
                  ? attendanceStrings.placeholders.class
                  : attendanceStrings.noClasses
              }
              value={selectedClass}
            />

            <AttendanceSelectField
              disabled={!selectedClass || loadingSections || sectionOptions.length === 0}
              label={attendanceStrings.fields.section}
              onSelect={setSelectedSection}
              options={sectionOptions}
              placeholder={
                !selectedClass
                  ? "Select Section"
                  : sectionOptions.length > 0
                  ? attendanceStrings.placeholders.section
                  : "No Section Available"
              }
              value={selectedSection}
            />

            <AttendancePickerField
              label={attendanceStrings.fields.date}
              maximumDate={new Date()}
              mode="date"
              onConfirmValue={setSelectedDate}
              pickerDate={selectedDate}
              placeholder={attendanceStrings.placeholders.date}
              value={formatAttendanceDate(selectedDate)}
            />
          </View>
        </AttendanceSurfaceCard>

        <Text style={styles.sectionTitle}>
          {attendanceStrings.sectionTitle}
        </Text>

        <AttendanceStudentsCard
          description={attendanceStrings.emptyStates.view.description}
          emptyTitle={attendanceStrings.emptyStates.view.title}
          hasContent={students.length > 0}
          loading={loadingStudents}
        >
          <View>
            {students.map((student) => (
              <AttendanceStudentRow
                interactive={false}
                key={String(student.std_roll)}
                name={student.Student_name}
                statusKey={student.isPresent ? "present" : "absent"}
                statusLabel={
                  student.isPresent
                    ? attendanceStrings.status.present
                    : attendanceStrings.status.absent
                }
              />
            ))}
          </View>
        </AttendanceStudentsCard>
      </ScrollView>
    </AttendanceScreen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: attendanceTheme.spacing.screenBottom,
  },
  formCard: {
    marginBottom: attendanceTheme.spacing.sectionGap,
  },
  fieldStack: {
    gap: attendanceTheme.spacing.fieldGap,
  },
  sectionTitle: {
    color: attendanceTheme.colors.textPrimary,
    fontFamily: attendanceTheme.fontFamily.section,
    fontSize: attendanceTheme.typography.sectionTitle,
    marginBottom: attendanceTheme.spacing.fieldGap,
    marginTop: attendanceTheme.spacing.sectionTitleTop,
  },
});

export default StaffViewStudentAttendance;
