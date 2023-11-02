import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 65,
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

    HeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 12
    },

    DropDownBackground: {
        height: 45,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        // marginBottom: 10,
        fontSize: 16,
        borderRadius: 10,
        // color: '#c1c0e0',
        color: baseColor,
        borderWidth: 1,
        borderColor: baseColor,
        // backgroundColor: '#c1c0e0',
        width: deviceWidth * 0.5
    },

    TextInputStyleClass: {
        height: 45,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        // marginBottom: 10,
        padding: 12,
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: baseColor,
        // backgroundColor: '#c1c0e0',
        // color: '#635d83',
        color: baseColor,
        width: deviceWidth * 0.5
        // width: '85%',
    },

    TextStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginStart: 20,
        marginEnd: 10,
        marginTop: 20,
        width: deviceWidth * 0.35
    },

    HeadingText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        marginStart: 20,
        marginTop: 15,
        marginBottom: 10
    },

    RowStyle: { display: 'flex', flexDirection: 'row'},

    HoziontalLineFull: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 15
    },

    FlatStyle: {
        marginTop: 10, marginBottom: 10,
        overflow: 'hidden', paddingBottom: 5, paddingLeft: 5
    },

    CardviewStyle: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-around' 
    },

    FlatListTextStyle: {
        color: baseColor,
        fontSize: 20,
        fontWeight: 'bold',
        width: deviceWidth * 0.5
        // marginStart: 20,
        // marginTop: 10,
        // marginBottom: 10
    },

    FlatlistImageStyle: {
        height: 30,
        width: 30
    }
    
})