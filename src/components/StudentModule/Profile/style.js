import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'white'
    },

    ContainerImage: {
        height: 250,
        width: deviceWidth
    },

    ProfileImageBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    ProfileImage: {
        width: 100,
        height: 100,
        // marginTop: 5,
        alignSelf: 'center'
    },

    HeaderArrowImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },

    TextName: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    TextAddress: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },

    DetailContainerBackround: {
        display: 'flex',
        width: '100%',
        height: 250,
        marginTop: 5,
        marginEnd: 20
    },

    GeneralText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },

    IconStyle: {
        height: 25,
        width: 25,
        marginTop: 15,
        marginEnd: 5
    },

    BoldText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15
    },

    NormalText: {
        color: 'white',
        fontSize: 14
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    RowInnerStyle: {
        display: 'flex', flexDirection: 'row'
    },

    NewRowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    CardStyle: {
        display: 'flex', marginStart: 10, marginEnd: 10
    },

    ImageBorderStyle: { borderRadius: 30 },

    ImageStyle: { display: 'flex', flexDirection: 'row' },

    CardviewMargin: { marginStart: 12, marginEnd: 12 }


})