import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
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

    HeaderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginEnd: 20
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderImage: {
        height: 25, width: 30
    },

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 8,
        marginBottom: 8
    },

    TextRight: {
        width: deviceWidth * 0.5,
        fontSize: 15,
        color: 'grey',
        marginTop: 5,
        marginEnd: 20
    },

    TextLeft: {
        width: deviceWidth * 0.4,
        fontSize: 15,
        color: 'black',
        marginTop: 5,
        marginStart: 20,
        fontWeight: 'bold'
    },

    CardView: {
        backgroundColor: '#fff',
        height: 120,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
        borderRadius: 5
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    DeleteImageStyle: { width: deviceWidth * 0.05, height: 30, marginEnd: 16 },

    DeviceTypeLeftText: {
        width: deviceWidth * 0.3,
        fontSize: 15,
        color: 'black',
        marginTop: 5,
        marginStart: 20,
        fontWeight: 'bold'
    },

    DeviceTypeRightText: {
        width: deviceWidth * 0.3,
        fontSize: 15,
        color: 'grey',
        marginTop: 5,
        marginEnd: 20

    }
})