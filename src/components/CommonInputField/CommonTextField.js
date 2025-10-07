import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import {
  blackColor,
  font14,
  resH,
  resW,
} from '../../Utils/Constant';

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
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <Image
            source={leftIcon}
            style={[styles.icon, iconStyle]}
            resizeMode="contain"
          />
        )}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          multiline={multiline}
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor="grey"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: resH(1),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.1,
    borderColor: blackColor,
    borderRadius: 2,
    backgroundColor: '#fff',
    paddingHorizontal: resW(2),
  },
  icon: {
    width: resW(5.5),
    height: resW(5.5),
    marginRight: resW(2),
    tintColor: 'grey', // optional: tint for consistency
  },
  input: {
    flex: 1,
    fontSize: font14,
    color: blackColor,
  },
});

export default CustomInputField;
