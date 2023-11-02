import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },

    ProfileImageBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    ProfileImage: {
        width: 100,
        height: 100,
        marginTop: 20,
        alignSelf: 'center'
    },

    ProfileText: {
        color: baseColor,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        marginEnd: 10
    },

    HeaderArrowImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },


    GeneralText: {
        color: baseColor,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginStart: 10
    },

    BoldTextRight: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        width: deviceWidth * 0.4,
        marginStart: 10
    },

    BoldTextLeft: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        width: deviceWidth * 0.4
    },

    NormalText: {
        color: baseColor,
        fontSize: 18,
        fontWeight: 'bold',
        width: deviceWidth * 0.4,
        marginStart: 5
    },

    EmailText: {
        color: baseColor,
        fontSize: 18,
        fontWeight: 'bold',
        // width: deviceWidth * 0.4,
        marginStart: 5
    },

    NormalTextViewLeft: {
        color: baseColor,
        fontSize: 18,
        fontWeight: 'bold',
        width: deviceWidth * 0.4,
        marginStart: 5,
        paddingTop: 12,
        paddingBottom: 12
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
    },

    NewRowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    CardviewMargin: { marginStart: 25, marginEnd: 10 },

    HorizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: deviceWidth * 0.4,
        marginEnd: 10
    },

    HoziontalLineFull: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: deviceWidth * 0.83,
        marginEnd: 10
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: baseColor,
        padding: 10,
        textAlign: 'center',
        borderRadius: 20,
        width: deviceWidth * 0.8,
        fontWeight: 'bold',
        marginTop: 10
    },

})