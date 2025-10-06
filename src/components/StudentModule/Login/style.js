import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6';
import * as constant from '../../../Utils/Constant';

export default styles = StyleSheet.create({
  container: {
    // backgroundColor: baseColor,
    // alignItems: 'center',
  },

  loginImage: {
    height: deviceHeight * 0.3,
    width: deviceWidth * 0.6,
    marginTop: 40,
    alignSelf: 'center', // backgroundColor: baseColor
  },

  HomeScreenView: {
    // backgroundColor: baseColor,
    //  height: deviceHeight, width: deviceWidth, display: 'flex'
  },

  loginForm: {
    // display: 'flex',
    // backgroundColor: 'white',
    // width: deviceWidth*0.75,
    // borderRadius: 20,
    // marginTop: 50,
    // marginBottom: 30,
    marginHorizontal: '5%',
    marginTop:"10%"
  },

  loginText: {
    color: constant.baseTextColor,
    fontSize: constant.font22,
    fontFamily: constant.typeMedium,
    marginTop: '5%',
    // textAlign: 'center',
    // marginTop: 18,
    // marginBottom: 18
  },

  TextInputStyleClass: {
    // height: 40,
    // marginLeft: 20,
    // marginRight: 20,
    // marginTop: 10,
    // marginBottom: 10,
    // padding: 12,
    // fontSize: 16,
    // borderRadius: 10,
    // backgroundColor: '#c1c0e0',
    // color: '#635d83',
    // width: '85%',
    // borderWidth:1,
    borderRadius: 10,
    paddingHorizontal: '4%',
    // flex:1,
    backgroundColor: constant.whiteColor,
    height: '100%',
    fontSize: constant.font17,
    fontFamily: constant.typeRegular,
    flex: 1,
    alignSelf: 'center',
    color: constant.blackColor,
  },

  datePickerStyle: {
    // height: 40,
    // marginLeft: 20,
    // marginRight: 20,
    // marginTop: 10,
    // marginBottom: 10,
    // padding: 12,
    // fontSize: 16,
    // borderRadius: 10,
    // backgroundColor: '#c1c0e0',
    // color: '#635d83',
    // width: '85%',
    // borderWidth:1,
    // borderRadius:10,
    // paddingHorizontal:'4%',
    // // flex:1,
    // backgroundColor:constant.whiteColor,
    // height:'100%',
    flex: 1,
    alignSelf: 'center',
  },

  inputView: {
    // borderWidth:1,
    borderRadius: 10,
    backgroundColor: constant.whiteColor,
    flexDirection: 'row',
    paddingRight: '3%',
    // justifyContent:'center',
    alignItems: 'center',
    marginTop: '2%',

    height: constant.resW(15),
  },
  eyeIcon: {
    height: constant.resW(6),
    width: constant.resW(6),
  },
  button: {
    // alignItems: 'center',
    // padding: 20,
    // paddingStart: 10,
    // paddingEnd: 10,
    borderWidth: 1,
    borderColor: constant.baseTextColor,
    // alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: constant.resW(20),
    marginHorizontal: '15%',
    marginVertical: '5%',
  },

  buttonText: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#f15270',
    padding: 8,
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
    borderRadius: 8,
  },

  staffLoginText: {
    color: '#545454',
    fontSize: constant.font17,
    textAlign: 'center',
    fontFamily: constant.typeRegular,
    marginTop: '4%',
    marginBottom: '2%',
  },

  staffLoginButton: {
    fontSize: constant.font20,
    color: constant.baseTextColor,
    fontFamily: constant.typeMedium,
    paddingVertical: '5%',
    paddingHorizontal: '15%',
    // backgroundColor: baseColor,
    // padding: 8,
    // paddingLeft: 40,
    // paddingRight: 40,
    // textAlign: 'center',
    // borderRadius: 8
  },
});
