import React from 'react';
import { StyleSheet } from 'react-native';
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
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
        flex: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    CardView: {
        backgroundColor: '#fff',
        height: 75,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
        borderRadius: 8
    },

    TextViewStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginStart: 20
    },

    AssignmentImage: {
        display: 'flex',
        height: 40,
        width: 40,
        marginTop: 8,
        marginStart: 10
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

    DocImageAndTextStyle: {
        flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
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
    }

})