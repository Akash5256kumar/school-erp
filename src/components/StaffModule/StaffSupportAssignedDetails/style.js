import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;
const baseColor = '#0747a6'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        height: 65,
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


    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 12,
        marginBottom: 8
    },

    CardView: {
        backgroundColor: '#fff',
        height: 230,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 10
    },

    TextRight: {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
        marginStart: 5,
        width: deviceWidth * 0.4,
        textAlign: 'left'
    },

    TextLeft: {
        fontSize: 18,
        color: baseColor,
        marginTop: 5,
        marginStart: 15,
        fontWeight: 'bold',
        width: deviceWidth * 0.35
    },

    NormalText: {
        fontSize: 18,
        color: baseColor,
        marginTop: 15,
        marginStart: 15,
        fontWeight: 'bold',
    },

    BottomRowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },

    deadlineCardRow: {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
    },

    ViewMoreImage: {
        height: 25,
        width: 25,
        marginTop: 5,
        marginEnd: 10
    },

    TabBackground: {
        height: 50,
        marginBottom: 10,
        marginTop: 10
    },

    RowCardStyle:{ display: 'flex', flexDirection: 'row', flex: 3 },

    CardviewText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        alignItems: 'center'
    },


    TabCardView: {
        backgroundColor: '#234E70',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center'
    },


    DeadlineCardView: {
        backgroundColor: '#fff',
        height: 260,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 10
    },

    FeedbackCardView: {
        backgroundColor: '#fff',
        height: 420,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 8,
        marginEnd: 8,
        borderRadius: 10
    },

    RowStyle:{
        display: 'flex',
        flexDirection: 'row'
    },

    DescriptionBoxStyle: {
        fontSize: 16,
        borderColor: baseColor,
        width: deviceWidth * 0.85,
        height: 90,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        marginStart: 20,
        marginEnd: 20,
        textAlignVertical: 'top'
    },

    TextInputStyle: {
        fontSize: 18,
        color: 'black',
        width: deviceWidth*0.8,
        height: 45,
        marginStart: 5,
        marginTop: 5
    },

    ImageStyle:{
        width: 30,
        height: 30,
        marginTop: 8,
        marginLeft: 50
    },

    rowIconStyle: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5, 
        borderWidth: 0.5,
        borderColor: baseColor,
        marginTop: 8,
        height: 45,
        marginStart:  20,
        marginEnd: 20
    },

    TextInputStyleClass: {
        height: 45,
        marginStart:  20,
        marginEnd: 20,
        marginTop: 10,
        padding: 12,
        fontSize: 16,
        borderRadius: 5, 
        borderWidth: 0.5,
        borderColor: baseColor,
        color: '#635d83',
        width: '90%',
    },

    DropDownBackground: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        borderRadius: 10,
        color: '#c1c0e0',
        width: deviceWidth*0.85,
        height: 45
    },


    SelectFileText:{
        width: deviceWidth* 0.45
    },

    ChooseFileBoxStyle:{
        fontSize: 16,
        color: 'black',
        width: deviceWidth * 0.85,
        height: 60,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#c1c0e0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
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


    ButtonContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    button: {
        alignItems: 'center',
        padding: 15,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: baseColor,
        padding: 8,
        textAlign: 'center',
        borderRadius: 20,
        width: deviceWidth * 0.3,
        fontWeight: 'bold',
        marginTop: 5
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
        height: 100,
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