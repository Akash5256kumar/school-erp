import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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

    DetailText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 12,
        marginStart: 10,
        marginBottom: 10
    },

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 12,
        marginBottom: 8
    },

    FlatlistText: {
        width: deviceWidth*0.19,
        fontSize: 16,
        color: '#234E70',
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    TextColor: {
        width: deviceWidth*0.19,
        fontSize: 16,
        color: 'black',
        marginTop: 5,
        fontWeight: 'bold'
    },


    CardView: {
        backgroundColor: '#fff',
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 10
    },

    ViewMoreImage: {
        height: 60,
        width: 60,
        marginTop: 5,
        marginEnd: 5
    },

    TopRowStyle: { display: 'flex', flexDirection: 'row', marginStart: 10, marginEnd: 10 },

    RowStyle: { display: 'flex', flexDirection: 'row', marginStart: 10, marginEnd: 10 , backgroundColor: '#DFDEDC'},

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
        fontSize: 16,
        color: 'black',
        marginTop: 8,
        marginStart: 5,
        marginEnd: 10,
        width: deviceWidth * 0.48,
        textAlign: 'center'
    },

    TextLeft: {
        fontSize: 18,
        color: 'black',
        marginTop: 8,
        marginStart: 15,
        fontWeight: 'bold',
        width: deviceWidth * 0.48
    },

})