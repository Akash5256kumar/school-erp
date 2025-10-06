import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  BackHandler,
  Alert,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as constant from '../../../Utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as myConst from '../../Baseurl';
import { useSelector } from 'react-redux';
const deviceWidth=Dimensions.get('window').width;


const HomeHeader = (props) => {
    const { navigation } = props
    const userData = useSelector(state=>state.userSlice.userData)
    const [greeting, setGreeting] = useState(getGreetingByTime());

useEffect(() => {
  const timer = setInterval(() => {
    setGreeting(getGreetingByTime());
  }, 60000); // check every minute

  return () => clearInterval(timer);
}, []);
  
    function getGreetingByTime(date = new Date()) {
        const hour = date.getHours();
      
        if (hour >= 5 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 17) return "Good Afternoon";
        return "Good Evening";
      }

  return (
    <LinearGradient colors={['#A902FE', '#5E3BF9']} style={styles.imageMainView}>
               <Pressable
                  style={styles.drawerButton}
                  onPress={() => navigation.openDrawer()}
                > 
                  <Image source={constant.Icons.drawer} resizeMode='contain'  tintColor={constant.whiteColor} style={styles.drawerIcon} />
                </Pressable>
              
              {/* <View style={styles.imageSubView}>
             
                <Image
                  style={styles.HeaderImage}
                  source={userData?.studentimage != '' ? {uri:'http://139.59.90.236:86/images/student_image/STUDENT/'+userData?.studentimage}  : require('../../../assests/images/businessman.png')}
                />
               
              </View> */}

              <View style={styles.detailView}>
                <View style={styles.imageSubView2}>
                  {/* <View style={styles.viewTop1}>
                    <Text style={styles.text1}>{greeting} </Text>
                    <Image
                      source={constant.Icons.hayIcon}
                      resizeMode="contain"
                      style={styles.hayIcon}
                    />
                  </View> */}
                  <Text style={styles.text2}>Hi {userData?.Student_name}</Text>
                  {/* <Text style={styles.text3}>
                  {userData?.Student_class}, Section-{userData?.Student_section}
                  </Text> */}
                </View>
               <View style={{
                flexDirection: 'row',
                alignItems:'center',
                gap:constant.resW(1)
               }}>
                <Pressable
                  style={styles.bellIconView}
                  onPress={() => navigation.navigate('News')}
                >
                  <Image source={constant.Icons.news} resizeMode='stretch' style={styles.bellIcon} />
                </Pressable>
                    {/* <Tab.Screen name='FortnightlyPlanner'
                    component={FortnightlyPlanner}
                    options={{
                        tabBarLabel: 'FortnightlyPlanner',
                        tabBarIcon: ({ color, size }) => (
                            <Image  source={constant.Icons.planner} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                        ),
                    }}
                /> */}
                <Pressable
                  style={styles.bellIconView}
                  onPress={() => navigation.navigate('ViewSupportSystem')}
                >
    <Image  source={constant.Icons.support} resizeMode='contain' style={{height:constant.resW(9),width:constant.resW(9)}} />
                </Pressable>

                <Pressable
                  style={styles.bellIconView}
                  
                  onPress={() => navigation.navigate('Notification')}
                >
                  <Image source={constant.Icons.bell} resizeMode='stretch' style={styles.bellIcon} />
                </Pressable>
                </View>
              </View>
            </LinearGradient>
  );
};

export default HomeHeader;


 const styles = StyleSheet.create({

    imageMainView:{
     backgroundColor:'#f4f4f4',
    //  marginHorizontal:'5%',
     flexDirection:'row',
     alignItems:'center',
     elevation:2,
     paddingHorizontal:constant.resW(4),
     paddingTop:constant.resW(1),
     paddingBottom:constant.resW(2)

    },
    imageSubView:{
        height:constant.resW(18),
        width:constant.resW(18),
        backgroundColor:'#ffffff40',
        borderRadius:constant.resW(40),
        justifyContent:'center',
        alignItems:'center',
       

    },
    imageSubView2:{
    //  marginLeft:'3%'
    },
    viewTop1:{
     flexDirection:'row',
     alignItems:'center'
    },
    text1:{
        color:constant.whiteColor,
        fontSize: constant.font18,
        fontFamily:constant.typeSemiBold,
    },
    text2:{
        color:constant.whiteColor,
        fontSize: constant.font20,
        fontFamily:constant.typeSemiBold,
        includeFontPadding:false
    },
    text3:{
        color:constant.whiteColor,
        fontSize: constant.font14,
        fontFamily:constant.typeMedium,
        includeFontPadding:false
    },
    hayIcon:{
        height:constant.resW(5),
        width:constant.resW(5),
    },
    HeaderImage:{
        height:constant.resW(15),
        width:constant.resW(15),
        borderRadius:constant.resW(40),

        // height: 25, width: 30, marginStart: 10
    },
    bellIcon:{
        height:constant.resW(8),
        width:constant.resW(8),
    },
    bellIconView:{
        height:constant.resW(10),
        width:constant.resW(10),
        // backgroundColor:'#ffffff10',
        borderRadius:constant.resW(30),
        alignItems:'center',
        justifyContent:'center',
    },
    detailView:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        // backgroundColor:'red',
        alignItems:'center'
    },
    drawerButton:{
    flex:0.15,
    height:constant.resW(13),
    justifyContent:'center',
    paddingLeft:constant.resW(1)
    // position:'absolute',
    // top:-constant.resW(3),
    // left:0
    },
    drawerButton2:{
        position:'absolute',
        top:-4,
        right:-4,
        height:constant.resW(4),
        width:constant.resW(4),
        borderRadius:constant.resW(10),
        backgroundColor:'#FFD14A'
        },
    drawerIcon:{
        height:constant.resW(6),
        width:constant.resW(6),
    },
    imageView:{
        height:constant.resW(18),
        width:constant.resW(18),
        borderRadius:constant.resW(50),
        backgroundColor:constant.whiteColor,
        alignItems:'center',
        justifyContent:'center',
    },
})