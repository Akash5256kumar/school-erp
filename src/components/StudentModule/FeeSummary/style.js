import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { resW } from '../../../Utils/Constant';
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
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        marginEnd: 20
    },

    TextLeft: {
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        marginStart: 20,
        fontWeight: 'bold'
    },

    BoxText:{
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        // marginStart: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    StatusText:{
        fontSize: 15,
        color: 'black',
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },


    CardViewStyle: {
        flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
    },

    CardView: {
        backgroundColor: '#fff',
        height: 270,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginStart: 5,
        marginEnd: 15,
    },

    DetailsContainer: {
        backgroundColor: '#AFFFFF',
        height: 50
    },

    AssignmentImage: {
        display: 'flex',
        height: 20,
        width: 20,
        marginTop: 8,
        marginStart: 10
    },

    RowStyle: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
    },

    rectangle: {
        height: 60,
        width: 80,
        borderColor: 'grey',
        borderWidth: 2,
    },

    HorizontalLine: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },

    DetailBox: {
        backgroundColor: '#234E70', width: '45%', height: 40, borderRadius: 8,
        alignItems: 'center', marginTop: 5, marginStart: 10, marginEnd: 5, marginBottom: 5
    },

    DownloadContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: '#AFFFFF',
        // height: 45
    },

    ContainerText: {
        color: 'white',
        fontSize: 16,
        marginTop: 8
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 25,
    },

    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    oopsText: {
        fontSize: 20,
        color: baseColor,
        fontWeight: "bold",
        alignSelf: "center",
        alignItems: 'center',
        marginLeft: 5,
        marginBottom: 5
    },


    PdfHeaderBackground: {
        backgroundColor: baseColor,
        // height: 65,
        paddingTop:Platform.OS === 'ios' ? resW(10) : resW(0) ,
        paddingBottom:resW(5)
        
        // borderBottomRightRadius: 120
    },

    PdfHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginStart: 10
        // marginEnd: 10
    },

    PdfHeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    // PdfHeaderImage: {
    //     height: 25, width: 30
    // },

    PdfHeaderArrowImage: {
        height: 32, width: 35, marginTop: 15, 
        marginEnd: 10,
        tintColor:'#fff'
        // marginStart: 5
    },

})