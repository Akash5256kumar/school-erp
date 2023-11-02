import React from 'react';
import { StyleSheet } from 'react-native';
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#FFFFFF'
    },

    FlatListView: {
        marginHorizontal:'4.5%',
        marginBottom:'2%',
        marginTop:'3%'
        // overflow: 'hidden',
        // paddingBottom: 5,
        // paddingLeft: 5,
        // marginTop: 8,
        // marginBottom: 8
    },

    TextName: {
        fontSize: constant.font15_5,
        color: constant.baseTextColor,
        marginStart: '4%',
        // fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily:constant.typeMedium,
        flex:1
    },


    CardView: {
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent:'center',
        paddingVertical:'6%',
        paddingHorizontal:'3%',
        shadowColor: constant.grayColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2
        },


    ProfileImage: {
        height: constant.resW(9),
        width: constant.resW(9)
    },

    CardViewStyle: { flex:1, flexDirection: 'row',flexWrap:'wrap',paddingHorizontal:'2%' },


})