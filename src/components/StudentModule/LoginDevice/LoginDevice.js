import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import * as myConst from '../../Baseurl';
import Header from '../../Header/Header';
import { useSelector } from 'react-redux';

const LoginDevice = ({ navigation }) => {
    const userData = useSelector(state=>state.userSlice.userData)
    const usertoken = useSelector(state=>state.userSlice.token)
  const [dataSource, setDataSource] = useState([]);
  const [stdRoll, setStdRoll] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle back press
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  // Fetch std_roll and call API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('@std_roll');
        console.log('value-->>', value);
        if (value) {
          setStdRoll(value);
          loginDeviceApi(value);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const loginDeviceApi = async (roll) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append('std_roll', roll);

    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
      },
      body: formData,
    };

    try {
      const response = await fetch(myConst.BASEURL + 'logindevices', data);
      const responseJson = await response.json();
      console.log('logindevices response:', responseJson);
      if (responseJson?.data) {
        setDataSource(responseJson.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <Header
        title={'Login Devices'}
        goBack={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={styles.FlatListView}>
            <View style={styles.CardView}>
              <View style={styles.RowStyle}>
                <Text style={styles.TextLeft}>Serial No:</Text>
                <Text style={styles.TextRight}>{item.id}</Text>
              </View>

              <View style={styles.RowStyle}>
                <Text style={styles.TextLeft}>App Version:</Text>
                <Text style={styles.TextRight}>{item.deviceVersion}</Text>
              </View>

              <View style={styles.RowStyle}>
                <Text style={styles.TextLeft}>Device Name:</Text>
                <Text style={styles.TextRight}>{item.deviceName}</Text>
              </View>

              <View style={styles.RowStyle}>
                <Text style={styles.TextLeft}>Device Type:</Text>
                <Text style={styles.TextRight}>{item.deviceType}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default LoginDevice;
