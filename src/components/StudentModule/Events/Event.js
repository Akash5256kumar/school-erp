import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
const baseColor = '#0747a6';
import * as myConst from '../../Baseurl';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Event = ({navigation}) => {
  const usertoken = useSelector(state=>state.userSlice.token)
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState('');
  const [dataSource, setDataSource] = useState([]);

  // Handle Back Button
  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  // Fetch Events API
  const eventApi = useCallback(() => {
    let formData = new FormData();
    formData.append('std_class', classes);

    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
      },
      body: formData,
    };

    fetch(myConst.BASEURL + 'viewevents', data)
      .then(response => response.json())
      .then(responseJson => {
        setDataSource(
          responseJson.data.upcoming || responseJson.data.past || []
        );
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [classes]);

  // ComponentDidMount Equivalent
  useEffect(() => {
    const getClassAndFetch = async () => {
      const value = await AsyncStorage.getItem('@class');
      setClasses(value || '');
    };
    getClassAndFetch();
  }, []);

  // Fetch events after class is set
  useEffect(() => {
    if (classes) {
      eventApi();
    }
  }, [classes, eventApi]);

  // BackHandler
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderBackground}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.HeaderImage}
              source={require('../../../assests/images/leftarrow.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.EventImage}
            source={require('../../../assests/images/event.png')}
          />
        </View>
        <Text style={styles.HeaderText}>Calendar of Events</Text>
      </View>

      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <View style={styles.FlatStyle}>
            <View style={styles.CardView}>
              <View style={styles.CardviewStyle}>
                <View style={styles.CircleShapeView}>
                  <Image
                    style={styles.AssignmentImage}
                    source={require('../../../assests/images/cake.png')}
                  />
                </View>
                <View style={styles.TextViewStyle}>
                  <Text style={styles.TextStyle}>{item.event_name}</Text>
                  <Text style={styles.TextDate}>
                    {moment(item.event_time).format('DD-MM-YYYY')}
                  </Text>
                </View>
              </View>

              <View>
                <Image
                  style={styles.AssignmentDownloadImage}
                  source={require('../../../assests/images/calendar.png')}
                />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Event;
