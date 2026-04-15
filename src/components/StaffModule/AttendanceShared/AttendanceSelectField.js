import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

import attendanceTheme from "./attendanceTheme";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const dropdownRadius = Math.min(attendanceTheme.radius.field, 18);

const AttendanceSelectField = ({
  disabled,
  label,
  onSelect,
  options,
  placeholder,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  const [anchorFrame, setAnchorFrame] = useState(null);

  const normalizedOptions = useMemo(() => options || [], [options]);
  const isDisabled = disabled || normalizedOptions.length === 0;
  const triggerRef = useRef(null);

  const closeModal = () => setVisible(false);
  const openDropdown = useCallback(() => {
    if (isDisabled || !triggerRef.current?.measureInWindow) {
      return;
    }

    triggerRef.current.measureInWindow((x, y, width, height) => {
      const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
      const inset = attendanceTheme.spacing.modalInset;
      const dropdownWidth = clamp(
        width,
        Math.min(180, windowWidth - inset * 2),
        windowWidth - inset * 2
      );
      const estimatedHeight = attendanceTheme.layout.modalMaxHeight;
      const belowTop = y + height + attendanceTheme.spacing.fieldLabelGap * 0.5;
      const canOpenBelow = belowTop + estimatedHeight <= windowHeight - inset;
      const top = canOpenBelow
        ? belowTop
        : Math.max(
            inset,
            y - Math.min(estimatedHeight, windowHeight - inset * 2) - attendanceTheme.spacing.fieldLabelGap * 0.5
          );
      const left = clamp(x, inset, windowWidth - inset - dropdownWidth);

      setAnchorFrame({
        left,
        maxHeight: Math.max(
          attendanceTheme.layout.fieldHeight * 2,
          windowHeight - inset * 2
        ),
        top,
        width: dropdownWidth,
      });
      setVisible(true);
    });
  }, [isDisabled]);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>

      <View collapsable={false} ref={triggerRef}>
        <Pressable
          accessibilityRole="button"
          android_ripple={{
            color: attendanceTheme.colors.ripple,
            borderless: false,
          }}
          disabled={isDisabled}
          onPress={openDropdown}
          style={({ pressed }) => [
            styles.field,
            isDisabled && styles.fieldDisabled,
            pressed && !isDisabled && styles.fieldPressed,
          ]}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              styles.value,
              !value && styles.placeholder,
              isDisabled && styles.disabledText,
            ]}
          >
            {value || placeholder}
          </Text>

          <ChevronDown
            color={attendanceTheme.colors.textMuted}
            size={attendanceTheme.iconSize.field}
            strokeWidth={2.2}
          />
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={closeModal}
        transparent
        visible={visible && Boolean(anchorFrame)}
      >
        <View style={styles.overlay}>
          <Pressable
            accessibilityRole="button"
            onPress={closeModal}
            style={StyleSheet.absoluteFill}
          />

          <View
            style={[
              styles.modalCard,
              {
                left: anchorFrame?.left ?? attendanceTheme.spacing.modalInset,
                maxHeight: anchorFrame?.maxHeight ?? attendanceTheme.layout.modalMaxHeight,
                top: anchorFrame?.top ?? attendanceTheme.spacing.modalInset,
                width: anchorFrame?.width ?? "100%",
              },
            ]}
          >
            <FlatList
              data={normalizedOptions}
              keyExtractor={(item, index) => `${item}-${index}`}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="button"
                  android_ripple={{
                    color: attendanceTheme.colors.ripple,
                    borderless: false,
                  }}
                  onPress={() => {
                    closeModal();
                    onSelect(item);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    item === value && styles.optionSelected,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={[
                      styles.optionText,
                      item === value && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-between",
    paddingHorizontal: attendanceTheme.spacing.fieldHorizontal,
  },
  fieldDisabled: {
    opacity: 0.72,
  },
  fieldPressed: {
    opacity: 0.96,
  },
  value: {
    color: attendanceTheme.colors.textPrimary,
    flex: 1,
    fontFamily: attendanceTheme.fontFamily.value,
    fontSize: attendanceTheme.typography.fieldValue,
    minWidth: 0,
    paddingRight: attendanceTheme.spacing.fieldLabelGap,
  },
  placeholder: {
    color: attendanceTheme.colors.textMuted,
  },
  disabledText: {
    color: attendanceTheme.colors.textMuted,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    backgroundColor: attendanceTheme.colors.surface,
    borderColor: attendanceTheme.colors.fieldBorder,
    borderRadius: dropdownRadius,
    borderWidth: attendanceTheme.borderWidth.field,
    position: "absolute",
    paddingVertical: attendanceTheme.spacing.fieldLabelGap,
    ...attendanceTheme.shadow.card,
  },
  option: {
    paddingHorizontal: attendanceTheme.spacing.modalPadding,
    paddingVertical: attendanceTheme.spacing.modalOptionPadding,
  },
  optionSelected: {
    backgroundColor: attendanceTheme.colors.surfaceMuted,
  },
  optionPressed: {
    opacity: 0.92,
  },
  optionText: {
    color: attendanceTheme.colors.textPrimary,
    fontFamily: attendanceTheme.fontFamily.value,
    fontSize: attendanceTheme.typography.fieldValue,
    flexShrink: 1,
  },
  optionTextSelected: {
    fontFamily: attendanceTheme.fontFamily.label,
  },
});

export default AttendanceSelectField;
