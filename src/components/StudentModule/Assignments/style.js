import React from 'react';
import { StyleSheet , Dimensions, Platform} from 'react-native';
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        padding: 14
    },

    HeaderImage: {
        height: 25, width: 30
    },

    HeaderView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    HeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        // marginStart: 35
    },

    FlatListView: {
        marginTop: constant.resW(1.5),
        marginBottom: constant.resW(1.5),
    },

    TextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
        marginStart: 20,
        marginBottom: 5
    },

    DashboardTextStyle: {
        color: 'black',
        fontSize: constant.font16,
        fontFamily:constant.typeSemiBold,
    },
    DashboardTextStyle2: {
        color: '#9CA4AB',
        fontSize: constant.font12,
        fontFamily:constant.typeMedium,
        marginTop: constant.resW(0.3),
    },
    DashboardTextStyle3: {
        color: '#6E7681',
        fontSize: constant.font12,
        fontFamily:constant.typeMedium,
        flex: 1,
        marginRight: constant.resW(2),
    },

    CircleShapeView: {
        width: 55,
        height: 55,
        borderRadius: 80 / 2,
        backgroundColor: '#d5dcf2',
        marginTop: 10,
        marginStart: 10
    },

    CardViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingHorizontal:'4.5%',
    },

    CardView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 5,
        elevation: 2,
        borderRadius: 8,
        marginHorizontal:'5%',
        paddingVertical:'3.2%',
    },

    TextViewStyle: {
        flex: 1,
        marginHorizontal: '3%',
        justifyContent:'center',
    },

    AssignmentImage: {
        height: constant.resW(12),
        width: constant.resW(12),
    },

    AssignmentDownloadImage: {
        height: constant.resW(6.5),
        width: constant.resW(6.5),
        tintColor: constant.baseTextColor,
    },

    DateText: {
        fontSize: constant.font12,
        color: '#7F8794',
        fontFamily: constant.typeMedium,
    },

    DocImageAndTextStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center'
    },

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: constant.resW(0.6),
    },

    FloatTabStyle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: baseColor,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    FloatIconStyle: {
        height: 25,
        width: 25,
        marginTop: 10,
        marginStart: 10
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
        // height: 75,
        paddingTop:Platform.OS === 'ios' ? constant.resW(10) :constant.resW(0) ,
        height:constant.resW(16)
        // paddingBottom:constant.resW(5)
        // borderBottomRightRadius: 120
    },

    PdfHeaderText: {
        color: 'white',
        fontSize: constant.font18,
        fontWeight: 'bold',
        // marginTop: 15,
        // marginStart: 10
        // marginEnd: 10
    },

    PdfHeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:constant.resW(16)
    },

    // PdfHeaderImage: {
    //     height: 25, width: 30
    // },

    PdfHeaderArrowImage: {
        height: constant.resW(6.5),
         width: constant.resW(6.5),
        marginEnd: constant.resW(3),
        tintColor:constant.whiteColor
        // marginStart: 5
    },
})
