import React from 'react';
import { StyleSheet } from 'react-native';
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'


export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        padding: 14
    },

    HeaderText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },

    AssignmentImage: {
        height: 20,
        width: 20,
    },
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
        // borderWidth:1,
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

})