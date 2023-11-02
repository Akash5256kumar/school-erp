import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    container: {
        backgroundColor: baseColor,
        alignItems: 'center',
    },

    loginImage: {
        height: deviceHeight*0.3,
        width: deviceWidth*0.6,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: baseColor
    },

    HomeScreenView: {
        backgroundColor: baseColor, height: deviceHeight, width: deviceWidth, display: 'flex'
    },

    loginForm: {
        display: 'flex',
        backgroundColor: 'white',
        width: deviceWidth*0.75,
        borderRadius: 20,
        marginTop: 50,
        marginBottom: 30
    },

    loginText: {
        color: '#635d83',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 18
    },

    TextInputStyleClass: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        padding: 12,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: '#c1c0e0',
        color: '#635d83',
        width: '85%',
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonText: {
        fontSize: 16,
        color: 'white',
        backgroundColor: '#f15270',
        padding: 8,
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        borderRadius: 8
    },

    staffLoginText: {
        color: '#5b4c84',
        fontSize: 14,
        textAlign: 'center'
    },

    staffLoginButton: {
        fontSize: 15,
        color: 'white',
        backgroundColor: baseColor,
        padding: 8,
        paddingLeft: 40,
        paddingRight: 40,
        textAlign: 'center',
        borderRadius: 8
    }

})