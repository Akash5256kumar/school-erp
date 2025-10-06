import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { font12, font15, font18, font26, font32, font36, resH, resW } from '../../../Utils/Constant';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
// const baseColor = 'white'

export default styles = StyleSheet.create({

    // container: {
    //     backgroundColor: "white",
    //     alignItems: 'center',
    // },

    loginImage: {
        height: deviceHeight*0.4,
        width: deviceWidth*1,
         marginTop:resH(0),
     
        alignItems: 'center',
        // backgroundColor: "white"
    },

    HomeScreenView: {
        // backgroundColor: baseColor, 
        height: deviceHeight,
         width: deviceWidth,
         display: 'flex'
    },

loginForm: {
//   backgroundColor: 'white',
  width: '100%',
  paddingVertical: resH(5),
  alignItems: 'center',

  justifyContent:"flex-end"
  // position: 'absolute',  // ❌ remove
  // bottom: resH(3),       // ❌ remove
},


container: {
    flex: 1,  // 👈 makes it take full height
    // backgroundColor: "white",
    // justifyContent: "flex-end", // 👈 push children down
    // alignItems: 'center',
},

    loginText: {
        color: '#635d83',
        fontSize: font26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: resH(5),
        marginBottom: resH(1)
    },

    TextInputStyleClass: {
        height: resH(7),
        marginLeft: resW(4),
        marginRight: resW(4),
        marginTop: resH(1),
        marginBottom: resH(1),
        padding: resW(2),
         paddingLeft: resW(4),
        fontSize: font15,
        borderRadius: resW(2.5),
        backgroundColor: 'white',
        color: '#635d83',
        width: '90%',
    },

    button: {
        alignItems: 'center',
        padding: resH(5),
        paddingStart: resW(3),
        paddingEnd: resW(3)
    },

    buttonText: {
        fontSize: font18,
        color: 'white',
        backgroundColor: '#f15270',
        padding: resH(1.8),
          width:resW(90),
        // paddingLeft: 60,
        // paddingRight: 60,
        textAlign: 'center',
        borderRadius: resW(2)
    },

    staffLoginText: {
        color: '#5b4c84',
        fontSize: 14,
        textAlign: 'center'
    },

    staffLoginButton: {
        fontSize: font18,
        color: 'white',
        width:resW(90),
        // backgroundColor: baseColor,
        // padding: resW(5),
        // paddingLeft: 40,
        // paddingRight: 40,
        textAlign: 'center',
        // borderRadius: 8
    }

})