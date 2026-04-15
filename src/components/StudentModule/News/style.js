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

    listContent: {
        paddingBottom: constant.resW(8),
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
        alignItems:'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: constant.resW(22),
        paddingHorizontal: constant.resW(5),
        paddingVertical: constant.resW(5),
    },

    CardView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1 , height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 9,
        elevation: 1,
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

    summaryText: {
        color: constant.baseTextColor,
        fontFamily: constant.typeRegular,
        fontSize: constant.font13,
        marginTop: constant.resW(1.5),
    },

    LinkText: {
        fontSize: 16, color: 'blue'
    },

    DocImageAndTextStyle: {
        alignItems:'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },

    GreenStatusBackground: {
        alignItems:'center',
        justifyContent:'center',
        marginStart: constant.resW(3),
        paddingHorizontal:'1%',
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

    newsListIcon: {
        height: constant.resW(9),
        marginEnd: constant.resW(4),
        width: constant.resW(9),
    },

    emptyText: {
        color: constant.baseTextColor,
        fontFamily: constant.typeMedium,
        fontSize: constant.font15,
        marginTop: constant.resW(18),
        textAlign: 'center',
    },

})
