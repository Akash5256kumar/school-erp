import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#FFFFFF'
    },

    TextRight: {
        width: deviceWidth*0.4,
        fontSize: 18,
        color: '#1978a5',
        marginEnd: 20,
        marginTop: 15
    },

    TextLeft: {
        width: deviceWidth*0.4,
        fontSize: 18,
        color: 'black',
        marginStart: 20,
        marginTop: 15
    },

    QueryDetailText:{ 
        fontSize: 20,
        color: baseColor,
        fontWeight: 'bold',
        marginStart: 20,
        marginTop: 10,
        marginBottom: 10
    },

    CardView: {
        backgroundColor: '#fff',
        // height: 210,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
        paddingBottom:'3%',
        borderRadius:5
    },

    RowStyle: {
        display: 'flex', flexDirection: 'row', 
        justifyContent: 'space-around'
    },

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 15,
        marginBottom: 15
    },

    RowCardView: {
        backgroundColor: '#fff',
        // height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 10,
        paddingBottom:'3%'
    },

    DetailTextRight: {
        width: deviceWidth*0.4,
        fontSize: 16,
        color: '#1978a5',
        // marginEnd: 20,
        marginTop: 12
    },

    DetailTextLeft: {
        width: deviceWidth*0.4,
        fontSize: 18,
        color: 'black',
        marginStart: 20,
        marginTop: 12
    }

})