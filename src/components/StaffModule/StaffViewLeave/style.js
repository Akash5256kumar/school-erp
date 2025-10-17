import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { blackColor, Blue, font17, font22, resH, resW, SilverColor, whiteColor } from '../../../Utils/Constant';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
  fabButton: {
  position: 'absolute',
  bottom: resH(13),
  right: resW(5),
  backgroundColor: Blue,
  width: resW(15),
  height: resW(15),
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.4,
  shadowRadius: 5,
},
fabIcon: {
  width: resW(7),
  height: resW(7),
  tintColor: 'white',
  resizeMode: 'contain',
},

    HeaderBackground: {
        backgroundColor: Blue,
        // height: 65,
        paddingTop:Platform.OS === 'ios' ? resW(8) : 0,
        paddingBottom:resW(4)
    },

    HeaderImage: {
        height: resW(7), width: resW(7), marginTop: 15, marginStart: 5
    },

    // HeaderPlusImage: {
    //     marginEnd: 10, height: resW(7), width: resW(7), marginTop: 15, marginStart: 5
    // },

    HeaderContainer: {
        display: 'flex',
         flexDirection: 'row',
        justifyContent: 'space-between',
        
    },

    HeaderText: {
        color: 'white',
        fontSize: font22,
        fontWeight: 'bold',
        marginTop: 15,
        // marginEnd: 10
    },

    TextStyle: {
        fontSize: 18,
        color: 'grey',
        width: deviceWidth * 0.6,
        marginTop: 10
    },

    TextDateHeadingStyle: {
        fontSize: 20, color: baseColor, marginStart: 10
    },

    TextDate: { fontSize: 18, color: 'black', marginStart: 10 },

    FlatStyle: {
        marginTop: 10, marginBottom: 10,
        overflow: 'hidden', paddingBottom: 5, paddingLeft: 5
    },

    CircleShapeView: {
        height: 30,
        // borderRadius: 10,
        backgroundColor: '#fef3d3',
        width: deviceWidth * 0.25,
        marginTop: 10
    },

    StatusText: {
        fontSize: 18, color: 'black',
        paddingStart: 10,
        paddingEnd: 10,
        width: deviceWidth * 0.25,
        // marginTop: 5,
        textAlign: 'center'
    },

    CardviewStyle: {
        display: 'flex', flexDirection: 'row'
    },

    CardView: {
        height: 160,
        borderWidth: 1,
        marginStart: 15,
        marginEnd: 15,
        borderRadius: 10,
        display: 'flex', flexDirection: 'column',
    },

    TextViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginStart: 10
    },

    TextLeaveType: {
        fontSize: 20,
        color: 'grey',
        width: deviceWidth * 0.7
    },

    AssignmentDownloadImage: {
        height: 20,
        width: 20
    },

    BackgroundView: {
        height: 30,
        borderRadius: 10,
        backgroundColor: '#e7e8e9',
        paddingStart: 5,
        paddingEnd: 5,
        paddingTop: 3,
        paddingBottom: 3
    },

    TabBackground: {
        height: 120,
        marginBottom: 15,
        marginTop: 15
    },

    RowCardStyle: { display: 'flex', flexDirection: 'row', flex: 3,
        justifyContent:"space-between",
        marginHorizontal:resW(5)
     },

    // CardviewText: {
    //     textAlign: 'center',
    //     fontSize: 18,
    //     color: 'white',
    //     fontWeight: 'bold',
    //     alignSelf: 'center',
    //     alignItems: 'center'
    // },


    // TabCardView: {
    //     backgroundColor: '#234E70',
    //     height: 120,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.4,
    //     shadowRadius: 5,
    //     elevation: 5,
    //     marginStart: 8,
    //     marginEnd: 8,
    //     borderRadius: 8,
    //     flex: 1,
    //     justifyContent: 'center'
    // },
TabCardView: {
  backgroundColor: SilverColor, // Use theme blue
  height: resH(18),
  width:resW(27),
//   marginStart: 8,
//   marginEnd: 8,
  marginBottom: 8,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 6,
  justifyContent: 'center',
  alignItems: 'center', // Centralize content
  padding: resW(5),
  // Add padding
},
CardviewText: {
  color: blackColor, // Ensure contrast
  fontSize: font17,
  fontWeight: 'bold',
  marginVertical: resW(0.2),
  textAlign: 'center',
},


})