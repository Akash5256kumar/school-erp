import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'

export default styles = StyleSheet.create({

    MainContainer:{
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
    },

    HeaderText:{
        // marginTop: 45,
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },

    HeaderView:{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10
    },

   

    HeaderImageStyle:{
        display: 'flex', flexDirection: 'column', marginTop: 40, marginStart: 10
    },


    HomeScreenView: {
        flex: 3,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around',
        // width: '100%'
        // marginStart: 10, 
        // marginEnd: 10
    },

    ContainerImage:{
        height: constant.resW(85), 
        width: '100%'
    },

    ProfileImageBackground: {
        display: 'flex', 
        flexDirection:'row'
    },

    ProfileImage: {
        height:constant.resW(20),
        width:constant.resW(20),
        // marginTop: 20,
        // marginStart: 10
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

    CircleShapeView: {
        flex: 1,
        flexDirection: 'column',
        width: deviceWidth*0.27,
        height: 110,
        borderRadius: 20,
        // backgroundColor: '#9e91c7',
        marginTop: 5,
        marginStart: 10,
        marginEnd: 5,
        marginTop: 10,
        marginBottom: 10,
        alignItems:'center',
        justifyContent:'center'
    },

    GridImage: {
        height: constant.resW(10),
        width: constant.resW(10),
        // marginTop: 10, 
        alignSelf: 'center',
        justifyContent: 'center'
    },

    GridText: {
        fontSize: constant.font15,
        color: constant.baseTextColor,
        fontFamily:constant.typeMedium,
        alignSelf: 'center',
        textAlign:'center',
        // justifyContent: 'center',
        marginTop: '7%'
    },
    imageMainView:{
    //  backgroundColor:'red',
     marginTop:'12%',
     marginHorizontal:'5%',
     flexDirection:'row',
     alignItems:'center',
    },
    imageSubView:{
        height:constant.resW(23),
        width:constant.resW(23),
        backgroundColor:'#ffffff40',
        borderRadius:constant.resW(40),
        justifyContent:'center',
        alignItems:'center'

    },
    imageSubView2:{
     marginLeft:'3%'
    },
    viewTop1:{
     flexDirection:'row',
     alignItems:'center'
    },
    text1:{
        color:constant.whiteColor,
        fontSize: constant.font14,
        fontFamily:constant.typeMedium,
    },
    text2:{
        color:'#FFD14A',
        fontSize: constant.font22,
        fontFamily:constant.typeSemiBold,
    },
    text3:{
        color:constant.whiteColor,
        fontSize: constant.font14,
        fontFamily:constant.typeMedium,
    },
    hayIcon:{
        height:constant.resW(5),
        width:constant.resW(5),
    },
    HeaderImage:{
        height:constant.resW(19),
        width:constant.resW(19),
        borderRadius:constant.resW(40),

        // height: 25, width: 30, marginStart: 10
    },
    bellIcon:{
        height:constant.resW(7),
        width:constant.resW(7),
    },
    bellIconView:{
        height:constant.resW(10),
        width:constant.resW(10),
        backgroundColor:'#ffffff89',
        borderRadius:constant.resW(30),
        alignItems:'center',
        justifyContent:'center',
    },
    detailView:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
    },
    drawerButton:{
    position:'absolute',
    top:0,
    left:0
    },
    drawerButton2:{
        position:'absolute',
        top:-4,
        right:-4,
        height:constant.resW(4),
        width:constant.resW(4),
        borderRadius:constant.resW(10),
        backgroundColor:'#FFD14A'
        },
    drawerIcon:{
        height:constant.resW(8),
        width:constant.resW(8),
    },
    imageView:{
        height:constant.resW(18),
        width:constant.resW(18),
        borderRadius:constant.resW(50),
        backgroundColor:constant.whiteColor,
        alignItems:'center',
        justifyContent:'center',
    },
})