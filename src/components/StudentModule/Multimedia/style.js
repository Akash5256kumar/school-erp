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

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 65,
        borderBottomRightRadius: 120
    },

    HeaderText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        marginEnd: 10
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderImage: {
        height: 25, width: 30
    },

    HeaderArrowImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 15,
        marginBottom: 15
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
        fontSize: constant.font17,
        color:constant.baseTextColor,
        fontFamily:constant.typeMedium
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
         flexDirection: 'row', 
         justifyContent: 'space-around',
         alignItems:'center'
    },

    CardView: {
        backgroundColor: '#fff',
        // height: 90,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        // marginStart: 5,
        // marginEnd: 15,
        borderRadius: 8,
        marginBottom:'3%',
        marginHorizontal:'5%'
    },

    TextViewStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft:'4%'
        // marginTop: 10,
        // marginStart: 10
    },

    VideoImage: {
        display: 'flex',
        height: 40,
        width: 40,
        marginTop: 8,
        marginStart: 10
    },

    DateText: {
        fontSize: constant.font12,
        color:constant.baseTextColor,
        fontFamily:constant.typeMedium
    },

    DocImageAndTextStyle: {
       
        flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems:'center',
        //  backgroundColor:'red',
         borderRadius:8,
         paddingVertical:'4%',
         paddingHorizontal:'4%'
    },

    GreenStatusBackground: {
        backgroundColor: '#28a745',
        borderRadius: 15,
        height: 35,
        marginTop: 10,
        marginEnd: 10,
        paddingStart: 12,
        paddingEnd: 12
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

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 20,
        height: 100,
        width: '100%',
    },


    backgroundContainer: {
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        backgroundColor:'red'
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        // backgroundColor: 'rgba(0,0,0,0)',
        // width: 50,
        // height: 50,
        // marginTop: 25,
        // marginStart: 20,
        alignItems: 'center'
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column'
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    },

    VideoView: { },

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
    mediaIcon:{
        height:constant.resW(13),
        width:constant.resW(13)
    }

})