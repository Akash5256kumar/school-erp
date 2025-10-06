import React from 'react';
import {Image, Pressable, Text, TextInput, View,StyleSheet,StatusBar} from 'react-native';
import * as constant from '../../Utils/Constant'
import LinearGradient from 'react-native-linear-gradient';

const CommonSearch = (props) => {
  const {
    extStyle,
    searchText,
    placeholder
  } = props;

  return (
    <View 
    // colors={constant.LinearGradientColor} start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
    style={[styles.mainView, extStyle]}>
     <TextInput
     placeholder={placeholder || 'Type Your Topic Subject'}
     selectionColor={'#000000'}
     placeholderTextColor={constant.grayColor}
      style={styles.input}
      onChangeText={(d)=>searchText(d)}
     />
      <Image source={constant.Icons.searchIcon} resizeMode='contain' style={styles.searchIcon} />  
    </View>
  );
};

CommonSearch.defaultProps = {
   searchText : function() { },
   extStyle :{}
}

export default CommonSearch;

const styles = StyleSheet.create({
  mainView:{
  height:constant.resW(14),
  flexDirection:'row',
  alignItems:'center',
  marginHorizontal:'5%',
  borderRadius:constant.resW(12),
  marginBottom:'5%',
  marginTop:'3%',
  backgroundColor:'#CED9FF',
  borderWidth:1.2,
  borderColor:constant.GrayColor
  },
  leftMainView:{
  flex:0.15,
  paddingLeft:'4%',
  height:'100%',
  justifyContent:'center',
  },
  searchIcon:{
  height:constant.resW(8),
  width:constant.resW(8),
  },

  input:{
    fontSize: constant.font15,
    color: constant.blackColor,
    fontFamily:constant.typeMedium,
    flex:0.92,
    paddingHorizontal:'5%'
  },

})