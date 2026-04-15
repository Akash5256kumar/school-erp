import React, {memo} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const ComplaintFormField = ({
  editable = true,
  label,
  multiline = false,
  onChangeText,
  placeholder,
  theme,
  value,
}) => {
  const inputHeight = multiline
    ? theme.sizing.textareaHeight
    : theme.sizing.fieldHeight;
  const inputRadius = theme.radii.field;

  return (
    <View style={styles.fieldGroup}>
      <Text style={theme.typography.fieldLabel}>{label}</Text>
      <View
        style={[
          styles.shell,
          {
            backgroundColor: editable
              ? theme.colors.fieldBackground
              : theme.colors.infoPanelBackground,
            borderColor: theme.colors.fieldBorder,
            borderRadius: inputRadius,
            minHeight: inputHeight,
            marginTop: theme.spacing.fieldLabelBottom,
            paddingHorizontal: theme.spacing.fieldInternalHorizontal,
            paddingVertical: multiline ? theme.spacing.textareaPaddingTop : 0,
          },
          multiline ? styles.multilineShell : null,
          theme.shadows.input,
        ]}>
        <TextInput
          editable={editable}
          multiline={multiline}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.fieldPlaceholder}
          selectTextOnFocus={editable}
          showSoftInputOnFocus={editable}
          style={[
            styles.input,
            theme.typography.fieldValue,
            multiline ? styles.multilineInput : null,
          ]}
          textAlignVertical={multiline ? 'top' : 'center'}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    width: '100%',
  },
  input: {
    flex: 1,
    includeFontPadding: false,
    textAlign: 'left',
    width: '100%',
    paddingVertical: 0,
  },
  multilineInput: {
    paddingTop: 0,
    textAlignVertical: 'top',
    width: '100%',
  },
  multilineShell: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  shell: {
    alignItems: 'stretch',
    borderWidth: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

export default memo(ComplaintFormField);
