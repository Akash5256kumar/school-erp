import React from 'react';
import { StyleSheet } from 'react-native';
import { blackColor, font10, font14, font15, font16, font17, font18, font19, font20, font22, resW, typeBold, typeMedium, typeSemiBold } from '../../../Utils/Constant';
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        backgroundColor: 'white',
         width: '100%',
         marginTop: resW(5),
    },
    buttonMainView:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:resW(4),
    marginBottom:resW(3),
    backgroundColor:'#EEF3FF',
    borderRadius: resW(4),
    padding: resW(1),
    },
    buttonStyle:{
    flex:1,
    paddingVertical:resW(2.3),
    alignItems:'center',
    justifyContent:'center',
    borderRadius: resW(3),
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E3A8A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    },
    buttonStyle2:{
        flex:1,
        paddingVertical:resW(2.3),
        alignItems:'center',
        justifyContent:'center',
        borderRadius: resW(3),
        },
    buttonTextStyle:{
        color: '#111827',
        fontSize:font15,
        fontFamily:typeSemiBold
    },
    buttonTextStyle2:{
        color:'#7A8699',
        fontSize:font15,
        fontFamily:typeSemiBold
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

    calendarCard: {
        backgroundColor: '#F8FAFF',
        borderColor: '#E2E8F4',
        borderWidth: 1,
        borderRadius: resW(3),
        marginHorizontal: resW(4),
        overflow: 'hidden',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
    },

    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: resW(4),
        marginTop: resW(3),
    },

    summaryCard: {
        backgroundColor: '#F8FAFF',
        borderColor: '#E2E8F4',
        borderRadius: resW(3),
        borderWidth: 1,
        marginBottom: resW(2.5),
        minHeight: resW(24),
        paddingHorizontal: resW(3),
        paddingVertical: resW(3),
        width: '48.5%',
    },

    summaryCardWide: {
        width: '100%',
    },

    summaryLabel: {
        color: '#64748B',
        fontSize: font14,
        fontFamily: typeMedium,
    },

    summaryValuePill: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#1D4ED8',
        borderRadius: resW(10),
        justifyContent: 'center',
        marginTop: resW(2.2),
        minWidth: resW(11),
        paddingHorizontal: resW(3),
        paddingVertical: resW(1.2),
    },

    summaryDangerPill: {
        backgroundColor: '#EF4444',
    },

    summaryAccentPill: {
        backgroundColor: '#A21CAF',
    },

    summaryValueText: {
        color: '#FFFFFF',
        fontSize: font16,
        fontFamily: typeSemiBold,
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

    TotalWorkingDaysContainer: { 
         flexDirection: 'row',
          justifyContent: 'space-between',
          flex:1,
          alignItems:'center'
         },

    rowStyle: { display: 'flex', flexDirection: 'row', marginTop: 12, marginStart: 20 },

    daysText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginStart: 20 },

    eventCardView:{
    paddingHorizontal:resW(3),
    borderRadius:resW(2.2),
    paddingVertical:resW(2.4),
    borderWidth: 1,
    },
    eventCartText:{
        color: '#111827',
        fontSize: font14,
        fontFamily: typeSemiBold,
      
    },
    eventCartDes:{
        color: '#64748B',
        fontSize: font17,
        fontFamily: typeMedium,
       
    },
    noEventText:{
        color: '#64748B',
        fontSize: font14,
        fontFamily: typeMedium,
        alignSelf:'center'
    },
    dateStyle:{
        color: blackColor,
        fontSize: font16,
        fontFamily: typeSemiBold,
    },

    eventsPanel: {
        backgroundColor: '#F8FAFF',
        borderColor: '#E2E8F4',
        borderRadius: resW(3),
        borderWidth: 1,
        marginHorizontal: resW(4),
        marginTop: resW(3),
        paddingHorizontal: resW(3),
        paddingVertical: resW(3),
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
    },

    eventsPanelHeader: {
        alignItems: 'baseline',
        flexDirection: 'row',
        marginBottom: resW(2.5),
    },

    eventsDayText: {
        color: blackColor,
        fontSize: font20,
        fontFamily: typeSemiBold,
        marginRight: resW(2),
    },

    eventsMonthText: {
        color: '#64748B',
        fontSize: font15,
        fontFamily: typeMedium,
    },

    eventCardSuccess: {
        backgroundColor: '#ECFDF5',
        borderColor: '#A7F3D0',
    },

    eventCardHoliday: {
        backgroundColor: '#FDF2F8',
        borderColor: '#FBCFE8',
    },

    eventSeparator: {
        height: resW(2),
    },

    eventFooter: {
        height: resW(1),
    },

    emptyEventsCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: resW(2.2),
        justifyContent: 'center',
        minHeight: resW(16),
        paddingHorizontal: resW(3),
        paddingVertical: resW(3),
    },

})
