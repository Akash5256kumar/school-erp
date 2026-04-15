import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {CircleUserRound} from 'lucide-react-native';

import * as constant from '../../../Utils/Constant';

const Header = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@name');
        const storedRole = await AsyncStorage.getItem('@role');
        if (storedName) { setName(storedName); }
        if (storedRole) { setRole(storedRole); }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const displayName = useMemo(() => {
    const trimmed = (name || 'User').trim();
    return `Hi, ${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1).toLowerCase()}`;
  }, [name]);

  return (
    <LinearGradient
      colors={['#5E3BF9', '#9B59F5', '#C471ED']}
      end={{x: 1, y: 1}}
      start={{x: 0, y: 0}}
      style={styles.headerContainer}>

      {/* Decorative circles */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <View style={styles.leftSection}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.navigate('StaffProfile')}
          style={styles.avatarRing}>
          <CircleUserRound color="#FFFFFF" size={24} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.textContent}>
          <Text style={styles.greetingLabel}>Welcome back 👋</Text>
          <Text numberOfLines={1} style={styles.greetingText}>
            {displayName}
          </Text>
          <Text numberOfLines={1} style={styles.roleText}>
            {role || 'Subject Incharge'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingBottom: 22,
    paddingHorizontal: 20,
    paddingTop: 14,
    shadowColor: '#5E3BF9',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.32,
    shadowRadius: 18,
  },
  decorCircle1: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 999,
    height: 120,
    position: 'absolute',
    right: -20,
    top: -40,
    width: 120,
  },
  decorCircle2: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    bottom: -30,
    height: 90,
    position: 'absolute',
    right: 50,
    width: 90,
  },
  leftSection: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
  },
  avatarRing: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 22,
    borderWidth: 1.5,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  textContent: {
    marginLeft: 12,
  },
  greetingLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontFamily: constant.typeRegular,
    fontSize: 11,
    letterSpacing: 0.3,
  },
  greetingText: {
    color: constant.whiteColor,
    fontFamily: constant.typeBold,
    fontSize: 18,
    letterSpacing: 0.2,
    marginTop: 1,
  },
  roleText: {
    color: 'rgba(255,255,255,0.82)',
    fontFamily: constant.typeRegular,
    fontSize: 12,
    marginTop: 2,
  },
  bellButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#FF4D5E',
    borderColor: constant.whiteColor,
    borderRadius: 8,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    top: -2,
    width: 16,
    zIndex: 2,
  },
  badgeText: {
    color: constant.whiteColor,
    fontFamily: constant.typeBold,
    fontSize: 9,
    lineHeight: 10,
  },
});

export default Header;
