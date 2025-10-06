import React, { useEffect } from 'react';
import { Image, Platform, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { resH, resW } from '../Utils/Constant';
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

      console.log("token===========>", token)
      if (userData !== null) {
        let data = {
          "token": "Bearer " + token,
          'data': JSON.parse(userData)
        }
        dispatch(saveUserData(data))
      }
      console.log('rollno->', value);
      if (value !== null) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
        console.log('student');
      } else if (role !== null) {
        // navigation.navigate('StaffHome');
        navigation.reset({
          index: 0,
          routes: [{ name: 'StaffModuleBottomTabs' }],
        });
        console.log('staff');
      } else {
        // navigation.navigate('Login');
        navigation.reset({
          index: 0,
          routes: [{ name: 'RoleSelectionScreen' }],
        });
        console.log('loginnnnn');
      }
    };

    const timer = setTimeout(checkUserData, 4000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        {/* <Image
          style={styles.logoImage}
          source={require('../assests/images/new_logo.png')}
        /> */}
        <FastImage
          style={styles.logoImage}
          source={require('../assests/Icons/logo.png')} />
        <Text style={styles.welcometext}>
          Welcome To

        </Text>
        <Text style={styles.text}>
          Satyug Darshan{'\n'}Vidyalaya

        </Text>
        <Text style={styles.text}>
          App

        </Text>

      </View>
      <View style={styles.gifContainer}>

        <Text style={[styles.subtext,]}>Powered by</Text>



        <Image
          style={styles.gif}
          source={require('../assests/Icons/spalshImg.png')}
        // resizeMode="contain"
        />

        <ActivityIndicator size={'small'} color={'#D7D8D8'} />

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFFFF',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  innercontainer: {
    alignItems: "center",
  },
  logoImage: {
    marginTop: Platform.OS === 'ios' ? resW(15) : resW(15),
    width: resW(55),
    height: resW(55),
    resizeMode: "contain",

  },
  gifContainer: {
    width: '60%',
    // height:resH(80),
    alignItems: 'center',
    // backgroundColor: "red",
    marginTop: resW(1),
  },
  gif: {
    width: '100%',
    height: resH(30),
    resizeMode: "cover",
    // marginBottom:-resH(17)
    // marginVertical: resW(1.5),
    // backgroundColor: "red"
  },
  subtext: {
    marginTop: resH(5),
    fontSize: resW(4.5),
    color: '#475560',
    marginBottom: -resW(7),
  },
  companyText: {
    fontSize: resW(4.5),
    color: '#333',
    fontWeight: '500',
  },
  welcometext: {
    fontSize: resW(7.2),
    color: '#475560',
    fontWeight: '500',
    marginHorizontal: resW(3),
    textAlign: "center",

  },
  text: {
    fontSize: resW(7.5),
    color: '#475560',
    fontWeight: '500',
    // marginHorizontal: resW(3),
    textAlign: "center",
    marginTop: resW(0),
    lineHeight: resW(7.5) * 1.5
    //  lineHeight:resH(2)
  },

});

export default Splash;
