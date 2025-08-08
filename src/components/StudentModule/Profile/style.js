import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { blackColor, font16, font17, font18, resW, typeMedium, whiteColor } from '../../../Utils/Constant';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'white'
    },

    ContainerImage: {
        height: 250,
        width: deviceWidth
    },

    ProfileImageBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    ProfileImage: {
        width: 100,
        height: 100,
        // marginTop: 5,
        alignSelf: 'center',
        borderRadius:resW(50)
    },
    ProfileImage2: {
        width: resW(20),
        height: resW(20),
        // marginTop: 5,
        alignSelf: 'center',
        borderRadius:resW(50),
        marginTop:resW(2)
    },

    HeaderArrowImage: {
        height: 35, width: 35,  marginStart: 5
    },

    TextName: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    TextAddress: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },

    DetailContainerBackround: {
        // display: 'flex',
        width: '100%',
        height: undefined,
        marginTop: 5,
        marginEnd: 20
    },

    GeneralText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },

    IconStyle: {
        height: 25,
        width: 25,
        // marginTop: 15,
        marginEnd: 5
    },

    BoldText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        // marginTop: 15
    },

    NormalText: {
        color: 'white',
        fontSize: 14
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1
    },

    RowInnerStyle: {
        display: 'flex', flexDirection: 'row'
    },

    NewRowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    },

    CardStyle: {
        // marginStart: 10,
        //  marginEnd: 10,
        //  flex:1,
        paddingHorizontal:resW(4),
        paddingBottom:resW(4)
    },

    ImageBorderStyle: { borderRadius: 0 },

    ImageStyle: { display: 'flex', flexDirection: 'row' },

    CardviewMargin: { marginStart: 12, marginEnd: 12 },
    profileCardMainView:{
       
        backgroundColor:'#fff'

    },
    profileCardSubView:{
     backgroundColor:'#f4f4f4',
     marginHorizontal:resW(3),
     paddingHorizontal:resW(3),
     marginTop:resW(4),
     borderRadius:4,
     paddingVertical:resW(1)
    },
    profileTitle:{
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: resW(4),
        marginLeft:resW(3)
    },
    profileTitle2:{
        color: '#000',
        fontSize: font18,
        fontWeight: 'bold',
        marginTop: resW(2),
        marginBottom:resW(2)
        // marginLeft:resW(3)
    },
    profileCardView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:resW(2),
        gap:resW(5)
    },
    profileCardTitle:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        flex:1
    },
    profileCardValue:{
        color: '#000',
        fontSize: 14,
        flex:1,
        textAlign:'right'
    },
    buttonMainView:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:resW(4),
        marginTop:resW(4),
        marginBottom:resW(2)
        },
        buttonStyle:{
        backgroundColor:baseColor,
        flex:0.32,
        paddingVertical:resW(3),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:baseColor
        },
        buttonStyle2:{
            // backgroundColor:baseColor,
            flex:0.32,
            paddingVertical:resW(3),
            alignItems:'center',
            justifyContent:'center',
            borderRadius:5,
            borderWidth:1,
            borderColor:blackColor
            },
        buttonTextStyle:{
            color: 'white',
            fontSize:font17,
            fontFamily:typeMedium
        },
        buttonTextStyle2:{
            color:blackColor,
            fontSize:font17,
            fontFamily:typeMedium
        },
        editButton:{
        paddingHorizontal:resW(4), 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:baseColor,
        marginHorizontal:resW(3),
        paddingVertical:resW(4),
        marginTop:resW(5),
        marginBottom:resW(3),
        borderRadius:resW(2)
        },
        editButtonText:{
            color:whiteColor,
            fontSize:font18,
            fontFamily:typeMedium   
        }

})