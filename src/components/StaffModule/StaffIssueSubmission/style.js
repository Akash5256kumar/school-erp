import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { resW } from '../../../Utils/Constant';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    HeaderBackground: {
        backgroundColor: baseColor,
        // height: 65,
        paddingTop:Platform.OS === 'ios' ? resW(8) : 0,
        paddingBottom:resW(4)
    },

    HeaderText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        // marginEnd: 10
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 10, marginEnd: 10
    },

    HeaderImage: {
        height: 25, width: 30
    },

    HeaderArrowImage: {
        height: 35, width: 35, marginTop: 15,
        // marginStart: 5
    },

    HeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 12
    },

    RowStyle: {
        display: 'flex',
        flexDirection: 'row',
    },

    MainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },

    ContainerStyle: {
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },

    TextInputStyle: {
        fontSize: 16,
        color: 'black',
        width: deviceWidth * 0.85,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#c1c0e0'
    },

    ChooseFileBoxStyle:{
        fontSize: 16,
        color: 'black',
        width: deviceWidth * 0.85,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        // marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#c1c0e0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },


    DropDownBackground: {
        height: 45,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        borderRadius: 10,
        color: '#c1c0e0',
        backgroundColor: '#c1c0e0'
    },


    DescriptionBoxStyle: {
        fontSize: 16,
        color: 'black',
        width: deviceWidth * 0.85,
        height: 90,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#c1c0e0',
        textAlignVertical: 'top'
    },

    HoziontalLineFull: {
        borderBottomColor: baseColor,
        borderBottomWidth: 1,
        width: '100%',
    },

    ImageStyle: {
        width: 30,
        height: 30,
        marginTop: 10
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonText: {
        fontSize: 16,
        color: 'white',
        backgroundColor: baseColor,
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        borderRadius: 8
    },

    chooseFileButton: {
        fontSize: 16,
        color: 'white',
        // backgroundColor: baseColor,
        // height: 30,
        // paddingLeft: 20,
        // paddingRight: 20,
        // width: deviceWidth* 0.35,
        // textAlign: 'center',
        // marginTop: 5
    },
    chooseFileButton2: {
    
        backgroundColor: baseColor,
        // height: 30,
        paddingLeft: 20,
        paddingRight: 20,
        width: deviceWidth* 0.35,
        marginTop: 5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },

    SelectFileText:{
        width: deviceWidth* 0.45
    },

    ButtonContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        transform: [{ translateX: -(deviceWidth * 0.4) }, 
                    { translateY: -90 }],
        height: 150,
        width: deviceWidth * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    modalText: {
        fontSize: 22,
        color: 'black',
        marginTop: 8,
        marginBottom: 8
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
    }

})