import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './GradeStyle';
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import CommonSearch from '../../Search/CommonSearch';

const Grade = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [stdRoll, setStdRoll] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [originalDataSource, setOriginalDataSource] = useState([]);
  const [position, setPosition] = useState('');

  useEffect(() => {
    const fetchRoll = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      setStdRoll(value);
    };
    fetchRoll();
  }, []);

  useEffect(() => {
    if (stdRoll) {
      achievementApi();
    }
  }, [stdRoll]);

  const achievementApi = () => {
    let formData = new FormData();
    formData.append('std_roll', stdRoll);

    let data = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    };

    fetch(myConst.BASEURL + 'viewachievements', data)
      .then((response) => response.json())
      .then((responseJson) => {
        let response = responseJson.data;
        if (response && response.length > 0) {
          response.forEach(item => {
            if (item.position === 'i_point') {
              setPosition('1st position');
            } else if (item.position === 'ii_point') {
              setPosition('2nd position');
            } else if (item.position === 'iii_point') {
              setPosition('3rd position');
            }
          });
          setDataSource(response);
          setOriginalDataSource(response);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (text) => {
    let filteredArr = originalDataSource.filter(object =>
      object.achievement_level.toLowerCase().includes(text)
    );
    setDataSource(text ? filteredArr : originalDataSource);
  };

  const toggleFunction = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }} >
      <View style={styles.MainContainer}>
        <CommonHeader title={'Grade'} onLeftClick={() => navigation.navigate('Home')} />
        {/* <CommonSearch searchText={(d) => onSearch(d.toLowerCase())} /> */}
        
        <FlatList
          data={[]}
          keyExtractor={(item, index) => index.toString()}
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

export default Grade;
