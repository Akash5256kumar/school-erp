import React, { Component } from 'react';
import { Text, View, ScrollView, Image, BackHandler, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";
import { getPersistedStudentToken } from '../../../auth/studentSessionController';
import styles from './style';
const baseColor = '#0747a6'
import Header from '../../Header/Header';
import { LocaleConfig } from 'react-native-calendars';
import * as myConst from '../../Baseurl';
import moment from 'moment';
import { resW } from '../../../Utils/Constant';
const testIDs = require('../../testIDs');


LocaleConfig.locales['en'] = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

class Attendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markedDates: {
                // [new Date()]: {
                //     selected: true,
                //     selectedColor: '#DFA460'
                // }
            },
            str_class: '',
            str_section: '',
            str_rollno: '',
            totalWorkingDays: '',
            total_present_days: '',
            total_absent_days: '',
            active:true,
            eventMarkDate:{},
            eventData:[],
            holidayData:[],
            eventsResult:[],
            loader:false,
            currentDate:moment().format('YYYY-MM-DD'),
            calendarKey:0,
            selectedDate: moment().format('YYYY-MM-DD'),
        }
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Dashboard')
        return true;
    };
    

    async componentDidMount() {
        const classes = await AsyncStorage.getItem('@class')
        const sectionn = await AsyncStorage.getItem('@section')
        const rollno = await AsyncStorage.getItem('@std_roll')
        // console.log('value-->>', sectionn)
        this.setState({
            str_class: classes,
            str_section: sectionn,
            str_rollno: rollno
        })
        this.attendanceApi(moment().format("YYYY-MM-DD"));
    }

    fn_MonthClick(data){
        this.attendanceApi(data?.dateString);
        this.setState({eventsResult:[]})
        // console.log("data",JSON.stringify(data?.dateString))
    }


    async attendanceApi(dateString) {
        const token = await getPersistedStudentToken();
        let formData = new FormData()
        formData.append('std_class', this.state.str_class)
        formData.append('std_section', this.state.str_section)
        formData.append('std_roll', this.state.str_rollno)
        formData.append("date", dateString)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                ...(token ? { Authorization: token } : {}),
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewattendance', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('attendance--->>>', responseJson)
                let { attendancedate, holidays,absent_dates,event_dates,events,holiday_details } = responseJson;
                var rv = {};
                var rv2 = {};
                for (var i = 0; i < attendancedate.length; ++i) {
                    rv[attendancedate[i]] = { marked: true, dotColor: 'blue' };
                }
                for (var i = 0; i < absent_dates.length; ++i) {
                    rv[absent_dates[i]] = { marked: true, dotColor: 'red' };
                }

                for (var i = 0; i < holidays.length; ++i) {
                    rv2[holidays[i]] = { marked: true, dotColor: '#E35FAA' };
                }
                for (var i = 0; i < event_dates.length; ++i) {
                    rv2[event_dates[i]] = { marked: true, dotColor: '#01C7AE' };
                }

                this.setState({
                    markedDates: rv,
                    totalWorkingDays: responseJson.totalworking_days,
                    total_present_days: responseJson.totalpresentday,
                    total_absent_days: responseJson.totalworking_days - responseJson.totalpresentday,
                    eventMarkDate : rv2,
                    eventData:events,
                    holidayData:holiday_details,
                })
               
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    fn_DayClick(dayData) {
        const inputDate = dayData?.dateString;
        this.setState({ loader: true, selectedDate: inputDate });
      
        const matchedEvents = this.state.eventData
          .filter(event => event.event_time === inputDate)
          .map(event => ({ ...event, type: "event" }));
      
        const matchedHolidays = this.state.holidayData
          .filter(holiday => holiday.holiday_date === inputDate)
          .map(holiday => ({ ...holiday, type: "holiday" }));
      
        const result = [...matchedEvents, ...matchedHolidays];
      
        this.setState({ eventsResult: result, loader: false });
      }

    capitalizeFirstLetter(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      fn_holidayButton = () => {
        this.setState({
          active: false,
          currentDate: moment().format('YYYY-MM-DD'), // Reset calendar to current month
          calendarKey: this.state.calendarKey + 1,
          selectedDate:  moment().format('YYYY-MM-DD'),
        })
          this.attendanceApi(moment().format("YYYY-MM-DD"));
      };

      getMarkedDatesForEventCalendar() {
        const { eventMarkDate, selectedDate } = this.state;
        return {
          ...eventMarkDate,
          [selectedDate]: {
            ...(eventMarkDate[selectedDate] || {}),
            selected: true,
            selectedColor: '#007BFF', // blue
          }
        };
      }


    render() {
        return (
            <View style={styles.MainContainer}>

                <Header title={'Attendance'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <View style={styles.buttonMainView}>
                    <Pressable style={this.state.active ? styles.buttonStyle : styles.buttonStyle2} 
 onPress={() =>{
    this.setState({
      active: true,
      currentDate: moment().format('YYYY-MM-DD'),
      calendarKey: this.state.calendarKey + 1 // force re-render
    })
    this.attendanceApi(moment().format("YYYY-MM-DD"))
  }}
                    >
                        <Text style={this.state.active ? styles.buttonTextStyle : styles.buttonTextStyle2}>Attendance</Text>
                    </Pressable>
                    <Pressable style={this.state.active ? styles.buttonStyle2 : styles.buttonStyle} onPress={()=>this.fn_holidayButton()} >
                        <Text style={this.state.active ? styles.buttonTextStyle2 : styles.buttonTextStyle}>Holiday & Event</Text>
                    </Pressable>
                </View>

                <ScrollView>
                  {
                  this.state.active ? 
                   <View>
                        {/* <View style={styles.CalendarView}> */}
                            <Calendar
                                // testID={testIDs.horizontalList.CONTAINER}
                                key={`attendance-${this.state.calendarKey}`}
                                markedDates={ this.state.markedDates}
                                current={this.state.currentDate}
                                pastScrollRange={24}
                                futureScrollRange={24}
                                horizontal
                                pagingEnabled
                                hideArrows={false}
                                onMonthChange={(month) => { console.log('month changed', month) }}
                                style={styles.CalendarView}
                            />
                        {/* </View> */}

                        <View style={styles.rowStyle}>
                            <Image style={{ marginTop: 3 }}
                                source={require("../../../assests/images/red_dot.png")} />
                            <Text style={styles.daysText}>Absent Days</Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <Image style={{ marginTop: 3 }}
                                source={require("../../../assests/images/blue_dot.png")} />
                            <Text style={styles.daysText}>Present Days</Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <View style={styles.TodayDaysView}>
                                <View style={styles.TotalWorkingDaysContainer}>
                                    <Text style={styles.TotalDaysText}>Total Working Days</Text>
                                    <View style={styles.WorkingDaysBlueBackground}>
                                        <Text style={styles.WorkingDaysNumberText}>{this.state.totalWorkingDays}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.AbsentPresentContainer}>
                                <View style={styles.TotalContainer}>
                                    <View style={styles.AbsentInnerView}>
                                        <View style={styles.TotalAbsentBackground}>
                                            <Text style={styles.PresentAbsentText}>Total Absent</Text>
                                            <Text style={styles.PresentAbsentNumberText}>{this.state.total_absent_days}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.PresentInnerView}>
                                        <View style={styles.totalPresentBackground}>
                                            <Text style={styles.PresentAbsentText}>Total Present</Text>
                                            <Text style={styles.PresentAbsentNumberText}>{this.state.total_present_days}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                 : 
                 <View>
                     <Calendar
                        //  testID={testIDs.horizontalList.CONTAINER}
                        key={`attendance-${this.state.calendarKey}`}
                         markedDates={ this.getMarkedDatesForEventCalendar()}
                         current={this.state.currentDate}
                        //  pastScrollRange={24}
                        //  futureScrollRange={24}
                        //  horizontal
                        //  pagingEnabled
                         hideArrows={false}
                         onMonthChange={(month) => { this.fn_MonthClick(month) }}
                         style={styles.CalendarView}
                         onDayPress={(day) => {
                            this.fn_DayClick(day)
                          }}
                     />
                     <View>
                       { this.state.loader ?
                       <View style={{marginVertical:resW(20)}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                       :
                       this.state.eventsResult.length > 0 ?
                        <FlatList
                        data={this.state.eventsResult}
                        renderItem={({item,index})=>{
                            return(
                                <View style={[styles.eventCardView,{backgroundColor:item?.type === 'event' ? '#01C7AE' : "#E35FAA" }]}>
                                    <Text style={styles.eventCartText} >{item?.type==='event' ? this.capitalizeFirstLetter(item?.event_name) : this.capitalizeFirstLetter(item?.title)}</Text>
                                    <Text style={styles.eventCartDes} >{item?.type==='event' ? this.capitalizeFirstLetter(item?.event_description) : this.capitalizeFirstLetter(item?.holiday_de)}</Text>
                               </View>
                            )
                        }}
                        ListFooterComponent={()=>{return(<View style={{height:resW(10)}} />)}}
                        />
                        :

                        <View style={{marginVertical:resW(20)}}>
                        <Text style={styles.noEventText}>No Events Found</Text>
                        </View>
                        }
                     </View>
             </View>    
                }
                </ScrollView>

            </View>
        )
    }
}

export default Attendance;
