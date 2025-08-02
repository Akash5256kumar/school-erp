import React from 'react';
import { StyleSheet } from 'react-native';
import { blackColor, font10, font15, font17, font18, font19, font20, font22, resW, typeBold, typeMedium, typeSemiBold } from '../../../Utils/Constant';
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        backgroundColor: 'white', height: '100%', width: '100%' 
    },
    buttonMainView:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:resW(4),
    marginTop:resW(3),
    marginBottom:resW(4)
    },
    buttonStyle:{
    backgroundColor:baseColor,
    flex:0.48,
    paddingVertical:resW(3),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:baseColor
    },
    buttonStyle2:{
        // backgroundColor:baseColor,
        flex:0.48,
        paddingVertical:resW(3),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:blackColor
        },
    buttonTextStyle:{
        color: 'white',
        fontSize:font17,
        fontFamily:typeMedium
    },
    buttonTextStyle2:{
        color:blackColor,
        fontSize:font17,
        fontFamily:typeMedium
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
        // marginTop: 20,
        borderRadius: 8,
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

    daysText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginStart: 20 },

    eventCardView:{
    marginHorizontal:resW(5),
    marginTop:resW(4),
    paddingHorizontal:resW(3),
    borderRadius:5,
    paddingVertical:resW(2),
    elevation:1

    },
    eventCartText:{
        color: '#fff',
        fontSize: font20,
        fontFamily: typeBold,
      
    },
    eventCartDes:{
        color: '#f4f4f4',
        fontSize: font17,
        fontFamily: typeMedium,
       
    },
    noEventText:{
        color: '#000',
        fontSize: font15,
        fontFamily: typeSemiBold,
        alignSelf:'center'
    }

})