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
  FlatList,
} from 'react-native';
import * as constant from '../../../Utils/Constant';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import FastImage from 'react-native-fast-image';

const listData = [
    {'key':1,'title':"Today’s Total: 5",'pic':constant.Icons.studHomeImage,'path':'SubjectScreen'},
    {'key':2,'title':"Due Fee : APR-JUN",'pic':constant.Icons.studFeeDue,'path':'FeeDueDetail'},
]

const HomeMenu = (props) => {
    const { navigation } = props

    const fn_click=(item)=>{
        navigation.navigate(item?.path)
    }
   

  const renderList=({item,index})=>{
    return(
        <Pressable style={styles.listButton} onPress={()=>fn_click(item,index)} >
            <FastImage source={item?.pic} resizeMode='stretch' style={styles.buttonImage} />
            <Text style={ styles.listText }>{item?.title}</Text>
        </Pressable>
    )
  }


  return (
    <View style={styles.topMainView}>
      <View style={styles.listView}>
        <FlatList
         data={listData}
         numColumns={2}
         renderItem={renderList}
         showsHorizontalScrollIndicator={false}
         columnWrapperStyle={{justifyContent:'space-between'}}
         ListHeaderComponent={()=>{return(<View style={{height:constant.resW(0)}}  />)}}
         ItemSeparatorComponent={()=>{return(<View style={{height:constant.resW(4)}}  />)}}
         ListFooterComponent={()=>{return(<View style={{height:constant.resW(10)}}  />)}}

        />
      </View>
     

   </View>
  );
};

export default HomeMenu;


 const styles = StyleSheet.create({
  topMainView:{
    backgroundColor:constant.whiteColor,
    marginVertical:constant.resW(0),
   
  },
  
  listView:{
  marginHorizontal:constant.resW(4)
  },
 
  listButton:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:4,
  paddingVertical:constant.resW(4),
  flex:0.47,
  borderWidth:1,
  borderColor:constant.baseColor,
  
  },
  buttonImage:{
  height:constant.resW(27),
  width:constant.resW(27)
  },
  listText:{
    color:constant.blackColor,
    fontSize: constant.font14,
    fontFamily:constant.typeSemiBold,
  },
 
   
})