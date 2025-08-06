import React from 'react';
import { StyleSheet , Dimensions, Platform} from 'react-native';
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
    },
    ProfileImage:{
        height:constant.resW(26),
        width:constant.resW(26),
        borderRadius:constant.resW(80)
    },
    profileButton:{
        alignSelf:'center',
        marginTop:constant.resW(3),
        marginBottom:constant.resW(5)
    },
    editIconView:{
        height:constant.resW(8),
        width:constant.resW(8),
        borderRadius:constant.resW(80),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:constant.whiteColor,
        position:'absolute',
        bottom:0,
        right:0
    },
    editIcon:{
        height:constant.resW(4.5),
        width:constant.resW(4.5),
    },
    cardView:{
     marginHorizontal:constant.resW(4)
    },
    cardTitle2:{
        color: 'black',
        fontSize: constant.font20,
        fontFamily: constant.typeBold,
        marginBottom:constant.resW(3),
        marginTop:constant.resW(3)
    },
    cardTitle:{
        color: 'black',
        fontSize: constant.font15,
        fontFamily: constant.typeMedium,
        marginBottom:constant.resW(1),
        marginTop:constant.resW(3)
    },
    cardInput:{
       borderWidth:1,
       borderColor:'#f4f4f4',
       backgroundColor:constant.whiteColor,
       borderRadius:5,
       color:constant.blackColor,
       paddingHorizontal:constant.resW(3),
       fontFamily:constant.typeMedium,
       fontSize: constant.font15,
      
    },
    CancelButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: baseColor,
        padding: 8,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 10,
        paddingTop: constant.resW(3),
        paddingBottom: constant.resW(3)
    },

    AddImageText: {
        fontSize: 14,
        color: 'black'
    },
    viewWrapper: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        
    },
    modalView: {
        backgroundColor:constant.whiteColor,
        marginHorizontal:constant.resW(4),
        paddingHorizontal:constant.resW(3),
        paddingVertical:constant.resW(3),
        borderRadius:5
        // alignItems: "center",
        // // justifyContent: "center",
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // elevation: 5,
        // transform: [{ translateX: -(width * 0.4) }, 
        //             { translateY: -90 }],
        // height: 150,
        // // width: width * 0.8,
        // backgroundColor: "#fff",
        // borderRadius: 7,
    },
    modalText: {
        fontSize: 22,
        color: 'black',
        marginTop: 8,
        marginBottom: 8,
        alignSelf:'center'
    },
    dropList:{
        height:'100%',
        width:'100%',
        // backgroundColor:'transparent',
        borderWidth:1,
        borderColor:'#f4f4f4',
        backgroundColor:constant.whiteColor,
        borderRadius:5,
      },
      dropListText:{
        fontSize: constant.font16,
        color: 'black',
        marginLeft:constant.resW(0.5)
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
      certifButton:{
       borderWidth:1,
       borderColor:constant.blackColor,
       alignSelf:'flex-start',
       marginTop:constant.resW(3),
       borderRadius:5,
       height:constant.resW(40),
       width:constant.resW(40),
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:constant.whiteColor,
      },
      certifyStyle:{
        height:constant.resW(40),
        width:constant.resW(40),
        borderRadius:5
      },
      plusStyle:{
        height:constant.resW(7),
        width:constant.resW(7),
      }
})