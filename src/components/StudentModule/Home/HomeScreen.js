import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {colors} from '../../../constants';
import * as constant from '../../../Utils/Constant';
import HomeCalender from './HomeCalender';
import HomeHeader from './HomeHeader';
import HomeMenu from './HomeMenu';
import HomeTimeTable from './HomeTimeTable';
import HomeTransport from './HomeTransport';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: constant.whiteColor, flex: 1}}>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{paddingBottom: constant.resW(15)}}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader navigation={navigation} />
        <HomeCalender />
        <HomeTransport />
        <HomeTimeTable />
        <HomeMenu navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
