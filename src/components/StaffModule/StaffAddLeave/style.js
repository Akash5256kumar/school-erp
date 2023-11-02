import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
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

    HeaderImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },

    HeaderPlusImage: {
        marginEnd: 10, height: 35, width: 35, marginTop: 15, marginStart: 5
    },

    HeaderContainer: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        marginEnd: 10
    },

    CardviewStyle: {
        borderWidth: 0.8,
        borderColor: 'grey',
        borderRadius: 8,
        marginTop: 20,
        marginStart: 15,
        marginEnd: 15,
        marginBottom: 15
    },

    RowStyle: {
        display: 'flex', flexDirection: 'row',
        padding: 12,
        marginEnd: 20
    },

    ColumnStyle: {
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        marginStart: 10
    },

    ImageStyle: {
        marginStart: 5,
        marginEnd: 5,
        alignSelf: 'center'
    },

    DescriptionImageStyle: {
        marginStart: 5,
        marginEnd: 5,
        alignSelf: 'center',
        width: 40,
        height: 40
    },

    HeadingText:{
        fontSize: 20,
        color: 'grey',
        marginStart: 10
    },

    NormalText: {
        fontSize: 20,
        color: 'black',
        marginStart: 10,
        marginEnd: 20
    },

    HoziontalLineFull: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.8,
        width: '100%',
    },

    TextInputHorizontalLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.6,
        width: '100%',
    },

    CalendarView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 12,
        marginEnd: 12,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: baseColor,
        padding: 10,
        textAlign: 'center',
        borderRadius: 20,
        width: deviceWidth * 0.8,
        fontWeight: 'bold',
        marginTop: 10
    },

    DropDownBackground: {
        height: 45,
        fontSize: 20,
        color: '#c1c0e0',
        width: deviceWidth * 0.7,
        fontWeight: 'bold'
    },

    TextInputStyleClass: {
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        padding: 12,
        fontSize: 16,
        color: '#635d83',
        width: deviceWidth * 0.7,
    },

    uploadImage: {
        height: 100, width: 100,
        marginTop: 10,
        alignSelf: 'center'
    },


    AddImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5,
        alignSelf: 'center'
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
        borderRadius: 7,
    },
    modalText: {
        fontSize: 22,
        color: 'black',
        marginTop: 8,
        marginBottom: 8
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

})