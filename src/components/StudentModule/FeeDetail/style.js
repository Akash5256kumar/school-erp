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
        padding: 12
    },

    HeaderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderImage: {
        height: 25, width: 30
    },


    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 20,
        marginBottom: 10
    },

    TextRight: {
        fontSize: 18,
        color: '#1978a5',
        marginEnd: 20,
        marginTop: 15
    },

    TextLeft: {
        fontSize: 18,
        color: 'black',
        marginStart: 20,
        marginTop: 15
    },


    CardViewStyle: {
        flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
    },

    CardView: {
        backgroundColor: '#fff',
        height: 250,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
    },

    SummaryCardView: {
        backgroundColor: '#fff',
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 15,
        marginEnd: 15,
    },

    DetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#cbd7cb',
        height: 45
    },

    HeadingContainer: {
        backgroundColor: '#cbd7cb',
        height: 25
    },

    SummaryText: {
        fontSize: 18,
        color: 'grey',
        marginStart: 20,
        // marginTop: 5
    },

    RowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    }

})