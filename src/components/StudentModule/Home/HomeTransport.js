import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  BackHandler,
  Alert,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as constant from '../../../Utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as myConst from '../../Baseurl';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';


const HomeTransport = (props) => {
    const { navigation } = props
    const userData = useSelector(state=>state.userSlice.userData)
    const [transpartData,setTransportData] = useState({})

    useEffect(()=>{
      TransportApi()
    },[])

   function TransportApi() {
      let formData = new FormData()
      formData.append('std_roll', userData?.std_roll)
      let data = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
          },
          body: formData
      }
      fetch(myConst.BASEURL + 'viewtransport', data)
          .then((response) => response.json())
          .then(responseJson => {
              console.log('responseJson-->', responseJson)
              if (responseJson.status === true) {
                  const response = responseJson.data
                  setTransportData(response)
                 
              } else if (responseJson.staus === false) {

                  Snackbar.show({
                      text: responseJson.message,
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: '#f15270'
                  });
              }
          })
          .catch((error) => console.log(error))
          .finally(() => { })
  }



  return (
    <View style={styles.topMainView}>
       <Text style={styles.heading}>Transport Details</Text>
   <View style={styles.mainView}>
   
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Route No.:</Text>
        <Text style={styles.cardValue}>{transpartData?.route_no}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Vehicle No.:</Text>
        <Text style={styles.cardValue}>{transpartData?.bus_no}</Text>
      </View>
    </View>

    <View style={styles.container}>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Pick Up Point:</Text>
        <Text style={styles.cardValue}>{transpartData?.pickup_point}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Drop Point:</Text>
        <Text style={styles.cardValue}>{transpartData?.drop_point}</Text>
      </View>
    </View>

    <View style={styles.container}>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Incharge Name:</Text>
        <Text style={styles.cardValue}>{transpartData?.incharge}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Incharge No.:</Text>
        <Text style={styles.cardValue}>{transpartData?.contact_no}</Text>
      </View>
    </View>

    <View style={styles.container}>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Driver Name:</Text>
        <Text style={styles.cardValue}>{transpartData?.driver_name}</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.cardText}>Driver No.:</Text>
        <Text style={styles.cardValue}>{transpartData?.driver_mobile_no}</Text>
      </View>
    </View>

   </View>
   </View>
  );
};

export default HomeTransport;


 const styles = StyleSheet.create({
  topMainView:{
    backgroundColor:constant.whiteColor,
    // paddingHorizontal:constant.resW(4)
  },
    mainView:{
    backgroundColor:constant.lightGrayColor,
    paddingHorizontal:constant.resW(2),
    paddingTop:constant.resW(2),
    marginHorizontal:constant.resW(4)
    },
    heading:{
      color:constant.blackColor,
      fontSize: constant.font20,
      fontFamily:constant.typeSemiBold,
      marginTop:constant.resW(2),
      marginBottom:constant.resW(3),
      marginLeft:constant.resW(4)
    },
    container:{
      flex:1,
      alignItems:'center',
      flexDirection:"row",
      justifyContent:'space-between',
      marginBottom:constant.resW(2)
    },
    cardView:{
     flex:0.48,
     alignItems:'center',
     flexDirection:'row',
     justifyContent:'space-between',
     flexWrap:'wrap',
     gap:constant.resW(1)
    },
    cardText:{
      color:constant.blackColor,
      fontSize: constant.font13,
      fontFamily:constant.typeMedium,
    },
    cardValue:{
      color:constant.blackColor,
      fontSize: constant.font13,
      fontFamily:constant.typeSemiBold,
    }
  
})