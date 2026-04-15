import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { apiRequest } from "../../../Utils";
import { apiClient } from "../../../api";
import * as constant from "../../../Utils/Constant";
import { typeSemiBold } from "../../../Utils/Constant";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import {
  AcademicActionButton,
  AcademicFloatingButton,
  AcademicSurfaceCard,
} from "../StaffAcademicShared/StaffAcademicPrimitives";
import { ACADEMIC_TEXT } from "../StaffAcademicShared/staffAcademicConfig";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";

import { AttendanceSurfaceCard } from "../AttendanceShared/AttendanceScreen";
import AttendanceSelectField from "../AttendanceShared/AttendanceSelectField";
import attendanceTheme from "../AttendanceShared/attendanceTheme";
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
  sortTeachingValues,
} from "../../../Utils/teachingInfo";

const MODULE_TEXT = ACADEMIC_TEXT.multimedia;
const COMMON_TEXT = ACADEMIC_TEXT.common;
const buildMediaSummary = (item) =>
  [
    `Subject ${item.subject}`,
    `Class ${item.std_class}`,
    `Section ${item.section}`,
  ]
    .filter(Boolean)
    .join("  •  ");

const StaffModuleMultiMedia = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const theme = createAcademicTheme({ height, width, variant: "multimedia" });
  const styles = useMemo(() => createStyles(theme), [theme]);
  const userData = useSelector((state) => state.userSlice.userData);

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const [classSectionMap, setClassSectionMap] = useState({});
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loadingTeachingInfo, setLoadingTeachingInfo] = useState(false);

  const classOptions = useMemo(
    () => getTeachingInfoClassOptions(classSectionMap),
    [classSectionMap]
  );

  const sectionOptions = useMemo(
    () => getTeachingSectionsForClass(classSectionMap, selectedClass),
    [classSectionMap, selectedClass]
  );

  const subjectOptions = useMemo(() => {
    if (!selectedClass) return [];
    const subjects = teachingInfo
      .filter((item) => item?.class === selectedClass)
      .map((item) => item?.subject || item?.name)
      .filter(Boolean);
    return sortTeachingValues([...new Set(subjects)]);
  }, [selectedClass, teachingInfo]);

  useEffect(() => {
    const loadTeachingInfo = async () => {
      try {
        setLoadingTeachingInfo(true);
        const info = await fetchTeachingInfo();
        setTeachingInfo(info);
        setClassSectionMap(buildClassSectionMap(info));
      } catch (error) {
        console.log("fetchTeachingInfo Error", error);
      } finally {
        setLoadingTeachingInfo(false);
      }
    };

    loadTeachingInfo();
  }, []);

  const handleClassSelect = useCallback((value) => {
    setSelectedClass(value);
    setSelectedSection("");
    setSelectedSubject("");
    setMedia([]);
  }, []);

  const handleSectionSelect = useCallback((value) => {
    setSelectedSection(value);
    setSelectedSubject("");
    setMedia([]);
  }, []);

  const handleSubjectSelect = useCallback((value) => {
    setSelectedSubject(value);
    setMedia([]);
  }, []);

  const handleDeleteMedia = useCallback((item) => {
    Alert.alert(
      "Delete Multimedia",
      "Are you sure you want to delete this multimedia?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await apiClient.delete(`multimedia?id=${item.id}`);
              setMedia((prev) => prev.filter((m) => m.id !== item.id));
            } catch (error) {
              console.log("Delete Multimedia Error", error);
              constant.showAlert(
                error?.userMessage || error?.message || "Unable to delete multimedia."
              );
            }
          },
        },
      ]
    );
  }, []);

  const getMultimedia = useCallback(
    async (showLoader = true) => {
      if (!selectedClass || !selectedSection || !selectedSubject) {
        setMedia([]);
        return;
      }

      try {
        if (showLoader) {
          setLoading(true);
        }

        const staffId = userData?.staff_info_id || "";
        const response = await apiRequest(
          `multimedia?class=${encodeURIComponent(selectedClass)}&section=${encodeURIComponent(selectedSection)}&Subject=${encodeURIComponent(selectedSubject)}&staff_id=${staffId}`,
          "GET"
        );

        if (response?.status) {
          setMedia(response?.videos || []);
        } else {
          setMedia([]);
        }
      } catch (error) {
        console.log("Multimedia API Error", error);
        setMedia([]);
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    [selectedClass, selectedSection, selectedSubject, userData?.staff_info_id]
  );

  // Trigger whenever filters change or when returning to this screen
  useFocusEffect(
    useCallback(() => {
      if (selectedClass && selectedSection && selectedSubject) {
        getMultimedia();
      }
    }, [selectedClass, selectedSection, selectedSubject, getMultimedia])
  );

  const { onRefresh, refreshing } = usePullToRefresh(() => {
    if (selectedClass && selectedSection && selectedSubject) {
      return getMultimedia(false);
    }
  });

  return (
    <StaffAcademicScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={MODULE_TEXT.listTitle}
    >
      <AttendanceSurfaceCard style={styles.formCard}>
        <View style={styles.fieldStack}>
          <AttendanceSelectField
            disabled={loadingTeachingInfo || classOptions.length === 0}
            label="Class"
            onSelect={handleClassSelect}
            options={classOptions}
            placeholder={
              loadingTeachingInfo
                ? "Loading Classes..."
                : classOptions.length > 0
                ? "Select Class"
                : "No Class Available"
            }
            value={selectedClass}
          />

          <AttendanceSelectField
            disabled={!selectedClass || loadingTeachingInfo || sectionOptions.length === 0}
            label="Section"
            onSelect={handleSectionSelect}
            options={sectionOptions}
            placeholder={
              !selectedClass
                ? "Select Class First"
                : loadingTeachingInfo
                ? "Loading Sections..."
                : sectionOptions.length > 0
                ? "Select Section"
                : "No Section Available"
            }
            value={selectedSection}
          />

          <AttendanceSelectField
            disabled={!selectedSection || loadingTeachingInfo || subjectOptions.length === 0}
            label="Subject"
            onSelect={handleSubjectSelect}
            options={subjectOptions}
            placeholder={
              !selectedClass
                ? "Select Class First"
                : !selectedSection
                ? "Select Section First"
                : loadingTeachingInfo
                ? "Loading Subjects..."
                : subjectOptions.length > 0
                ? "Select Subject"
                : "No Subject Available"
            }
            value={selectedSubject}
          />
        </View>
      </AttendanceSurfaceCard>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={media}
        keyExtractor={(item, index) =>
          `${String(item?.id ?? "media")}-${index}`
        }
        ListEmptyComponent={
          !loading ? (
            <AcademicSurfaceCard style={styles.emptyCard} theme={theme}>
              <Text style={theme.typography.cardTitle}>
                {MODULE_TEXT.emptyTitle}
              </Text>
              <Text style={[theme.typography.body, styles.emptyText]}>
                {!selectedClass || !selectedSection || !selectedSubject
                  ? "Please select Class, Section and Subject to view records."
                  : COMMON_TEXT.noData}
              </Text>
            </AcademicSurfaceCard>
          ) : null
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate("StaffViewMultiMedia", { media: item })
            }
          >
            <AcademicSurfaceCard style={styles.card} theme={theme}>
              {/* Badge + date row */}
              <View style={styles.cardBadgeRow}>
                <View style={[styles.badgePill, {backgroundColor: theme.colors.accentSoft}]}>
                  <Text style={[styles.badgePillText, {color: theme.colors.accent}]}>
                    {item.subject || 'Media'}
                  </Text>
                </View>
                <Text style={[theme.typography.topRightMuted]}>{item.date}</Text>
              </View>

              {/* Title */}
              <Text
                numberOfLines={2}
                style={[theme.typography.cardTitle, styles.cardTitle]}
              >
                {item.topic || item.subject}
              </Text>

              {/* Meta chips */}
              <View style={styles.metaChipRow}>
                <View style={[styles.metaChip, {backgroundColor: theme.colors.accentSoft}]}>
                  <Text style={[styles.metaChipText, {color: theme.colors.accent}]}>
                    {`Class ${item.std_class}`}
                  </Text>
                </View>
                <View style={[styles.metaChip, {backgroundColor: '#F3F4F6'}]}>
                  <Text style={[styles.metaChipText, {color: '#6B7280'}]}>
                    {`Sec ${item.section}`}
                  </Text>
                </View>
                <View style={[styles.metaChip, {backgroundColor: '#F3F4F6'}]}>
                  <Text style={[styles.metaChipText, {color: '#6B7280'}]}>
                    {item.teachername || 'Teacher'}
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View style={[styles.divider, {backgroundColor: theme.colors.subtleDivider}]} />

              {/* Actions */}
              <View style={styles.actionsRow}>
                <AcademicActionButton
                  icon="play"
                  onPress={() =>
                    navigation.navigate("StaffMediaWebView", {
                      url: item.link,
                      title: item.topic || item.subject || "Media",
                    })
                  }
                  style={styles.actionButton}
                  theme={theme}
                  title={COMMON_TEXT.play}
                  tone="play"
                />
                <AcademicActionButton
                  onPress={() => handleDeleteMedia(item)}
                  style={styles.actionButton}
                  theme={theme}
                  title={COMMON_TEXT.delete}
                  tone="delete"
                />
              </View>
            </AcademicSurfaceCard>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />

      <AcademicFloatingButton
        onPress={() => navigation.navigate("StaffAddMultiMedia")}
        theme={theme}
      />
    </StaffAcademicScaffold>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    formCard: {
      marginBottom: theme.spacing.cardGap,
      marginTop: theme.spacing.contentTop,
      marginHorizontal: 0,
    },
    fieldStack: {
      gap: attendanceTheme.spacing.fieldGap,
    },
    actionsRow: {
      flexDirection: "row",
      gap: 8,
    },
    actionButton: {
      flex: 1,
    },
    badgePill: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    badgePillText: {
      fontFamily: typeSemiBold || 'Inter-SemiBold',
      fontSize: 11,
    },
    badgeRow: {},
    card: {
      marginBottom: theme.spacing.cardGap,
    },
    cardBadgeRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    cardTitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      marginBottom: 10,
      width: '100%',
    },
    emptyCard: {
      alignItems: "center",
      marginTop: theme.spacing.buttonTop,
      paddingVertical: theme.spacing.cardVertical * 2,
    },
    emptyText: {
      marginTop: theme.spacing.labelGap,
      textAlign: "center",
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: theme.layout.fabSize + theme.spacing.footerBottom * 3,
      paddingTop: theme.spacing.contentTop,
    },
    metaChip: {
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    metaChipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 12,
    },
    metaChipText: {
      fontFamily: 'Inter-Medium',
      fontSize: 11,
    },
  });

export default StaffModuleMultiMedia;
