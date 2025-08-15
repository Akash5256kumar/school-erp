import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image, BackHandler, Pressable, FlatList, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './HomeScreenStyle';
import Header from '../../Header/Header';
import { LocaleConfig } from 'react-native-calendars';
import * as myConst from '../../Baseurl';
import moment from 'moment';
import { resW } from '../../../Utils/Constant';
import HomeCalender from './HomeCalender';
import AppCalender from '../../UIComponent/AppCalender';
import { useSelector } from 'react-redux';
import * as constant from '../../../Utils/Constant'
import HomeHeader from './HomeHeader';
import HomeTransport from './HomeTransport';
import HomeTimeTable from './HomeTimeTable';
import HomeMenu from './HomeMenu';


const HomeScreen = ({ navigation }) => {
    const userData = useSelector(state=>state.userSlice.userData)
   
    return (
        <SafeAreaView style={{flex:1,backgroundColor:constant.whiteColor}}>
            <StatusBar  backgroundColor={'#A902FE'} />
           <HomeHeader navigation={navigation} />
            <ScrollView>
              <View style={{flex:1}}>
               <HomeCalender />
               </View>
               <HomeTransport />
               <HomeTimeTable />
               <HomeMenu navigation={navigation}  />
        <View style={{height:constant.resW(15)}}  />
              
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
