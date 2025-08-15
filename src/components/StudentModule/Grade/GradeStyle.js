import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 65,
        borderBottomRightRadius: 120
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

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 8,
        marginBottom: 8
    },

    TextRight: {
        width: deviceWidth*0.39,
        fontSize: 15,
        color: '#1978a5',
        marginStart: 10
    },

    TextLeft: {
        width: deviceWidth*0.39,
        fontSize: 16,
        color: '#234E70',
        marginTop: 5,
        marginStart: 10,
        fontWeight: 'bold'
    },


    CardView: {
        backgroundColor: '#fff',
        // height: 170,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 3,
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 10,
        marginBottom:'3%',
        paddingBottom:'3%'
    },


    AssignmentImage: {
        display: 'flex',
        height: 20,
        width: 20,
        marginTop: 8,
        marginStart: 10
    },
    

    RowStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    FloatTabStyle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: baseColor,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    FloatIconStyle : {
        height: 25,
        width: 25,
        marginTop: 10,
        marginStart: 10
    },

    ViewMoreImage: {
        height: 25,
        width: 25,
        marginTop: 5,
    },

    bottomRowStyle: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },

    TopRowStyle: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }

})