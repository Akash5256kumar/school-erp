import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  BackHandler,
  Keyboard,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import CommonSearch from '../../Search/CommonSearch';
import { useSelector } from 'react-redux';

const News = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const usertoken = useSelector(state=>state.userSlice.token)
  const [originalDataSource, setOriginalDataSource] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Back Press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  // Fetch News API
  const newsApi = async () => {
    setLoading(true);
    try {
      let response = await fetch(myConst.BASEURL + 'viewnews', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization' : usertoken
        },
      });
      let responseJson = await response.json();
      console.log('news--->>>', responseJson);

      if (responseJson?.data) {
        setDataSource(responseJson.data);
        setOriginalDataSource(responseJson.data);

        // set status (Publish / UnPublish)
        responseJson.data.forEach((item) => {
          if (item.isActive === 1) setStatus('Publish');
          else if (item.isActive === 0) setStatus('UnPublish');
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    newsApi();
  }, []);

  // Search Filter
  const onSearch = (text) => {
    const lowerText = text.toLowerCase();
    let filteredArr = originalDataSource.filter((obj) =>
      obj.news_title.toLowerCase().includes(lowerText)
    );
    setDataSource(text ? filteredArr : originalDataSource);
  };

  // Click Handler
  const fn_Click = (item) => {
    Keyboard.dismiss();
    if (!item?.link) {
      constant.showAlert('Oops, No Available ☹️');
    } else {
      Linking.openURL(item.link);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.FlatListView} onPress={() => fn_Click(item)}>
      <View style={styles.CardView}>
        <View style={styles.CardViewStyle}>
          <View style={styles.DocImageAndTextStyle}>
            <Image style={styles.AssignmentImage} source={constant.Icons.newsIcon} />
            <View style={styles.TextViewStyle}>
              <Text style={styles.DashboardTextStyle}>{item?.news_title}</Text>
              {/* <Text style={styles.DateText}>{moment(item?.news_date).format('DD-MM-YYYY')}</Text> */}
            </View>
          </View>

          <View style={styles.GreenStatusBackground}>
            <Image style={styles.eyeIcon} source={constant.Icons.newsEyeIcon} />
            {/* <Text style={styles.StatusText}>{status}</Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader title={'News'} onLeftClick={() => navigation.goBack()} />

        {/* Search */}
        <CommonSearch searchText={(d) => onSearch(d)} />

        {/* News List */}
        <FlatList
          data={dataSource}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </LinearGradient>
  );
};

export default News;
