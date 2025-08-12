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
import AsyncStorage from '@react-native-community/async-storage';
import * as constant from '../../../Utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as myConst from '../../Baseurl';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const HomeTimeTable = (props) => {
    const { navigation } = props
    const userData = useSelector(state=>state.userSlice.userData)
    const [sylabus,setSylabus] = useState([])
    const [schedule,setSchedule] = useState({})
    const [breakData,setBreakData] = useState([])
    const [select,setSelect] = useState({"active":0,'data':[]})

    useEffect(()=>{
      TransportApi()
    },[])

   function TransportApi() {
      let formData = new FormData()
      formData.append('std_class', userData?.Student_class)
      formData.append('std_section', userData?.Student_section)

      let data = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
          },
          body: formData
      }
      fetch(myConst.BASEURL + 'viewTimetable', data)
          .then((response) => response.json())
          .then(responseJson => {
              console.log('responseJson-->', JSON.stringify(responseJson))
              if (responseJson.status === true) {
                  const response = responseJson.data
                   setSchedule(response?.schedule)
                   console.log("moment ",moment(new Date()).format("DD"))

                   const formattedDay = capitalizeFirstLetter('Monday'.trim().toLowerCase());
                   const scheduleForDay = schedule[formattedDay] || [];

                   setSylabus(scheduleForDay.filter(s => s.type !== "Break"));
                   setBreakData(scheduleForDay.filter(s => s.type === "Break"));
                   setSelect({ active: 0, data: [] });
                
                 
              } else if (responseJson.staus === false) {

                  Snackbar.show({
                      text: responseJson.message,
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: '#f15270'
                  });
              }
          })
          .catch((error) => console.log(error))
          .finally(() => { })
  }

  function getScheduleForDay(day) {
    const formattedDay = capitalizeFirstLetter(day.trim().toLowerCase());
    return schedule[formattedDay] || [];
  }
  
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fn_click= async(item,index)=>{
    const scheduleForDay = getScheduleForDay(item);
    setSylabus(scheduleForDay.filter(s => s.type !== "Break"));
    setBreakData(scheduleForDay.filter(s => s.type === "Break"));
    setSelect({ active: index, data: [] });
  }

  const renderList=({item,index})=>{
    return(
        <LinearGradient colors={select.active === index ? ['#A902FE', '#5E3BF9'] :  ['#D9D9D9', '#D9D9D9']} style={styles.gradiantStyle} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
        <Pressable style={styles.listButton} onPress={()=>fn_click(item,index)} >
            <Text style={select.active === index ? styles.listText : styles.listText2}>{item}</Text>
        </Pressable>
        </LinearGradient>
    )
  }

  const renderPeriodList=({item,index})=>{
    return(
    <View style={styles.periodListView}>
        <Text style={styles.periodlistText}>{item?.start}-{item?.end}</Text>
        <Text style={styles.periodlistText2}>{item?.subject}</Text>
    </View>
    )
  }

  const fn_Seprator=()=>{
    return(
        <View style={{backgroundColor:'#A902FE'}}>
           <FlatList 
           data={[...breakData]}
           numColumns={4}
           renderItem={({item,index})=>{
            return(
                <View style={[styles.periodListView,{paddingVertical:constant.resW(1)}]}>
                <Text style={styles.periodlistText3}>{item?.start}-{item?.end}</Text>
                <Text style={styles.periodlistText4}>{item?.label}</Text>
            </View>  
            )
           }}
        //    contentContainerStyle={styles.listContainer}
           showsHorizontalScrollIndicator={false}
        //    ListHeaderComponent={()=><View style={{width:constant.resW(4)}}  />}
        //    ItemSeparatorComponent={()=>fn_Seprator()}
        //    ListFooterComponent={()=><View style={{width:constant.resW(4)}}  />}
           />


        </View>
    )
  }

  return (
    <View style={styles.topMainView}>
      <View style={styles.listView}>
        <FlatList
         horizontal
         data={dayNames}
         renderItem={renderList}
         showsHorizontalScrollIndicator={false}
         ListHeaderComponent={()=><View style={{width:constant.resW(4)}}  />}
         ItemSeparatorComponent={()=><View style={{width:constant.resW(4)}}  />}
         ListFooterComponent={()=><View style={{width:constant.resW(4)}}  />}

        />
      </View>
      <View style={{flex:1,}}>
        <FlatList
         data={sylabus}
         numColumns={3}
         renderItem={renderPeriodList}
         contentContainerStyle={styles.listContainer}
         showsHorizontalScrollIndicator={false}
         ListHeaderComponent={()=><View style={{width:constant.resW(4)}}  />}
         ItemSeparatorComponent={()=>fn_Seprator()}
         ListFooterComponent={()=><View style={{width:constant.resW(4)}}  />}
        />
      </View>

   </View>
  );
};

export default HomeTimeTable;


 const styles = StyleSheet.create({
  topMainView:{
    backgroundColor:constant.whiteColor,
    marginVertical:constant.resW(3),
   
  },
  
  listView:{

  },
  gradiantStyle:{
    borderRadius:constant.resW(20)
  },
  listButton:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:constant.resW(20),
 width:constant.resW(28),
  paddingVertical:constant.resW(1.5),
  
  },
  listText:{
    color:constant.whiteColor,
    fontSize: constant.font16,
    fontFamily:constant.typeMedium,
  },
  listText2:{
    color:constant.blackColor,
    fontSize: constant.font15,
    fontFamily:constant.typeMedium,
  },
  listContainer:{
    marginHorizontal:constant.resW(4),
    backgroundColor:constant.lightGrayColor,
    // paddingHorizontal:constant.resW(2),
    paddingVertical:constant.resW(2),
    marginVertical:constant.resW(5),
    borderRadius:5,
    elevation:1
  },
  periodListView:{
  flex:1,
  paddingVertical:constant.resW(2)
//   alignItems:'center'
  },
  periodlistText:{
    color:constant.blackColor,
    fontSize: constant.font15,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center'
  },
  periodlistText2:{
    color:constant.blackColor,
    fontSize: constant.font14,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center'
  },
  periodlistText3:{
    color:constant.whiteColor,
    fontSize: constant.font15,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center'
  },
  periodlistText4:{
    color:constant.whiteColor,
    fontSize: constant.font14,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center'
  },
   
})