import React, { useEffect } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { resW } from '../Utils/Constant';
import { useDispatch } from 'react-redux';
import { saveUserData } from './Redux/Slice/userSlice';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserData = async () => {
      console.log('splash screen');

      const value = await AsyncStorage.getItem('@std_roll');
      const role = await AsyncStorage.getItem('@role');
      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('@token');

    console.log("token",token)
      if (userData !== null) {
        let data ={
            "token":"Bearer "+token,
            'data' : JSON.parse(userData)
        }
        dispatch(saveUserData(data))
        // You can store this in Redux if needed
      }

      console.log('rollno->', value);

      if (value !== null) {
        navigation.navigate('Dashboard');
        console.log('student');
      } else if (role !== null) {
        navigation.navigate('StaffHome');
        console.log('staff');
      } else {
        navigation.navigate('Login');
        console.log('loginnnnn');
      }
    };

    const timer = setTimeout(checkUserData, 8000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logoImage}
          source={require('../assests/images/new_logo.png')}
        />
      </View>
      <View style={styles.gifContainer}>
        <FastImage
          style={styles.gif}
          source={require('../assests/images/splash.gif')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  logoImage: {
    marginTop: Platform.OS === 'ios' ? resW(10) : 0,
  },
  gifContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
