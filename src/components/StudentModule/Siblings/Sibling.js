import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../Header/Header';
import style from './style';
import * as myConst from '../../Baseurl';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

const Sibling = ({ navigation }) => {
    const {token: usertoken} = useStudentAuth()
  const [stdRoll, setStdRoll] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔙 Handle back press
  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  // BackHandler mount/unmount
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  // Fetch siblings on mount
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      setStdRoll(value || '');
      siblingsApi(value);
    };
    fetchData();
  }, []);

  // API call
  const siblingsApi = async (roll) => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append('std_roll', roll);

      const response = await fetch(myConst.BASEURL + 'viewsiblings', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization' : usertoken
        },
        body: formData,
      });
   
      const responseJson = await response.json();
      console.log("respon",JSON.stringify(responseJson))
      setDataSource(responseJson?.siblings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Select sibling
  const onSelectSibling = async (item) => {
    await AsyncStorage.setItem('@id', String(item.id));
    await AsyncStorage.setItem('@class', item.Student_class);
    await AsyncStorage.setItem('@section', item.Student_section);
    await AsyncStorage.setItem('@name', item.Student_name);
    await AsyncStorage.setItem('@std_roll', item.std_roll);
    navigation.goBack();
  };

  // Render single sibling card
  const renderItem = ({ item }) => (
    <View style={style.FlatListView}>
      <View style={style.CardView}>
        <View style={style.CardViewStyle}>
          <View>
            <Image
              style={style.ProfileImage}
              source={require('../../../assests/images/businessman.png')}
            />
          </View>

          <View style={style.RowStyle}>
            <Text style={style.TextName}>{item?.Student_name}</Text>
            <View style={style.DetailStyle}>
              <Text style={style.TextDetails}>Adm No. :</Text>
              <Text style={style.TextRight}> {item?.std_roll}</Text>
            </View>
            <View style={style.DetailStyle}>
              <Text style={style.TextDetails}>Class :</Text>
              <Text style={style.TextRight}>
                {' '}
                {item?.Student_class}-{item?.Student_section}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => onSelectSibling(item)}>
            <View style={style.ArrowStyle}>
              <Image
                style={style.ArrowImage}
                source={require('../../../assests/images/r_arrow.png')}
              />
              {stdRoll === item?.std_roll ? (
                <Text style={style.TextName}>selected</Text>
              ) : (
                <Text style={style.TextName}>select</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={style.MainContainer}>
      <Header title={'Siblings'} goBack={() => navigation.goBack()} />

      <FlatList
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        refreshing={isLoading}
        onRefresh={() => siblingsApi(stdRoll)}
      />
    </View>
  );
};

export default Sibling;
