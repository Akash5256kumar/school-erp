import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: '#FFFFFF'
    },

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 8,
        marginBottom: 8
    },

    TextDetails: {
        fontSize: 15,
        color: '#1978a5',
        marginStart: 10,
        marginTop: 5
    },

    TextName: {
        fontSize: 16,
        color: '#234E70',
        marginStart: 10,
        fontWeight: 'bold',
        // textTransform: 'capitalize'
    },

    TextRight: {
        fontSize: 15,
        color: 'black',
        marginTop: 5
    },

    CardView: {
        backgroundColor: '#fff',
        height: 110,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 10
    },


    RowStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: deviceWidth * 0.5
    },

    ProfileImage: {
        height: 80,
        width: deviceWidth * 0.2,
        marginTop: 5,
        marginStart: 10,
    },

    ArrowImage: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },

    ArrowStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: deviceWidth * 0.2
    },

    CardViewStyle: { display: 'flex', flexDirection: 'row', marginTop: 15 },

    DetailStyle: { display: 'flex', flexDirection: 'row' }

})