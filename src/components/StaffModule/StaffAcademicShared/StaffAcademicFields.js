import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { ChevronDown } from "lucide-react-native";

import { STRINGS } from "../../../constants";
import attendanceTheme from "../AttendanceShared/attendanceTheme";

const formatDisplayDate = (date) =>
  date
    ? date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getDropdownFrame = ({
  itemCount,
  maxMenuHeight,
  openAbove,
  theme,
  x,
  y,
  width,
  height,
}) => {
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
  const inset = theme.spacing.screenHorizontal;
  const dropdownWidth = clamp(width, 160, windowWidth - inset * 2);
  const estimatedHeight = Math.min(
    maxMenuHeight,
    itemCount * theme.layout.actionHeight
  );
  const belowTop = y + height + theme.spacing.labelGap * 0.5;
  const canOpenBelow =
    !openAbove && belowTop + estimatedHeight <= windowHeight - inset;
  const fallbackTop = Math.max(
    inset,
    y - estimatedHeight - theme.spacing.labelGap
  );

  return {
    left: clamp(x, inset, windowWidth - inset - dropdownWidth),
    maxHeight: Math.max(theme.layout.actionHeight * 2, windowHeight - inset * 2),
    top: canOpenBelow ? belowTop : fallbackTop,
    width: dropdownWidth,
  };
};

const FieldShell = ({ children, multiline = false, style, theme }) => (
  <View
    style={[
      styles.shell,
      {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.field,
        minHeight: multiline
          ? theme.layout.fieldHeight * 1.85
          : theme.layout.fieldHeight,
        paddingHorizontal: theme.spacing.cardHorizontal,
        paddingVertical: multiline ? theme.spacing.labelGap : 0,
      },
      style,
    ]}
  >
    {children}
  </View>
);

const FieldWrapper = ({ children, label, theme }) => (
  <View style={styles.wrapper}>
    {label ? <Text style={theme.typography.fieldLabel}>{label}</Text> : null}
    {label ? <View style={{ height: theme.spacing.labelGap }} /> : null}
    {children}
  </View>
);

export const StaffAcademicTextField = ({
  containerStyle,
  fieldStyle,
  label,
  multiline = false,
  onChangeText,
  placeholder,
  theme,
  value,
}) => (
  <FieldWrapper label={label} theme={theme}>
    <FieldShell multiline={multiline} style={fieldStyle} theme={theme}>
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.fieldPlaceholder}
        selectionColor={theme.colors.accent}
        style={[
          styles.textInput,
          multiline ? styles.multilineInput : null,
          {
            color: theme.colors.fieldText,
            fontFamily: theme.typography.fieldValue.fontFamily,
            fontSize: theme.typography.fieldValue.fontSize,
            textAlignVertical: multiline ? "top" : "center",
          },
          containerStyle,
        ]}
        value={value}
      />
    </FieldShell>
  </FieldWrapper>
);

export const StaffAcademicSelectField = ({
  containerStyle,
  disabled = false,
  fieldStyle,
  label,
  mutedWhenDisabled = true,
  onSelect,
  openAbove = false,
  optionAppearance = "default",
  options = [],
  placeholder,
  selected,
  showChevron = true,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorFrame, setAnchorFrame] = useState(null);
  const items = useMemo(() => options || [], [options]);
  const triggerRef = useRef(null);
  const isDisabled = disabled || items.length === 0;
  const displayValue = selected || placeholder || "";
  const maxMenuHeight = theme.layout.actionHeight * 5.5;
  const usesAttendanceAppearance = optionAppearance === "attendance";

  const openDropdown = useCallback(() => {
    if (!triggerRef.current?.measureInWindow) {
      setOpen(true);
      return;
    }

    triggerRef.current.measureInWindow((x, y, width, height) => {
      setAnchorFrame(
        getDropdownFrame({
          height,
          itemCount: items.length,
          maxMenuHeight,
          openAbove,
          theme,
          width,
          x,
          y,
        })
      );
      setOpen(true);
    });
  }, [
    items.length,
    maxMenuHeight,
    openAbove,
    theme,
  ]);

  return (
    <FieldWrapper label={label} theme={theme}>
      <View collapsable={false} ref={triggerRef}>
        <Pressable
          accessibilityRole="button"
          disabled={isDisabled}
          onPress={openDropdown}
          style={({ pressed }) => [
            {
              opacity:
                isDisabled && mutedWhenDisabled ? 0.72 : pressed ? 0.94 : 1,
            },
            containerStyle,
          ]}
        >
          <FieldShell style={fieldStyle} theme={theme}>
            <Text
              numberOfLines={1}
              style={[
                selected
                  ? theme.typography.fieldValue
                  : theme.typography.fieldPlaceholder,
                styles.valueText,
              ]}
            >
              {displayValue}
            </Text>
            {showChevron ? (
              <ChevronDown
                color={theme.colors.fieldPlaceholder}
                size={theme.layout.actionHeight * 0.52}
                strokeWidth={2.2}
              />
            ) : null}
          </FieldShell>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setOpen(false)}
        transparent
        visible={open && Boolean(anchorFrame)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          style={styles.modalOverlay}
        >
          <Pressable
            onPress={() => {}}
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.modal,
                left: anchorFrame?.left ?? theme.spacing.screenHorizontal,
                maxHeight: anchorFrame?.maxHeight ?? maxMenuHeight,
                top: anchorFrame?.top ?? theme.spacing.screenHorizontal,
                width:
                  anchorFrame?.width ??
                  theme.layout.contentMaxWidth -
                    theme.spacing.screenHorizontal * 2,
              },
              usesAttendanceAppearance
                ? styles.attendanceModalCard
                : styles.dropdownCard,
            ]}
          >
            <FlatList
              data={items}
              keyExtractor={(item, index) => `${String(item)}-${index}`}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="button"
                  android_ripple={
                    usesAttendanceAppearance
                      ? {
                          color: attendanceTheme.colors.ripple,
                          borderless: false,
                        }
                      : undefined
                  }
                  onPress={() => {
                    setOpen(false);
                    onSelect(item);
                  }}
                  style={({ pressed }) => [
                    usesAttendanceAppearance
                      ? styles.attendanceOptionRow
                      : styles.optionRow,
                    item === selected &&
                      (usesAttendanceAppearance
                        ? styles.attendanceOptionSelected
                        : {
                            backgroundColor: theme.colors.surfaceMuted,
                          }),
                    pressed &&
                      (usesAttendanceAppearance
                        ? styles.attendanceOptionPressed
                        : {
                            backgroundColor: theme.colors.surfaceMuted,
                          }),
                  ]}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      usesAttendanceAppearance
                        ? styles.attendanceOptionText
                        : theme.typography.fieldValue,
                      item === selected &&
                        usesAttendanceAppearance &&
                        styles.attendanceOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </FieldWrapper>
  );
};

export const StaffAcademicDateField = ({
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
    <FieldWrapper label={label} theme={theme}>
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
            size={theme.layout.actionHeight * 0.52}
            strokeWidth={2.2}
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
        theme="light"
        title={label}
      />
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  attendanceModalCard: {
    paddingVertical: attendanceTheme.spacing.fieldLabelGap,
  },
  attendanceOptionPressed: {
    opacity: 0.92,
  },
  attendanceOptionRow: {
    paddingHorizontal: attendanceTheme.spacing.modalPadding,
    paddingVertical: attendanceTheme.spacing.modalOptionPadding,
  },
  attendanceOptionSelected: {
    backgroundColor: attendanceTheme.colors.surfaceMuted,
  },
  attendanceOptionText: {
    color: attendanceTheme.colors.textPrimary,
    fontFamily: attendanceTheme.fontFamily.value,
    fontSize: attendanceTheme.typography.fieldValue,
  },
  attendanceOptionTextSelected: {
    fontFamily: attendanceTheme.fontFamily.label,
  },
  dropdownCard: {
    position: "absolute",
  },
  modalCard: {
    overflow: "hidden",
  },
  modalOverlay: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  multilineInput: {
    minHeight: "100%",
    paddingTop: 0,
  },
  optionRow: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: "100%",
  },
  shell: {
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
  },
  textInput: {
    flex: 1,
    includeFontPadding: false,
    paddingVertical: 0,
    textAlign: "left",
  },
  valueText: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  wrapper: {
    width: "100%",
  },
});

export default {
  StaffAcademicDateField,
  StaffAcademicSelectField,
  StaffAcademicTextField,
};
