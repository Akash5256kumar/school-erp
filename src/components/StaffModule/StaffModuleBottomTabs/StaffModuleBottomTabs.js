import React, { Component } from 'react';
import { Text, View, Image,Pressable, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient';
import DrawerNavigation from '../../DrawerNavigation';
import Achievement from '../../StudentModule/Achievements/Achievement';
import FortnightlyPlanner from '../../StudentModule/FortnightlyPlanner/FortnightlyPlanner';
import Grade from '../../StudentModule/Grade/Grade';
import StudentPerformace from '../../StudentModule/SPR/StudentPerformace';
// import styles from './style';
// const baseColor = '#0747a6'
// import Home from '../Home/Home';
// import DrawerNavigation from '../../DrawerNavigation';
// import Multimedia from '../Multimedia/Multimedia';
// import Achievement from '../Achievements/Achievement';
// import HelpSupport from '../Help&Support/Help&Support';
// import ViewSupportSystem from '../ViewSupportSystem/ViewSupportSystem';
// import { TabBarAdvancedButton } from '../../TabBarButton/TabBarButton';
// import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import StaffHome from '../StaffHome/StaffHome';
import StaffProfile from '../StaffProfile/StaffProfile';
import StaffViewLeave from '../StaffViewLeave/StaffViewLeave';
import StaffSupportSystem from '../StaffSupportSystem/StaffSupportSystem';
import StaffLibrary from '../StaffLibrary/StaffLibrary';
// import Grade from '../Grade/Grade';
// import ProficiencyScreen from '../../../../proficiencyScreen'
// import FortnightlyPlanner from '../FortnightlyPlanner/FortnightlyPlanner';
// import StudentPerformace from '../SPR/StudentPerformace';
const Tab = createBottomTabNavigator();

class StaffModuleBottomTabs extends Component {

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
            initialRouteName= 'StaffHome'
            screenOptions={{
                headerShown: false, // ✅ This hides the top header for all bottom tab screens
                headerShown: false,
                tabBarShowLabel: true,
                 tabBarLabelStyle: {
      fontSize: constant.font12,
      marginBottom: constant.resH(0.8), // smaller space between icon and label
      fontWeight: '600',
    },
    tabBarIconStyle: {
      marginBottom: 0, // optional, keeps icon close to label
    },
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
                    component={StaffLibrary}
                    options={{
                        tabBarLabel: 'library',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={constant.Icons.libraryIcon} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />  

               <Tab.Screen name='Grade'
                    component={StaffViewLeave}
                    options={{
                        tabBarLabel: 'leave',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={constant.Icons.leaveIcon} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />


                  <Tab.Screen name='StaffHome'
                    // component={DrawerNavigation}
                    component={StaffHome}
                    options={{
                        unmountOnBlur: false,
                        tabBarButton: (props) => (
                        <Pressable {...props}  style={{marginBottom:constant.resW(10)}}>
                        {/* <LinearGradient colors={constant.LinearGradientColor} style={styles.startGradientView}> */}
                         <Pressable {...props} >
                          <Image
                            source={constant.Icons.homeIcon}
                            resizeMode='contain'
                            style={{
                              height: constant.resW(12),
                              width: constant.resW(12),
                            }}
                          />
                          </Pressable>
                        {/* </LinearGradient> */}
                        </Pressable>
                        )

                                      
                      }}
                  
                />  
                        {/* <Tab.Screen name='Help & Supports'
                    component={ViewSupportSystem}

                    // component={HelpSupport}
                    options={{
                        tabBarLabel: 'Help & Supports',
                        tabBarIcon: ({ color, size }) => (
                            <Image  source={constant.Icons.support} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                /> */}
              
                <Tab.Screen name='Support'
                    component={StaffSupportSystem}

                    // component={HelpSupport}
                    options={{
                        tabBarLabel: 'Supports',
                        tabBarIcon: ({ color, size }) => (
                            <Image  source={constant.Icons.SupportIcon} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />
                  <Tab.Screen name='StaffProfile'
                    component={StaffProfile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Image  source={constant.Icons.profileIcon} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                />

            </Tab.Navigator>
        )
    }
}

export default StaffModuleBottomTabs;