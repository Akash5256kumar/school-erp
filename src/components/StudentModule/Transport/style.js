import React from 'react';
import { StyleSheet } from 'react-native';
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 70,
        borderBottomRightRadius: 120,
    },

    HeaderArrowImage: {
        height: 40, width: 40, marginTop: 15, marginStart: 5
    },

    MainContainerStyle: {
        backgroundColor: 'white', height: '100%', width: '100%'
    },

    HeaderStyle: { display: 'flex', flexDirection: 'row' },

    BusTextStyle: { display: 'flex', flexDirection: 'column' },

    HeaderText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 15,
        marginStart: 100
    },

    BusText: {
        color: baseColor,
        fontSize: 24,
        marginTop: 18,
        fontWeight: 'bold',
        marginStart: 30
    },

    BusImageStyle: {
        height: 80,
        width: 120,
        position: 'absolute',
        right: 0,
        bottom: -20
    },

    BusNoText: {
        color: 'black',
        marginStart: 30,
        fontSize: 18
    },

    HorizontalLine: {
        borderBottomColor: baseColor,
        borderBottomWidth: 1,
        marginRight: 30,
        marginLeft: 30,
        marginTop: 5
    },

    DetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: baseColor,
        justifyContent: 'center',
        borderRadius: 10,
        height: 35
    },

    ContainerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5
    },

    ContainerImage: {
        height: 30,
        width: 35
    },

    LeftSideText: {
        color: baseColor,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },

    ArrowImage: {
        width: 15,
        height: 14,
        marginTop: 15,
        marginStart: 6
    },

    RightSideText: {
        flex: 1,
        color: 'black',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        textTransform: 'uppercase'
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    LastRowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    detailsView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 60,
        marginRight: 60
    },

    InnerRowStyle: {
        display: 'flex', flexDirection: 'row'
    },

    TextTime: { color: 'black', fontSize: 14, textAlign: 'left' },

    TextDropTime: { color: baseColor, fontSize: 16, padding: 10, fontWeight: 'bold' }

})