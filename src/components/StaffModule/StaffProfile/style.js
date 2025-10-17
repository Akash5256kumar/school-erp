import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { blackColor, Blue, font15, font15_5, font17, font19_5, font21, font22, GrayColor, grayColor, lightGrey, resH, resW, whiteColor } from '../../../Utils/Constant';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    infoButton:{
        width:resW(90),
        height:resH(6.3),
        backgroundColor:whiteColor,
        marginHorizontal:resW(5),
        alignItems:"center",
        // justifyContent:"center",
        borderRadius:resW(2),
        marginTop:resH(1),
        flexDirection:"row",
        paddingHorizontal:resW(2),
        borderWidth:1,
        borderColor:"#F4F4F4"
    },
    imageContainer:{
        width:resW(9),
        height:resW(9),
        // backgroundColor:Blue,
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center"
    },
    icon:{
        width:resW(5),
        height:resW(5),
        resizeMode:"contain",
        tintColor:blackColor
    },
   icon1: {
  width: resW(5),
  height: resW(5),
  tintColor: grayColor,
  position: 'absolute',
  right: resW(2),
  resizeMode: 'contain',
},

    infoText:{
// textAlign:"center",
fontSize:font15,
color:blackColor,
fontWeight:"bold",
marginLeft:resW(2)
    },
   NormalText1:{
textAlign:"center",
fontSize:font15,
color:blackColor,


// marginTop:resH(1)
    },
    

    ProfileImageBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical:resH(5)
    },

    ProfileImage: {
        width: resW(30),
        height: resW(30),
        marginTop: resH(2),
        alignSelf: 'center'
    },

    ProfileText: {
        color: whiteColor,
        fontSize: font22,
        fontWeight: 'bold',
        marginTop: 15,
        marginEnd: 10
    },

    HeaderArrowImage: {
        height: resW(7), width: resW(7),
        marginTop:resH(2),
        marginHorizontal:resW(4),
        tintColor:whiteColor
    },


    GeneralText: {
        color: baseColor,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginStart: 10
    },

    BoldTextRight: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        width: deviceWidth * 0.4,
        marginStart: 10
    },

    BoldTextLeft: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        width: deviceWidth * 0.4
    },

    NormalText: {
        color: baseColor,
        fontSize: 18,
        fontWeight: 'bold',
        width: deviceWidth * 0.4,
        marginStart: 5
    },

    EmailText: {
        color: baseColor,
        fontSize: 18,
        fontWeight: 'bold',
        // width: deviceWidth * 0.4,
        marginStart: 5
    },

    NormalTextViewLeft: {
        color: baseColor,
        fontSize: 18,
        fontWeight: 'bold',
        width: deviceWidth * 0.4,
        marginStart: 5,
        paddingTop: 12,
        paddingBottom: 12
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
    },

    NewRowStyle: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        backgroundColor:Blue,
        paddingBottom:resW(4.5),
       
        marginTop:Platform.OS === 'ios' ? resW(10) : 0
    },


    CardviewMargin: { marginStart: 25, marginEnd: 10 },

    HorizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: deviceWidth * 0.4,
        marginEnd: 10
    },

    HoziontalLineFull: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: deviceWidth * 0.83,
        marginEnd: 10
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: baseColor,
        padding: 10,
        textAlign: 'center',
        borderRadius: 20,
        width: deviceWidth * 0.8,
        fontWeight: 'bold',
        marginTop: 10
    },



    // Logout Modal Styles
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalBox: {
  width: '80%',
  backgroundColor: whiteColor,
  borderRadius: resW(3),
  paddingVertical: resH(3),
  paddingHorizontal: resW(5),
  elevation: 5,
},
modalTitle: {
  fontSize: font17,
  fontWeight: 'bold',
  color: blackColor,
  textAlign: 'center',
},
modalMessage: {
  fontSize: font17,
  color: grayColor,
  textAlign: 'center',
  marginTop: resH(1.5),
},
modalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: resH(3),
},
modalButton: {
  flex: 1,
  marginHorizontal: resW(1),
  borderRadius: resW(2),
  paddingVertical: resH(1.2),
  alignItems: 'center',
},
modalButtonText: {
  fontSize: font15_5,
  fontWeight: 'bold',
},


})