import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Pressable,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from './style';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import CommonButton from '../../../components/Button/CommonButton';
import { saveUserData } from '../../Redux/Slice/userSlice';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {
  // State management with useState
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDob] = useState('');
  const [open, setOpen] = useState(false);
  const [admissionNo, setAdmissionNo] = useState('');
  const [ad_Visible, setAd_Visible] = useState(false);
  
  // State for device info, fetched on mount
  const [deviceVersion, setDeviceVersion] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [token, setToken] = useState('');

  // Effect for handling the hardware back press to exit the app
  useEffect(() => {
    const handleBackPress = () => {
      BackHandler.exitApp();
      return true; // Prevents default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    // Cleanup function to remove the event listener
    return () => backHandler.remove();
  }, []);

  // Effect for fetching initial device info and token on component mount
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const fcmToken = await AsyncStorage.getItem('@token');
        const Dversion = DeviceInfo.getSystemVersion();
        const Dname = DeviceInfo.getSystemName();
        const Dtype = DeviceInfo.getModel();

        console.log('version-->', Dversion);
        console.log('name-->', Dname);
        console.log('type-->', Dtype);
        console.log('token--->', fcmToken);

        setDeviceVersion(Dversion);
        setDeviceName(Dname);
        setDeviceType(Dtype);
        setToken(fcmToken || '');
      } catch (error) {
        console.error("Failed to fetch device info:", error);
      }
    };

    fetchDeviceInfo();
  }, []); // Empty dependency array ensures this runs only once

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };

  const showMessage = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270',
    });
  };

  const loginApi = async () => {
    if (admissionNo === '') {
      showMessage('Please enter admission number.');
      return;
    }
    if (dob === '') {
      showMessage('Please enter DOB.');
      return;
    }

    const loginData = {
      std_roll: admissionNo,
      password: moment(dob).format('YYYY-MM-DD'),
      deviceType: deviceType,
      deviceToken: token,
      deviceVersion: deviceVersion,
      deviceName: deviceName,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    };
    
    console.log("Login Request:", requestOptions);
    setIsLoading(true);

    try {
      const response = await fetch(myConst.BASEURL + 'login', requestOptions);
      const responseJson = await response.json();
      console.log('Login responseJson-->', responseJson);

      if (responseJson.status === true) {
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = formatAMPM(currentdate);

        await AsyncStorage.setItem('@id', String(responseJson.data.id));
        await AsyncStorage.setItem('userData', JSON.stringify(responseJson.data));
        await AsyncStorage.setItem('@class', responseJson.data.Student_class);
        await AsyncStorage.setItem('@section', responseJson.data.Student_section);
        await AsyncStorage.setItem('@name', responseJson.data.Student_name);
        await AsyncStorage.setItem('@std_roll', responseJson.data.std_roll);
        await AsyncStorage.setItem('@date', date);
        await AsyncStorage.setItem('@time', time);
        await AsyncStorage.setItem('@token', responseJson?.token);


         let data ={
            "token":"Bearer "+responseJson?.token,
            'data' : responseJson?.data
        }
        dispatch(saveUserData(data))
        
        navigation.navigate('Dashboard');
      } else {
        showMessage(responseJson.message);
      }
    } catch (error) {
      console.error("Login API Error:", error);
      showMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <DatePicker
        modal
        open={open}
        date={dob || new Date()}
        mode="date"
        title="Select Date of Birth"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDob(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.HomeScreenView}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View>
              <Image
                style={styles.loginImage}
                source={require('../../../assests/images/login_image.png')}
              />
            </View>
            <View style={styles.loginForm}>
              <Text style={styles.loginText}>Admission No.</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Type Admission Number"
                  placeholderTextColor={'#59597540'}
                  style={styles.TextInputStyleClass}
                  keyboardType="numeric"
                  returnKeyType="done"
                  secureTextEntry={ad_Visible}
                  value={admissionNo}
                  onChangeText={setAdmissionNo}
                />
                <Pressable onPress={() => setAd_Visible(!ad_Visible)}>
                  <Image
                    source={constant.Icons.newsEyeIcon}
                    style={styles.eyeIcon}
                  />
                </Pressable>
              </View>
              <View>
                <Text style={styles.loginText}>DOB</Text>
                <Pressable
                  onPress={() => setOpen(true)}
                  style={styles.inputView}>
                  <Text style={{ marginLeft: 20, color: dob ? 'black' : '#C7C7CD' }}>
                    {dob ? moment(dob).format('DD-MM-YYYY') : 'Select DOB'}
                  </Text>
                </Pressable>
              </View>
              <CommonButton
                title="Log in"
                extStyle={{ marginTop: '15%', marginHorizontal: '15%' }}
                buttonClick={loginApi}
                isLoading={isLoading}
              />
              <Text style={styles.staffLoginText}>
                If you are a Staff member than please{'\n'}click here to login
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('StaffLogin')}>
                <Text style={styles.staffLoginButton}>Staff Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Login;