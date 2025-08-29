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
import { useSelector } from 'react-redux';
import * as myConst from '../../Baseurl';

const listData = [
    {'key':1,'title':"Home Work",'pic':constant.Icons.studHomeImage,'path':'SubjectScreen'},
    {'key':2,'title':"Fee Due Details",'pic':constant.Icons.studFeeDue,'path':'FeeDueDetail'},
]

const HomeMenu = (props) => {
    const { navigation } = props
    const userData = useSelector(state=>state.userSlice.userData)
    const usertoken = useSelector(state=>state.userSlice.token)
    const [count,setCount] = useState(0)

    const fn_click=(item)=>{
        navigation.navigate(item?.path)
    }

    useEffect(()=>{
    dashboardApi()
    },[])

    const dashboardApi = useCallback((stdRoll, studentClass) => {
      let formData = {
        std_roll: userData?.std_roll,
        class: userData?.Student_class,
      };
      console.log('API Request:', formData);
  
      fetch(myConst.BASEURL + 'dashboard', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : usertoken
        },
        body: JSON.stringify(formData), // FIX: Must stringify for JSON body
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('API Response:', JSON.stringify(json));
         setCount(json.count)
        })
        .catch((error) => console.log(error));
    }, []);
   

  const renderList=({item,index})=>{
    return(
        <Pressable style={styles.listButton} onPress={()=>fn_click(item,index)} >
            <FastImage source={item?.pic} resizeMode='stretch' style={styles.buttonImage} />
            <Text style={ styles.listText }>{index === 0 ? "Today’s Total: "+count : item?.title}</Text>
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