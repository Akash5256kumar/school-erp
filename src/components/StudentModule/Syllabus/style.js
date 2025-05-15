import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
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
        marginTop: '2%',
        marginBottom: '3%',
        justifyContent:'center',
        // alignItems:'center'
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
        // width: 55,
        // height: 55,
        borderRadius: 80 / 2,
        backgroundColor: '#d5dcf2',
        marginTop: 10,
        marginStart: 10
    },

    CardViewStyle: {
        flex: 1,
        //  display: 'flex',
          flexDirection: 'row',
          alignItems:'center',
          paddingHorizontal:'5%'
        //    justifyContent: 'space-around'
    },

    CardView: {
        backgroundColor: '#fff',
        // height: 90,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 8,
        // justifyContent:'center',
        // alignItems:'center',
        paddingVertical:'4%',
        marginHorizontal:'5%'
    },

    TextViewStyle: {
        // display: 'flex',
        flex: 1,
        // flexDirection: 'column',
        // marginTop: 10,
        marginStart: '2%',
        justifyContent:'center'
    },

    AssignmentImage: {
        // display: 'flex',
        height: constant.resW(12),
        width: constant.resW(12),
        // marginTop: 8,
        // marginStart: 10
    },

    AssignmentDownloadImage: {
        height: constant.resW(8),
        width: constant.resW(8),
        // marginTop: 15,
        // marginEnd: 13
    },

    DateText: {
        fontSize: 16,
         color: 'grey'
    },

    DocImageAndTextStyle: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'
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

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 25,
    },

    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    oopsText: {
        fontSize: 20,
        color: baseColor,
        fontWeight: "bold",
        alignSelf: "center",
        alignItems: 'center',
        marginLeft: 5,
        marginBottom: 5
    },

    PdfHeaderBackground: {
        backgroundColor: baseColor,
        paddingTop:Platform.OS === 'ios' ? constant.resW(10) : constant.resW(0) ,
        paddingBottom:constant.resW(5)
        // height: 65,
        // borderBottomRightRadius: 120
    },

    PdfHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginStart: 10
        // marginEnd: 10
    },

    PdfHeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    PdfHeaderArrowImage: {
        height: 32, width: 35, marginTop: 15, 
        marginEnd: 10,
        tintColor:constant.whiteColor
        // marginStart: 5
    },
})