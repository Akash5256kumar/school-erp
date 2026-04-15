import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AlertTriangle, Users } from "lucide-react-native";

import attendanceTheme from "./attendanceTheme";
import { AttendanceSurfaceCard } from "./AttendanceScreen";

const AttendanceStudentsCard = ({
  children,
  description,
  emptyTitle,
  emptyStateVariant = "default",
  hasContent,
  interactiveList = false,
  loading,
}) => {
  const isWarningState = emptyStateVariant === "warning";
  const EmptyStateIcon = isWarningState ? AlertTriangle : Users;

  return (
    <AttendanceSurfaceCard
      style={[
        styles.card,
        interactiveList && hasContent && styles.interactiveCard,
        !hasContent && !loading && styles.emptyCard,
      ]}
    >
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator
            color={attendanceTheme.colors.headerStart}
            size="large"
          />
        </View>
      ) : hasContent ? (
        children
      ) : (
        <View style={styles.centered}>
          <View
            style={[
              styles.emptyIconCircle,
              isWarningState && styles.warningIconCircle,
            ]}
          >
            <EmptyStateIcon
              color={
                isWarningState
                  ? attendanceTheme.colors.absent
                  : attendanceTheme.colors.emptyIconStroke
              }
              size={attendanceTheme.iconSize.empty}
              strokeWidth={2}
            />
          </View>

          <Text
            style={[styles.emptyTitle, isWarningState && styles.warningTitle]}
          >
            {emptyTitle}
          </Text>
          <Text style={styles.emptyDescription}>{description}</Text>
        </View>
      )}
    </AttendanceSurfaceCard>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: attendanceTheme.layout.studentsCardMinHeight,
  },
  interactiveCard: {
    overflow: "hidden",
    padding: 0,
  },
  emptyCard: {
    minHeight: attendanceTheme.layout.emptyCardMinHeight,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight:
      attendanceTheme.layout.emptyCardMinHeight -
      attendanceTheme.spacing.cardPadding * 2,
  },
  emptyIconCircle: {
    alignItems: "center",
    backgroundColor: attendanceTheme.colors.emptyIconSurface,
    borderRadius: attendanceTheme.radius.emptyIcon,
    height: attendanceTheme.radius.emptyIcon * 2,
    justifyContent: "center",
    marginBottom: attendanceTheme.spacing.fieldGap,
    width: attendanceTheme.radius.emptyIcon * 2,
  },
  warningIconCircle: {
    backgroundColor: attendanceTheme.colors.absentSurface,
  },
  emptyTitle: {
    color: attendanceTheme.colors.textPrimary,
    fontFamily: attendanceTheme.fontFamily.title,
    fontSize: attendanceTheme.typography.emptyTitle,
    textAlign: "center",
  },
  warningTitle: {
    color: attendanceTheme.colors.absent,
  },
  emptyDescription: {
    color: attendanceTheme.colors.textSecondary,
    fontFamily: attendanceTheme.fontFamily.subtitle,
    fontSize: attendanceTheme.typography.emptyDescription,
    lineHeight: attendanceTheme.typography.emptyDescription * 1.45,
    marginTop: attendanceTheme.spacing.fieldLabelGap,
    maxWidth: "88%",
    textAlign: "center",
  },
});

export default AttendanceStudentsCard;
