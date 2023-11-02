import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

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

    RowStyle:{
        display: 'flex',
        flexDirection: 'row',
    },

    MainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },

    ContainerStyle:{
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },

    TextInputStyle: {
        fontSize: 18,
        color: 'black',
        width: deviceWidth*0.8
    },

    HoziontalLineFull: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    },

    ImageStyle:{
        width: 30,
        height: 30,
        marginTop: 10
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
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        borderRadius: 8
    },

    TabCardView: {
        height: deviceHeight * 0.4,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 20,
        marginEnd: 20,
        borderRadius: 20,
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'column'
    },

    CardviewText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10
    },


    IconStyle:{
        alignSelf: 'center',
    },

    ButtonContainerStyle: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
    }
})