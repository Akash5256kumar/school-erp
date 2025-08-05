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
    cardTitle:{
        color: 'black',
        fontSize: constant.font17,
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
       fontFamily:constant.typeMedium
    },
})