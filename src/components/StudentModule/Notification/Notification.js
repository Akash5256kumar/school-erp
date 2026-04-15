import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, Image, BackHandler, RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import style from './style';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
const Notification = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const [stdRoll, setStdRoll] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {token: usertoken} = useStudentAuth()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Dashboard');
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  // Fetch notifications
  const notificationApi = async (roll) => {
    try {
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

      let response = await fetch(myConst.BASEURL + 'viewnotifications', data);
      let responseJson = await response.json();
      console.log('data notification-->', responseJson.data);

      setDataSource(responseJson.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  // Get roll number and call API on mount
  useEffect(() => {
    const getRoll = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      console.log('value-->>', value);
      setStdRoll(value);
      if (value) {
        notificationApi(value);
      }
    };
    getRoll();
  }, []);

  // Refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (stdRoll) {
      notificationApi(stdRoll);
    }
  }, [stdRoll]);

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={style.MainContainer}>
        <CommonHeader
          title={'Notification'}
          onLeftClick={() => navigation.goBack()}
        />

        <FlatList
          data={dataSource}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={style.FlatListView}>
              <View style={style.CardView}>
                <View style={style.CardViewStyle}>
                  <Image
                    style={style.ProfileImage}
                    source={constant.Icons.notifyIcon}
                  />
                  <Text numberOfLines={2} style={style.TextName}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={() => constant.listSpace(constant.resW(10))}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </LinearGradient>
  );
};

export default Notification;
