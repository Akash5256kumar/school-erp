import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,Pressable} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import * as constant from '../../Utils/Constant';
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';

export const TabBg = ({color = '#FFFFFF', ...props}) => {
  return (
    <Svg width={85} height={95} viewBox="0 0 75 86" {...props}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};

export function TabBarAdvancedButton({bgColor, navigation, ...props}) {
  const { colors } = useTheme();
  return (
    // <View style={styles.container} >
      <Pressable {...props} style={[styles.button,{borderColor:'#FFEEE580',marginTop:-constant.resW(7.5)}]}>
      <LinearGradient colors={constant.LinearGradientColor} style={styles.startGradientView}>
        <Image
          source={constant.Icons.drawerHome}
          style={{
            height: constant.resW(6),
            width: constant.resW(6),
            aspectRatio: 80 / 84,
            tintColor: constant.whiteColor,
          }}
        />
      </LinearGradient>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // width: 80,
    alignItems: 'center',
    flex:1,
    justifyContent:'center'
  },
  background: {
    // position: 'absolute',
    top: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: constant.resW(13.5),
    height:constant.resW(13.5) ,
    borderRadius: constant.resW(15),
    borderWidth:1,
    // borderColor:'#fff'
    // backgroundColor: constant.Primary_Color,
    // borderWidth: 0.5,
    // borderRadius: 30,
    // borderColor: '#B3FAF2',
  },
  buttonIcon: {
    fontSize: constant.font18,
    // color: '#F6F7EB',
  },
  startGradientView:{
    justifyContent: 'center',
    alignItems: 'center',
    width: constant.resW(13.5),
    height: constant.resW(13.5),
    borderRadius: constant.resW(30),
  },
});
