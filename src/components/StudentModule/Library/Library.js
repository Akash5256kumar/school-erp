import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import * as myConst from '../../Baseurl';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import moment from 'moment';
import {resW, typeMedium} from '../../../Utils/Constant';
import { useSelector } from 'react-redux';

const Library = ({navigation, route}) => {
  const userData = useSelector(state=>state.userSlice.userData)
  const usertoken = useSelector(state=>state.userSlice.token)
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [stdRoll, setStdRoll] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [issueBookSource, setIssueBookSource] = useState([]);
  const [originalDataSource, setOriginalDataSource] = useState([]);
  const [issueBookOriginalSource, setIssueBookOriginalSource] = useState([]);
  const [active, setActive] = useState(true);

  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  useEffect(() => {
    const fetchData = async () => {
      let otherParam = route?.params?.otherParam;
      console.log('param-->', otherParam);

      const value = await AsyncStorage.getItem('@std_roll');
      console.log('value-->>', value);
      setStdRoll(value);

      if (otherParam === 'Books') {
        libraryApi(value);
        libraryBookIssueApi(value);
      }
    };

    fetchData();
  }, [route]);

  const libraryBookIssueApi = std_roll => {
    let formData = new FormData();
    formData.append('std_roll', std_roll);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'issueBook', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('issuebook>>', JSON.stringify(responseJson));
        if (responseJson.data !== undefined) {
          setIssueBookSource(responseJson.data);
          setIssueBookOriginalSource(responseJson.data);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const libraryApi = std_roll => {
    let formData = new FormData();
    formData.append('std_roll', std_roll);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'viewlibrary', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('library>>', responseJson);
        if (responseJson.data !== undefined) {
          setDataSource(responseJson.data);
          setOriginalDataSource(responseJson.data);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const onSearch = text => {
    console.log('serach-->', JSON.stringify(originalDataSource));
    let filteredArr = originalDataSource.filter(object =>
      object.title.toLowerCase().includes(text),
    );
    console.log('filter--->', filteredArr);
    setDataSource(text ? filteredArr : originalDataSource);
  };

  const toggleFunction = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <View style={styles.MainContainer}>
      <Header
        title={'Library'}
        goBack={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.buttonMainView}>
        <Pressable
          style={active ? styles.buttonStyle : styles.buttonStyle2}
          onPress={() => setActive(true)}>
          <Text style={active ? styles.buttonTextStyle : styles.buttonTextStyle2}>
            Issued Book
          </Text>
        </Pressable>
        <Pressable
          style={active ? styles.buttonStyle2 : styles.buttonStyle}
          onPress={() => setActive(false)}>
          <Text style={active ? styles.buttonTextStyle2 : styles.buttonTextStyle}>
            Library Book
          </Text>
        </Pressable>
      </View>

      {active ? (
        <View>
          <FlatList
            data={issueBookSource}
            renderItem={({item}) => (
              <View style={styles.CardView}>
                <View style={styles.CardViewStyle}>
                  <View style={styles.CircleShapeView}>
                    <Image
                      style={styles.AssignmentImage}
                      source={require('../../../assests/images/assignment.png')}
                    />
                  </View>
                  <View style={styles.TextViewStyle}>
                    <Text style={styles.DashboardTextStyle}>
                      {item?.book?.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: resW(1),
                      }}>
                      <Text style={styles.DateText}>
                        {moment(item?.issue?.issue_date).format('DD-MM-YYYY')}{' '}
                      </Text>
                      <View
                        style={{
                          width: resW(4),
                          backgroundColor: 'grey',
                          height: resW(0.4),
                          marginTop: resW(1),
                        }}
                      />
                      <Text style={styles.DateText}>
                        {' '}
                        {moment(item?.issue?.return_date).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                    {item?.issue?.fine > 0 && (
                      <Text
                        style={[
                          styles.DateText,
                          {
                            color: 'red',
                            marginTop: resW(1),
                            fontFamily: typeMedium,
                          },
                        ]}>
                        Fine: {item?.issue?.fine}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: resW(4)}} />}
            ListFooterComponent={() => <View style={{height: resW(4)}} />}
            ListHeaderComponent={() => <View style={{height: resW(1)}} />}
          />
        </View>
      ) : (
        <View>
          {isVisible ? (
            <View style={{marginBottom: resW(3)}}>
              <Searchbar onChangeSearch={text => onSearch(text)} />
            </View>
          ) : null}

          <FlatList
            data={dataSource}
            renderItem={({item}) => (
              <View style={styles.CardView}>
                <View style={styles.CardViewStyle}>
                  <View style={styles.DocImageAndTextStyle}>
                    <View style={styles.CircleShapeView}>
                      <Image
                        style={styles.AssignmentImage}
                        source={require('../../../assests/images/assignment.png')}
                      />
                    </View>
                    <View style={styles.TextViewStyle}>
                      <Text style={styles.DashboardTextStyle}>{item?.title}</Text>
                      <Text style={styles.DateText}>
                        Written by {item?.author_name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: resW(4)}} />}
            ListFooterComponent={() => <View style={{height: resW(4)}} />}
          />
        </View>
      )}

      {!active && (
        <View style={styles.FloatTabStyle}>
          <TouchableOpacity onPress={toggleFunction}>
            <Image
              style={styles.FloatIconStyle}
              source={require('../../../assests/images/loupe_icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Library;
