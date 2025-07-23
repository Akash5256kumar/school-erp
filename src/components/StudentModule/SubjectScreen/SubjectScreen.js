import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  BackHandler,
  Pressable,
} from 'react-native';
import styles from './SubjectScreenStyle';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';

const data =[
    {"key":1,"topic":'English'},
    {"key":2,"topic":'Hindi'},
    {"key":3,"topic":'Math'},
    {"key":3,"topic":'Math'},
    {"key":3,"topic":'Math'},



]

const SubjectScreen = (props) => {
    const {navigation } = props
  const [dataSource, setDataSource] = useState([]);

  // Back button handler
  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  // Lifecycle events
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  const fn_ListClick=(item,index)=>{
    navigation.navigate('Assignment', {
            otherParam: 'Assignment',
        })
  }


  const renderItem = ({ item,index }) => (
      <Pressable style={styles.CardView} onPress={()=>fn_ListClick(item,index)}>
            <Image
              style={styles.AssignmentImage}
              source={constant.Icons.assignment}
            />
            <Text style={styles.DashboardTextStyle}>{item?.topic}</Text>      
      </Pressable>
  );

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader
          title={'Subject'}
          onLeftClick={() => {
            navigation.goBack();
          }}
        />

        <FlatList
          numColumns={3}
          data={data}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.listColumn}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={()=>constant.listSpace(constant.resW(3))}
        />
      </View>
    </LinearGradient>
  );
};

export default SubjectScreen;
