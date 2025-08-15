import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Pressable, // Use this directly instead of from Libraries
  StyleSheet,
  FlatList,
} from 'react-native';
// Removed unused imports for clarity
// import AsyncStorage from '@react-native-community/async-storage';
import * as constant from '../../../Utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import * as myConst from '../../Baseurl';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// --- FIX 1: Define constants for getItemLayout ---
// Calculate the total width of one item in the list (button + separator)
const ITEM_WIDTH = constant.resW(28); // from styles.listButton
const SEPARATOR_WIDTH = constant.resW(4); // from ItemSeparatorComponent
const HEADER_WIDTH = constant.resW(4); // from ListHeaderComponent
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + SEPARATOR_WIDTH;

const HomeTimeTable = (props) => {
    const { navigation } = props
    const userData = useSelector(state => state.userSlice.userData)
    const [sylabus, setSylabus] = useState([])
    const [schedule, setSchedule] = useState({})
    const [select, setSelect] = useState({ "active": 0, 'data': [] })
    const listRef = useRef(null)

    useEffect(() => {
        TransportApi()
    }, [])

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
                if (responseJson.status === true) {
                    const response = responseJson.data
                    // --- FIX 2: Use the API response directly, not the old state ---
                    const apiSchedule = response?.schedule || {};
                    setSchedule(apiSchedule);

                    const formattedDay = capitalizeFirstLetter(moment().format("dddd").trim().toLowerCase());
                    
                    if (formattedDay === 'Sunday') {
                        setSylabus(apiSchedule?.Monday || []);
                        setSelect({ active: 0, data: [] });
                        // No need to scroll on Sunday, it will default to Monday (index 0)
                    } else {
                        const weekNumber = dayNames.indexOf(formattedDay);
                        if (weekNumber !== -1) { // Ensure the day is in our list
                            const scheduleForDay = apiSchedule?.[formattedDay] || [];
                            setSylabus(scheduleForDay);
                            setSelect({ active: weekNumber, data: [] });

                            // Scroll to the current day
                            setTimeout(() => {
                                listRef.current?.scrollToIndex({ animated: true, index: weekNumber });
                            }, 1000); // A small delay can help ensure the list is ready
                        } else {
                          // Fallback if day is not found, e.g. Sunday
                           setSylabus(apiSchedule?.Monday || []);
                           setSelect({ active: 0, data: [] });
                        }
                    }
                } else { // Corrected 'staus' to 'status'
                    Snackbar.show({
                        text: responseJson.message,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: '#f15270'
                    });
                }
            })
            .catch((error) => console.log("API Error:", error))
    }

    function getScheduleForDay(day) {
        const formattedDay = capitalizeFirstLetter(day.trim().toLowerCase());
        return schedule[formattedDay] || [];
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fn_click = async (item, index) => {
        const scheduleForDay = getScheduleForDay(item);
        setSylabus(scheduleForDay);
        setSelect({ active: index, data: [] });
    }
    
    // --- FIX 1 (continued): Implement the getItemLayout function ---
    const getItemLayout = (data, index) => ({
      length: ITEM_WIDTH,
      offset: HEADER_WIDTH + (TOTAL_ITEM_WIDTH * index),
      index,
    });


    const renderList = ({ item, index }) => {
        return (
            <LinearGradient colors={select.active === index ? ['#A902FE', '#5E3BF9'] : ['#D9D9D9', '#D9D9D9']} style={styles.gradiantStyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                <Pressable style={styles.listButton} onPress={() => fn_click(item, index)} >
                    <Text style={select.active === index ? styles.listText : styles.listText2}>{item}</Text>
                </Pressable>
            </LinearGradient>
        )
    }

    const renderPeriodList = ({ item, index }) => {
        return (
            item?.type === 'Break' ?
                <View style={[styles.periodListView, { paddingVertical: constant.resW(1), backgroundColor: '#A902FE' }]}>
                    <Text style={styles.periodlistText3}>{item?.start}-{item?.end}</Text>
                    <Text style={styles.periodlistText4}>{item?.label}</Text>
                </View>
                :
                <View style={styles.periodListView}>
                    <Text style={styles.periodlistText}>{item?.start}-{item?.end}</Text>
                    <Text style={styles.periodlistText2}>{item?.subject}</Text>
                </View>
        )
    }

    return (
        <View style={styles.topMainView}>
            <View style={styles.listView}>
                <FlatList
                    ref={listRef}
                    horizontal
                    data={dayNames}
                    renderItem={renderList}
                    showsHorizontalScrollIndicator={false}
                    // --- FIX 1 (continued): Add getItemLayout to the FlatList props ---
                    getItemLayout={getItemLayout}
                    keyExtractor={(item) => item} // Always good practice to have a keyExtractor
                    ListHeaderComponent={() => <View style={{ width: constant.resW(4) }} />}
                    ItemSeparatorComponent={() => <View style={{ width: constant.resW(4) }} />}
                    ListFooterComponent={() => <View style={{ width: constant.resW(4) }} />}
                />
            </View>
            <View style={{ flex: 1, }}>
                <FlatList
                    data={sylabus}
                    numColumns={3}
                    renderItem={renderPeriodList}
                    keyExtractor={(item, index) => `${item.subject}-${index}`} // More robust key
                    columnWrapperStyle={{ alignSelf: 'flex-start', alignItems: 'flex-start' }}
                    contentContainerStyle={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => <View style={{ width: constant.resW(4) }} />}
                    ListFooterComponent={() => <View style={{ width: constant.resW(4) }} />}
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
    flex: 1, // Added flex: 1 to ensure it takes up space
  },
  
  listView:{
    // No changes needed
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
    paddingVertical:constant.resW(2),
    marginVertical:constant.resW(5),
    borderRadius:5,
    elevation:1,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  periodListView:{
  paddingVertical:constant.resW(2),
  alignSelf:'flex-start',
  justifyContent:'flex-start',
  width:constant.resW(31)
  },
  periodlistText:{
    color:constant.blackColor,
    fontSize: constant.font15,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center'
  },
  periodlistText2:{
    color:constant.blackColor,
    fontSize: constant.font13,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center',
    marginTop:constant.resW(1)
  },
  periodlistText3:{
    color:constant.whiteColor,
    fontSize: constant.font15,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center'
  },
  periodlistText4:{
    color:constant.whiteColor,
    fontSize: constant.font13,
    fontFamily:constant.typeSemiBold,
    alignSelf:'center',
    marginTop:constant.resW(1)
  },
   
})