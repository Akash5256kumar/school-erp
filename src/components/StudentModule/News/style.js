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
        // overflow: 'hidden',
        // paddingBottom: 5,
        // paddingLeft: 5,
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal:'5%'
    },

    TextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        marginStart: 20,
        marginBottom: 10
    },

    DashboardTextStyle: {
        fontSize: constant.font18,
        color: constant.baseTextColor,
        fontFamily:constant.typeMedium,
    },

    CircleShapeView: {
        width: 55,
        height: 55,
        borderRadius: 80 / 2,
        backgroundColor: '#d5dcf2',
        marginTop: 10,
        marginStart: 10
    },

    CardViewStyle: {
        flex: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-around',alignItems:'center'
    },

    CardView: {
        backgroundColor: '#fff',
        // height: 140,
        shadowColor: '#000',
        shadowOffset: { width: 1 , height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 9,
        elevation: 1,
        // marginStart: 5,
        // marginEnd: 15,
        borderRadius: 8,
       
    },

    TextViewStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        // marginTop: 10,
        marginStart: constant.resW(3)
    },

    AssignmentImage: {
        display: 'flex',
        height: constant.resW(9),
        width: constant.resW(9),
        // marginTop: 8,
        marginStart: constant.resW(5)
    },

    AssignmentDownloadImage: {
        height: 35,
        width: 35,
        marginTop: 15,
        marginEnd: 10
    },

    DateText: {
        fontSize: 16, color: 'grey'
    },

    LinkText: {
        fontSize: 16, color: 'blue'
    },

    DocImageAndTextStyle: {
        flex: 2, display: 'flex', flexDirection: 'row',
         justifyContent: 'space-between',alignItems:'center',
         paddingVertical:'4.5%'
    },

    GreenStatusBackground: {
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:'4%'
        // backgroundColor: '#28a745',
        // borderRadius: 15,
        // height: 35,
        // marginTop: 10,
        // marginEnd: 10,
        // paddingStart: 12,
        // paddingEnd: 12
    },

    RedStatusBackground: {
        backgroundColor: '#dc3545',
        borderRadius: 15,
        height: 35,
        marginTop: 10,
        marginEnd: 10,
        paddingStart: 12,
        paddingEnd: 12
    },

    StatusText: {
        marginTop: 8,
        marginEnd: 5,
        color: 'white',
        fontSize: 15,
    },

    FloatTabStyle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: baseColor,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    FloatIconStyle : {
        height: 25,
        width: 25,
        marginTop: 10,
        marginStart: 10
    },
    eyeIcon:{
        height: constant.resW(6),
        width: constant.resW(6),
    },

})