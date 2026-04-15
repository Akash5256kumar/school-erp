import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as constant from "../../../Utils/Constant";
import { apiRequest } from "../../../Utils";
import { apiClient } from "../../../api";
import {
  buildClassSectionMap,
  fetchTeachingInfo,
  getTeachingInfoClassOptions,
  getTeachingSectionsForClass,
} from "../../../Utils/teachingInfo";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import {
  AcademicActionButton,
  AcademicFilterModal,
  AcademicFloatingButton,
  AcademicSurfaceCard,
} from "../StaffAcademicShared/StaffAcademicPrimitives";
import { ACADEMIC_TEXT } from "../StaffAcademicShared/staffAcademicConfig";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";

const safeText = (value) =>
  value !== null && value !== undefined && String(value).trim() !== ""
    ? String(value)
    : "—";

const isValidItem = (item) =>
  Boolean(item?.student_name || item?.class || item?.section);

const StaffModuleStudentPerformance = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const theme = createAcademicTheme({
    height,
    width,
    variant: "studentPerformance",
  });
  const styles = useMemo(() => createStyles(theme), [theme]);
  const MODULE_TEXT = ACADEMIC_TEXT.studentPerformance;
  const COMMON_TEXT = ACADEMIC_TEXT.common;

  const [isModalVisible, setModalVisible] = useState(false);
  const [appliedClass, setAppliedClass] = useState("");
  const [appliedSection, setAppliedSection] = useState("");
  const [draftClass, setDraftClass] = useState("");
  const [draftSection, setDraftSection] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teachingInfo, setTeachingInfo] = useState([]);

  const classSectionMap = useMemo(
    () => buildClassSectionMap(teachingInfo),
    [teachingInfo]
  );

  const classOptions = useMemo(
    () => getTeachingInfoClassOptions(classSectionMap),
    [classSectionMap]
  );

  const sectionOptions = useMemo(
    () => getTeachingSectionsForClass(classSectionMap, draftClass),
    [classSectionMap, draftClass]
  );

  const validStudents = useMemo(
    () => students.filter(isValidItem),
    [students]
  );

  const getPerformance = useCallback(
    async (classFilter = "", sectionFilter = "", showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        let endpoint = "getPerformance";
        if (classFilter && sectionFilter) {
          endpoint += `?class=${encodeURIComponent(classFilter)}&section=${encodeURIComponent(sectionFilter)}`;
        }

        const res = await apiRequest(endpoint, "GET");
        setStudents(
          Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []
        );
      } catch (error) {
        console.log("Performance API Error", error);
        console.log("Performance API Full Response", JSON.stringify(error?.data, null, 2));
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    fetchTeachingInfo()
      .then(setTeachingInfo)
      .catch(() => setTeachingInfo([]));
    getPerformance();
  }, [getPerformance]);

  const { onRefresh, refreshing } = usePullToRefresh(() =>
    getPerformance(appliedClass, appliedSection, false)
  );

  const handleDelete = useCallback(
    (item) => {
      Alert.alert(
        "Delete Performance",
        "Are you sure you want to delete this performance?",
        [
          { text: COMMON_TEXT.cancel, style: "cancel" },
          {
            text: COMMON_TEXT.delete,
            style: "destructive",
            onPress: async () => {
              try {
                await apiClient.delete(`performance?id=${item.id}`);
                setStudents((prev) =>
                  prev.filter((s) => s.id !== item.id)
                );
              } catch (error) {
                console.log("Delete Performance Error", error);
                constant.showAlert(
                  error?.userMessage || "Unable to delete performance."
                );
              }
            },
          },
        ]
      );
    },
    [COMMON_TEXT.cancel, COMMON_TEXT.delete]
  );

  const handlePublish = useCallback(async (item) => {
    try {
      await apiRequest("publish-performance", "POST", { id: item.id });
      setStudents((prev) =>
        prev.map((s) =>
          s.id === item.id ? { ...s, status: "published" } : s
        )
      );
    } catch (error) {
      console.log("Publish Performance Error", error);
      constant.showAlert(
        error?.userMessage || "Unable to publish performance."
      );
    }
  }, []);

  const closeModal = () => {
    setDraftClass(appliedClass);
    setDraftSection(appliedSection);
    setModalVisible(false);
  };

  const handleApplyFilter = () => {
    setAppliedClass(draftClass);
    setAppliedSection(draftSection);
    getPerformance(draftClass, draftSection);
    setModalVisible(false);
  };

  const isFiltered = Boolean(appliedClass || appliedSection);
  const emptyMessage = isFiltered
    ? "No performance data found for the selected class and section."
    : COMMON_TEXT.noData;

  return (
    <StaffAcademicScaffold
      headerActionIcon={constant.Icons.Filter}
      onBackPress={() => navigation.goBack()}
      onHeaderActionPress={() => setModalVisible(true)}
      theme={theme}
      title={MODULE_TEXT.listTitle}
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={theme.colors.accent} size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={validStudents}
          keyExtractor={(item, index) =>
            `${String(item?.id ?? "student")}-${index}`
          }
          ListEmptyComponent={
            <AcademicSurfaceCard style={styles.emptyCard} theme={theme}>
              <Text style={[theme.typography.cardTitle, styles.emptyTitle]}>
                {MODULE_TEXT.emptyTitle}
              </Text>
              <Text style={[theme.typography.body, styles.emptyText]}>
                {emptyMessage}
              </Text>
            </AcademicSurfaceCard>
          }
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("StaffModuleStudentPerformanceDetail", {
                  item,
                })
              }
              style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
            >
              <AcademicSurfaceCard style={styles.card} theme={theme}>
                {/* Badge + date row */}
                <View style={styles.cardBadgeRow}>
                  <View style={[styles.badgePill, {backgroundColor: theme.colors.accentSoft}]}>
                    <Text style={[styles.badgePillText, {color: theme.colors.accent}]}>
                      {`Class ${safeText(item.class)} · ${MODULE_TEXT.filters.section} ${safeText(item.section)}`}
                    </Text>
                  </View>
                  <Text style={theme.typography.topRightAccent}>
                    {safeText(item.date)}
                  </Text>
                </View>

                {/* Student name */}
                <Text
                  numberOfLines={1}
                  style={[theme.typography.cardTitle, styles.studentName]}
                >
                  {safeText(item.student_name)}
                </Text>

                {/* Academics chip */}
                {item.academics_performance ? (
                  <View style={styles.metaChipRow}>
                    <View style={[styles.metaChip, {backgroundColor: theme.colors.accentSoft}]}>
                      <Text style={[styles.metaChipText, {color: theme.colors.accent}]}>
                        {`Academics: ${safeText(item.academics_performance)}`}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Divider */}
                <View style={[styles.divider, {backgroundColor: theme.colors.subtleDivider}]} />

                {/* Actions */}
                <View style={styles.actionsRow}>
                  <AcademicActionButton
                    onPress={() => handleDelete(item)}
                    style={styles.actionButton}
                    theme={theme}
                    title={COMMON_TEXT.delete}
                    tone="delete"
                  />
                  <AcademicActionButton
                    onPress={() => handlePublish(item)}
                    style={styles.actionButton}
                    theme={theme}
                    title={COMMON_TEXT.published}
                    tone="published"
                  />
                </View>
              </AcademicSurfaceCard>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <AcademicFloatingButton
        onPress={() => navigation.navigate("StaffModuleAddSPR")}
        style={styles.fab}
        theme={theme}
      />

      <AcademicFilterModal
        applyLabel={COMMON_TEXT.apply}
        cancelLabel={COMMON_TEXT.cancel}
        fields={[
          {
            key: MODULE_TEXT.filters.class,
            onSelect: setDraftClass,
            openAbove: false,
            options: classOptions,
            placeholder: MODULE_TEXT.filters.class,
            selected: draftClass,
          },
          {
            key: MODULE_TEXT.filters.section,
            onSelect: setDraftSection,
            openAbove: true,
            options: sectionOptions,
            placeholder: MODULE_TEXT.filters.section,
            selected: draftSection,
          },
        ]}
        onApply={handleApplyFilter}
        onCancel={closeModal}
        theme={theme}
        title={COMMON_TEXT.filterBy}
        visible={isModalVisible}
      />
    </StaffAcademicScaffold>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    actionButton: {
      flex: 1,
    },
    actionsRow: {
      flexDirection: "row",
      gap: 8,
    },
    badgePill: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    badgePillText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 11,
    },
    card: {
      marginBottom: theme.spacing.cardGap * 0.85,
    },
    cardBadgeRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
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
    emptyTitle: {
      textAlign: "center",
    },
    fab: {
      bottom: theme.layout.fabSize + theme.spacing.footerBottom,
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: theme.layout.fabSize * 2 + theme.spacing.footerBottom,
      paddingTop: theme.spacing.contentTop,
    },
    loaderContainer: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
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
      marginBottom: 10,
    },
    metaChipText: {
      fontFamily: 'Inter-Medium',
      fontSize: 11,
    },
    studentName: {
      fontSize: 16,
      marginBottom: 8,
    },
  });

export default StaffModuleStudentPerformance;
