import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import * as constant from '../../../Utils/Constant';
import * as myConst from '../../Baseurl';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

const HomeTransport = (props) => {
    const {token: usertoken, userData} = useStudentAuth();
    const [transpartData,setTransportData] = useState({})

    const [stdRoll, setStdRoll] = useState('');

    useEffect(() => {
      const getRoll = async () => {
        const value = await AsyncStorage.getItem('@std_roll');
        setStdRoll(value || '');
      };
      getRoll();
    }, []);

    useEffect(()=>{
      if (!usertoken || !stdRoll) {
        return;
      }

      TransportApi()
    },[usertoken, stdRoll])

   function TransportApi() {
      let formData = new FormData()
      formData.append('std_roll', stdRoll)
      let data = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'Authorization' : usertoken
          },
          body: formData
      }
      fetch(myConst.BASEURL + 'viewtransport', data)
          .then((response) => response.json())
          .then(responseJson => {
              console.log('transport-->', responseJson)
              if (responseJson.status === true) {
                  const response = responseJson.data
                  setTransportData(response)
                 
              } else if (responseJson.status === false) {

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
      <View style={styles.sectionHeader}>
        <Text style={styles.heading}>Transport Details</Text>
      </View>

      <View style={styles.mainView}>
        <View style={styles.container}>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Route No.</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.route_no || '--'}
            </Text>
          </View>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Vehicle No.</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.registration_no || '--'}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Pick Up Point</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.pickup_point || '--'}
            </Text>
          </View>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Drop Point</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.drop_point || '--'}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Incharge Name</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.incharge_name || '--'}
            </Text>
          </View>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Incharge No.</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.contact_no || '--'}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.cardView}>
            <Text style={styles.cardLabel}>Driver Name</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.driver_name || '--'}
            </Text>
          </View>
          <View style={styles.cardView}>
            <Text numberOfLines={1} style={styles.cardLabel}>Driver No.</Text>
            <Text numberOfLines={2} style={styles.cardValue}>
              {transpartData?.driver_mobile_no || '--'}
            </Text>
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
    marginTop: constant.resW(5),
  },
    sectionHeader: {
      marginBottom: constant.resW(2.5),
      marginHorizontal: constant.resW(4),
    },
    mainView:{
    backgroundColor:'#F8FAFF',
    borderColor: '#E2E8F4',
    borderRadius: constant.resW(3),
    borderWidth: 1,
    paddingHorizontal:constant.resW(3),
    paddingTop:constant.resW(3),
    paddingBottom: constant.resW(1),
    marginHorizontal:constant.resW(4),
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    },
    heading:{
      color:constant.blackColor,
      fontSize: constant.font18,
      fontFamily:constant.typeSemiBold,
      lineHeight: constant.resW(7),
    },
    container:{
      alignItems:'center',
      flexDirection:"row",
      justifyContent:'space-between',
      marginBottom:constant.resW(2.2)
    },
    cardView:{
     flex:0.48,
     backgroundColor: constant.whiteColor,
     borderRadius: constant.resW(2.2),
     minHeight: constant.resW(18),
     paddingHorizontal: constant.resW(2.5),
     paddingVertical: constant.resW(2.4),
    },
    cardLabel:{
      color:'#64748B',
      fontSize: constant.font12,
      fontFamily:constant.typeMedium,
    },
    cardValue:{
      color:constant.blackColor,
      fontSize: constant.font14,
      fontFamily:constant.typeSemiBold,
      marginTop: constant.resW(1.2),
      lineHeight: constant.resW(5),
    }
  
})
