import React from 'react';
import { StyleSheet , Dimensions, Platform} from 'react-native';
const baseColor = '#0747a6'
import * as constant from '../../../Utils/Constant'

export default styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
    },
    listContainer:{
    marginHorizontal:constant.resW(5),
    marginTop:constant.resW(2)
    },
    listColumn:{
    gap:constant.resW(3)
    },
    CardView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 0,
        borderRadius: 8,
        alignItems:'center',
        justifyContent:'center',
        height:constant.resW(28),
        width:constant.resW(27.8)
    
    },
    AssignmentImage: {
        height: constant.resW(14),
        width: constant.resW(14),
    },
    DashboardTextStyle:{
        fontSize: constant.font16,
        color: 'black',
        fontFamily:constant.typeSemiBold,
        marginTop:constant.resW(1),
    },
})