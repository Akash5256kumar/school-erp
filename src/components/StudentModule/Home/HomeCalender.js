import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image, BackHandler, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './HomeScreenStyle';
import Header from '../../Header/Header';
import { LocaleConfig } from 'react-native-calendars';
import * as myConst from '../../Baseurl';
import moment from 'moment';
import { resW } from '../../../Utils/Constant';
import { useSelector } from 'react-redux';
import AppCalender from '../../UIComponent/AppCalender';

LocaleConfig.locales['en'] = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

const HomeCalender = ({ navigation }) => {
    const userData = useSelector(state=>state.userSlice.userData)
    const [markedDates, setMarkedDates] = useState({});
    const [strClass, setStrClass] = useState('');
    const [strSection, setStrSection] = useState('');
    const [strRollNo, setStrRollNo] = useState('');
    const [totalWorkingDays, setTotalWorkingDays] = useState('');
    const [totalPresentDays, setTotalPresentDays] = useState('');
    const [totalAbsentDays, setTotalAbsentDays] = useState('');
    const [active, setActive] = useState(true);
    const [eventMarkDate, setEventMarkDate] = useState({});
    const [eventData, setEventData] = useState([]);
    const [holidayData, setHolidayData] = useState([]);
    const [eventsResult, setEventsResult] = useState([]);
    const [loader, setLoader] = useState(false);
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [calendarKey, setCalendarKey] = useState(0);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));


 
    // Load data on mount
    useEffect(() => {
        (async () => {
            const classes = userData?.Student_class;
            const sectionn = userData?.Student_section;
            const rollno = userData?.std_roll;

            setStrClass(classes);
            setStrSection(sectionn);
            setStrRollNo(rollno);

            attendanceApi(moment().format("YYYY-MM-DD"), classes, sectionn, rollno);
        })();
    }, []);

    const attendanceApi = useCallback((dateString, cls = strClass, sec = strSection, roll = strRollNo) => {
        let formData = new FormData();
        formData.append('std_class', cls);
        formData.append('std_section', sec);
        formData.append('std_roll', roll);
        formData.append("date", dateString);
        console.log("formData",JSON.stringify(formData))

        fetch(myConst.BASEURL + 'viewattendance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then(res => res.json())
            .then(responseJson => {
                console.log('eventres',JSON.stringify(responseJson))
                const { attendancedate, holidays, absent_dates, event_dates, events, holiday_details } = responseJson;

                let rv = {};
                let rv2 = {};

                attendancedate.forEach(d => { rv[d] = { marked: true, dotColor: 'blue' }; });
                absent_dates.forEach(d => { rv[d] = { marked: true, dotColor: 'red' }; });

                holidays.forEach(d => { rv2[d] = { marked: true, dotColor: '#E35FAA' }; });
                event_dates.forEach(d => { rv2[d] = { marked: true, dotColor: '#01C7AE' }; });

                setMarkedDates(rv);
                setTotalWorkingDays(responseJson.totalworking_days);
                setTotalPresentDays(responseJson.totalpresentday);
                setTotalAbsentDays(responseJson.totalworking_days - responseJson.totalpresentday);
                setEventMarkDate(rv2);
                setEventData(events);
                setHolidayData(holiday_details);
            })
            .catch(error => console.log(error));
    }, [strClass, strSection, strRollNo]);

    const fnMonthClick = (data) => {
        setCurrentDate(data)
        attendanceApi(data);
        setEventsResult([]);
        setMarkedDates([])
        
    };

    const fnDayClick = (dayData) => {
        const inputDate = dayData?.dateString;
        setLoader(true);
        setSelectedDate(inputDate);

        const matchedEvents = eventData
            .filter(event => event.event_time === inputDate)
            .map(event => ({ ...event, type: "event" }));

        const matchedHolidays = holidayData
            .filter(holiday => holiday.holiday_date === inputDate)
            .map(holiday => ({ ...holiday, type: "holiday" }));

        setEventsResult([...matchedEvents, ...matchedHolidays]);
        setLoader(false);
    };

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const fnHolidayButton = () => {
        setActive(false);
        setCurrentDate(moment().format('YYYY-MM-DD'));
        setCalendarKey(prev => prev + 1);
        setSelectedDate(moment().format('YYYY-MM-DD'));
        
        attendanceApi(moment().format("YYYY-MM-DD"));
    };

    const getMarkedDatesForEventCalendar = () => {
        return {
            ...eventMarkDate,
            [selectedDate]: {
                ...(eventMarkDate[selectedDate] || {}),
                selected: true,
                selectedColor: '#007BFF',
            }
        };
    };

    function getOrdinal(n) {
        if (n > 3 && n < 21) return `${n}th`; // 11th, 12th, etc.
        switch (n % 10) {
          case 1: return `${n}st`;
          case 2: return `${n}nd`;
          case 3: return `${n}rd`;
          default: return `${n}th`;
        }
      }
      
      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = getOrdinal(date.getDate());
        const month = date.toLocaleString("en-US", { month: "long" });
      
        // if (dateString === "2025-08-23") {
        //   return `${day} `; // Special day
        // }
        return `${day} `;
      }

    return (
        <View style={styles.MainContainer}>

            <View style={styles.buttonMainView}>
                <Pressable
                    style={active ? styles.buttonStyle : styles.buttonStyle2}
                    onPress={() => {
                        setActive(true);
                        setCurrentDate(moment().format('YYYY-MM-DD'));
                        setCalendarKey(prev => prev + 1);
                        attendanceApi(moment().format("YYYY-MM-DD"));
                    }}
                >
                    <Text style={active ? styles.buttonTextStyle : styles.buttonTextStyle2}>Attendance</Text>
                </Pressable>
                <Pressable
                    style={active ? styles.buttonStyle2 : styles.buttonStyle}
                    onPress={fnHolidayButton}
                >
                    <Text style={active ? styles.buttonTextStyle2 : styles.buttonTextStyle}>Holiday & Event</Text>
                </Pressable>
            </View>

            <ScrollView>
                {active ? (
                    <View>
                        <AppCalender
                         markData={markedDates}
                         current={currentDate}
                         monthString={currentDate}
                         fn_ClickLeftArrow={(d)=>fnMonthClick(d)}
                         fn_ClickRightArrow={(d)=>fnMonthClick(d)}
                         onDateClick={(d)=>setSelectedDate(d?.dateString)}
                        />
                      
                      <View style={{marginHorizontal:resW(4),flexDirection:'row',marginTop:resW(2),marginBottom:resW(2)}}>
                        {/* <Text style={styles.dateStyle}>{formatDate(selectedDate)}{'\n'}{moment(selectedDate).format("MMMM")}</Text> */}
                        <View  style={{flex:1}}>

                        <View style={styles.TodayDaysView}>
                                <View style={styles.TotalWorkingDaysContainer}>
                                    <Text style={styles.TotalDaysText}>Total Present</Text>
                                    {totalPresentDays && 
                                    <View style={[styles.WorkingDaysBlueBackground]}>
                                        <Text style={styles.WorkingDaysNumberText}>{totalPresentDays}</Text>
                                    </View>}
                                </View>
                            </View> 

                             <View style={[styles.TodayDaysView,{marginTop:resW(2)}]}>
                                <View style={styles.TotalWorkingDaysContainer}>
                                    <Text style={styles.TotalDaysText}>Total Absent</Text>
                                    {totalAbsentDays && 
                                    <View style={[styles.WorkingDaysBlueBackground,{backgroundColor:'red'}]}>
                                        <Text style={styles.WorkingDaysNumberText}>{totalAbsentDays}</Text>
                                    </View>}
                                </View>
                            </View>    

                            <View style={[styles.TodayDaysView,{marginTop:resW(2)}]}>
                                <View style={styles.TotalWorkingDaysContainer}>
                                    <Text style={styles.TotalDaysText}>Total Working Days</Text>
                                   {totalWorkingDays && 
                                   <View style={[styles.WorkingDaysBlueBackground,{backgroundColor:'#A902FE'}]}>
                                        <Text style={styles.WorkingDaysNumberText}>{totalWorkingDays}</Text>
                                    </View>}
                                </View>
                            </View>  

                            
                          

                        </View>
                      </View>
                      
                       
                    </View>
                ) : (
                    <View>          
                        <AppCalender
                         markData={getMarkedDatesForEventCalendar()}
                         current={currentDate}
                         monthString={currentDate}
                         fn_ClickLeftArrow={(d)=>fnMonthClick(d)}
                         fn_ClickRightArrow={(d)=>fnMonthClick(d)}
                         onDateClick={(d)=>{
                            setSelectedDate(d?.dateString)
                            fnDayClick(d)
                         }}
                        />
                      { eventsResult.length >0 && <View style={{marginHorizontal:resW(4),flexDirection:'row',marginTop:resW(2),marginBottom:resW(2)}}>
                       <Text style={styles.dateStyle}>{formatDate(selectedDate)}{'\n'}{moment(selectedDate).format("MMMM")}</Text>

                        <View style={{flex:1}}>

                           
                                <FlatList
                                    data={eventsResult}
                                    renderItem={({ item }) => (
                                        <View style={[styles.eventCardView, { backgroundColor: item?.type === 'event' ? '#01C7AE' : "#E35FAA" }]}>
                                            <Text numberOfLines={1} style={styles.eventCartText}>
                                                {item?.type === 'event' ? capitalizeFirstLetter(item?.event_name) : capitalizeFirstLetter(item?.title)}
                                            </Text>
                                            {/* <Text style={styles.eventCartDes}>
                                                {item?.type === 'event' ? capitalizeFirstLetter(item?.event_description) : capitalizeFirstLetter(item?.holiday_de)}
                                            </Text> */}
                                        </View>
                                    )}
                                    ItemSeparatorComponent={()=><View style={{ height: resW(2) }} />}
                                    ListFooterComponent={() => <View style={{ height: resW(3) }} />}
                                />
                          
                        </View>
                        </View>}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default HomeCalender;
