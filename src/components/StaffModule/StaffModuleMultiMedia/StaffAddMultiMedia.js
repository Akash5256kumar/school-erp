import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

import CommonHeader from "../../CommonHeader";
import CommonButton from "../../Button/CommonButton";
import { CustomDropdown } from "../../CommonDropDown/CommonDropDownList";
import CustomInputField from "../../CommonInputField/CommonTextField";
import DatePickerField from "../../DatePickerField";
import LabelHeader from "../../labelHeader";
import {
  colors,
  componentSizes,
  multimediaTheme,
  shadows,
  spacing,
} from "../../../constants";
import { whiteColor, showAlert } from "../../../Utils/Constant";
import { apiRequest } from "../../../Utils";
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
  sortTeachingValues,
} from "../../../Utils/teachingInfo";

const StaffAddMultiMedia = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.userSlice.userData);
  const styles = useMemo(() => createStyles(), []);

  const [classSectionMap, setClassSectionMap] = useState({});
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [publishDate, setPublishDate] = useState(null);
  const [stdClass, setStdClass] = useState(null);
  const [section, setSection] = useState(null);
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState("");
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const classOptions = useMemo(
    () => getTeachingInfoClassOptions(classSectionMap),
    [classSectionMap]
  );

  const sectionOptions = useMemo(
    () => getTeachingSectionsForClass(classSectionMap, stdClass),
    [classSectionMap, stdClass]
  );

  const subjectOptions = useMemo(() => {
    if (!stdClass) return [];
    const subjects = teachingInfo
      .filter((item) => item?.class === stdClass)
      .map((item) => item?.subject || item?.name)
      .filter(Boolean);
    return sortTeachingValues([...new Set(subjects)]);
  }, [stdClass, teachingInfo]);

  useEffect(() => {
    const loadTeachingInfo = async () => {
      try {
        const info = await fetchTeachingInfo();
        setTeachingInfo(info);
        setClassSectionMap(buildClassSectionMap(info));
      } catch (error) {
        console.log("fetchTeachingInfo Error", error);
      }
    };

    loadTeachingInfo();
  }, []);

  const handleClassSelect = useCallback((value) => {
    setStdClass(value);
    setSection(null);
    setSubject(null);
  }, []);

  const toggleDropdown = useCallback((key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const handleSubmit = async () => {
    if (!stdClass) {
      showAlert("Please select a class.");
      return;
    }
    if (!section) {
      showAlert("Please select a section.");
      return;
    }
    if (!subject) {
      showAlert("Please select a subject.");
      return;
    }
    if (!link.trim()) {
      showAlert("Please enter a video link.");
      return;
    }
    if (!topic.trim()) {
      showAlert("Please enter a topic.");
      return;
    }
    if (!publishDate) {
      showAlert("Please select a date.");
      return;
    }

    const formattedDate = publishDate.toISOString().split("T")[0];
    const payload = {
      std_class: stdClass,
      section,
      subject,
      staff_id: userData?.staff_info_id ? String(userData.staff_info_id) : "",
      link: link.trim(),
      topic: topic.trim(),
      date: formattedDate,
    };
    console.log("Submitting store-multimedia payload:", payload);

    try {
      setSubmitting(true);
      const response = await apiRequest("store-multimedia", "POST", payload);

      showAlert(response?.message || "Multimedia uploaded successfully");
      setStdClass(null);
      setSection(null);
      setSubject(null);
      setTopic("");
      setLink("");
      setPublishDate(null);
    } catch (error) {
      console.log("store-multimedia API Error", error);
      console.log("store-multimedia Error Detail:", error?.data);
      showAlert(
        error?.userMessage || error?.message || "Failed to upload multimedia."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <CommonHeader
        gradientColors={multimediaTheme.palette.headerGradient}
        IconColor={whiteColor}
        title={"Add MultiMedia"}
        onLeftClick={() => navigation.goBack()}
        textColor={whiteColor}
      />

      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.fieldGroup, styles.firstFieldGroup]}>
          <LabelHeader label={"Date of Publish"} />
          <DatePickerField
            containerStyle={styles.dateField}
            date={publishDate}
            setDate={setPublishDate}
          />
        </View>

        <View style={styles.fieldGroup}>
          <LabelHeader label={"Class"} />
          <CustomDropdown
            data={classOptions}
            selected={stdClass}
            onSelect={handleClassSelect}
            placeholder={
              classOptions.length === 0 ? "No Class Available" : "Select Class"
            }
            isOpen={openDropdown === "class"}
            toggleOpen={() => toggleDropdown("class")}
          />
        </View>

        <View style={styles.fieldGroup}>
          <LabelHeader label={"Section"} />
          <CustomDropdown
            data={sectionOptions}
            selected={section}
            onSelect={setSection}
            placeholder={
              !stdClass
                ? "Select Class First"
                : sectionOptions.length === 0
                ? "No Section Available"
                : "Select Section"
            }
            isOpen={openDropdown === "section"}
            toggleOpen={() => toggleDropdown("section")}
          />
        </View>

        <View style={[styles.fieldGroup, styles.inlineRow]}>
          <View style={styles.inlineField}>
            <LabelHeader label={"Subject"} />
            <CustomDropdown
              data={subjectOptions}
              selected={subject}
              onSelect={setSubject}
              placeholder={
                !stdClass
                  ? "Select Class First"
                  : subjectOptions.length === 0
                  ? "No Subject Available"
                  : "Select Subject"
              }
              isOpen={openDropdown === "subject"}
              toggleOpen={() => toggleDropdown("subject")}
            />
          </View>

          <View style={styles.inlineField}>
            <LabelHeader label={"Topic"} />
            <CustomInputField
              inputStyle={styles.inputStyle}
              onChangeText={setTopic}
              placeholder="Enter Topic"
              value={topic}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <LabelHeader label="Video Link" />
          <CustomInputField
            inputStyle={styles.inputStyle}
            keyboardType="url"
            onChangeText={setLink}
            placeholder="Enter Video Link"
            value={link}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <CommonButton
          extStyle={styles.button}
          title={submitting ? "Uploading..." : "Add"}
          buttonClick={submitting ? undefined : handleSubmit}
        />
      </View>
    </View>
  );
};

export default StaffAddMultiMedia;

const createStyles = () =>
  StyleSheet.create({
    button: {
      marginTop: spacing.xs,
    },
    dateField: {
      marginBottom: 0,
      marginTop: spacing.sm,
    },
    fieldGroup: {
      marginBottom: spacing.md,
    },
    firstFieldGroup: {
      marginTop: spacing.sm,
    },
    footer: {
      backgroundColor: whiteColor,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      ...shadows.light,
    },
    inlineField: {
      flex: 1,
    },
    inlineRow: {
      alignItems: "flex-start",
      columnGap: spacing.md,
      flexDirection: "row",
    },
    inputStyle: {
      minHeight: componentSizes.inputHeight,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: componentSizes.buttonHeight + spacing.xxl * 2,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    screen: {
      backgroundColor: colors.surface,
      flex: 1,
    },
  });
