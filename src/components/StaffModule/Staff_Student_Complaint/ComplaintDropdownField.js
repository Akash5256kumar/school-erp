import React, { memo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChevronDown } from "lucide-react-native";

const ComplaintDropdownField = ({
  data,
  disabled = false,
  isOpen,
  label,
  mutedWhenDisabled = true,
  onSelect,
  onToggle,
  placeholder,
  selected,
  theme,
}) => (
  <View style={[styles.wrapper, isOpen ? styles.activeWrapper : null]}>
    <Text style={theme.typography.fieldLabel}>{label}</Text>

    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onToggle}
      style={[
        styles.shell,
        disabled && mutedWhenDisabled ? styles.disabledShell : null,
        {
          backgroundColor: theme.colors.fieldBackground,
          borderColor: theme.colors.fieldBorder,
          borderRadius: theme.radii.field,
          height: theme.sizing.fieldHeight,
          marginTop: theme.spacing.fieldLabelBottom,
          paddingHorizontal: theme.spacing.fieldInternalHorizontal,
        },
        theme.shadows.input,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          theme.typography.fieldValue,
          !selected ? { color: theme.colors.fieldPlaceholder } : null,
          styles.valueText,
          {
            marginRight: theme.spacing.inlineGap,
          },
        ]}
      >
        {selected?.label || placeholder}
      </Text>

      <ChevronDown
        color={theme.colors.fieldIcon}
        size={theme.sizing.dropdownIcon}
        strokeWidth={2.4}
      />
    </Pressable>

    {isOpen ? (
      <View
        style={[
          styles.menu,
          {
            backgroundColor: theme.colors.cardBackground,
            borderColor: theme.colors.fieldBorder,
            borderRadius: theme.radii.card,
            marginTop: theme.spacing.optionMenuTop,
          },
          theme.shadows.card,
        ]}
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.menuScroll}
        >
          {data.map((option, index) => (
            <Pressable
              key={`${String(option.value)}-${index}`}
              onPress={() => onSelect(option)}
              style={[
                styles.option,
                {
                  paddingHorizontal: theme.spacing.optionPaddingHorizontal,
                  paddingVertical: theme.spacing.optionPaddingVertical,
                },
              ]}
            >
              <Text numberOfLines={2} style={theme.typography.fieldValue}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  activeWrapper: {
    elevation: 20,
    overflow: "visible",
    position: "relative",
    zIndex: 10,
  },
  disabledShell: {
    opacity: 0.6,
  },
  menu: {
    borderWidth: 1,
    elevation: 20,
    maxHeight: 240,
    overflow: "hidden",
    zIndex: 20,
  },
  menuScroll: {
    width: "100%",
  },
  option: {},
  shell: {
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  valueText: {
    flex: 1,
    minWidth: 0,
  },
  wrapper: {
    width: "100%",
  },
});

export default memo(ComplaintDropdownField);
