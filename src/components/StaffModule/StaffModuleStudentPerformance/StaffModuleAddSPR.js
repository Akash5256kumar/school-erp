import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { apiRequest } from "../../../Utils";
import {
  fetchStaffProfileTeachingInfo,
  filterAttendanceTeachingInfo,
  sortTeachingClasses,
  sortTeachingValues,
} from "../../../Utils/teachingInfo";
import { apiClient } from "../../../api";
import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import {
  StaffAcademicDateField,
  StaffAcademicSelectField,
  StaffAcademicTextField,
} from "../StaffAcademicShared/StaffAcademicFields";
import { useAppToast } from "../../common/AppToast";
import {
  AcademicActionButton,
  AcademicChoiceGrid,
  AcademicSurfaceCard,
} from "../StaffAcademicShared/StaffAcademicPrimitives";
import { ACADEMIC_TEXT } from "../StaffAcademicShared/staffAcademicConfig";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";

const SPR_TEXT = ACADEMIC_TEXT.spr;
const COMMON_TEXT = ACADEMIC_TEXT.common;
const PERFORMANCE_GROUPS = ACADEMIC_TEXT.sprPerformanceGroups;

const buildSubjectsFromNames = (names = []) =>
  names.map((subject) => ({
    remarks: "",
    status: "",
    subject,
  }));

const createInitialRatings = () => ({
  punctuality: "",
  uniform: "",
  homework: "",
  classwork: "",
  classInteraction: "",
  discipline: "",
  performanceAcademics: "",
  performanceSports: "",
  performanceCultural: "",
  strength: "",
});

const getPerformanceGroupTitleStyle = (theme) => ({
  color: theme.colors.secondaryText,
  fontFamily: theme.typography.sectionTitle.fontFamily,
  fontSize: theme.typography.body.fontSize,
  marginBottom: theme.spacing.labelGap,
});

const getSubjectsTitleStripStyle = (theme) => ({
  backgroundColor: theme.colors.apply,
  paddingHorizontal: theme.spacing.cardHorizontal,
  paddingVertical: theme.spacing.labelGap * 1.1,
});

const getSubjectsTitleStyle = (theme) => ({
  color: theme.colors.white,
  fontFamily: theme.typography.sectionTitle.fontFamily,
  fontSize: theme.typography.sectionTitle.fontSize,
});

const getSubjectTableHeaderStyle = (theme) => ({
  backgroundColor: theme.colors.tableHeader,
  flexDirection: "row",
  paddingHorizontal: theme.spacing.cardHorizontal * 0.65,
  paddingVertical: theme.spacing.labelGap,
});

const getSubjectHeaderCellStyle = (theme, index) => ({
  color: theme.colors.white,
  fontFamily: theme.typography.tableHeader.fontFamily,
  fontSize: theme.typography.tableHeader.fontSize,
  paddingHorizontal: index === 0 ? 0 : theme.spacing.tableCellPadding * 0.4,
  textAlign: index === 0 ? "center" : "left",
});

const getSubjectRowStyle = (theme) => ({
  alignItems: "center",
  borderBottomColor: theme.colors.subtleDivider,
  borderBottomWidth: theme.borderWidth.hairline,
  flexDirection: "row",
  paddingHorizontal: theme.spacing.cardHorizontal * 0.65,
  paddingVertical: theme.spacing.labelGap,
});

const getSubjectInputStyle = (theme) => ({
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.action * 0.8,
  borderWidth: theme.borderWidth.regular,
  color: theme.colors.fieldText,
  fontFamily: theme.typography.fieldValue.fontFamily,
  fontSize: theme.typography.fieldValue.fontSize,
  height: theme.layout.tableInputHeight,
  marginHorizontal: theme.spacing.tableCellPadding * 0.2,
  paddingHorizontal: theme.spacing.tableCellPadding,
  textAlign: "left",
});

const StaffModuleAddSPR = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = useSelector((state) => state.userSlice.userData);
  const { showSuccessToast } = useAppToast();
  const { height, width } = useWindowDimensions();
  const theme = createAcademicTheme({ height, width, variant: "spr" });
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isEdit = route.params?.isEdit || false;

  const teacherName =
    userData?.name ||
    userData?.staff_name ||
    userData?.full_name ||
    userData?.teacher ||
    "";

  const [publishDate, setPublishDate] = useState(null);
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [studentList, setStudentList] = useState([]); // [{ label, std_roll, name }]
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    admissionNo: "",
    areasOfConcern: "",
    classTeacher: teacherName,
    studentName: "",
    wardensComment: "",
  });
  const [ratings, setRatings] = useState(createInitialRatings);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getTeachingInfo = async () => {
      try {
        const info = await fetchStaffProfileTeachingInfo(userData?.staff_info_id);
        setTeachingInfo(filterAttendanceTeachingInfo(info));
      } catch (error) {
        console.log("getTeachingInfo API Error", error);
      }
    };

    if (userData?.staff_info_id) {
      getTeachingInfo();
    }
  }, [userData?.staff_info_id]);

  useEffect(() => {
    if (teacherName) {
      setBasicInfo((prev) => ({
        ...prev,
        classTeacher: prev.classTeacher || teacherName,
      }));
    }
  }, [teacherName]);

  const classOptions = useMemo(
    () =>
      sortTeachingClasses([
        ...new Set(
          (teachingInfo || []).map((item) => item?.class).filter(Boolean)
        ),
      ]),
    [teachingInfo]
  );

  const sectionOptions = useMemo(() => {
    if (!classValue) {
      return [];
    }

    return sortTeachingValues([
      ...new Set(
        (teachingInfo || [])
          .filter((item) => item?.class === classValue)
          .map((item) => item?.section)
          .filter(Boolean)
      ),
    ]);
  }, [classValue, teachingInfo]);

  useEffect(() => {
    if (classValue && !classOptions.includes(classValue)) {
      setClassValue("");
    }
  }, [classOptions, classValue]);

  useEffect(() => {
    setSection("");
    setStudentList([]);
    setBasicInfo((prev) => ({ ...prev, admissionNo: "", studentName: "" }));
  }, [classValue]);

  useEffect(() => {
    if (section && !sectionOptions.includes(section)) {
      setSection("");
    }
    setStudentList([]);
    setBasicInfo((prev) => ({ ...prev, admissionNo: "", studentName: "" }));
  }, [section, sectionOptions]);

  const fetchStudents = useCallback(async (cls, sec) => {
    try {
      setLoadingStudents(true);
      setStudentList([]);
      setBasicInfo((prev) => ({ ...prev, admissionNo: "", studentName: "" }));

      const res = await apiRequest(
        `class-data?class=${encodeURIComponent(cls)}&section=${encodeURIComponent(sec)}`,
        "GET"
      );
      const records = res?.data?.students?.records || [];
      console.log("[fetchStudents] sample record:", JSON.stringify(records[0]));
      const mapped = records.map((s) => {
        const studentName =
          s.Student_name ||
          s.student_name ||
          s.name ||
          s.full_name ||
          s.Name ||
          "";
        const roll = String(s.std_roll || s.roll_no || s.roll || "");
        const label = studentName && roll
          ? `${studentName} (${roll})`
          : studentName || roll;
        return { label, name: studentName, std_roll: roll };
      }).filter((s) => s.label);
      setStudentList(mapped);
    } catch (error) {
      console.log("fetchStudents Error", error);
      setStudentList([]);
    } finally {
      setLoadingStudents(false);
    }
  }, []);

  useEffect(() => {
    if (classValue && section) {
      fetchStudents(classValue, section);
    }
  }, [classValue, section, fetchStudents]);

  const fetchSubjects = useCallback(async (cls) => {
    try {
      setLoadingSubjects(true);
      setSubjects([]);
      const res = await apiRequest(
        `view-subjects?class=${encodeURIComponent(cls)}`,
        "GET"
      );
      const names = (res?.subjects || [])
        .map((s) => s?.name || s?.subject_name || s?.subject || "")
        .filter(Boolean);
      setSubjects(buildSubjectsFromNames(names));
    } catch (error) {
      console.log("fetchSubjects Error", error);
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  }, []);

  useEffect(() => {
    if (classValue) {
      fetchSubjects(classValue);
    } else {
      setSubjects([]);
    }
  }, [classValue, fetchSubjects]);

  const getFirstValidationMessage = (error) => {
    const nestedErrors = error?.data?.errors;

    if (!nestedErrors || typeof nestedErrors !== "object") {
      return error?.userMessage || error?.message || "Something went wrong";
    }

    for (const value of Object.values(nestedErrors)) {
      if (Array.isArray(value) && value.length > 0) {
        return value[0];
      }

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return error?.userMessage || error?.message || "Something went wrong";
  };

  const updateBasicInfo = (key, value) => {
    setBasicInfo((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const updateRating = (key, value) => {
    setRatings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const updateSubjectField = (index, field, value) => {
    setSubjects((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  };

  const resetForm = () => {
    setPublishDate(null);
    setClassValue("");
    setSection("");
    setStudentList([]);
    setBasicInfo({
      admissionNo: "",
      areasOfConcern: "",
      classTeacher: teacherName,
      contactNo: "",
      studentName: "",
      wardensComment: "",
    });
    setRatings(createInitialRatings());
    setSubjects([]);
  };

  const saveSpr = async () => {
    if (
      !publishDate ||
      !classValue ||
      !section ||
      !basicInfo.admissionNo.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      const formattedDate = publishDate.toISOString().split("T")[0];

      formData.append("admission_number", basicInfo.admissionNo.trim());
      formData.append(
        "master_id",
        String(userData?.id || userData?.staff_info_id || "")
      );
      formData.append("month", String(publishDate.getMonth() + 1));
      formData.append("date", formattedDate);
      formData.append("class", classValue);
      formData.append("section", section);
      formData.append("class_teacher", basicInfo.classTeacher.trim());
      formData.append("student_name", basicInfo.studentName.trim());
      formData.append("pdf_file", "");
      formData.append("punctuality", ratings.punctuality);
      formData.append("uniform", ratings.uniform);
      formData.append("homework", ratings.homework);
      formData.append("classwork", ratings.classwork);
      formData.append("discipline", ratings.discipline);
      formData.append("academics_performance", ratings.performanceAcademics);
      formData.append("sport_performance", ratings.performanceSports);
      formData.append("cultural_performance", ratings.performanceCultural);
      formData.append("strength", ratings.strength);
      formData.append("warden_comment", basicInfo.wardensComment.trim());
      formData.append("interaction", ratings.classInteraction);
      formData.append("area_concern", basicInfo.areasOfConcern.trim());
      formData.append("isActive", "1");

      subjects.forEach((item) => {
        formData.append(`subject[${item.subject}][status]`, item.status.trim());
        formData.append(
          `subject[${item.subject}][remark]`,
          item.remarks.trim()
        );
      });

      await apiClient.upload("storePerformance", formData);

      showSuccessToast({
        message: "The SPR has been added successfully.",
        title: "SPR Added",
      });
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.log("Add SPR Error:", error);
      alert(getFirstValidationMessage(error));
    }
  };

  return (
    <StaffAcademicScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={isEdit ? SPR_TEXT.titles.edit : SPR_TEXT.titles.add}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AcademicSurfaceCard theme={theme}>
          <Text style={[theme.typography.sectionTitle, styles.cardTitle]}>
            {SPR_TEXT.basicInfo}
          </Text>

          <StaffAcademicDateField
            date={publishDate}
            label={SPR_TEXT.fields.selectDate}
            onChange={setPublishDate}
            theme={theme}
          />

          <View style={styles.fieldGap} />

          <StaffAcademicSelectField
            label={SPR_TEXT.fields.class}
            onSelect={setClassValue}
            optionAppearance="attendance"
            options={classOptions}
            placeholder={SPR_TEXT.placeholders.class}
            selected={classValue}
            theme={theme}
          />

          <View style={styles.fieldGap} />

          <StaffAcademicSelectField
            disabled={!classValue}
            label={SPR_TEXT.fields.section}
            mutedWhenDisabled={false}
            onSelect={setSection}
            optionAppearance="attendance"
            options={sectionOptions}
            placeholder={SPR_TEXT.placeholders.section}
            selected={section}
            theme={theme}
          />

          <View style={styles.fieldGap} />

          {/* ── Student Dropdown (auto-loaded from class + section) ── */}
          {loadingStudents ? (
            <View style={styles.studentLoaderRow}>
              <ActivityIndicator color={theme.colors.accent} size="small" />
              <Text style={[theme.typography.fieldLabel, styles.studentLoaderText]}>
                Loading students…
              </Text>
            </View>
          ) : (
            <StaffAcademicSelectField
              disabled={!section || studentList.length === 0}
              label={SPR_TEXT.fields.admissionNo}
              onSelect={(label) => {
                const found = studentList.find((s) => s.label === label);
                if (found) {
                  updateBasicInfo("admissionNo", found.std_roll);
                  updateBasicInfo("studentName", found.name);
                }
              }}
              optionAppearance="attendance"
              options={
                studentList.length > 0
                  ? studentList.map((s) => s.label)
                  : ["No Students Available"]
              }
              placeholder={
                !classValue || !section
                  ? "Select Class & Section first"
                  : studentList.length === 0
                  ? "No Students Available"
                  : "Select Student (Name / Roll No)"
              }
              selected={
                basicInfo.admissionNo
                  ? studentList.find((s) => s.std_roll === basicInfo.admissionNo)?.label || ""
                  : ""
              }
              theme={theme}
            />
          )}

          <View style={styles.fieldGap} />

          <StaffAcademicTextField
            label={SPR_TEXT.fields.classTeacher}
            onChangeText={(value) => updateBasicInfo("classTeacher", value)}
            placeholder={SPR_TEXT.placeholders.classTeacher}
            theme={theme}
            value={basicInfo.classTeacher}
          />


          <StaffAcademicTextField
            label={SPR_TEXT.fields.studentName}
            onChangeText={(value) => updateBasicInfo("studentName", value)}
            placeholder={SPR_TEXT.placeholders.studentName}
            theme={theme}
            value={basicInfo.studentName}
          />
        </AcademicSurfaceCard>

        {SPR_TEXT.sectionCards
          .filter((sectionCard) => sectionCard.key !== "strength")
          .map((sectionCard) => (
            <AcademicSurfaceCard
              key={sectionCard.key}
              style={styles.sectionCard}
              theme={theme}
            >
              <Text style={[theme.typography.sectionTitle, styles.cardTitle]}>
                {sectionCard.title}
              </Text>
              <AcademicChoiceGrid
                onSelect={(value) => updateRating(sectionCard.key, value)}
                options={sectionCard.options}
                selected={ratings[sectionCard.key]}
                theme={theme}
              />
            </AcademicSurfaceCard>
          ))}

        <AcademicSurfaceCard style={styles.sectionCard} theme={theme}>
          <Text style={[theme.typography.sectionTitle, styles.cardTitle]}>
            {SPR_TEXT.performanceTitle}
          </Text>

          {PERFORMANCE_GROUPS.map((group) => (
            <View key={group.key} style={styles.performanceGroup}>
              <Text style={getPerformanceGroupTitleStyle(theme)}>
                {group.label}
              </Text>
              <AcademicChoiceGrid
                onSelect={(value) => updateRating(group.key, value)}
                options={group.options}
                selected={ratings[group.key]}
                theme={theme}
              />
            </View>
          ))}
        </AcademicSurfaceCard>

        <AcademicSurfaceCard style={styles.sectionCard} theme={theme}>
          <Text style={[theme.typography.sectionTitle, styles.cardTitle]}>
            {SPR_TEXT.strengthTitle}
          </Text>
          <AcademicChoiceGrid
            onSelect={(value) => updateRating("strength", value)}
            options={
              SPR_TEXT.sectionCards.find(
                (sectionCard) => sectionCard.key === "strength"
              )?.options || []
            }
            selected={ratings.strength}
            theme={theme}
          />
        </AcademicSurfaceCard>

        <AcademicSurfaceCard style={styles.subjectsCard} theme={theme}>
          <View style={getSubjectsTitleStripStyle(theme)}>
            <Text style={getSubjectsTitleStyle(theme)}>
              {SPR_TEXT.subjectsTitle}
            </Text>
          </View>

          {loadingSubjects ? (
            <View style={styles.subjectsLoaderRow}>
              <ActivityIndicator color={theme.colors.accent} size="small" />
              <Text style={[theme.typography.body, styles.subjectsLoaderText]}>
                Loading subjects…
              </Text>
            </View>
          ) : subjects.length === 0 ? (
            <View style={styles.subjectsEmptyRow}>
              <Text style={[theme.typography.body, styles.subjectsEmptyText]}>
                {classValue ? "No Subjects Available" : "Select a class to load subjects"}
              </Text>
            </View>
          ) : (
            <>
              <View style={getSubjectTableHeaderStyle(theme)}>
                {SPR_TEXT.subjectColumns.map((column, index) => (
                  <Text
                    key={column}
                    style={[
                      getSubjectHeaderCellStyle(theme, index),
                      index === 0
                        ? styles.serialColumn
                        : index === 1
                        ? styles.subjectColumn
                        : styles.inputColumn,
                    ]}
                  >
                    {column}
                  </Text>
                ))}
              </View>

              {subjects.map((item, index) => (
                <View
                  key={item.subject}
                  style={[
                    getSubjectRowStyle(theme),
                    index === subjects.length - 1 ? styles.subjectLastRow : null,
                  ]}
                >
                  <Text style={[theme.typography.body, styles.serialColumn]}>
                    {index + 1}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={[
                      theme.typography.body,
                      styles.subjectColumn,
                      styles.subjectText,
                    ]}
                  >
                    {item.subject}
                  </Text>
                  <TextInput
                    onChangeText={(value) =>
                      updateSubjectField(index, "status", value)
                    }
                    placeholder={SPR_TEXT.subjectStatusPlaceholder}
                    placeholderTextColor={theme.colors.fieldPlaceholder}
                    style={[getSubjectInputStyle(theme), styles.inputColumn]}
                    value={item.status}
                  />
                  <TextInput
                    onChangeText={(value) =>
                      updateSubjectField(index, "remarks", value)
                    }
                    placeholder={SPR_TEXT.subjectRemarksPlaceholder}
                    placeholderTextColor={theme.colors.fieldPlaceholder}
                    style={[getSubjectInputStyle(theme), styles.inputColumn]}
                    value={item.remarks}
                  />
                </View>
              ))}
            </>
          )}
        </AcademicSurfaceCard>

        <AcademicSurfaceCard style={styles.sectionCard} theme={theme}>
          <Text style={[theme.typography.sectionTitle, styles.cardTitle]}>
            {SPR_TEXT.fields.areasOfConcern}
          </Text>
          <StaffAcademicTextField
            multiline
            onChangeText={(value) => updateBasicInfo("areasOfConcern", value)}
            placeholder={SPR_TEXT.placeholders.areasOfConcern}
            theme={theme}
            value={basicInfo.areasOfConcern}
          />
        </AcademicSurfaceCard>

        <AcademicSurfaceCard style={styles.sectionCard} theme={theme}>
          <Text style={[theme.typography.sectionTitle, styles.cardTitle]}>
            {SPR_TEXT.fields.wardensComment}
          </Text>
          <StaffAcademicTextField
            multiline
            onChangeText={(value) => updateBasicInfo("wardensComment", value)}
            placeholder={SPR_TEXT.placeholders.wardensComment}
            theme={theme}
            value={basicInfo.wardensComment}
          />
        </AcademicSurfaceCard>

        <View style={styles.footerRow}>
          <AcademicActionButton
            onPress={saveSpr}
            style={styles.footerAction}
            theme={theme}
            title={COMMON_TEXT.save}
            tone="save"
          />
          <AcademicActionButton
            onPress={resetForm}
            style={styles.footerAction}
            theme={theme}
            title={COMMON_TEXT.reset}
            tone="reset"
          />
        </View>
      </ScrollView>
    </StaffAcademicScaffold>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    cardTitle: {
      marginBottom: theme.spacing.cardGap,
    },
    contentContainer: {
      paddingBottom: theme.spacing.footerBottom * 2,
    },
    fieldGap: {
      height: theme.spacing.fieldGap,
    },
    footerAction: {
      flex: 1,
    },
    footerRow: {
      columnGap: theme.spacing.columnGap,
      flexDirection: "row",
      marginTop: theme.spacing.buttonTop,
    },
    inputColumn: {
      flex: 1.38,
    },
    performanceGroup: {
      marginBottom: theme.spacing.cardGap,
    },
    sectionCard: {
      marginTop: theme.spacing.cardGap,
    },
    serialColumn: {
      flex: 0.55,
      textAlign: "center",
    },
    subjectColumn: {
      flex: 1.7,
      paddingHorizontal: theme.spacing.tableCellPadding * 0.4,
    },
    subjectText: {
      lineHeight: theme.typography.body.lineHeight * 0.95,
      textAlignVertical: "center",
    },
    subjectLastRow: {
      borderBottomWidth: 0,
    },
    subjectsCard: {
      marginTop: theme.spacing.cardGap,
      overflow: "hidden",
      paddingHorizontal: 0,
      paddingTop: 0,
    },
    studentLoaderRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.labelGap,
      paddingVertical: theme.spacing.labelGap,
    },
    studentLoaderText: {
      color: theme.colors.secondaryText,
    },
    subjectsLoaderRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: theme.spacing.labelGap,
      justifyContent: "center",
      paddingVertical: theme.spacing.cardGap * 1.5,
    },
    subjectsLoaderText: {
      color: theme.colors.secondaryText,
    },
    subjectsEmptyRow: {
      alignItems: "center",
      paddingVertical: theme.spacing.cardGap * 1.5,
    },
    subjectsEmptyText: {
      color: theme.colors.secondaryText,
    },
  });

export default StaffModuleAddSPR;
