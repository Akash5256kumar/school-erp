import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
const baseColor = '#0747a6';
import * as myConst from '../../Baseurl';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import moment from 'moment';

const Holiday = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState('');
  const [originalDataSource, setOriginalDataSource] = useState([]);

  useEffect(() => {
    holidayApi();
  }, []);

  const holidayApi = () => {
    setLoading(true);

    fetch(myConst.BASEURL + 'viewholiday', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('holiday>>', responseJson.data);
        setDataSource(responseJson.data);
        setOriginalDataSource(responseJson.data);

        responseJson.data.forEach((item) => {
          if (item.isActive === 1) {
            setStatus('Publish');
          } else if (item.isActive === 0) {
            setStatus('UnPublish');
          }
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const onSearch = (text) => {
    console.log('on search =>', text);
    let filteredArr = originalDataSource.filter((object) =>
      object.holiday_de.toLowerCase().includes(text.toLowerCase())
    );
    console.log('filter--->', filteredArr);
    setDataSource(text ? filteredArr : originalDataSource);
  };

  const toggleFunction = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <View style={styles.MainContainer}>
      <Header title="Holiday" goBack={() => navigation.goBack()} />

      {isVisible && (
        <Searchbar onChangeSearch={(text) => onSearch(text)} />
      )}

      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={styles.FlatListView}>
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
                    <Text style={styles.DashboardTextStyle}>{item?.holiday_de}</Text>
                    <Text style={styles.DateText}>
                      {moment(item?.holiday_date).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                </View>

                {/* Uncomment if you want to display status */}
                {/* <View style={styles.GreenStatusBackground}>
                  <Text style={styles.StatusText}>{status}</Text>
                </View> */}
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.FloatTabStyle}>
        <TouchableOpacity onPress={toggleFunction}>
          <Image
            style={styles.FloatIconStyle}
            source={require('../../../assests/images/loupe_icon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Holiday;
