import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 65,
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
        marginStart: 10,
        marginEnd: 10
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

    DetailItemHeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 30,
        width: deviceWidth * 0.8
    },

    DetailImageStyle:{
        width: 30,
        height: 30,
        marginTop: 20
        // marginEnd: 20
    },

    DetailItemTextInputStyle: {
        fontSize: 18,
        color: 'black',
        width: deviceWidth*0.75,
        height: 45
    },

    addMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 12,
        textAlign: 'right'
    },

    RowStyle:{
        display: 'flex',
        flexDirection: 'row'
    },

    rowIconStyle: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 8, 
        borderWidth: 0.8,
        borderColor: baseColor,
        marginTop: 8,
        height: 45
    },


    MainContainer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },

    ContainerStyle:{
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },

    TextInputStyle: {
        fontSize: 18,
        color: 'black',
        width: deviceWidth*0.8,
        height: 45,
        marginStart: 5,
        marginTop: 5
    },

    TextInputWithBox: {
        fontSize: 18,
        color: 'black',
        width: deviceWidth*0.85,
        borderRadius: 8, 
        borderWidth: 0.8,
        borderColor: baseColor,
        marginTop: 8,
        height: 45
    },

    HoziontalLineFull: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    },

    ImageStyle:{
        width: 30,
        height: 30,
        marginTop: 8,
        marginEnd: 20
    },

    removeImageStyle: {
        marginTop: 10,
        marginEnd: 10,
        alignSelf: 'flex-end'
    },

    itemDetailBox: {
        borderWidth: 0.5, 
        borderRadius: 8, 
        marginTop: 20, 
        marginBottom: 10, 
        padding: 10
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
        backgroundColor: '#f15270',
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        borderRadius: 8
    },

    DescriptionBoxStyle: {
        fontSize: 16,
        borderColor: baseColor,
        width: deviceWidth * 0.85,
        height: 90,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 0.8,
        textAlignVertical: 'top'
    },

    ButtonContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    DropDownBackground: {
        marginLeft: 10,
        marginRight: 10,
        // marginTop: 10,
        fontSize: 16,
        borderRadius: 10,
        color: '#c1c0e0',
        width: deviceWidth*0.85,
        height: 45
    },

    chooseFileButton: {
        fontSize: 16,
        color: 'white',
        backgroundColor: baseColor,
        height: 30,
        paddingLeft: 20,
        paddingRight: 20,
        width: deviceWidth* 0.35,
        textAlign: 'center',
        marginTop: 5
    },

    SelectFileText:{
        width: deviceWidth* 0.45
    },

    ChooseFileBoxStyle:{
        fontSize: 16,
        color: 'black',
        width: deviceWidth * 0.85,
        height: 60,
        marginRight: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#c1c0e0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    viewWrapper: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(deviceWidth * 0.4) }, 
                    { translateY: -90 }],
        height: 150,
        width: deviceWidth * 0.8,
        backgroundColor: "#fff",
        borderRadius: 8,
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