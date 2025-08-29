import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import styles from './style';
import * as myConst from '../../Baseurl';
import Header from '../../Header/Header';
import { useSelector } from 'react-redux';

const Transport = ({navigation}) => {
    const userData = useSelector(state=>state.userSlice.userData)
    const usertoken = useSelector(state=>state.userSlice.token)
  const [loading, setLoading] = useState(false);
  const [busNo, setBusNo] = useState('');
  const [incharge, setIncharge] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [routeName, setRouteName] = useState('');
  const [routeNo, setRouteNo] = useState('');
  const [stopName, setStopName] = useState('');
  const [stopNo, setStopNo] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverNo, setDriverNo] = useState('');
  const [stdRoll, setStdRoll] = useState('');

  // BackHandler
  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  // API call
  const TransportApi = useCallback(() => {
    let formData = new FormData();
    formData.append('std_roll', stdRoll);

    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
      },
      body: formData,
    };

    fetch(myConst.BASEURL + 'viewtransport', data)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === true) {
          const response = responseJson.data;
          setBusNo(response?.registration_no || '');
          setIncharge(response?.incharge_name || '');
          setContactNo(response?.contact_no || '');
          setRouteName(response?.route_name || '');
          setRouteNo(response?.route_no || '');
          setStopName(response?.stop_name || '');
          setStopNo(response?.stop_no || '');
          setPickUpTime(response?.pickup_point || '');
          setDropTime(response?.drop_point || '');
          setDriverName(response?.driver_name || '');
          setDriverNo(response?.driver_mobile_no || '');
        } else {
          Snackbar.show({
            text: responseJson.message || 'Something went wrong',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [stdRoll]);

  // ComponentDidMount equivalent
  useEffect(() => {
    const getRoll = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      setStdRoll(value || '');
    };
    getRoll();
  }, []);

  // Fetch data when stdRoll is set
  useEffect(() => {
    if (stdRoll) {
      TransportApi();
    }
  }, [stdRoll, TransportApi]);

  // BackHandler setup
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  return (
    <View style={styles.MainContainerStyle}>
      <Header
        title={'Transport'}
        goBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View>
          <View style={styles.RowStyle}>
            <View style={styles.BusTextStyle}>
              <Text style={styles.BusText}>Bus No.</Text>
              <Text style={styles.BusNoText}>{busNo}</Text>
            </View>
            <Image
              style={styles.BusImageStyle}
              source={require('../../../assests/images/blue_bus.png')}
            />
          </View>

          <View style={styles.HorizontalLine} />

          <View style={styles.detailsView}>
            <View style={styles.DetailsContainer}>
              <Image
                style={styles.ContainerImage}
                source={require('../../../assests/images/bus.png')}
              />
              <Text style={styles.ContainerText}>Bus Details</Text>
            </View>

            <View style={styles.RowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Incharge</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{incharge}</Text>
              </View>
            </View>

            <View style={styles.RowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Contact no.</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{contactNo}</Text>
              </View>
            </View>

            <View style={styles.DetailsContainer}>
              <Image
                style={styles.ContainerImage}
                source={require('../../../assests/images/route.png')}
              />
              <Text style={styles.ContainerText}>Route Details</Text>
            </View>

            <View style={styles.RowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Route no.</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{routeNo}</Text>
              </View>
            </View>

            <View style={styles.RowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Pick Up</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{pickUpTime}</Text>
              </View>
            </View>

            <View style={styles.RowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Drop</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{dropTime}</Text>
              </View>
            </View>

            <View style={styles.DetailsContainer}>
              <Image
                style={styles.ContainerImage}
                source={require('../../../assests/images/driver.png')}
              />
              <Text style={styles.ContainerText}>Driver Details</Text>
            </View>

            <View style={styles.RowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Driver Name</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{driverName}</Text>
              </View>
            </View>

            <View style={styles.LastRowStyle}>
              <View style={styles.InnerRowStyle}>
                <Text style={styles.LeftSideText}>Driver Mo. no.</Text>
                <Image
                  style={styles.ArrowImage}
                  source={require('../../../assests/images/right_arrow.png')}
                />
              </View>
              <View>
                <Text style={styles.RightSideText}>{driverNo}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Transport;
