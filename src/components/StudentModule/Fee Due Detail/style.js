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

    FlatListView: {
        overflow: 'hidden',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 8,
        marginBottom: 8
    },

    TextRight: {
        fontSize: 15,
        color: 'black',
        marginTop: 3,
        // marginEnd: 20,
        width: deviceWidth*0.4
    },

    TextLeft: {
        fontSize: 15,
        color: 'black',
        marginTop: 3,
        marginStart: 20,
        fontWeight: 'bold',
        width: deviceWidth*0.4
    },

    MonthText: {
        fontSize: 15,
        color: 'black',
        marginTop: 3,
        marginStart: 20,
        fontWeight: 'bold'
    },

    CardViewStyle: {
        flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
    },

    CardView: {
        backgroundColor: '#fff',
        height: 220,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
    },

    DetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#AFFFFF',
        height: 45
    },

    HeadingContainer: {
        backgroundColor: '#AFFFFF',
        height: 25
    },

    AssignmentImage: {
        display: 'flex',
        height: 20,
        width: 20,
        marginTop: 5,
        marginStart: 10
    },

    RowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },

    ContainerText: {
        color: 'white',
        fontSize: 16,
        marginTop: 8
    },

    PayBox: {
        backgroundColor: '#234E70', width: '25%', height: 35,
        borderRadius: 8, alignItems: 'center', marginTop: 5
    },

    DetailBox: {
        backgroundColor: '#234E70', width: '25%', height: 35, borderRadius: 8,
        alignItems: 'center', marginTop: 5, marginStart: 10, marginEnd: 5
    },

    viewWrapper: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(deviceWidth * 0.4) },
        { translateY: -90 }],
        height: 290,
        width: deviceWidth * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
        // marginLeft: 20,
        // marginTop: 20
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        // fontWeight: 'bold',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'green',
        width: deviceWidth * 0.4,
        marginTop: 30
    },

    CancelButton: {
        fontSize: 18,
        color: 'white',
        // fontWeight: 'bold',
        backgroundColor: 'red',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        textAlign: 'center',
        width: deviceWidth * 0.4,
        marginTop: 30
    },

    TextStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },

    PopUpView: { marginTop: 10, marginStart: 20, marginEnd: 10 },

    ButtomView: { flexDirection: 'row', flex: 2, justifyContent: 'space-around' }
})