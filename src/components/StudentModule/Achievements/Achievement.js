import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import * as myConst from '../../Baseurl';
import CommonHeader from '../../CommonHeader';
import CommonSearch from '../../Search/CommonSearch';
import { useSelector } from 'react-redux';

const baseColor = '#0747a6';

const Achievement = ({ navigation }) => {
    const usertoken = useSelector(state=>state.userSlice.token)
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [stdRoll, setStdRoll] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [originalDataSource, setOriginalDataSource] = useState([]);
  const [position, setPosition] = useState('');

  // handle back button
  const handleBackPress = useCallback(() => {
    navigation.navigate('Home');
    return true;
  }, [navigation]);

  // backhandler
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  // get roll no and call API
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      setStdRoll(value || '');
      achievementApi(value);
    };
    fetchData();
  }, []);

  // API call
  const achievementApi = async (roll) => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append('std_roll', roll);

      const response = await fetch(myConst.BASEURL + 'viewachievements', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization' : usertoken
        },
        body: formData,
      });

      const responseJson = await response.json();
      console.log("response",JSON.stringify(responseJson))
      let responseData = responseJson?.data || [];

      // set position text
      responseData.forEach((item) => {
        if (item.position === 'i_point') {
          setPosition('1st position');
        } else if (item.position === 'ii_point') {
          setPosition('2nd position');
        } else if (item.position === 'iii_point') {
          setPosition('3rd position');
        }
      });

      setDataSource(responseData);
      setOriginalDataSource(responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // search filter
  const onSearch = (text) => {
    let filteredArr = originalDataSource.filter((object) =>
      object.achievement_level.toLowerCase().includes(text.toLowerCase())
    );
    setDataSource(text ? filteredArr : originalDataSource);
  };

  // toggle search visibility
  const toggleFunction = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader
          title={'Achievement'}
          onLeftClick={() => navigation.navigate('Home')}
        />

        {/* Search */}
        <CommonSearch searchText={(d) => onSearch(d)} />

        <FlatList
          data={dataSource}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.CardView}>
              <View style={styles.TopRowStyle}>
                <View style={styles.RowStyle}>
                  <Text style={styles.TextLeft}>Achievement Level</Text>
                  <Text style={styles.TextRight}>{item.achievement_level}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.TextLeft}>Achievement Date</Text>
                  <Text style={styles.TextRight}>{item.achievement_date}</Text>
                </View>
              </View>

              <View style={styles.bottomRowStyle}>
                <View style={styles.RowStyle}>
                  <Text style={styles.TextLeft}>Achievements Name</Text>
                  <Text style={styles.TextRight}>{item.achievements_name}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.TextLeft}>Admission Number</Text>
                  <Text style={styles.TextRight}>{item.admission_no}</Text>
                </View>
              </View>

              <View style={styles.bottomRowStyle}>
                <View style={styles.RowStyle}>
                  <Text style={styles.TextLeft}>Position Achieved</Text>
                  <Text style={styles.TextRight}>{position}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.TextLeft}>Marks Obtained</Text>
                  <Text style={styles.TextRight}>{item.marks}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default Achievement;
