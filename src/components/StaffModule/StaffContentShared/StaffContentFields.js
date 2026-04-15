import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { ChevronDown, Upload } from "lucide-react-native";

import { STRINGS } from "../../../constants";

const formatDisplayDate = (date) =>
  date ? date.toLocaleDateString("en-US") : "";

const FieldShell = ({ children, multiline = false, theme }) => (
  <View
    style={[
      styles.fieldShell,
      {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.field,
        minHeight: multiline
          ? theme.layout.fieldHeight * 1.9
          : theme.layout.fieldHeight,
        paddingHorizontal: theme.spacing.fieldPaddingHorizontal,
        paddingVertical: multiline ? theme.spacing.fieldPaddingVertical : 0,
      },
    ]}
  >
    {children}
  </View>
);

export const StaffContentTextField = ({
  label,
  multiline = false,
  onChangeText,
  placeholder,
  theme,
  value,
}) => (
  <View style={styles.wrapper}>
    <Text style={theme.typography.fieldLabel}>{label}</Text>
    <View style={{ height: theme.spacing.fieldLabelGap }} />
    <FieldShell multiline={multiline} theme={theme}>
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.fieldPlaceholder}
        selectionColor={theme.colors.accent}
        style={[
          styles.textInput,
          multiline ? styles.textAreaInput : null,
          {
            color: theme.colors.fieldText,
            fontFamily: theme.typography.fieldValue.fontFamily,
            fontSize: theme.typography.fieldValue.fontSize,
          },
        ]}
        textAlignVertical={multiline ? "top" : "center"}
        value={value}
      />
    </FieldShell>
  </View>
);

export const StaffContentSelectField = ({
  disabled = false,
  label,
  onSelect,
  options,
  placeholder,
  selected,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const normalizedOptions = useMemo(() => options || [], [options]);
  const isDisabled = disabled || normalizedOptions.length === 0;

  return (
    <View style={styles.wrapper}>
      <Text style={theme.typography.fieldLabel}>{label}</Text>
      <View style={{ height: theme.spacing.fieldLabelGap }} />
      <Pressable
        accessibilityRole="button"
        disabled={isDisabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          {
            opacity: isDisabled ? 0.64 : pressed ? 0.92 : 1,
          },
        ]}
      >
        <FieldShell theme={theme}>
          <Text
            numberOfLines={1}
            style={[
              selected
                ? theme.typography.fieldValue
                : theme.typography.fieldPlaceholder,
              styles.fieldText,
            ]}
          >
            {selected || placeholder}
          </Text>
          <ChevronDown
            color={theme.colors.fieldPlaceholder}
            size={theme.layout.compactFieldHeight * 0.42}
            strokeWidth={2.4}
          />
        </FieldShell>
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setOpen(false)}
        transparent
        visible={open}
      >
        <Pressable
          onPress={() => setOpen(false)}
          style={[
            styles.modalOverlay,
            {
              backgroundColor: theme.colors.screenOverlay,
              padding: theme.spacing.modalInset,
            },
          ]}
        >
          <Pressable
            onPress={() => {}}
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.menu,
                maxHeight: theme.layout.maxMenuHeight,
                width: "100%",
              },
            ]}
          >
            <FlatList
              data={normalizedOptions}
              keyExtractor={(item, index) => `${String(item)}-${index}`}
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setOpen(false);
                    onSelect(item);
                  }}
                  style={({ pressed }) => [
                    styles.optionRow,
                    {
                      backgroundColor:
                        pressed || item === selected
                          ? theme.colors.surfaceMuted
                          : theme.colors.surface,
                      paddingHorizontal: theme.spacing.cardHorizontal,
                      paddingVertical: theme.spacing.menuOptionVertical,
                    },
                  ]}
                >
                  <Text numberOfLines={2} style={theme.typography.fieldValue}>{item}</Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export const StaffContentDateField = ({
  date,
  label,
  maximumDate,
  minimumDate,
  onChange,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const value = formatDisplayDate(date);

  return (
    <View style={styles.wrapper}>
      <Text style={theme.typography.fieldLabel}>{label}</Text>
      <View style={{ height: theme.spacing.fieldLabelGap }} />
      <Pressable accessibilityRole="button" onPress={() => setOpen(true)}>
        <FieldShell theme={theme}>
          <Text
            style={
              value
                ? theme.typography.fieldValue
                : theme.typography.fieldPlaceholder
            }
          >
            {value || label}
          </Text>
          <ChevronDown
            color={theme.colors.fieldPlaceholder}
            size={theme.layout.compactFieldHeight * 0.42}
            strokeWidth={2.4}
          />
        </FieldShell>
      </Pressable>
      <DatePicker
        cancelText={STRINGS.common.cancel}
        confirmText={STRINGS.common.confirm}
        date={date || new Date()}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        modal
        mode="date"
        onCancel={() => setOpen(false)}
        onConfirm={(selectedDate) => {
          setOpen(false);
          onChange(selectedDate);
        }}
        open={open}
        title={label}
      />
    </View>
  );
};

export const StaffContentUploadAction = ({ onPress, theme, title }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={[
      styles.uploadRow,
      {
        marginTop: theme.spacing.uploadTop,
      },
    ]}
  >
    <Upload
      color={theme.colors.uploadAccent}
      size={theme.layout.compactFieldHeight * 0.44}
      strokeWidth={2.2}
    />
    <Text
      style={[
        theme.typography.uploadAction,
        {
          marginLeft: theme.spacing.fieldLabelGap,
        },
      ]}
    >
      {title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  fieldShell: {
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
  },
  fieldText: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  modalCard: {
    overflow: "hidden",
  },
  modalOverlay: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  optionRow: {
    width: "100%",
  },
  textAreaInput: {
    minHeight: "100%",
    textAlignVertical: "top",
  },
  textInput: {
    flex: 1,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  uploadRow: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  wrapper: {
    width: "100%",
  },
});

export default {
  StaffContentDateField,
  StaffContentSelectField,
  StaffContentTextField,
  StaffContentUploadAction,
};
