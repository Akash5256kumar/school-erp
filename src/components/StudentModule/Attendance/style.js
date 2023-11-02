import React from 'react';
import { StyleSheet } from 'react-native';
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        backgroundColor: 'white', height: '100%', width: '100%' 
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

    TotalDaysText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginStart: 20
    },

    TodayDaysView: {
        backgroundColor: '#f5f9fc',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 12,
        marginEnd: 12,
        marginTop: 20,
        borderRadius: 10,
        height: 60,
    },

    CalendarView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 12,
        marginEnd: 12,
        marginTop: 20,
        borderRadius: 8
    },

    WorkingDaysBlueBackground: {
        backgroundColor: '#174ca2',
        borderRadius: 10,
        marginTop: 15,
        // width: 30,
        paddingRight: 5,
        paddingLeft: 5,
        height: 30,
        marginEnd: 10
    },

    WorkingDaysNumberText: {
        color: 'white',
        fontSize: 18,
        marginTop: 2,
        marginStart: 3
    },

    TotalAbsentBackground: {
        backgroundColor: '#02bbed',
        borderRadius: 18,
        paddingStart: 18,
        paddingEnd: 18,
        paddingTop: 5,
        paddingBottom: 5,
        height: 130
    },

    totalPresentBackground: {
        backgroundColor: '#7f98d0',
        borderRadius: 18,
        paddingStart: 18,
        paddingEnd: 18,
        paddingTop: 5,
        paddingBottom: 5,
        height: 130
    },

    PresentAbsentText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    PresentAbsentNumberText: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    AbsentPresentContainer: { marginTop: 30, marginStart: 20, marginEnd: 20 },

    TotalContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },

    AbsentInnerView: { flex: 1, display: 'flex', flexDirection: 'column', marginEnd: 10 , alignItems: 'center'},

    PresentInnerView: { flex: 1, display: 'flex', flexDirection: 'column' ,alignItems: 'center', marginStart: 10},

    TotalWorkingDaysContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },

    rowStyle: { display: 'flex', flexDirection: 'row', marginTop: 12, marginStart: 20 },

    daysText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginStart: 20 }

})