import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import * as constant from '../../../Utils/Constant'
const deviceHeight = Dimensions.get('window').height;
const baseColor = '#0747a6'
const { width } = Dimensions.get("window");



export default styles = StyleSheet.create({

    MainContainer: {
        // width: '100%',
        // height: '100%',
        // backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 65,
        borderBottomRightRadius: 120
    },

    HeaderText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        marginEnd: 10
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderImage: {
        height: 25, width: 30
    },

    HeaderArrowImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },

    TextView: {
        fontSize: 18,
        color: baseColor,
        marginLeft: 5,
    },

    EditTextStyle: {
        height: 45,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: 'blue',
        color: 'black',
    },

    DropDownBackground: {
        height:constant.resW(15),
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        // padding: 10,
        // fontSize: 16,
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: constant.baseTextColor,
        color: 'black',
        justifyContent:'center',
        zIndex:10000
        // backgroundColor:"green"
    },

    IssueStyle: {
        // height: 70,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 10,
        // marginBottom: 10,
        // padding: 10,
        // fontSize: 16,
        // borderRadius: 5,
        // borderWidth: 0.8,
        // borderColor: 'blue',
        color: constant.blackColor,
        textAlignVertical:'top',
        fontFamily:constant.typeMedium,
        fontSize:constant.font16,
        maxHeight:constant.resW(35),
        height:constant.resW(35),
        paddingHorizontal:'5%'
    },

    UploadFilesStyle: {
        height: 120,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: 'blue',
        color: 'black',
        alignItems: 'center'
    },

    uploadImage: {
        height: '90%', width: '50%'
    },

    HelpSupportform: {
        // marginTop: 30,
       marginHorizontal:'5%'
    },

    submitButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: baseColor,
        padding: 8,
        paddingLeft: 40,
        paddingRight: 40,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
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
        paddingTop: 5,
        paddingBottom: 5
    },

    AddImageText: {
        fontSize: 14,
        color: 'black'
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        // justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 150,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    modalText: {
        fontSize: 22,
        color: 'black',
        marginTop: 8,
        marginBottom: 8
    },
    ProfileImage:{
        height: constant.resW(24),
        width: constant.resW(24),
        alignSelf:'center',
        marginTop:'5%',
        marginBottom:'4%'
    },
    rollno:{
    color:constant.baseTextColor,
    alignSelf:'center',
    fontFamily:constant.typeMedium,
    fontSize:constant.font15_5,
    },
    name:{
        color:constant.baseColor,
        alignSelf:'center',
        fontFamily:constant.typeSemiBold,
        fontSize:constant.font22,
    },
    midView:{
        // backgroundColor:"red",
        borderWidth:0.8,
        borderColor:constant.baseTextColor,
        marginHorizontal:'1%',
        borderRadius:5
    },
    attachView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingHorizontal:'4%',
    marginVertical:'4%',
    },
    attachText:{
        color:constant.baseTextColor,
        fontFamily:constant.typeMedium,
        fontSize:constant.font15,
        marginRight:'2%'

    },
    attachImage:{
        height: constant.resW(10),
        width: constant.resW(10),
    },
    uploadImage2: {
        height: constant.resW(30),
        width: constant.resW(50),
        alignSelf:'center'
    },
    dropList:{
        height:'100%',
        width:'100%',
        backgroundColor:'transparent',
      },
      dropListText:{
        fontSize: constant.resW(4.5),
        color: 'black',
        marginLeft:constant.resW(0.5)
      },

})