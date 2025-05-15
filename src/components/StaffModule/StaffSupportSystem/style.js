import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { resW } from '../../../Utils/Constant';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

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

    MainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    
    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 12,
        marginBottom: 8
    },

    CardView: {
        backgroundColor: '#fff',
        height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 10
    },

    TextRight: {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
        marginStart: 5,
        width: deviceWidth * 0.45,
        textAlign: 'left'
    },

    TextLeft: {
        fontSize: 18,
        color: baseColor,
        marginTop: 5,
        marginStart: 15,
        fontWeight: 'bold',
        width: deviceWidth * 0.35
    },

    BottomRowStyle: {
        display: 'flex', flexDirection: 'row', 
        // justifyContent: 'space-between'
    },

    ViewMoreImage: {
        height: 25,
        width: 25,
        marginTop: 5,
        marginEnd: 8
    },

    TabBackground: {
        height: 50,
        marginBottom: 10,
        marginTop: 10
    },

    RowCardStyle:{ display: 'flex', flexDirection: 'row', flex: 3 },

    CardviewText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        alignItems: 'center'
    },


    TabCardView: {
        backgroundColor: '#234E70',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center'
    },
})