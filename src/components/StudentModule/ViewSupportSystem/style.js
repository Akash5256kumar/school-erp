import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'

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

    TabBackground: {
        height: 150,
        marginBottom: 15,
        marginTop: 15
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

    CardView: {
        // backgroundColor: '#fff',
        backgroundColor: '#234E70',
        height: 150,
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


    RowCardStyle:{ display: 'flex', flexDirection: 'row', flex: 3 },

    FirstRowStyle: { 
        //  flexDirection: 'row',
        //   justifyContent: 'space-between'
         },

    CardviewText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        // marginTop: 50
        alignSelf: 'center',
        alignItems: 'center'
    },

    FlatListView: {
        // overflow: 'hidden',
        // paddingBottom: 5,
        // paddingLeft: 5,
        // marginTop: 15,
        // marginBottom: 15
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
        fontSize: 20,
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
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    RowCardView: {
        backgroundColor: '#fff',
        height: 100,
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
        // display: 'flex',
        // flex: 1,
        // flexDirection: 'column',
        // marginTop: 10,
        // marginStart: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 8,
        backgroundColor:constant.whiteColor,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical:'4%',
        paddingHorizontal:'5%',
        marginTop:'2%',
        marginBottom:'2%',
        marginHorizontal:'4%',
        alignItems:'center'
    },

    AssignmentImage: {
        display: 'flex',
        height: 40,
        width: 40,
        marginTop: 8,
        marginStart: 10
    },

    AssignmentDownloadImage: {
        height: 35,
        width: 35,
        marginTop: 15,
        marginEnd: 10
    },

    DateText: {
        fontSize: constant.font16, 
        color: constant.baseTextColor,
        fontFamily:constant.typeMedium,
    },
    DateText2: {
        fontSize: constant.font10, 
        color: '#59597550',
        fontFamily:constant.typeMedium,
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
        paddingStart: 12,
        paddingEnd: 12
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
    },
    mainView:{
        height:constant.resW(15),
        flexDirection:'row',
        alignItems:'center',
      //   marginTop:StatusBar.currentHeight,
        },
        leftMainView:{
        flex:0.15,
        paddingLeft:'4%',
        height:'100%',
        justifyContent:'center',
        },
        backIcon:{
        height:constant.resW(8),
        width:constant.resW(8),
        marginTop:'5%'
        },
        midMainView:{
          flex:1,
          height:'100%',
          justifyContent:'center',
        },
        rightMainView:{
          flex:0.5,
          height:'100%',
          justifyContent:'center',
          paddingRight:'3%',
        //   backgroundColor:'red'
        },
        titleStyle:{
          fontSize: constant.font22,
          color: constant.baseTextColor,
          fontFamily:constant.typeSemiBold,
        },
        LinearmainView:{
            height:constant.resW(8),
            // flexDirection:'row',
            alignItems:'center',
            // marginHorizontal:'5%',
            borderRadius:10,
            // marginBottom:'5%',
            // marginTop:'3%'
            },
            
          button:{
          flex:1,
          borderRadius:constant.resW(12),
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
          },
            buttonTitle:{
              fontSize: constant.font12,
              color: constant.whiteColor,
              fontFamily:constant.typeMedium,
            //   flex:1,
             textAlignVertical:'center'
            },
            filterIcon:{
                height:constant.resW(4),
               width:constant.resW(4), 
                marginLeft:'5%'
            },
            listOutView:{
                position:'absolute',
                top:0,
                right:0,
                left:0,
                bottom:0,
                // backgroundColor:'red',
                
            },
            listMainView:{
            // position:'absolute',
            // top:constant.resW(12),
            // right:10,
            backgroundColor:constant.whiteColor,
            alignSelf:'flex-end',
            marginRight:'3%',
            borderRadius:10,
            marginTop:constant.resW(13),
            shadowColor: '#000',
            shadowOffset: { width: 5 , height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 9,
             elevation: 3,
             paddingTop:'3.5%'
       
            },
            listButton:{
             alignItems:'center',
             paddingBottom:'5%',
             borderBottomColor:constant.grayColor,
             flexDirection:'row',
             width:constant.resW(45),
             paddingLeft:'4%'
             },
            listText:{
                fontSize: constant.font17,
                color: constant.grayColor,
                fontFamily:constant.typeRegular,
            },
            listIcon:{
                height:constant.resW(6),
                width:constant.resW(6),
                marginRight:'8%'    
            }


})