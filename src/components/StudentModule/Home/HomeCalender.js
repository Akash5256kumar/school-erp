import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable, FlatList } from 'react-native';
import styles from './HomeScreenStyle';
import { LocaleConfig } from 'react-native-calendars';
import * as myConst from '../../Baseurl';
import moment from 'moment';
import { resW } from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
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
    const {token: usertoken, userData} = useStudentAuth();
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
        if (!usertoken || !userData?.Student_class || !userData?.Student_section || !userData?.std_roll) {
            return;
        }

        (async () => {
            const classes = userData?.Student_class;
            const sectionn = userData?.Student_section;
            const rollno = userData?.std_roll;

            setStrClass(classes);
            setStrSection(sectionn);
            setStrRollNo(rollno);

            attendanceApi(moment().format("YYYY-MM-DD"),1, classes, sectionn, rollno);
        })();
    }, [usertoken, userData?.Student_class, userData?.Student_section, userData?.std_roll]);

    const attendanceApi = useCallback((dateString,type, cls = strClass, sec = strSection, roll = strRollNo) => {
        setLoader(true)
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
                'Authorization' : usertoken
            },
            body: formData
        })
            .then(res => res.json())
            .then(responseJson => {
                console.log('eventres',JSON.stringify(responseJson))
                const { attendancedate = [], holidays = [], absent_dates = [], event_dates = [], events = [], holiday_details = [], totalworkindays_inmonth, monthtotal_presentdata } = responseJson;

                let rv = {};
                let rv2 = {};

                attendancedate.forEach(d => { rv[d] = { marked: true, dotColor: 'blue' }; });
                absent_dates.forEach(d => { rv[d] = { marked: true, dotColor: 'red' }; });

                holidays.forEach(d => { rv2[d] = { marked: true, dotColor: '#E35FAA' }; });
                event_dates.forEach(d => { rv2[d] = { marked: true, dotColor: '#01C7AE' }; });

                setMarkedDates(rv);
                setTotalWorkingDays(totalworkindays_inmonth);
                setTotalPresentDays(monthtotal_presentdata);
                setTotalAbsentDays(totalworkindays_inmonth - monthtotal_presentdata);
                setEventMarkDate(rv2);
                setEventData(events);
                setHolidayData(holiday_details);
               
                if(type == 2){
                    setSelectedDate(dateString);
                    const matchedEvents = events
                        .filter(event => event.event_time === dateString)
                        .map(event => ({ ...event, type: "event" }));
                        console.log("asdf"+JSON.stringify(events))
                    const matchedHolidays = holiday_details
                        .filter(holiday => holiday.holiday_date === dateString)
                        .map(holiday => ({ ...holiday, type: "holiday" }));
                    setEventsResult([...matchedEvents, ...matchedHolidays]); 
                }
            })
            .catch(error => console.log(error)).finally(()=>setLoader(false))
    }, [strClass, strSection, strRollNo]);

    const fnMonthClick = (data) => {
        setCurrentDate(data)
        attendanceApi(data,1);
        // setEventsResult([]);
        setMarkedDates([])
        
    };

    const fnDayClick = (dayData) => {
        const inputDate = dayData;
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
        
        attendanceApi(moment().format("YYYY-MM-DD"),2);
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
                        attendanceApi(moment().format("YYYY-MM-DD"),1);
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

            {active ? (
                    <View>
                        <View style={styles.calendarCard}>
                            <AppCalender
                             markData={markedDates}
                             current={selectedDate}
                             monthString={currentDate}
                             fn_ClickLeftArrow={(d)=>fnMonthClick(d)}
                             fn_ClickRightArrow={(d)=>fnMonthClick(d)}
                             onDateClick={(d)=>setSelectedDate(d?.dateString)}
                             loader={loader}
                            />
                        </View>

                        <View style={styles.summaryGrid}>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryLabel}>Present Days</Text>
                                <View style={styles.summaryValuePill}>
                                    <Text style={styles.summaryValueText}>{totalPresentDays || 0}</Text>
                                </View>
                            </View>

                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryLabel}>Absent Days</Text>
                                <View style={[styles.summaryValuePill, styles.summaryDangerPill]}>
                                    <Text style={styles.summaryValueText}>{totalAbsentDays || 0}</Text>
                                </View>
                            </View>

                            <View style={[styles.summaryCard, styles.summaryCardWide]}>
                                <Text style={styles.summaryLabel}>Working Days</Text>
                                <View style={[styles.summaryValuePill, styles.summaryAccentPill]}>
                                    <Text style={styles.summaryValueText}>{totalWorkingDays || 0}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>          
                        <View style={styles.calendarCard}>
                            <AppCalender
                             markData={getMarkedDatesForEventCalendar()}
                             current={selectedDate}
                             monthString={currentDate}
                             fn_ClickLeftArrow={(d)=>fnMonthClick(d)}
                             fn_ClickRightArrow={(d)=>fnMonthClick(d)}
                             loader={loader}
                             onDateClick={(d)=>{
                                setSelectedDate(d?.dateString)
                                fnDayClick(d?.dateString)
                             }}
                            />
                        </View>

                        <View style={styles.eventsPanel}>
                            <View style={styles.eventsPanelHeader}>
                                <Text style={styles.eventsDayText}>{formatDate(selectedDate)}</Text>
                                <Text style={styles.eventsMonthText}>{moment(selectedDate).format("MMMM")}</Text>
                            </View>

                            {eventsResult.length > 0 ? (
                                <FlatList
                                    data={eventsResult}
                                    renderItem={({ item }) => (
                                        <View style={[
                                            styles.eventCardView,
                                            item?.type === 'event' ? styles.eventCardSuccess : styles.eventCardHoliday,
                                        ]}>
                                            <Text numberOfLines={1} style={styles.eventCartText}>
                                                {item?.type === 'event'
                                                    ? capitalizeFirstLetter(item?.event_name)
                                                    : capitalizeFirstLetter(item?.title)}
                                            </Text>
                                        </View>
                                    )}
                                    ItemSeparatorComponent={() => <View style={styles.eventSeparator} />}
                                    ListFooterComponent={() => <View style={styles.eventFooter} />}
                                    scrollEnabled={false}
                                />
                            ) : (
                                <View style={styles.emptyEventsCard}>
                                    <Text style={styles.noEventText}>No holiday or event scheduled for this day.</Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
        </View>
    );
};

export default HomeCalender;
