import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { resW } from '../../../Utils/Constant';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    HeaderText:{
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginStart: 20
    },

    HeaderView:{
        display: 'flex',
         flexDirection: 'row',
          justifyContent: 'space-between',
           marginTop: Platform.OS === 'ios' ? resW(18) : 0
    },

    HeaderImage:{
        height: 25,
        width: 30,
         marginEnd: 8
    },

    HeaderImageStyle:{
        display: 'flex', flexDirection: 'column', marginTop: 40, marginStart: 10
    },


    HomeScreenView: {
        flex: 3,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around',
    },

    ContainerImage:{
        height: resW(85), 
        width: '100%',
    },

    ProfileImageBackground: {
        display: 'flex', 
        flexDirection:'row'
    },

    ProfileImage: {
        width:80,
        height:80,
        marginTop: 20,
        marginStart: 10
    },

    TextName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },

    TextAddress: {
        color: 'white',
        fontSize: 16,
        marginTop: 5
    },

    ProfileCircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.42,
        height: 130,
        borderRadius: 25,
        backgroundColor: '#ffb901',
        // marginTop: 5,
        // marginStart: 5,
        // marginEnd: 5,
        marginTop: 10,
        marginBottom: 10
    },

    ApplyLeavesCircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.42,
        height: 130,
        borderRadius: 25,
        backgroundColor: '#ff8a00',
        // marginTop: 5,
        // marginStart: 5,
        // marginEnd: 5,
        marginTop: 10,
        marginBottom: 10
    }, 

    IssueCircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.42,
        height: 130,
        borderRadius: 25,
        backgroundColor: '#48affe',
        // marginTop: 5,
        // marginStart: 5,
        // marginEnd: 5,
        marginTop: 10,
        marginBottom: 10
    },

    AddItemCircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.42,
        height: 130,
        borderRadius: 25,
        backgroundColor: '#c4cce3',
        // marginTop: 5,
        // marginStart: 5,
        // marginEnd: 5,
        marginTop: 10,
        marginBottom: 10
    },

    SupportCircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.42,
        height: 130,
        borderRadius: 25,
        backgroundColor: '#036cd7',
        // marginTop: 5,
        // marginStart: 5,
        // marginEnd: 5,
        marginTop: 10,
        marginBottom: 10
    },


    AttendenceCircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.42,
        height: 130,
        borderRadius: 25,
        backgroundColor: '#f75316',
        // marginTop: 5,
        // marginStart: 5,
        // marginEnd: 5,
        marginTop: 10,
        marginBottom: 10
    },


    GridImage: {
        height: 90,
        width: 90,
        marginTop: 8, 
        alignSelf: 'center',
        justifyContent: 'center'
    },

    GridText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 5
    },
})