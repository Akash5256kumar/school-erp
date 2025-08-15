import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import * as myConst from '../../Baseurl';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import CommonSearch from '../../Search/CommonSearch';

const Multimedia = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState('');
  const [section, setSection] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [originalDataSource, setOriginalDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const classValue = await AsyncStorage.getItem('@class');
      const sectionValue = await AsyncStorage.getItem('@section');
      console.log('value-->>', classValue);
      setClasses(classValue);
      setSection(sectionValue);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (classes && section) {
      multimediaApi(classes, section);
    }
  }, [classes, section]);

  const multimediaApi = (classValue, sectionValue) => {
    console.log(classValue);
    setLoading(true);

    let formData = new FormData();
    formData.append('std_class', classValue);
    formData.append('std_section', sectionValue);

    fetch(myConst.BASEURL + 'viewvideo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('video--->>>', responseJson);
        setDataSource(responseJson.data);
        setOriginalDataSource(responseJson.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const onSearch = (text) => {
    console.log('on search', text);
    let filteredArr = originalDataSource.filter((object) =>
      object.chapter.toLowerCase().includes(text.toLowerCase())
    );
    console.log('filter--->', filteredArr);
    setDataSource(text ? filteredArr : originalDataSource);
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader title="Multimedia" onLeftClick={() => navigation.goBack()} />
        <CommonSearch searchText={(d) => onSearch(d.toLowerCase())} />

        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.CardView}>
              <View style={styles.CardViewStyle}>
                <Pressable
                  style={styles.DocImageAndTextStyle}
                  onPress={() =>
                    navigation.navigate('Video', {
                      otherParam: item.videouri,
                    })
                  }
                >
                  <View style={styles.VideoView}>
                    <View style={styles.logo}>
                      <Image
                        source={require('../../../assests/images/playicon.png')}
                        resizeMode="contain"
                        style={styles.mediaIcon}
                      />
                    </View>
                  </View>
                  <View style={styles.TextViewStyle}>
                    <Text style={styles.DashboardTextStyle}>{item?.chapter}</Text>
                    <Text style={styles.DateText}>{item?.topic}</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default Multimedia;
