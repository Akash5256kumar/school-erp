import React from 'react';
import { StyleSheet } from 'react-native';
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
        // borderBottomRightRadius: 120
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
        marginTop: 15,
        marginBottom: 15
    },

    TextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        marginStart: 20,
        marginBottom: 10
    },

    DashboardTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },

    

    CircleShapeView: {
        width: 55,
        height: 55,
        borderRadius: 80 / 2,
        backgroundColor: '#d5dcf2',
        marginTop: 10,
        marginStart: 10
    },

    CardViewStyle: {
        flex: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    CardView: {
        backgroundColor: '#fff',
        height: 150,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
        borderRadius: 8
    },

    TextViewStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginStart: 20
    },

    RowStyle: {
        display: 'flex', flexDirection: 'row'
    },

    DateText: {
        fontSize: 15, color: 'grey', fontWeight:'bold', marginTop: 2
    },

    DocImageAndTextStyle: {
        flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },

    GreenStatusBackground: {
        backgroundColor: '#28a745',
        borderRadius: 15,
        height: 35,
        marginTop: 10,
        marginEnd: 10,
        paddingStart: 10,
        paddingEnd: 10
    },

    RedStatusBackground: {
        backgroundColor: '#dc3545',
        borderRadius: 15,
        height: 35,
        marginTop: 10,
        marginEnd: 10,
        paddingStart: 12,
        paddingEnd: 12
    },

    StatusText: {
        marginTop: 8,
        marginEnd: 5,
        color: 'white',
        fontSize: 15,
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
    }

})