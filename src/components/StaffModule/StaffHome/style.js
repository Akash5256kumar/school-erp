import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { resW, resH } from '../../../Utils/Constant';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

// export default styles = StyleSheet.create({

//     MainContainer:{
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'white',
//     },

//     HeaderText:{
//         color: 'white',
//         fontSize: 20,
//         textTransform: 'uppercase',
//         fontWeight: 'bold',
//         marginStart: 20
//     },

//     HeaderView:{
//         display: 'flex',
//          flexDirection: 'row',
//           justifyContent: 'space-between',
//            marginTop: Platform.OS === 'ios' ? resW(18) : 0
//     },

//     HeaderImage:{
//         height: 25,
//         width: 30,
//          marginEnd: 8
//     },

//     HeaderImageStyle:{
//         display: 'flex', flexDirection: 'column', marginTop: 40, marginStart: 10
//     },


//     HomeScreenView: {
//         flex: 3,
//         display: 'flex', 
//         flexDirection: 'row', 
//         justifyContent: 'space-around',
//     },

//     ContainerImage:{
//         height: resW(85), 
//         width: '100%',
//     },

//     ProfileImageBackground: {
//         display: 'flex', 
//         flexDirection:'row'
//     },

//     ProfileImage: {
//         width:80,
//         height:80,
//         marginTop: 20,
//         marginStart: 10
//     },

//     TextName: {
//         color: 'white',
//         fontSize: 24,
//         fontWeight: 'bold'
//     },

//     TextAddress: {
//         color: 'white',
//         fontSize: 16,
//         marginTop: 5
//     },

//     ProfileCircleShapeView: {
//         flex: 1,
//         flexDirection: 'column',
//         width: deviceWidth*0.42,
//         height: 130,
//         borderRadius: 25,
//         backgroundColor: '#ffb901',
//         // marginTop: 5,
//         // marginStart: 5,
//         // marginEnd: 5,
//         marginTop: 10,
//         marginBottom: 10
//     },

//     ApplyLeavesCircleShapeView: {
//         flex: 1,
//         flexDirection: 'column',
//         width: deviceWidth*0.42,
//         height: 130,
//         borderRadius: 25,
//         backgroundColor: '#ff8a00',
//         // marginTop: 5,
//         // marginStart: 5,
//         // marginEnd: 5,
//         marginTop: 10,
//         marginBottom: 10
//     }, 

//     IssueCircleShapeView: {
//         flex: 1,
//         flexDirection: 'column',
//         width: deviceWidth*0.42,
//         height: 130,
//         borderRadius: 25,
//         backgroundColor: '#48affe',
//         // marginTop: 5,
//         // marginStart: 5,
//         // marginEnd: 5,
//         marginTop: 10,
//         marginBottom: 10
//     },

//     AddItemCircleShapeView: {
//         flex: 1,
//         flexDirection: 'column',
//         width: deviceWidth*0.42,
//         height: 130,
//         borderRadius: 25,
//         backgroundColor: '#c4cce3',
//         // marginTop: 5,
//         // marginStart: 5,
//         // marginEnd: 5,
//         marginTop: 10,
//         marginBottom: 10
//     },

//     SupportCircleShapeView: {
//         flex: 1,
//         flexDirection: 'column',
//         width: deviceWidth*0.42,
//         height: 130,
//         borderRadius: 25,
//         backgroundColor: '#036cd7',
//         // marginTop: 5,
//         // marginStart: 5,
//         // marginEnd: 5,
//         marginTop: 10,
//         marginBottom: 10
//     },


//     AttendenceCircleShapeView: {
//         flex: 1,
//         flexDirection: 'column',
//         width: deviceWidth*0.42,
//         height: 130,
//         borderRadius: 25,
//         backgroundColor: '#f75316',
//         // marginTop: 5,
//         // marginStart: 5,
//         // marginEnd: 5,
//         marginTop: 10,
//         marginBottom: 10
//     },


//     GridImage: {
//         height: 90,
//         width: 90,
//         marginTop: 8, 
//         alignSelf: 'center',
//         justifyContent: 'center'
//     },

//     GridText: {
//         fontSize: 18,
//         color: 'white',
//         alignSelf: 'center',
//         fontWeight: 'bold',
//         marginTop: 5
//     },
// })
import * as constant from '../../../Utils/Constant'
export default styles = StyleSheet.create({
  homeTextLabel: {
    color: constant.blackColor,
    fontSize: constant.font19
  },
  scrollContainer:{
    paddingBottom: resH(20), 
    backgroundColor: constant.whiteColor 
  },
  homeNewsTextView: {
    marginHorizontal: resW(4),
    marginTop: constant.resH(1)

  },
  holidayEventContainer:{ 
      height: resH(5), 
      backgroundColor: constant.lightGrey, 
      marginHorizontal: constant.resW(4), 
      marginTop: resH(1), 
      alignItems: "center", 
      justifyContent: "center"
     },
     holidayeventText:{
      color: constant.blackColor, 
      fontSize: constant.font15
     },
  // NewsContainer:{
  //     borderWidth:1,
  //     marginTop:constant.resH(1),
  //     borderColor:"#FA1B1B",
  //     width:resW(92),
  //     height:resW(35)
  // },
  NewsContainer: {
    borderWidth: 1,
    marginTop: constant.resH(1),
    borderColor: "#FA1B1B",
    width: resW(92),
    height: resW(35),
    // borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: resH(5),
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: "center",
    gap:resW(5),
    alignSelf:"center",
    marginHorizontal: resW(7)

  },
  iconItem: {
    width: resW(25),
    height: resW(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: resH(2),
    borderWidth: 0.5,
    borderColor: constant.blackColor,
    borderRadius: 5,
    padding: 5,
    marginBottom: resH(5)
  },
  iconImage: {
    width: resW(14),
    height: resW(14),
    resizeMode: 'contain',
    marginTop: -resH(5),
  },
  iconText: {
    fontSize: constant.font12,
    color: constant.blackColor,
    textAlign: 'center',
    marginTop:resH(1)
  },
})