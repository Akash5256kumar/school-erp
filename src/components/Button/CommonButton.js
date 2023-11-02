import React from 'react';
import {Image, Pressable, Text, TextInput, View,StyleSheet,StatusBar} from 'react-native';
import * as constant from '../../Utils/Constant'
import LinearGradient from 'react-native-linear-gradient';

const CommonButton = (props) => {
  const {
    title,
    extStyle,
    buttonClick,
  } = props;

  return (
    <LinearGradient colors={constant.LinearGradientColor} start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
    style={[styles.mainView, extStyle]}>
   <Pressable style={styles.button} onPress={()=>buttonClick()}>
    <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable> 
    </LinearGradient>
  );
};

CommonButton.defaultProps = {
   searchText : function() { },
   extStyle :{}
}

export default CommonButton;

const styles = StyleSheet.create({
  mainView:{
  height:constant.resW(13),
  flexDirection:'row',
  alignItems:'center',
  marginHorizontal:'5%',
  borderRadius:constant.resW(12),
  marginBottom:'5%',marginTop:'3%'
  },
  
button:{
flex:1,
borderRadius:constant.resW(12),
alignItems:'center',
justifyContent:'center'
},
  buttonTitle:{
    fontSize: constant.font18,
    color: constant.whiteColor,
    fontFamily:constant.typeSemiBold,
    flex:1,
   textAlignVertical:'center'
  },

})