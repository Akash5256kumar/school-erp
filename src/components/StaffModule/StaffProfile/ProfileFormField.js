import React, {memo, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';

const ProfileFormField = ({
  autoCapitalize = 'sentences',
  autoCorrect = false,
  containerStyle,
  editable = true,
  eyeIconSize,
  inputTopGap,
  inputShellStyle,
  inputStyle,
  keyboardType = 'default',
  label,
  labelStyle,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  textContentType,
  theme,
  value,
}) => {
  const [isSecureVisible, setIsSecureVisible] = useState(false);
  const shouldMaskValue = secureTextEntry && !isSecureVisible;

  return (
    <View style={containerStyle}>
      <Text style={[styles.label, theme.typography.fieldLabel, labelStyle]}>{label}</Text>

      <View
        style={[
          styles.inputShell,
          {
            backgroundColor: theme.colors.fieldBackground,
            borderColor: theme.colors.fieldBorder,
            borderRadius: theme.radii.formField,
            height: theme.sizing.fieldHeight,
            marginTop: inputTopGap ?? theme.spacing.labelGap,
            paddingHorizontal: theme.spacing.headerHorizontal,
          },
          inputShellStyle,
          theme.shadows.inputField,
        ]}>
        <TextInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          secureTextEntry={shouldMaskValue}
          selectionColor={theme.colors.headerGradientStart}
          style={[
            styles.input,
            theme.typography.fieldValue,
            inputStyle,
            !editable && {
              color: theme.colors.disabledText,
            },
          ]}
          textContentType={textContentType}
          value={value}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            accessibilityLabel={isSecureVisible ? "Hide password" : "Show password"}
            accessibilityRole="button"
            activeOpacity={0.8}
            onPress={() => setIsSecureVisible(current => !current)}
            style={styles.iconButton}>
            {isSecureVisible ? (
              <EyeOff
                color={theme.colors.fieldIcon}
                size={eyeIconSize || theme.sizing.chevronSize * 1.08}
                strokeWidth={2.2}
              />
            ) : (
              <Eye
                color={theme.colors.fieldIcon}
                size={eyeIconSize || theme.sizing.chevronSize * 1.08}
                strokeWidth={2.2}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  inputShell: {
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    textAlign: 'left',
  },
});

export default memo(ProfileFormField);
