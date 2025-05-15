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
        // height: 65,
        paddingTop:Platform.OS === 'ios' ? resW(8) : 0,
        paddingBottom:resW(4)
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

    TextStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 20,
        marginTop: 15,
    },

    NormalTextStyle: {
        color: 'black',
        fontSize: 16,
        marginEnd: 20,
        marginTop: 16,
    },

    RowStyle: { display: 'flex', flexDirection: 'row', width: deviceWidth * 0.4 },

    HoziontalLineFull: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 15
    },

    FlatStyle: {
        marginTop: 20, marginBottom: 10,
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
    },

    FlatlistImageStyle: {
        height: 40,
        width: 40
    },
    submitButton2: {
        backgroundColor: baseColor,
       alignItems:'center',
       justifyContent:'center',
       paddingVertical:resW(3),
       marginHorizontal:resW(4),
       marginBottom:resW(4),
       borderRadius:5
    },

    submitButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    HorizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        width: deviceWidth * 0.9,
        marginTop: 10,
        marginStart: 10,
        marginEnd: 10
    },

})