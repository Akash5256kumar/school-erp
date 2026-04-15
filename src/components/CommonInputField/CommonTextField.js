import React from "react";
import { StyleSheet } from "react-native";

import { spacing } from "../../constants";
import AppInput from "../common/AppInput";

const CustomInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  inputStyle,
  multiline,
  leftIcon, // 👈 add prop for left-side image/icon
  iconStyle, // 👈 optional custom style for image
}) => {
  return (
    <AppInput
      containerStyle={styles.container}
      inputStyle={inputStyle}
      keyboardType={keyboardType || "default"}
      label={label}
      leftIcon={leftIcon}
      multiline={multiline}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
});

export default CustomInputField;
