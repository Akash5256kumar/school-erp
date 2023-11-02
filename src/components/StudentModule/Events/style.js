import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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

    FlatStyle: { marginTop: 10, marginBottom: 10 ,
        overflow: 'hidden', paddingBottom: 5, paddingLeft: 5 },

    CircleShapeView: {
        width: 55,
        height: 55,
        borderRadius: 80 / 2,
        backgroundColor: '#ce8b79',
        marginTop: 10
    },

    CardviewStyle: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' },

    CardView: {
        backgroundColor: '#ff926b',
        height: 100,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
        borderRadius: 10,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    TextViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        marginStart: 10
    },

    AssignmentImage: {
        height: 40,
        width: 40,
        marginTop: 8,
        marginStart: 8
    },

    AssignmentDownloadImage: {
        height: 35,
        width: 35,
        marginTop: 15
    }
})