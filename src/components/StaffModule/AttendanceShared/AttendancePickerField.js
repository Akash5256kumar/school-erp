import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

import { STRINGS } from "../../../constants";
import attendanceTheme from "./attendanceTheme";

const AttendancePickerField = ({
  label,
  maximumDate,
  minimumDate,
  mode,
  onConfirmValue,
  pickerDate,
  placeholder,
  value,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        accessibilityRole="button"
        android_ripple={{
          color: attendanceTheme.colors.ripple,
          borderless: false,
        }}
        onPress={() => setVisible(true)}
        style={({ pressed }) => [styles.field, pressed && styles.fieldPressed]}
      >
        <Text
          numberOfLines={1}
          style={[styles.value, !value && styles.placeholder]}
        >
          {value || placeholder}
        </Text>
      </Pressable>

      <DatePicker
        cancelText={STRINGS.common.cancel}
        confirmText={STRINGS.common.confirm}
        date={pickerDate || new Date()}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        modal
        mode={mode}
        onCancel={() => setVisible(false)}
        onConfirm={(selectedValue) => {
          setVisible(false);
          onConfirmValue(selectedValue);
        }}
        open={visible}
        title={label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    width: "100%",
  },
  label: {
    color: attendanceTheme.colors.textPrimary,
    fontFamily: attendanceTheme.fontFamily.label,
    fontSize: attendanceTheme.typography.fieldLabel,
    marginBottom: attendanceTheme.spacing.fieldLabelGap,
  },
  field: {
    alignItems: "center",
    backgroundColor: attendanceTheme.colors.fieldSurface,
    borderColor: attendanceTheme.colors.fieldBorder,
    borderRadius: attendanceTheme.radius.field,
    borderWidth: attendanceTheme.borderWidth.field,
    flexDirection: "row",
    height: attendanceTheme.layout.fieldHeight,
    paddingHorizontal: attendanceTheme.spacing.fieldHorizontal,
  },
  fieldPressed: {
    opacity: 0.96,
  },
  value: {
    color: attendanceTheme.colors.textPrimary,
    flex: 1,
    fontFamily: attendanceTheme.fontFamily.value,
    fontSize: attendanceTheme.typography.fieldValue,
  },
  placeholder: {
    color: attendanceTheme.colors.textMuted,
  },
});

export default AttendancePickerField;
