// CustomInputField.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { blackColor, font12, font14, font16, resH, resW } from '../../Utils/Constant';

const CustomInputField = ({ label, placeholder, value, onChangeText, keyboardType,inputStyle,multiline}) => {
  return (
    <View style={[styles.container]}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TextInput
        style={[styles.input,inputStyle]}
        placeholder={placeholder}
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
        placeholderTextColor={blackColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: resH(1),
   
  },
  label: {
    fontSize: font12,
    fontWeight: '500',
    marginBottom: resH(0.3),
    color: '#000',
  },
  input: {
    borderWidth: 0.1,
    borderColor: blackColor,
    fontSize:font14,
    borderRadius: 2,
    paddingHorizontal: resW(3),
    // paddingVertical: 10,
    // height:resH(6),
    // fontSize: font12,
    backgroundColor: '#fff',
    // elevation: 2, // shadow for Android
    // shadowColor: '#000', // shadow for iOS
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
  },
});

export default CustomInputField;
