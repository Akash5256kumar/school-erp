import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { Filter, X } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";

import { useAppToast } from "../../common/AppToast";
import { apiRequest } from "../../../Utils";
import * as constant from "../../../Utils/Constant";
import { TERM_OPTION } from "../../../Utils/StaticData";
import {
  fetchStaffProfileTeachingInfo,
  sortTeachingClasses,
  sortTeachingValues,
} from "../../../Utils/teachingInfo";
import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import { StaffAcademicSelectField } from "../StaffAcademicShared/StaffAcademicFields";
import {
  AcademicGradientButton,
  AcademicSegmentedTabs,
  AcademicSurfaceCard,
} from "../StaffAcademicShared/StaffAcademicPrimitives";
import { ACADEMIC_TEXT } from "../StaffAcademicShared/staffAcademicConfig";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";

const MODULE_TEXT = ACADEMIC_TEXT.resultGrades;
const COMMON_TEXT = ACADEMIC_TEXT.common;
const EXAM_TYPE_TERM_API_VALUE_MAP = {
  Final: "term2",
  "Mid Term": "term1",
  "Term 1": "term1",
  "Term 2": "term2",
};
const RESULT_FIELD_PLACEHOLDERS = {
  Class: MODULE_TEXT.placeholders.class,
  "Exam Type": MODULE_TEXT.placeholders.examType,
  Grade: MODULE_TEXT.placeholders.grade,
  Section: MODULE_TEXT.placeholders.section,
  Subject: MODULE_TEXT.placeholders.subject,
  Term: MODULE_TEXT.placeholders.term,
};

const sanitizeGradeValue = (value) =>
  String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9+\- ]/g, "")
    .slice(0, 12);

const mapExamTypeTermToApiValue = (value) => {
  const normalized = String(value || "").trim();

  if (!normalized) {
    return "";
  }

  return (
    EXAM_TYPE_TERM_API_VALUE_MAP[normalized] ||
    normalized.toLowerCase().replace(/\s+/g, "")
  );
};

const normalizeTeachingAssignments = (teachingInfo = []) =>
  (teachingInfo || []).filter(
    (item) => item?.class && item?.section && (item?.subject || item?.name)
  );

const buildGradeItems = (items = []) =>
  (items || []).map((item, index) => ({
    admissionNo: String(item?.admission_no || item?.std_roll || ""),
    grade: item?.grade || "",
    id: String(item?.student_id || item?.admission_no || index),
    name: item?.name || "-",
    studentId: item?.student_id || null,
  }));

const buildResultItems = (items = []) =>
  (items || []).map((item, index) => ({
    admissionNo: String(item?.admission_no || item?.std_roll || ""),
    errorMessage: "",
    id: String(item?.student_id || item?.admission_no || index),
    isPublished: item?.is_published ?? false,
    marksObtained:
      item?.marks_obtained != null ? String(item.marks_obtained) : "",
    maxMarks: item?.max_marks != null ? String(item.max_marks) : "",
    name: item?.name || "-",
    percentage: item?.percentage != null ? String(item.percentage) : "",
    studentId: item?.student_id || null,
  }));

const extractApiResultError = (error) => {
  const errors = error?.data?.errors;
  if (errors && typeof errors === "object") {
    const firstKey = Object.keys(errors)[0];
    const messages = errors[firstKey];
    const raw =
      Array.isArray(messages) && messages.length > 0 ? messages[0] : null;
    if (raw) {
      const match = String(raw).match(/\((\d+(?:\.\d+)?)\)/);
      const maxVal = match ? match[1] : null;
      return maxVal
        ? `Entered marks cannot exceed maximum marks (${maxVal}). Please correct it.`
        : raw;
    }
  }
  return error?.userMessage || error?.message || "Unable to update result.";
};

const StaffModuleResultAndGrades = () => {
  const navigation = useNavigation();
  const { showSuccessToast } = useAppToast();
  const userData = useSelector((state) => state.userSlice.userData);
  const { height, width } = useWindowDimensions();
  const theme = createAcademicTheme({ height, width, variant: "resultGrades" });
  const isCompactWidth = width < 360;
  const styles = useMemo(
    () => createStyles(theme, isCompactWidth),
    [isCompactWidth, theme]
  );

  const [activeTab, setActiveTab] = useState("results");
  const [term, setTerm] = useState("");
  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [resultSubject, setResultSubject] = useState("");
  const [resultExamType, setResultExamType] = useState("");
  const [gradeHeadName, setGradeHeadName] = useState("");
  const [gradeHeadId, setGradeHeadId] = useState(null);
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [resultExamTypeOptions, setResultExamTypeOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [gradeItems, setGradeItems] = useState([]);
  const [resultItems, setResultItems] = useState([]);
  const [resultMaxMarks, setResultMaxMarks] = useState(null);
  const [loadingResultExamTypes, setLoadingResultExamTypes] = useState(false);
  const [loadingGradeOptions, setLoadingGradeOptions] = useState(false);
  const [loadingGradeItems, setLoadingGradeItems] = useState(false);
  const [loadingResultItems, setLoadingResultItems] = useState(false);
  const [submittingGrades, setSubmittingGrades] = useState(false);
  const [submittingResult, setSubmittingResult] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const tabs = useMemo(
    () => [
      { key: "results", label: MODULE_TEXT.tabs.results },
      { key: "grades", label: MODULE_TEXT.tabs.grades },
    ],
    []
  );

  useEffect(() => {
    const getTeachingInfo = async () => {
      try {
        const info = await fetchStaffProfileTeachingInfo(userData?.staff_info_id);
        setTeachingInfo(info);
      } catch (error) {
        console.log("getTeachingInfo API Error", error);
      }
    };

    if (userData?.staff_info_id) {
      getTeachingInfo();
    }
  }, [userData?.staff_info_id]);

  const normalizedTeachingInfo = useMemo(
    () => normalizeTeachingAssignments(teachingInfo),
    [teachingInfo]
  );

  const classOptions = useMemo(
    () =>
      sortTeachingClasses([
        ...new Set(
          normalizedTeachingInfo.map((item) => item?.class).filter(Boolean)
        ),
      ]),
    [normalizedTeachingInfo]
  );

  const sectionOptions = useMemo(() => {
    if (!classValue) {
      return [];
    }

    return sortTeachingValues([
      ...new Set(
        normalizedTeachingInfo
          .filter((item) => item?.class === classValue)
          .map((item) => item?.section)
          .filter(Boolean)
      ),
    ]);
  }, [classValue, normalizedTeachingInfo]);

  const resultSubjectOptions = useMemo(() => {
    if (!classValue || !section) {
      return [];
    }

    return sortTeachingValues([
      ...new Set(
        normalizedTeachingInfo
          .filter(
            (item) => item?.class === classValue && item?.section === section
          )
          .map((item) => item?.subject || item?.name)
          .filter(Boolean)
      ),
    ]);
  }, [classValue, normalizedTeachingInfo, section]);

  const gradeOptionNames = useMemo(
    () => gradeOptions.map((item) => item.name).filter(Boolean),
    [gradeOptions]
  );

  const classPlaceholder =
    classOptions.length > 0
      ? MODULE_TEXT.placeholders.class
      : "No Class Available";
  const sectionPlaceholder = !classValue
    ? "Select Class First"
    : sectionOptions.length > 0
      ? MODULE_TEXT.placeholders.section
      : "No Section Available";
  const resultSubjectPlaceholder =
    !classValue || !section
      ? "Select Section First"
      : resultSubjectOptions.length > 0
        ? MODULE_TEXT.placeholders.subject
        : "No Subject Available";
  const resultExamTypePlaceholder = !term
    ? "Select Term First"
    : !classValue
      ? "Select Class First"
      : !section
        ? "Select Section First"
        : loadingResultExamTypes
          ? "Loading Exam Types..."
          : resultExamTypeOptions.length > 0
            ? MODULE_TEXT.placeholders.examType
            : "No Exam Types Available";
  const gradePlaceholder = !classValue
    ? "Select Class First"
    : loadingGradeOptions
      ? "Loading Grades..."
      : gradeOptionNames.length > 0
        ? MODULE_TEXT.placeholders.grade
        : "No grades available right now";

  useEffect(() => {
    if (classValue && !classOptions.includes(classValue)) {
      setClassValue("");
    }
  }, [classOptions, classValue]);

  useEffect(() => {
    setSection("");
    setResultSubject("");
    setResultExamType("");
    setResultExamTypeOptions([]);
    setGradeHeadName("");
    setGradeHeadId(null);
    setGradeOptions([]);
    setGradeItems([]);
    setResultItems([]);
    setResultMaxMarks(null);
  }, [classValue]);

  useEffect(() => {
    if (section && !sectionOptions.includes(section)) {
      setSection("");
    }
  }, [section, sectionOptions]);

  useEffect(() => {
    setResultSubject("");
    setResultExamType("");
    setResultExamTypeOptions([]);
    setGradeItems([]);
    setResultItems([]);
    setResultMaxMarks(null);
  }, [section]);

  useEffect(() => {
    if (resultSubject && !resultSubjectOptions.includes(resultSubject)) {
      setResultSubject("");
    }
    setResultItems([]);
    setResultMaxMarks(null);
  }, [resultSubject, resultSubjectOptions]);

  useEffect(() => {
    if (resultExamType && !resultExamTypeOptions.includes(resultExamType)) {
      setResultExamType("");
    }
    setResultItems([]);
    setResultMaxMarks(null);
  }, [resultExamType, resultExamTypeOptions]);

  useEffect(() => {
    setResultExamType("");
    setResultExamTypeOptions([]);
    setResultItems([]);
  }, [term]);

  useEffect(() => {
    if (activeTab !== "results") {
      setLoadingResultExamTypes(false);
      return;
    }

    const apiTerm = mapExamTypeTermToApiValue(term);

    if (!classValue || !section || !apiTerm) {
      setLoadingResultExamTypes(false);
      setResultExamType("");
      setResultExamTypeOptions([]);
      return;
    }

    let isMounted = true;

    const loadResultExamTypes = async () => {
      try {
        setLoadingResultExamTypes(true);
        const response = await apiRequest(
          `view-exam-type?class=${encodeURIComponent(
            classValue
          )}&section=${encodeURIComponent(section)}&term=${encodeURIComponent(apiTerm)}`,
          "GET"
        );

        if (!isMounted) {
          return;
        }

        setResultExamTypeOptions(
          Array.isArray(response?.types) ? response.types : []
        );
      } catch (error) {
        console.log("view-exam-type API Error", error);

        if (isMounted) {
          setResultExamType("");
          setResultExamTypeOptions([]);
          constant.showAlert(
            error?.userMessage || error?.message || "Unable to load exam types."
          );
        }
      } finally {
        if (isMounted) {
          setLoadingResultExamTypes(false);
        }
      }
    };

    loadResultExamTypes();

    return () => {
      isMounted = false;
    };
  }, [activeTab, classValue, section, term]);

  useEffect(() => {
    if (gradeHeadName && !gradeOptionNames.includes(gradeHeadName)) {
      setGradeHeadName("");
      setGradeHeadId(null);
    }
  }, [gradeHeadName, gradeOptionNames]);

  useEffect(() => {
    if (!classValue) {
      setGradeOptions([]);
      setGradeHeadName("");
      setGradeHeadId(null);
      return;
    }

    let isMounted = true;

    const loadGradeOptions = async () => {
      try {
        setLoadingGradeOptions(true);
        const response = await apiRequest(
          `view-grade-list?class=${encodeURIComponent(classValue)}`,
          "GET"
        );

        if (!isMounted) {
          return;
        }

        setGradeOptions(
          Array.isArray(response?.grades) ? response.grades : []
        );
      } catch (error) {
        console.log("view-grade-list API Error", error);
        if (isMounted) {
          setGradeOptions([]);
        }
      } finally {
        if (isMounted) {
          setLoadingGradeOptions(false);
        }
      }
    };

    loadGradeOptions();

    return () => {
      isMounted = false;
    };
  }, [classValue]);

  useEffect(() => {
    if (!gradeHeadName) {
      setGradeHeadId(null);
      return;
    }

    const matchedOption = gradeOptions.find(
      (item) => item?.name === gradeHeadName
    );
    setGradeHeadId(matchedOption?.id ?? null);
  }, [gradeHeadName, gradeOptions]);

  const loadGradeItems = useCallback(async () => {
    const apiTerm = mapExamTypeTermToApiValue(term);

    if (!classValue || !section || !apiTerm || !gradeHeadName) {
      setGradeItems([]);
      return;
    }

    try {
      setLoadingGradeItems(true);
      const response = await apiRequest(
        `view-grade?class=${encodeURIComponent(
          classValue
        )}&section=${encodeURIComponent(section)}&term=${encodeURIComponent(
          apiTerm
        )}&grade=${encodeURIComponent(gradeHeadName)}`,
        "GET"
      );

      setGradeHeadId(response?.grade_head_id ?? gradeHeadId);
      setGradeItems(buildGradeItems(response?.items));
    } catch (error) {
      console.log("view-grade API Error", error);
      setGradeItems([]);
      constant.showAlert(
        error?.userMessage || error?.message || "Unable to load grades"
      );
    } finally {
      setLoadingGradeItems(false);
    }
  }, [classValue, gradeHeadId, gradeHeadName, section, term]);

  useEffect(() => {
    if (activeTab !== "grades") {
      return;
    }

    if (!classValue || !section || !term || !gradeHeadName) {
      setGradeItems([]);
      return;
    }

    loadGradeItems();
  }, [activeTab, classValue, gradeHeadName, loadGradeItems, section, term]);

  const loadResultItems = useCallback(async () => {
    const apiTerm = mapExamTypeTermToApiValue(term);

    if (
      !classValue ||
      !section ||
      !apiTerm ||
      !resultSubject ||
      !resultExamType
    ) {
      setResultItems([]);
      return;
    }

    try {
      setLoadingResultItems(true);
      const response = await apiRequest(
        `view-result?class=${encodeURIComponent(
          classValue
        )}&section=${encodeURIComponent(section)}&term=${encodeURIComponent(
          apiTerm
        )}&subject=${encodeURIComponent(
          resultSubject
        )}&exam_type=${encodeURIComponent(resultExamType)}`,
        "GET"
      );

      const items = buildResultItems(response?.items);
      setResultItems(items);
      // Derive max_marks: prefer response-level field, fallback to first item
      const apiMaxMarks =
        response?.max_marks != null
          ? String(response.max_marks)
          : items.length > 0 && items[0].maxMarks !== ""
            ? items[0].maxMarks
            : null;
      setResultMaxMarks(apiMaxMarks);
    } catch (error) {
      console.log("view-result API Error", error);
      setResultItems([]);
      setResultMaxMarks(null);
      constant.showAlert(
        error?.userMessage || error?.message || "Unable to load results."
      );
    } finally {
      setLoadingResultItems(false);
    }
  }, [classValue, resultExamType, resultSubject, section, term]);

  useEffect(() => {
    if (activeTab !== "results") {
      return;
    }

    if (
      !classValue ||
      !section ||
      !term ||
      !resultSubject ||
      !resultExamType
    ) {
      setResultItems([]);
      return;
    }

    loadResultItems();
  }, [
    activeTab,
    classValue,
    loadResultItems,
    resultExamType,
    resultSubject,
    section,
    term,
  ]);

  const resultFields = useMemo(
    () => [
      {
        disabled: false,
        key: MODULE_TEXT.fields.term,
        onSelect: setTerm,
        options: TERM_OPTION,
        placeholder: MODULE_TEXT.placeholders.term,
        selected: term,
      },
      {
        disabled: classOptions.length === 0,
        key: MODULE_TEXT.fields.class,
        onSelect: setClassValue,
        options: classOptions,
        placeholder: classPlaceholder,
        selected: classValue,
      },
      {
        disabled: !classValue || sectionOptions.length === 0,
        key: MODULE_TEXT.fields.section,
        onSelect: setSection,
        options: sectionOptions,
        placeholder: sectionPlaceholder,
        selected: section,
      },
      {
        disabled:
          !term ||
          !classValue ||
          !section ||
          loadingResultExamTypes ||
          resultExamTypeOptions.length === 0,
        key: MODULE_TEXT.fields.examType,
        onSelect: setResultExamType,
        options: resultExamTypeOptions,
        placeholder: resultExamTypePlaceholder,
        selected: resultExamType,
      },
      {
        disabled: !classValue || !section || resultSubjectOptions.length === 0,
        key: MODULE_TEXT.fields.subject,
        onSelect: setResultSubject,
        options: resultSubjectOptions,
        placeholder: resultSubjectPlaceholder,
        selected: resultSubject,
      },
    ],
    [
      classOptions,
      classPlaceholder,
      classValue,
      loadingResultExamTypes,
      resultExamType,
      resultExamTypeOptions,
      resultExamTypePlaceholder,
      resultSubject,
      resultSubjectOptions,
      resultSubjectPlaceholder,
      section,
      sectionOptions,
      sectionPlaceholder,
      term,
    ]
  );

  const gradeFields = useMemo(
    () => [
      {
        disabled: false,
        key: MODULE_TEXT.fields.term,
        onSelect: setTerm,
        options: TERM_OPTION,
        placeholder: MODULE_TEXT.placeholders.term,
        selected: term,
      },
      {
        disabled: classOptions.length === 0,
        key: MODULE_TEXT.fields.class,
        onSelect: setClassValue,
        options: classOptions,
        placeholder: classPlaceholder,
        selected: classValue,
      },
      {
        disabled: !classValue || sectionOptions.length === 0,
        key: MODULE_TEXT.fields.section,
        onSelect: setSection,
        options: sectionOptions,
        placeholder: sectionPlaceholder,
        selected: section,
      },
      {
        disabled:
          !classValue || loadingGradeOptions || gradeOptionNames.length === 0,
        key: MODULE_TEXT.fields.grade,
        onSelect: setGradeHeadName,
        options: gradeOptionNames,
        placeholder: gradePlaceholder,
        selected: gradeHeadName,
      },
    ],
    [
      classOptions,
      classPlaceholder,
      classValue,
      gradeHeadName,
      gradeOptionNames,
      gradePlaceholder,
      loadingGradeOptions,
      section,
      sectionOptions,
      sectionPlaceholder,
      term,
    ]
  );

  const updateGradeField = useCallback((studentId, value) => {
    setGradeItems((currentItems) =>
      currentItems.map((item) =>
        item.id === studentId
          ? { ...item, grade: sanitizeGradeValue(value) }
          : item
      )
    );
  }, []);

  const updateResultField = useCallback(
    (studentId, value) => {
      const sanitized = value.replace(/[^0-9.]/g, "").slice(0, 6);
      setResultItems((currentItems) =>
        currentItems.map((item) => {
          if (item.id !== studentId) {
            return item;
          }
          let errorMessage = "";
          if (sanitized !== "") {
            const numVal = parseFloat(sanitized);
            // Use per-item maxMarks first, then fall back to resultMaxMarks
            const effectiveMax =
              item.maxMarks !== ""
                ? item.maxMarks
                : resultMaxMarks !== null
                  ? resultMaxMarks
                  : null;
            const maxVal =
              effectiveMax !== null ? parseFloat(effectiveMax) : null;
            if (!isNaN(numVal) && numVal < 0) {
              errorMessage = "Marks cannot be negative.";
            } else if (maxVal !== null && !isNaN(numVal) && numVal > maxVal) {
              errorMessage = `You cannot enter marks greater than maximum marks (${effectiveMax})`;
            }
          }
          return { ...item, errorMessage, marksObtained: sanitized };
        })
      );
    },
    [resultMaxMarks]
  );

  const handleSubmitResult = useCallback(async () => {
    const apiTerm = mapExamTypeTermToApiValue(term);

    if (
      !classValue ||
      !section ||
      !apiTerm ||
      !resultSubject ||
      !resultExamType
    ) {
      constant.showAlert(
        "Please select class, section, term, subject and exam type."
      );
      return;
    }

    const hasInlineError = resultItems.some(
      (item) => item.errorMessage !== ""
    );
    if (hasInlineError) {
      constant.showAlert(
        "Please fix the validation errors before saving."
      );
      return;
    }

    const itemsToSubmit = resultItems
      .filter(
        (item) =>
          String(item?.admissionNo || "").trim() &&
          item.marksObtained !== ""
      )
      .map((item) => ({
        marks_obtained: Number(item.marksObtained),
        std_roll: String(item.admissionNo).trim(),
      }));

    if (itemsToSubmit.length === 0) {
      constant.showAlert("Please enter marks for at least one student.");
      return;
    }

    try {
      setSubmittingResult(true);
      const response = await apiRequest("update-result", "POST", {
        class: classValue,
        exam_type: resultExamType,
        items: itemsToSubmit,
        section,
        subject: resultSubject,
        term: apiTerm,
      });

      showSuccessToast({
        message: response?.message || "Result updated successfully.",
        title: "Result Updated",
      });
      await loadResultItems();
    } catch (error) {
      console.log("update-result API Error", error);
      constant.showAlert(extractApiResultError(error));
    } finally {
      setSubmittingResult(false);
    }
  }, [
    classValue,
    loadResultItems,
    resultExamType,
    resultItems,
    resultSubject,
    section,
    showSuccessToast,
    term,
  ]);

  const renderFields = (fields) => (
    <View style={styles.fieldsGrid}>
      {fields.map((field) => (
        <View key={field.key} style={styles.fieldCell}>
          <StaffAcademicSelectField
            disabled={field.disabled}
            mutedWhenDisabled={false}
            onSelect={field.onSelect}
            optionAppearance="attendance"
            options={field.options}
            placeholder={
              field.placeholder || RESULT_FIELD_PLACEHOLDERS[field.key] || ""
            }
            selected={field.selected}
            theme={theme}
          />
        </View>
      ))}
    </View>
  );

  const handleSubmitGrades = useCallback(async () => {
    const apiTerm = mapExamTypeTermToApiValue(term);

    if (!classValue || !section || !apiTerm || !gradeHeadName) {
      constant.showAlert("Please select class, section, term and grade.");
      return;
    }

    const itemsToSubmit = gradeItems
      .filter(
        (item) =>
          String(item?.admissionNo || "").trim() &&
          String(item?.grade || "").trim()
      )
      .map((item) => ({
        grade: String(item.grade).trim(),
        std_roll: String(item.admissionNo).trim(),
      }));

    if (itemsToSubmit.length === 0) {
      constant.showAlert("Please enter at least one student grade.");
      return;
    }

    try {
      setSubmittingGrades(true);
      const response = await apiRequest("update-grade", "POST", {
        class: classValue,
        items: itemsToSubmit,
        section,
        grade: gradeHeadName,
        term: apiTerm,
      });

      showSuccessToast({
        message: response?.message || "Grades updated successfully.",
        title: "Grades Updated",
      });
      await loadGradeItems();
    } catch (error) {
      console.log("update-grade API Error", error);
      console.log("update-grade API Full Response", JSON.stringify(error?.data, null, 2));
      constant.showAlert(
        error?.userMessage || error?.message || "Unable to update grades."
      );
    } finally {
      setSubmittingGrades(false);
    }
  }, [
    classValue,
    gradeHeadName,
    gradeItems,
    loadGradeItems,
    section,
    showSuccessToast,
    term,
  ]);

  const renderResultState = () => {
    if (loadingResultItems) {
      return (
        <View style={styles.emptyState}>
          <Text style={[theme.typography.cardTitle, styles.emptyStateTitle]}>
            Loading...
          </Text>
          <Text style={[theme.typography.body, styles.emptyStateCopy]}>
            Fetching students and saved results for the selected filters.
          </Text>
        </View>
      );
    }

    const filtersSelected =
      classValue && section && term && resultSubject && resultExamType;

    if (!filtersSelected || resultItems.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={[theme.typography.cardTitle, styles.emptyStateTitle]}>
            {COMMON_TEXT.noData}
          </Text>
          <Text style={[theme.typography.body, styles.emptyStateCopy]}>
            {filtersSelected
              ? "No students found for the selected filters."
              : "Select class, section, term, subject and exam type to continue with result entry."}
          </Text>
        </View>
      );
    }

    return (
      <>
        {resultMaxMarks !== null && (
          <View style={styles.maxMarksBanner}>
            <Text style={[theme.typography.body, styles.maxMarksBannerText]}>
              {`Max Marks Allowed : ${resultMaxMarks}`}
            </Text>
          </View>
        )}

        <View style={styles.tableHeaderRow}>
          <Text style={[theme.typography.tableHeader, styles.gradeNameHeader, {color: theme.colors.white}]}>
            {MODULE_TEXT.table.studentName}
          </Text>
          <Text style={[theme.typography.tableHeader, styles.gradeHeader, {color: theme.colors.white}]}>
            {"Marks"}
          </Text>
        </View>

        {resultItems.map((student, index) => (
          <View
            key={student.id}
            style={[
              styles.tableRow,
              index === resultItems.length - 1 &&
                !student.errorMessage
                ? styles.lastRow
                : null,
            ]}
          >
            <View style={styles.studentMetaCell}>
              <Text style={[theme.typography.tableCell, styles.gradeNameCell]}>
                {`${student.name}${student.admissionNo ? ` (${student.admissionNo})` : ""}`}
              </Text>
            </View>

            <View style={styles.gradeField}>
              <View
                style={[
                  styles.gradeInputShell,
                  student.errorMessage ? styles.gradeInputShellError : null,
                ]}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    updateResultField(student.id, value)
                  }
                  placeholder="Enter Marks"
                  placeholderTextColor={theme.colors.fieldPlaceholder}
                  returnKeyType="done"
                  style={styles.gradeInput}
                  value={student.marksObtained}
                />
              </View>
              {student.errorMessage ? (
                <Text style={styles.resultInlineError}>
                  {student.errorMessage}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </>
    );
  };

  const renderGradeState = () => {
    if (loadingGradeItems) {
      return (
        <View style={styles.emptyState}>
          <Text style={[theme.typography.cardTitle, styles.emptyStateTitle]}>
            Loading...
          </Text>
          <Text style={[theme.typography.body, styles.emptyStateCopy]}>
            Fetching students and saved grades for the selected filters.
          </Text>
        </View>
      );
    }

    if (gradeItems.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={[theme.typography.cardTitle, styles.emptyStateTitle]}>
            {COMMON_TEXT.noData}
          </Text>
          <Text style={[theme.typography.body, styles.emptyStateCopy]}>
            Select class, section, term and grade to load the student list.
          </Text>
        </View>
      );
    }

    return (
      <>
        <View style={styles.tableHeaderRow}>
          <Text style={[theme.typography.tableHeader, styles.gradeNameHeader, {color: theme.colors.white}]}>
            {MODULE_TEXT.table.studentName}
          </Text>
          <Text style={[theme.typography.tableHeader, styles.gradeHeader, {color: theme.colors.white}]}>
            {MODULE_TEXT.table.gradeObtained}
          </Text>
        </View>

        {gradeItems.map((student, index) => (
          <View
            key={student.id}
            style={[
              styles.tableRow,
              index === gradeItems.length - 1 ? styles.lastRow : null,
            ]}
          >
            <View style={styles.studentMetaCell}>
              <Text style={[theme.typography.tableCell, styles.gradeNameCell]}>
                {student.admissionNo
                  ? `${student.name} (${student.admissionNo})`
                  : student.name}
              </Text>
            </View>

            <View style={styles.gradeField}>
              <View style={styles.gradeInputShell}>
                <TextInput
                  autoCapitalize="characters"
                  onChangeText={(value) => updateGradeField(student.id, value)}
                  placeholder="Enter Grade"
                  placeholderTextColor={theme.colors.fieldPlaceholder}
                  returnKeyType="done"
                  style={styles.gradeInput}
                  value={student.grade}
                />
              </View>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <StaffAcademicScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={MODULE_TEXT.resultsTitle}
    >
      {/* Filter FAB */}
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => setFilterVisible(true)}
        style={[styles.filterFab, {backgroundColor: theme.colors.accent}]}>
        <Filter color={theme.colors.white} size={18} strokeWidth={2.5} />
      </TouchableOpacity>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Active filter chips */}
        {(term || classValue || section) ? (
          <View style={styles.activeFiltersRow}>
            {term ? (
              <View style={[styles.activeChip, {backgroundColor: theme.colors.accentSoft}]}>
                <Text style={[styles.activeChipText, {color: theme.colors.accent}]}>{term}</Text>
              </View>
            ) : null}
            {classValue ? (
              <View style={[styles.activeChip, {backgroundColor: theme.colors.accentSoft}]}>
                <Text style={[styles.activeChipText, {color: theme.colors.accent}]}>Class {classValue}</Text>
              </View>
            ) : null}
            {section ? (
              <View style={[styles.activeChip, {backgroundColor: theme.colors.accentSoft}]}>
                <Text style={[styles.activeChipText, {color: theme.colors.accent}]}>Sec {section}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <AcademicSegmentedTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={tabs}
          theme={theme}
        />

        {activeTab === "results"
          ? renderFields(resultFields)
          : renderFields(gradeFields)}

        <AcademicSurfaceCard style={styles.tableCard} theme={theme}>
          {activeTab === "results" ? renderResultState() : renderGradeState()}
        </AcademicSurfaceCard>

        {activeTab === "grades" ? (
          <AcademicGradientButton
            onPress={submittingGrades ? undefined : handleSubmitGrades}
            style={styles.addButton}
            theme={theme}
            title={submittingGrades ? "Saving..." : COMMON_TEXT.save}
          />
        ) : activeTab === "results" && resultItems.length > 0 ? (
          <AcademicGradientButton
            onPress={submittingResult ? undefined : handleSubmitResult}
            style={styles.addButton}
            theme={theme}
            title={submittingResult ? "Saving..." : COMMON_TEXT.save}
          />
        ) : null}
      </KeyboardAwareScrollView>

      {/* Filter Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
        transparent
        visible={filterVisible}>
        <Pressable
          onPress={() => setFilterVisible(false)}
          style={[styles.filterOverlay, {backgroundColor: theme.colors.overlay}]}>
          <Pressable onPress={() => {}} style={[styles.filterSheet, {backgroundColor: theme.colors.surface}]}>
            <View style={[styles.filterHandle, {backgroundColor: theme.colors.border}]} />
            <LinearGradient
              colors={theme.gradients.header}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={styles.filterHeaderGradient}>
              <Text style={[styles.filterHeaderTitle, {color: theme.colors.white}]}>
                Filter {activeTab === "results" ? "Results" : "Grades"}
              </Text>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => setFilterVisible(false)}
                style={[styles.filterCloseBtn, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                <X color={theme.colors.white} size={18} strokeWidth={2.5} />
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.filterBody}>
              {(activeTab === "results" ? resultFields : gradeFields).map((field) => (
                <View key={field.key} style={{marginBottom: theme.spacing.fieldGap}}>
                  <StaffAcademicSelectField
                    disabled={field.disabled}
                    mutedWhenDisabled={false}
                    onSelect={field.onSelect}
                    optionAppearance="attendance"
                    options={field.options}
                    placeholder={field.placeholder || RESULT_FIELD_PLACEHOLDERS[field.key] || ""}
                    selected={field.selected}
                    theme={theme}
                  />
                </View>
              ))}
            </View>
            <View style={styles.filterFooter}>
              <AcademicGradientButton
                onPress={() => setFilterVisible(false)}
                theme={theme}
                title="Apply Filters"
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </StaffAcademicScaffold>
  );
};

const createStyles = (theme, isCompactWidth) =>
  StyleSheet.create({
    addButton: {
      marginBottom: theme.spacing.footerBottom,
      marginTop: theme.spacing.buttonTop,
    },
    contentContainer: {
      paddingBottom: theme.spacing.footerBottom + 80,
    },
    // ── Active filter chips ──────────────────────────────────────────
    activeFiltersRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: theme.spacing.cardGap,
    },
    activeChip: {
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    activeChipText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
    },
    // ── Filter FAB ───────────────────────────────────────────────────
    filterFab: {
      alignItems: 'center',
      borderRadius: 999,
      bottom: theme.spacing.footerBottom * 1.5,
      elevation: 8,
      height: 48,
      justifyContent: 'center',
      position: 'absolute',
      right: theme.spacing.screenHorizontal,
      shadowColor: theme.colors.accent,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
      width: 48,
      zIndex: 10,
    },
    // ── Filter modal ─────────────────────────────────────────────────
    filterOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    filterSheet: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      overflow: 'hidden',
      paddingBottom: 32,
    },
    filterHandle: {
      alignSelf: 'center',
      borderRadius: 999,
      height: 4,
      marginVertical: 10,
      width: 44,
    },
    filterHeaderGradient: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.cardHorizontal,
      paddingVertical: 14,
    },
    filterHeaderTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
    },
    filterCloseBtn: {
      alignItems: 'center',
      borderRadius: 999,
      height: 32,
      justifyContent: 'center',
      width: 32,
    },
    filterBody: {
      paddingHorizontal: theme.spacing.screenHorizontal,
      paddingTop: theme.spacing.cardGap,
    },
    filterFooter: {
      paddingHorizontal: theme.spacing.screenHorizontal,
      paddingTop: theme.spacing.cardGap,
    },
    // ── Table ────────────────────────────────────────────────────────
    emptyState: {
      paddingHorizontal: theme.spacing.cardHorizontal,
      paddingVertical: theme.spacing.cardVertical * 1.4,
    },
    emptyStateCopy: {
      marginTop: theme.spacing.labelGap,
    },
    emptyStateTitle: {
      color: theme.colors.primaryText,
    },
    fieldCell: {
      flexBasis: isCompactWidth ? "100%" : "48%",
      flexGrow: 1,
      minWidth: 0,
    },
    fieldsGrid: {
      columnGap: theme.spacing.columnGap,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: theme.spacing.cardGap,
      rowGap: theme.spacing.fieldGap,
    },
    gradeField: {
      flex: 1,
      flexShrink: 1,
      justifyContent: "center",
      minWidth: 0,
    },
    gradeHeader: {
      flex: 1,
      textAlign: "center",
    },
    gradeInput: {
      color: theme.colors.fieldText,
      flexGrow: 1,
      flexShrink: 1,
      fontFamily: theme.typography.fieldValue.fontFamily,
      fontSize: theme.typography.fieldValue.fontSize,
      height: theme.layout.tableInputHeight,
      includeFontPadding: false,
      paddingHorizontal: 0,
      paddingVertical: 0,
      textAlign: "center",
      textAlignVertical: "center",
      width: "100%",
    },
    gradeInputShell: {
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.action,
      borderWidth: theme.borderWidth.regular,
      justifyContent: "center",
      minHeight: theme.layout.tableInputHeight + theme.borderWidth.regular * 2,
      paddingHorizontal: theme.spacing.tableCellPadding * 0.75,
      width: "92%",
    },
    gradeInputShellError: {
      borderColor: "#D32F2F",
    },
    maxMarksBanner: {
      backgroundColor: theme.colors.accentSoft,
      paddingHorizontal: theme.spacing.cardHorizontal,
      paddingVertical: theme.spacing.cardVertical * 0.75,
    },
    maxMarksBannerText: {
      color: theme.colors.accent,
      fontFamily: 'Inter-SemiBold',
      fontSize: 13,
    },
    resultInlineError: {
      color: "#D32F2F",
      fontFamily: theme.typography.body.fontFamily,
      fontSize: 11,
      marginTop: 2,
      textAlign: "center",
      width: "92%",
      alignSelf: "center",
    },
    gradeNameCell: {
      flexShrink: 1,
      minWidth: 0,
    },
    gradeNameHeader: {
      flex: 1,
      minWidth: 0,
      textAlign: "left",
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    studentMetaCell: {
      flex: 1,
      flexShrink: 1,
      minWidth: 0,
    },
    tableCard: {
      overflow: "hidden",
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    tableHeaderRow: {
      backgroundColor: theme.colors.accent,
      columnGap: theme.spacing.labelGap,
      flexDirection: "row",
      paddingHorizontal: theme.spacing.cardHorizontal,
      paddingVertical: theme.spacing.cardVertical,
    },
    tableRow: {
      alignItems: "center",
      borderBottomColor: theme.colors.subtleDivider,
      borderBottomWidth: theme.borderWidth.hairline,
      columnGap: theme.spacing.labelGap,
      flexDirection: "row",
      paddingHorizontal: theme.spacing.cardHorizontal,
      paddingVertical: theme.spacing.cardVertical,
    },
  });

export default StaffModuleResultAndGrades;
