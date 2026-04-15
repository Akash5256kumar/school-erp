import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DrawerNavigation from '../../DrawerNavigation';
import Achievement from '../Achievements/Achievement';
import Grade from '../Grade/Grade';
import FortnightlyPlanner from '../FortnightlyPlanner/FortnightlyPlanner';
import StudentPerformace from '../SPR/StudentPerformace';
import StudentBottomBar from './StudentBottomBar';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <StudentBottomBar {...props} />}
    >
      <Tab.Screen name="Achievement" component={Achievement} />
      <Tab.Screen name="Grade" component={Grade} />
      <Tab.Screen
        name="Home"
        component={DrawerNavigation}
        options={{unmountOnBlur: false}}
      />
      <Tab.Screen name="Help & Supports" component={FortnightlyPlanner} />
      <Tab.Screen name="StudentPerformace" component={StudentPerformace} />
    </Tab.Navigator>
  );
};

export default Dashboard;
