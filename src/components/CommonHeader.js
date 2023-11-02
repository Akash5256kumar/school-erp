import React from 'react';
import {Image, Pressable, Text, TextInput, View,StyleSheet,StatusBar} from 'react-native';
import * as constant from '../Utils/Constant'

const CommonHeader = (props) => {
  const {
    title,
    extStyle,
    onLeftClick,
  } = props;

  return (
    <View style={[styles.mainView, extStyle]}>
    {/* <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/> */}
      <Pressable style={styles.leftMainView} onPress={()=>onLeftClick()}>
      <Image source={constant.Icons.backArrowIcon} resizeMode='contain' style={styles.backIcon} />
      </Pressable>
      <View style={styles.midMainView}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <View style={styles.rightMainView}>
      </View>
    </View>
  );
};

CommonHeader.defaultProps = {
   onLeftClick : function() { },
   title:'',
   extStyle :{}
}

export default CommonHeader;

const styles = StyleSheet.create({
  mainView:{
  height:constant.resW(15),
  flexDirection:'row',
  alignItems:'center',
//   marginTop:StatusBar.currentHeight,
  },
  leftMainView:{
  flex:0.15,
  paddingLeft:'4%',
  height:'100%',
  justifyContent:'center',
  },
  backIcon:{
  height:constant.resW(8),
  width:constant.resW(8),
  marginTop:'5%'
  },
  midMainView:{
    flex:1,
    height:'100%',
    justifyContent:'center',
  },
  rightMainView:{
    flex:0.2,
    height:'100%',
    justifyContent:'center'
  },
  titleStyle:{
    fontSize: constant.font22,
    color: constant.baseTextColor,
    fontFamily:constant.typeSemiBold,
  }

})