import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { resW } from '../../../Utils/Constant';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        paddingTop:Platform.OS === 'ios' ? resW(8) : 0,
        paddingBottom:resW(4)
        // height: 65,
    },

    HeaderImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },


    HeaderContainer: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15
    },

    TextStyle: {
        fontSize: 22, color: baseColor , marginStart: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 8
    },

    BottomRowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },

    CardViewStyle: {
        flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 12,
        marginBottom: 8
    },

    TextRight: {
        fontSize: 18,
        color: 'black',
        marginEnd: 8,
        marginTop: 10,
        marginBottom: 10,
        width: deviceWidth * 0.4,
        textAlign: 'center'
    },

    TextLeft: {
        fontSize: 20,
        color: 'black',
        marginStart: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        width: deviceWidth * 0.4
    },

    fileRightText: {
        fontSize: 18,
        color: 'blue',
        marginEnd: 8,
        marginTop: 10,
        marginBottom: 10,
        width: deviceWidth * 0.4,
        textAlign: 'center'
    },
})
