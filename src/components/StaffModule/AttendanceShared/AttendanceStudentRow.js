import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check, X } from "lucide-react-native";

import attendanceTheme from "./attendanceTheme";

const STATUS_STYLES = {
  absent: {
    backgroundColor: attendanceTheme.colors.absentSurface,
    color: attendanceTheme.colors.absent,
    Icon: X,
  },
  present: {
    backgroundColor: attendanceTheme.colors.presentSurface,
    color: attendanceTheme.colors.present,
    Icon: Check,
  },
};

const AttendanceStudentRow = ({
  compact = false,
  interactive,
  isLast = false,
  name,
  onPress,
  statusKey,
  statusLabel,
}) => {
  const statusStyle = STATUS_STYLES[statusKey] || STATUS_STYLES.present;
  const Icon = statusStyle.Icon;
  const isChecked = statusKey === "present";

  if (interactive) {
    return (
      <Pressable
        accessibilityRole="button"
        android_ripple={{
          color: attendanceTheme.colors.ripple,
          borderless: false,
        }}
        onPress={onPress}
        style={({ pressed }) => [
          styles.listRow,
          compact && styles.listRowCompact,
          !isLast && styles.listRowDivider,
          pressed && styles.rowPressed,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[styles.listName, compact && styles.listNameCompact]}
        >
          {name}
        </Text>

        <View
          style={[
            styles.checkbox,
            compact && styles.checkboxCompact,
            {
              backgroundColor: isChecked
                ? attendanceTheme.colors.attendanceListCheckboxActive
                : attendanceTheme.colors.surface,
              borderColor: isChecked
                ? attendanceTheme.colors.attendanceListCheckboxActive
                : attendanceTheme.colors.attendanceListCheckbox,
            },
          ]}
        >
          {isChecked ? (
            <Check
              color={attendanceTheme.colors.headerText}
              size={attendanceTheme.iconSize.studentCheckbox}
              strokeWidth={3.2}
            />
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole={interactive ? "button" : undefined}
      android_ripple={
        interactive
          ? { color: attendanceTheme.colors.ripple, borderless: false }
          : undefined
      }
      disabled={!interactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        interactive && pressed && styles.rowPressed,
      ]}
    >
      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>

      <View
        style={[
          styles.statusPill,
          { backgroundColor: statusStyle.backgroundColor },
        ]}
      >
        <Icon
          color={statusStyle.color}
          size={attendanceTheme.iconSize.status}
          strokeWidth={2.4}
        />
        <Text style={[styles.statusText, { color: statusStyle.color }]}>
          {statusLabel}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    backgroundColor: attendanceTheme.colors.surfaceMuted,
    borderRadius: attendanceTheme.radius.field,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: attendanceTheme.spacing.listRowGap,
    paddingHorizontal: attendanceTheme.spacing.listRowPaddingHorizontal,
    paddingVertical: attendanceTheme.spacing.listRowPaddingVertical,
  },
  rowPressed: {
    opacity: 0.96,
  },
  checkbox: {
    alignItems: "center",
    borderRadius: attendanceTheme.radius.studentCheckbox,
    borderWidth: attendanceTheme.borderWidth.studentCheckbox,
    height: attendanceTheme.radius.studentCheckbox * 2,
    justifyContent: "center",
    width: attendanceTheme.radius.studentCheckbox * 2,
  },
  checkboxCompact: {
    height: attendanceTheme.radius.studentCheckbox * 1.8,
    width: attendanceTheme.radius.studentCheckbox * 1.8,
  },
  listName: {
    color: attendanceTheme.colors.textPrimary,
    flex: 1,
    fontFamily: attendanceTheme.fontFamily.title,
    fontSize: attendanceTheme.typography.cardTitle,
    marginRight: attendanceTheme.spacing.fieldLabelGap,
  },
  listNameCompact: {
    fontFamily: attendanceTheme.fontFamily.label,
    fontSize: attendanceTheme.typography.listName,
  },
  listRow: {
    alignItems: "center",
    backgroundColor: attendanceTheme.colors.surface,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: attendanceTheme.layout.studentListRowMinHeight,
    paddingHorizontal: attendanceTheme.spacing.cardPadding + 8,
    paddingVertical: attendanceTheme.spacing.listRowPaddingVertical,
  },
  listRowCompact: {
    minHeight: Math.round(attendanceTheme.layout.studentListRowMinHeight * 0.74),
    paddingHorizontal: attendanceTheme.spacing.cardPadding,
    paddingVertical: Math.round(
      attendanceTheme.spacing.listRowPaddingVertical * 0.72
    ),
  },
  listRowDivider: {
    borderBottomColor: attendanceTheme.colors.attendanceListBorder,
    borderBottomWidth: attendanceTheme.borderWidth.studentListDivider,
  },
  name: {
    color: attendanceTheme.colors.textPrimary,
    flex: 1,
    fontFamily: attendanceTheme.fontFamily.label,
    fontSize: attendanceTheme.typography.listName,
    marginRight: attendanceTheme.spacing.fieldLabelGap,
  },
  statusPill: {
    alignItems: "center",
    borderRadius: attendanceTheme.radius.statusPill,
    flexDirection: "row",
    paddingHorizontal: attendanceTheme.spacing.fieldHorizontal * 0.72,
    paddingVertical: attendanceTheme.spacing.fieldLabelGap * 0.55,
  },
  statusText: {
    fontFamily: attendanceTheme.fontFamily.status,
    fontSize: attendanceTheme.typography.status,
    marginLeft: attendanceTheme.spacing.fieldLabelGap * 0.45,
  },
});

export default AttendanceStudentRow;
