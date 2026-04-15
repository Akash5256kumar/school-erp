import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";

const safeText = (value) =>
  value !== null && value !== undefined && String(value).trim() !== ""
    ? String(value)
    : "—";

const parseSubject = (subjectStr) => {
  if (!subjectStr) return {};
  try {
    return typeof subjectStr === "string" ? JSON.parse(subjectStr) : subjectStr;
  } catch {
    return {};
  }
};

const SectionHeader = ({ title, styles, theme }) => (
  <View style={[styles.sectionHeader, { backgroundColor: theme.colors.accent }]}>
    <Text style={[theme.typography.sectionTitle, styles.sectionHeaderText]}>
      {title}
    </Text>
  </View>
);

const InfoRow = ({ label, value, styles, theme }) => (
  <View style={styles.infoRow}>
    <Text style={[theme.typography.body, styles.infoLabel]}>{label}</Text>
    <Text style={[theme.typography.body, styles.infoValue]}>{safeText(value)}</Text>
  </View>
);

const StaffModuleStudentPerformanceDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {};
  const { height, width } = useWindowDimensions();

  const theme = createAcademicTheme({
    height,
    width,
    variant: "studentPerformance",
  });
  const styles = useMemo(() => createStyles(theme), [theme]);

  const subjects = parseSubject(item?.subject);
  const subjectEntries = Object.entries(subjects);

  return (
    <StaffAcademicScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title="Performance Detail"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic Info */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <SectionHeader title="Basic Info" styles={styles} theme={theme} />
          <View style={styles.sectionBody}>
            <InfoRow label="Student Name" value={item?.student_name} styles={styles} theme={theme} />
            <InfoRow label="Class" value={item?.class} styles={styles} theme={theme} />
            <InfoRow label="Section" value={item?.section} styles={styles} theme={theme} />
            <InfoRow label="Date" value={item?.date} styles={styles} theme={theme} />
          </View>
        </View>

        {/* Performance Fields */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <SectionHeader title="Performance" styles={styles} theme={theme} />
          <View style={styles.sectionBody}>
            <InfoRow label="Punctuality" value={item?.punctuality} styles={styles} theme={theme} />
            <InfoRow label="Uniform" value={item?.uniform} styles={styles} theme={theme} />
            <InfoRow label="Homework" value={item?.homework} styles={styles} theme={theme} />
            <InfoRow label="Classwork" value={item?.classwork} styles={styles} theme={theme} />
            <InfoRow label="Discipline" value={item?.discipline} styles={styles} theme={theme} />
            <InfoRow label="Academics" value={item?.academics_performance} styles={styles} theme={theme} />
            <InfoRow label="Sports" value={item?.sport_performance} styles={styles} theme={theme} />
            <InfoRow label="Cultural" value={item?.cultural_performance} styles={styles} theme={theme} />
          </View>
        </View>

        {/* Remarks */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <SectionHeader title="Remarks" styles={styles} theme={theme} />
          <View style={styles.sectionBody}>
            <InfoRow label="Strength" value={item?.strength} styles={styles} theme={theme} />
            <InfoRow label="Area of Concern" value={item?.area_concern} styles={styles} theme={theme} />
            <InfoRow label="Warden Comment" value={item?.warden_comment} styles={styles} theme={theme} />
          </View>
        </View>

        {/* Subject-wise Performance */}
        {subjectEntries.length > 0 && (
          <View style={[styles.section, { borderColor: theme.colors.border }]}>
            <SectionHeader title="Subject-wise Performance" styles={styles} theme={theme} />
            <View style={styles.sectionBody}>
              {subjectEntries.map(([subjectName, info]) => (
                <View
                  key={subjectName}
                  style={[styles.subjectCard, { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceMuted ?? "#F5F7FA" }]}
                >
                  <Text style={[theme.typography.body, styles.subjectName]}>
                    {subjectName}
                  </Text>
                  <View style={styles.subjectRow}>
                    <Text style={[theme.typography.body, styles.infoLabel]}>Status</Text>
                    <Text style={[theme.typography.body, styles.infoValue]}>
                      {safeText(info?.status)}
                    </Text>
                  </View>
                  <View style={styles.subjectRow}>
                    <Text style={[theme.typography.body, styles.infoLabel]}>Remark</Text>
                    <Text style={[theme.typography.body, styles.infoValue]}>
                      {safeText(info?.remark)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </StaffAcademicScaffold>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    infoLabel: {
      color: theme.colors.secondaryText ?? "#6B7280",
      flex: 1,
    },
    infoRow: {
      borderBottomColor: theme.colors.subtleDivider ?? "#F0F0F0",
      borderBottomWidth: theme.borderWidth?.hairline ?? 1,
      flexDirection: "row",
      paddingVertical: theme.spacing.labelGap * 0.75,
    },
    infoValue: {
      flex: 2,
      textAlign: "right",
    },
    scrollContent: {
      paddingBottom: theme.spacing.footerBottom * 3,
      paddingTop: theme.spacing.contentTop,
    },
    section: {
      borderRadius: theme.radius.card,
      borderWidth: theme.borderWidth?.regular ?? 1,
      marginBottom: theme.spacing.cardGap,
      overflow: "hidden",
    },
    sectionBody: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.cardHorizontal,
    },
    sectionHeader: {
      paddingHorizontal: theme.spacing.cardHorizontal,
      paddingVertical: theme.spacing.labelGap * 0.85,
    },
    sectionHeaderText: {
      color: "#FFFFFF",
    },
    subjectCard: {
      borderRadius: theme.radius.action,
      borderWidth: theme.borderWidth?.hairline ?? 1,
      marginBottom: theme.spacing.labelGap,
      paddingHorizontal: theme.spacing.cardHorizontal * 0.85,
      paddingVertical: theme.spacing.labelGap * 0.6,
    },
    subjectName: {
      color: theme.colors.accent,
      fontFamily: theme.typography.sectionTitle?.fontFamily,
      marginBottom: theme.spacing.labelGap * 0.4,
    },
    subjectRow: {
      flexDirection: "row",
      paddingVertical: theme.spacing.labelGap * 0.3,
    },
  });

export default StaffModuleStudentPerformanceDetail;
