import React, { Component } from 'react';
import { Text, View, Image,Pressable, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styles from './style';
const baseColor = '#0747a6'
import Home from '../Home/Home';
import DrawerNavigation from '../../DrawerNavigation';
import Multimedia from '../Multimedia/Multimedia';
import Achievement from '../Achievements/Achievement';
import HelpSupport from '../Help&Support/Help&Support';
import ViewSupportSystem from '../ViewSupportSystem/ViewSupportSystem';
import { TabBarAdvancedButton } from '../../TabBarButton/TabBarButton';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import Grade from '../Grade/Grade';
import FortnightlyPlanner from '../FortnightlyPlanner/FortnightlyPlanner';
const Tab = createBottomTabNavigator();

class Dashboard extends Component {

   active(focus){
        if(app_Theme==="light"){
         if(focus===true) return('#000000')
         else return('#48535680')       
        }else{
         if(focus===true) return('#ffffff')
           else return('#ffffff80')
        }
     }

    render() {
        return (
            <Tab.Navigator
            initialRouteName= 'Home'
            screenOptions={{
                headerShown: false, // ✅ This hides the top header for all bottom tab screens
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                  backgroundColor: constant.whiteColor,
                  height: constant.resW(16), // ⬅ Increase height here
                  position: 'absolute',
                  shadowColor: '#AC00FE',
                  shadowOffset: { width: 60, height: 50 },
                  shadowOpacity: 2,
                  shadowRadius: 6,
                  elevation: 10,
                  borderTopColor: constant.whiteColor,
                  borderTopWidth: 0,
                },
              }}
                tabBarOptions={{
                    showLabel: false,
                    keyboardHidesTabBar: true,
                    // style: {
                    //     backgroundColor: constant.whiteColor,
                    //     height: constant.resW(24),
                    //     borderTopRightRadius:20,
                    //     borderTopLeftRadius:20,
                    //     position:'absolute',
                    //     shadowColor:  '#AC00FE',
                    //     shadowOffset: { width: 60, height: 50 },
                    //     shadowOpacity: 2,
                    //     shadowRadius: 6,  
                    //     elevation: 10,
                    //     borderTopColor:constant.whiteColor,
                    //     borderTopWidth:0,
                    //     paddingVertical:constant.resW(5)
                       
                    // }
                }}>

                    <Tab.Screen name='Achievement'
                    component={Achievement}
                    options={{
                        tabBarLabel: 'Achievement',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={constant.Icons.achivement} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />  

               <Tab.Screen name='Grade'
                    component={Grade}
                    options={{
                        tabBarLabel: 'Grade',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={constant.Icons.grade} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />


                  <Tab.Screen name='Home'
                    component={DrawerNavigation}
                    options={{
                        unmountOnBlur: false,
                        tabBarButton: (props) => (
                        <Pressable {...props}  style={[styles.button,{marginTop:-constant.resW(7.5)}]}>
                        <LinearGradient colors={constant.LinearGradientColor} style={styles.startGradientView}>
                         <Pressable {...props} style={[styles.button,{}]}>
                          <Image
                            source={constant.Icons.house}
                            resizeMode='contain'
                            style={{
                              height: constant.resW(9),
                              width: constant.resW(9),
                            }}
                          />
                          </Pressable>
                        </LinearGradient>
                        </Pressable>
                        )

                                      
                      }}
                  
                />
                
                
                <Tab.Screen name='FortnightlyPlanner'
                    component={FortnightlyPlanner}
                    options={{
                        tabBarLabel: 'FortnightlyPlanner',
                        tabBarIcon: ({ color, size }) => (
                            <Image  source={constant.Icons.planner} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />
                <Tab.Screen name='Help & Supports'
                    component={ViewSupportSystem}

                    // component={HelpSupport}
                    options={{
                        tabBarLabel: 'Help & Supports',
                        tabBarIcon: ({ color, size }) => (
                            <Image  source={constant.Icons.support} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />

            </Tab.Navigator>
        )
    }
}

export default Dashboard;