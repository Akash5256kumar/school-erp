import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { resW } from '../../../Utils/Constant';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        padding: 12
    },

    HeaderImage: {
        height: 25, width: 30, 
        marginStart: 5
    },

    HeaderContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    EventImage: {
        height: deviceHeight*0.3, 
        width: '100%'
    },

    HeaderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },

    TextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },

    TextDate: { fontSize: 18, color: 'white' },

    FlatStyle: {
         marginTop: resW(4),
        marginBottom: 0 ,
        overflow: 'hidden', 
        marginHorizontal:resW(4)
        // paddingBottom: 5,
        //  paddingLeft: 5,
         },

    CircleShapeView: {
        width: resW(15),
        height: resW(15),
        borderRadius: 80 / 2,
        backgroundColor: '#ce8b79',
        alignItems:'center',
        justifyContent:'center'
        // marginTop: 10
    },

    CardviewStyle: { 
        display: 'flex',
         flexDirection: 'row',
          justifyContent: 'space-around',
         },

    CardView: {
        backgroundColor: '#ff926b',
        // height: 100,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        // marginStart: 5,
        // marginEnd: 15,
        borderRadius: 10,
        // display: 'flex',
         flexDirection: 'row', 
         justifyContent: 'space-between',
         alignItems:'center',
         paddingHorizontal:resW(3),
         paddingVertical:resW(3)
    },

    TextViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        // marginTop: 10,
        marginStart: 10
    },

    AssignmentImage: {
        height: resW(10),
        width: resW(10),
        // marginTop: 8,
        // marginStart: 8
    },

    AssignmentDownloadImage: {
        height: resW(10),
        width: resW(10),
        // marginTop: 15
    }
})