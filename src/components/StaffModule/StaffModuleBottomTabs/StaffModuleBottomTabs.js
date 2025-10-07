import React, { Component } from 'react';
import { Text, View, Image, Pressable, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as constant from '../../../Utils/Constant';
import StaffHome from '../StaffHome/StaffHome';
import StaffProfile from '../StaffProfile/StaffProfile';
import StaffViewLeave from '../StaffViewLeave/StaffViewLeave';
import StaffSupportSystem from '../StaffSupportSystem/StaffSupportSystem';
import StaffLibrary from '../StaffLibrary/StaffLibrary';

const Tab = createBottomTabNavigator();

class StaffModuleBottomTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboardVisible: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener?.remove();
    this.keyboardDidHideListener?.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isKeyboardVisible: true });
  };

  _keyboardDidHide = () => {
    this.setState({ isKeyboardVisible: false });
  };

  render() {
    const baseTabBarStyle = {
      backgroundColor: constant.whiteColor,
      height: constant.resW(16),
      position: 'absolute',
      shadowColor: '#AC00FE',
      shadowOffset: { width: 60, height: 50 },
      shadowOpacity: 2,
      shadowRadius: 6,
      elevation: 10,
      borderTopColor: constant.whiteColor,
      borderTopWidth: 0,
    };

    const dynamicTabBarStyle = this.state.isKeyboardVisible
      ? { display: 'none' } // hides tab bar when keyboard appears
      : {};

    return (
      <Tab.Navigator
        initialRouteName="StaffHome"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: constant.font12,
            marginBottom: constant.resH(0.8),
            fontWeight: '600',
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
          tabBarStyle: [baseTabBarStyle, dynamicTabBarStyle],
        }}
      >
        <Tab.Screen
          name="Achievement"
          component={StaffLibrary}
          options={{
            tabBarLabel: 'library',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={constant.Icons.libraryIcon}
                resizeMode="contain"
                style={{
                  height: constant.resW(9),
                  width: constant.resW(9),
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Grade"
          component={StaffViewLeave}
          options={{
            tabBarLabel: 'leave',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={constant.Icons.leaveIcon}
                resizeMode="contain"
                style={{
                  height: constant.resW(9),
                  width: constant.resW(9),
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="StaffHome"
          component={StaffHome}
          options={{
            unmountOnBlur: false,
            tabBarButton: (props) => (
              <Pressable {...props} style={{ marginBottom: constant.resW(10) }}>
                <Pressable {...props}>
                  <Image
                    source={constant.Icons.homeIcon}
                    resizeMode="contain"
                    style={{
                      height: constant.resW(12),
                      width: constant.resW(12),
                    }}
                  />
                </Pressable>
              </Pressable>
            ),
          }}
        />

        <Tab.Screen
          name="Support"
          component={StaffSupportSystem}
          options={{
            tabBarLabel: 'Supports',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={constant.Icons.SupportIcon}
                resizeMode="contain"
                style={{
                  height: constant.resW(9),
                  width: constant.resW(9),
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="StaffProfile"
          component={StaffProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={constant.Icons.profileIcon}
                resizeMode="contain"
                style={{
                  height: constant.resW(9),
                  width: constant.resW(9),
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default StaffModuleBottomTabs;
