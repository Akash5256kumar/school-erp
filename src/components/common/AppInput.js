import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "../../constants";
import {
  componentSizes,
  radii,
  spacing,
  typography,
} from "../../constants/designSystem";

const AppInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  onPress,
  readOnly = false,
  valueTextStyle,
  secureTextEntry = false,
  leftIconStyle,
  rightIconStyle,
  ...rest
}) => {
  const wrapperContent = (
    <View style={styles.inputWrapper}>
      {leftIcon ? (
        <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />
      ) : null}
      {readOnly ? (
        <Text
          style={[
            styles.input,
            styles.readOnlyText,
            !value && styles.placeholder,
            inputStyle,
            valueTextStyle,
          ]}
        >
          {value || placeholder}
        </Text>
      ) : (
        <TextInput
          key={secureTextEntry ? "secure-input" : "plain-input"}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, inputStyle]}
          {...rest}
        />
      )}
      {rightIcon ? (
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={onRightIconPress}
          style={styles.iconButton}
        >
          <Image source={rightIcon} style={[styles.icon, rightIconStyle]} />
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <View style={containerStyle}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      {onPress ? (
        <Pressable accessibilityRole="button" onPress={onPress}>
          {wrapperContent}
        </Pressable>
      ) : (
        wrapperContent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontRegular,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: componentSizes.inputHeight,
    paddingHorizontal: componentSizes.controlHorizontalPadding,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: typography.fontRegular,
    paddingVertical: spacing.sm,
  },
  readOnlyText: {
    textAlignVertical: "center",
  },
  leftIcon: {
    height: componentSizes.iconMd,
    marginRight: spacing.sm,
    tintColor: colors.textMuted,
    width: componentSizes.iconMd,
  },
  placeholder: {
    color: colors.textMuted,
  },
  iconButton: {
    paddingLeft: spacing.sm,
  },
  icon: {
    height: componentSizes.iconMd,
    tintColor: colors.textMuted,
    width: componentSizes.iconMd,
  },
});

export default React.memo(AppInput);
