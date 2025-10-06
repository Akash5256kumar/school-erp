import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as constant from '../../../Utils/Constant';
import { resW,resH } from '../../../Utils/Constant';
const Header = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@name');
        const storedRole = await AsyncStorage.getItem('@role');
        if (storedName) setName(storedName); 
        if (storedRole) setRole(storedRole);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  return (
    <LinearGradient
      colors={['#F51717', '#E6F248']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('StaffProfile')}>
          <Image
            source={constant.Icons.profileIcon}
            style={styles.userImage}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: resW(2) }}>
          <Text style={styles.greetingText}>
            Hi {name ? name : 'User'}!
          </Text>
          <Text style={styles.roleText}>{role || 'Role'}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image
          source={constant.Icons.notificationIcon}
          style={styles.bellIcon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: resW(4),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: resW(10),
    height: resW(10),
    borderRadius: 100,
  },
  greetingText: {
    fontWeight: 'bold',
    fontSize: constant.font18,
    color: constant.whiteColor,
  },
  roleText: {
    fontSize: constant.font16,
    color: constant.whiteColor,
  },
  bellIcon: {
    width: constant.resW(10),
    height: constant.resW(10),
  },
});

export default Header;
