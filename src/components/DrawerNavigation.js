import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './StudentModule/Home/Home';
import SideBar from './SideBar';
import HomeScreen from './StudentModule/Home/HomeScreen';

const Drawer = createDrawerNavigator();

class DrawerNavigation extends Component {
  render() {
    // return (
    //   <Drawer.Navigator
    //     drawerType='slide'
    //     drawerContent={() => <SideBar />}>
    //     <Drawer.Screen name="Home" component={Home} />
    //   </Drawer.Navigator>
    // );

    return (
      <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
        // drawerType='slide'
        drawerContent={(props) => <SideBar {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    );
  }
};

export default DrawerNavigation;