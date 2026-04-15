import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Snackbar from "react-native-snackbar";

import staffApiClient from "../../../api/staffClient";
import { useAppToast } from "../../common/AppToast";
import { STRINGS } from "../../../constants";
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
  formatAttendanceTime,
} from "../AttendanceShared/attendanceHelpers";
import attendanceTheme from "../AttendanceShared/attendanceTheme";
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  filterAttendanceTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
} from "../../../Utils/teachingInfo";

const StaffAddAttendance = ({ navigation }) => {
  const { showSuccessToast } = useAppToast();
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [classSectionMap, setClassSectionMap] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsFeedback, setStudentsFeedback] = useState(null);
  const classOptions = useMemo(
    () => getTeachingInfoClassOptions(classSectionMap),
    [classSectionMap]
  );
  const sectionOptions = useMemo(
    () => getTeachingSectionsForClass(classSectionMap, selectedClass),
    [classSectionMap, selectedClass]
  );

  const attendanceStrings = STRINGS.attendance;
  const presentCount = students.filter((student) => student.isPresent).length;
  const presentSummaryLabel =
    students.length > 0
      ? `${presentCount}/${students.length} ${attendanceStrings.status.present}`
      : `0/0 ${attendanceStrings.status.present}`;
  const emptyStateTitle =
    studentsFeedback?.title || attendanceStrings.emptyStates.add.title;
  const emptyStateDescription =
    studentsFeedback?.description ||
    attendanceStrings.emptyStates.add.description;
  const emptyStateVariant = studentsFeedback?.variant || "default";

  const handleClassSelect = useCallback((value) => {
    console.log("[StaffAddAttendance] selectedClass:", value);
    setSelectedClass(value);
    setSelectedSection("");
    setStudents([]);
    setStudentsFeedback(null);
  }, []);

  const handleSectionSelect = useCallback((value) => {
    console.log("[StaffAddAttendance] selectedSection:", value);
    setSelectedSection(value);
    setStudents([]);
    setStudentsFeedback(null);
  }, []);

  const showMessage = useCallback((message) => {
    Snackbar.show({
      backgroundColor: attendanceTheme.colors.absent,
      duration: Snackbar.LENGTH_SHORT,
      text: message,
    });
  }, []);

  const getTeachingInfoApi = useCallback(async () => {
    try {
      setLoadingClasses(true);
      setLoadingSections(true);
      const allTeachingInfo = await fetchTeachingInfo();
      // Attendance: restrict to classes where this teacher is the class teacher
      const teachingInfo = filterAttendanceTeachingInfo(allTeachingInfo);
      const nextClassSectionMap = buildClassSectionMap(teachingInfo);

      console.log("[StaffAddAttendance] classSectionMap:", nextClassSectionMap);
      setClassSectionMap(nextClassSectionMap);
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
    console.log("[StaffAddAttendance] sectionOptions:", {
      selectedClass,
      sectionOptions,
    });
  }, [sectionOptions, selectedClass]);

  useEffect(() => {
    if (selectedSection && !sectionOptions.includes(selectedSection)) {
      setSelectedSection("");
      setStudents([]);
      setStudentsFeedback(null);
    }
  }, [sectionOptions, selectedSection]);

  const getAddStudentsAttendanceApi = useCallback(
    async (className, section, date) => {
      try {
        setLoadingStudents(true);
        setStudentsFeedback(null);

        const responseJson = await staffApiClient.post("addstudents_attendance", {
          class_name: className,
          class_section: section,
          date,
        });

        if (responseJson.status) {
          const normalizedStudents = (responseJson.data || []).map(
            (student) => ({
              ...student,
              isPresent: true,
            })
          );

          setStudents(normalizedStudents);
          return;
        }

        const responseMessage =
          typeof responseJson.message === "string"
            ? responseJson.message.trim()
            : "";

        setStudents([]);

        if (responseMessage.toLowerCase().includes("already marked")) {
          setStudentsFeedback({
            description: attendanceStrings.messages.alreadyMarkedDescription,
            title: attendanceStrings.messages.alreadyMarkedTitle,
            variant: "warning",
          });
          return;
        }

        setStudentsFeedback({
          description:
            responseMessage || attendanceStrings.unableToLoadStudents,
          title: attendanceStrings.messages.loadStudentsTitle,
          variant: "warning",
        });
      } catch (error) {
        console.log(error);
        setStudents([]);
        setStudentsFeedback({
          description: attendanceStrings.unableToLoadStudents,
          title: attendanceStrings.messages.loadStudentsTitle,
          variant: "warning",
        });
      } finally {
        setLoadingStudents(false);
      }
    },
    [attendanceStrings.messages, attendanceStrings.unableToLoadStudents]
  );

  useEffect(() => {
    if (!selectedClass || !selectedSection || !selectedDate) {
      setStudents([]);
      setStudentsFeedback(null);
      return;
    }

    getAddStudentsAttendanceApi(
      selectedClass,
      selectedSection,
      formatAttendanceApiDate(selectedDate)
    );
  }, [
    getAddStudentsAttendanceApi,
    selectedClass,
    selectedDate,
    selectedSection,
  ]);

  const toggleStudentAttendance = useCallback((studentRoll) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.std_roll === studentRoll
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  }, []);

  const getSubmitAttendanceApi = useCallback(async () => {
    try {
      setSubmitting(true);

      const payload = {};

      students.forEach((student) => {
        if (student.isPresent) {
          payload[student.std_roll] = 1;
        }
      });

      const responseJson = await staffApiClient.post("submit_attendance", {
        attendance: JSON.stringify(payload),
        class_name: selectedClass,
        class_section: selectedSection,
        date: formatAttendanceApiDate(selectedDate),
      });

      if (responseJson.status) {
        showSuccessToast({
          message: attendanceStrings.successDescription,
          title: attendanceStrings.successTitle,
        });
        navigation.navigate("StaffViewStudentAttendance", {
          selectedClass,
          selectedDate: selectedDate ? selectedDate.toISOString() : null,
          selectedSection,
        });
        return;
      }

      showMessage(responseJson.message || attendanceStrings.submitFailed);
    } catch (error) {
      console.log(error);
      showMessage(attendanceStrings.submitFailed);
    } finally {
      setSubmitting(false);
    }
  }, [
    selectedClass,
    selectedDate,
    selectedSection,
    attendanceStrings.submitFailed,
    navigation,
    showSuccessToast,
    showMessage,
    students,
  ]);

  return (
    <AttendanceScreen
      onBackPress={() => navigation.goBack()}
      title={attendanceStrings.addTitle}
    >
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.listContent}
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
              onSelect={handleSectionSelect}
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

            <AttendancePickerField
              label={attendanceStrings.fields.time}
              mode="time"
              onConfirmValue={setSelectedTime}
              pickerDate={selectedTime}
              placeholder={attendanceStrings.placeholders.time}
              value={formatAttendanceTime(selectedTime)}
            />
          </View>
        </AttendanceSurfaceCard>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {attendanceStrings.sectionTitle}
          </Text>

          <View style={styles.summaryPill}>
            <Text style={styles.summaryText}>{presentSummaryLabel}</Text>
          </View>
        </View>

        <AttendanceStudentsCard
          description={emptyStateDescription}
          emptyStateVariant={emptyStateVariant}
          emptyTitle={emptyStateTitle}
          hasContent={students.length > 0}
          interactiveList
          loading={loadingStudents}
        >
          <View>
            {students.map((student, index) => (
              <AttendanceStudentRow
                compact
                interactive
                isLast={index === students.length - 1}
                key={String(student.std_roll)}
                name={student.Student_name}
                onPress={() => toggleStudentAttendance(student.std_roll)}
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

        {students.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            android_ripple={{
              color: attendanceTheme.colors.ripple,
              borderless: false,
            }}
            disabled={submitting}
            onPress={getSubmitAttendanceApi}
            style={({ pressed }) => [
              styles.submitButton,
              (pressed || submitting) && styles.submitButtonPressed,
            ]}
          >
            <Text style={styles.submitButtonText}>
              {attendanceStrings.submit}
            </Text>
          </Pressable>
        ) : (
          <View style={styles.footerSpacer} />
        )}
      </ScrollView>
    </AttendanceScreen>
  );
};

const styles = StyleSheet.create({
  listContent: {
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
    fontFamily: attendanceTheme.fontFamily.label,
    fontSize: attendanceTheme.typography.fieldLabel,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Math.round(attendanceTheme.spacing.fieldGap * 0.72),
    marginTop: Math.round(attendanceTheme.spacing.sectionTitleTop * 0.6),
  },
  summaryPill: {
    alignItems: "center",
    backgroundColor: attendanceTheme.colors.attendanceSummarySurface,
    borderRadius: Math.round(
      attendanceTheme.layout.summaryPillMinHeight * 0.38
    ),
    justifyContent: "center",
    minHeight: Math.round(attendanceTheme.layout.summaryPillMinHeight * 0.76),
    paddingHorizontal: Math.round(
      attendanceTheme.spacing.summaryPillHorizontal * 0.78
    ),
    paddingVertical: Math.round(
      attendanceTheme.spacing.summaryPillVertical * 0.5
    ),
  },
  summaryText: {
    color: attendanceTheme.colors.headerStart,
    fontFamily: attendanceTheme.fontFamily.label,
    fontSize: attendanceTheme.typography.fieldLabel,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: attendanceTheme.colors.headerStart,
    borderRadius: attendanceTheme.radius.button,
    height: attendanceTheme.layout.submitButtonHeight,
    justifyContent: "center",
    marginTop: attendanceTheme.spacing.buttonTop,
  },
  submitButtonPressed: {
    opacity: 0.94,
  },
  submitButtonText: {
    color: attendanceTheme.colors.headerText,
    fontFamily: attendanceTheme.fontFamily.button,
    fontSize: attendanceTheme.typography.button,
  },
  footerSpacer: {
    height: attendanceTheme.spacing.screenBottom,
  },
});

export default StaffAddAttendance;
