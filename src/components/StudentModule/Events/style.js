import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { font10, font16, font17, font19_5, resH, resW } from '../../../Utils/Constant';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        padding: 12
    },


  BackButton: {
//   padding: resW(10),   // makes a big clickable area
//   marginLeft: resW(1),
    height: resW(20),
  width: resW(10),
//   justifyContent: "center",

//   alignItems: "center",

},

HeaderImage: {
  height: resW(7),
  width: resW(7),
//   backgroundColor:"red"
},


    HeaderContainer: {
        display: 'flex',
         flexDirection: 'row',
        //  backgroundColor:"red"
         justifyContent: 'space-around',
        //  alignItems:"center"
    },

    EventImage: {
        height: deviceHeight*0.3, 
        width: '95%'
    },

    HeaderText: {
        color: 'white',
        fontSize: font19_5,
        fontWeight: 'bold'
    },

    TextStyle: {
        fontSize: font16,
        fontWeight: 'bold',
        color: 'white'
    },

    TextDate: { 
       fontSize: font16,
        color: 'white'
     },

    FlatStyle: {
         marginTop: resW(4),
        marginBottom: 0 ,
        overflow: 'hidden', 
        marginHorizontal:resW(4)
        // paddingBottom: 5,
        //  paddingLeft: 5,
         },

    CircleShapeView: {
        width: resW(15),
        height: resW(15),
        borderRadius: 80 / 2,
      
        alignItems:'center',
        justifyContent:'center'
        // marginTop: 10
    },

    CardviewStyle: { 
        display: 'flex',
         flexDirection: 'row',
          justifyContent: 'space-around',
         },

    CardView: {
        backgroundColor: '#ff926b',
        // height: 100,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        // marginStart: 5,
        // marginEnd: 15,
        borderRadius: 10,
        // display: 'flex',
         flexDirection: 'row', 
         justifyContent: 'space-between',
         alignItems:'center',
         paddingHorizontal:resW(3),
         paddingVertical:resW(3)
    },

    TextViewStyle: {
        display: 'flex',
        flexDirection: 'column',
       justifyContent:"center",
        // marginTop: 10,
        marginStart: 10
    },

    AssignmentImage: {
        height: resW(10),
        width: resW(10),
        // marginTop: 8,
        // marginStart: 8
    },

    AssignmentDownloadImage: {
        height: resW(10),
        width: resW(10),
        // marginTop: 15
    }
})