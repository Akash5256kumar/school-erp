// import React, { Component } from 'react';
// import { Image, Text, View, TouchableOpacity, ImageBackground, ScrollView, BackHandler, Alert } from 'react-native';
// import AsyncStorage from "@react-native-community/async-storage";
// import styles from './style';
// const baseColor = '#0747a6'
// class StaffHome extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             name: '',
//             role: ''
//         }

//     }
//     componentWillMount() {
//         BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
//     }
//     componentWillUnmount() {
//         BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
//     }
//     handleBackPress = () => {
//         // BackHandler.exitApp();
//         Alert.alert(
//             'Exit',
//             'Are you sure you want to exit ?',
//             [
//                 { text: 'Cancel', onPress: () => { return null } },
//                 {
//                     text: 'Confirm', onPress: () => {
//                         BackHandler.exitApp();
//                     }
//                 },
//             ],
//             { cancelable: false }
//         )
//         return true;
//     };

//     async componentDidMount() {
//         const { navigation } = this.props;
//         navigation.addListener('focus', async () => {
//             // call your refresh method here
//             console.log('home screen')
//             const teacherName = await AsyncStorage.getItem('@name')
//             const teacherRole = await AsyncStorage.getItem('@role')
//             console.log('teacherName-->>', teacherName)
//             console.log('teacherRole-->>', teacherRole)
//             this.setState({
//                 role: teacherRole,
//                 name: teacherName
//             })
//         });


//     }


//     render() {
//         return (
//             <View style={styles.MainContainer}>
//                 <View>
//                     <ImageBackground style={styles.ContainerImage}
//                         source={require('../../../assests/images/Dashboard_header_new.png')}>

//                         <View style={styles.HeaderView}>
//                             <View></View>
//                             <Text style={styles.HeaderText}></Text>
//                             <TouchableOpacity onPress={() =>
//                             Alert.alert(
//                                 'Log out',
//                                 'Do you want to logout?',
//                                 [
//                                     { text: 'Cancel', onPress: () => { return null } },
//                                     {
//                                         text: 'Confirm', onPress: () => {
//                                             AsyncStorage.clear();
//                                             this.props.navigation.navigate('RoleSelectionScreen')
//                                         }
//                                     },
//                                 ],
//                                 { cancelable: false }
//                             )
//                         }>
//                                 <Image style={styles.HeaderImage}
//                                     source={require('../../../assests/images/s_logout.png')} />
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.ProfileImageBackground}>
//                             <Image style={styles.ProfileImage}
//                                 source={require('../../../assests/images/businessman.png')} />
//                             <View style={styles.HeaderImageStyle}>
//                                 <Text style={styles.TextName}>{this.state.name}</Text>
//                                 <Text style={styles.TextAddress}>{this.state.role}</Text>
//                             </View>
//                         </View>
//                     </ImageBackground>
//                 </View>

//                 <ScrollView>
//                     <View style={{ marginStart: 15, marginEnd: 15 }}>
//                         <View style={styles.HomeScreenView}>
//                             <TouchableOpacity
//                                 onPress={() => this.props.navigation.navigate('StaffProfile')}
//                             >
//                                 <View style={styles.ProfileCircleShapeView}>
//                                     <Text style={styles.GridText}>Profile</Text>
//                                     <Image style={styles.GridImage}
//                                         source={require('../../../assests/images/staff_profile.png')} />

//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => this.props.navigation.navigate('StaffViewLeave')}
//                             >
//                                 <View style={styles.ApplyLeavesCircleShapeView}>
//                                     <Text style={styles.GridText}>Apply Leaves</Text>
//                                     <Image style={styles.GridImage}
//                                         source={require('../../../assests/images/apply_leaves.png')} />
//                                 </View>
//                             </TouchableOpacity>

//                         </View>

//                         <View style={styles.HomeScreenView}>
//                             <TouchableOpacity
//                                 onPress={() => this.props.navigation.navigate('StaffIssueSubmission')}
//                             >
//                                 <View style={styles.IssueCircleShapeView}>
//                                     <Text style={styles.GridText}>Issue Submission</Text>
//                                     <Image style={styles.GridImage}
//                                         source={require('../../../assests/images/issue.png')} />
//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => this.props.navigation.navigate('StaffAddItem')}
//                             >
//                                 <View style={styles.AddItemCircleShapeView}>
//                                     <Text style={styles.GridText}>Add Item Query</Text>
//                                     <Image style={styles.GridImage}
//                                         source={require('../../../assests/images/add_items.png')} />
//                                 </View>
//                             </TouchableOpacity>

//                         </View>

//                         <View style={styles.HomeScreenView}>
//                             <TouchableOpacity
//                             onPress={() => this.props.navigation.navigate('StaffSupportSystem')}
//                             >
//                                 <View style={styles.SupportCircleShapeView}>
//                                     <Text style={styles.GridText}>Support System</Text>
//                                     <Image style={styles.GridImage}
//                                         source={require('../../../assests/images/staff_support.png')} />
//                                 </View>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => this.props.navigation.navigate('StaffAttendance')}
//                             >
//                                 <View style={styles.AttendenceCircleShapeView}>
//                                     <Text style={styles.GridText}>Attendance</Text>
//                                     <Image style={styles.GridImage}
//                                         source={require('../../../assests/images/staff_attendance.png')} />
//                                 </View>
//                             </TouchableOpacity>

//                         </View>

//                     </View>
//                 </ScrollView>
//             </View>

//         )
//     }
// }
// export default StaffHome;


import React, { useState } from 'react';
import moment from 'moment';
import * as constant from '../../../Utils/Constant'
import { Image, Text, View, TouchableOpacity, ImageBackground, ScrollView, BackHandler, Alert } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import { LocaleConfig } from 'react-native-calendars';
import AppCalender from '../../UIComponent/AppCalender';
import Header from './staffHeader';
import LinearGradient from 'react-native-linear-gradient';
import { resH } from '../../../Utils/Constant';
import StaffAttendance from '../StaffAttendance/StaffAttendance';
import { useNavigation } from '@react-navigation/native';
const StaffHome = () => {
  const navigation=useNavigation()

    const fnMonthClick = (data) => {
        setCurrentDate(data)
        attendanceApi(data, 1);
        // setEventsResult([]);
        setMarkedDates([])

    };
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [calendarKey, setCalendarKey] = useState(0);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
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

        attendanceApi(moment().format("YYYY-MM-DD"), 2);
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


        return `${day} `;
    }
    const newsItems = [
        { name: 'Attendance', icon: constant.Icons.StaffAttendanceIcon, navigate: 'StaffAttendance' },
        { name: 'Student Complaint', icon: constant.Icons.StudentComplaintIcon, navigate: 'StudentComplaint' },
        { name: 'Homework', icon: constant.Icons.homeWorkIcon, navigate: 'StaffModuleHomeWork' },
        { name: 'Notes', icon: constant.Icons.notesIcon1, navigate: 'StaffModuleNotes' },
        { name: 'Fortnightly Planner', icon: constant.Icons.fornightlyplannericon1, navigate: 'StaffModuleFornightlyPlanner' },
        { name: 'Result & Grades', icon: constant.Icons.gradesIcon, navigate: 'StaffModuleResultAndGrades' },
        { name: 'Multimedia', icon: constant.Icons.MultimediaIcon, navigate: 'StaffModuleMultiMedia' },
        { name: 'Student Performance', icon: constant.Icons.studentperformanceIcon, navigate: 'StaffModuleStudentPerformance' },
    ];

    return (
        <View>
            <Header name='Geetanjali' />
            <View style={{ marginBottom: resH(0), backgroundColor: "white" }} />
            <ScrollView contentContainerStyle={{ paddingBottom: resH(20), backgroundColor: constant.whiteColor }}>
                <View style={styles.holidayEventContainer}>
                    <Text style={styles.holidayeventText}>
                        Holiday & Event
                    </Text>
                </View>
                <AppCalender
                    //  markData={markedDates}
                    current={selectedDate}
                    monthString={currentDate}
                    fn_ClickLeftArrow={(d) => console.log("hii")}
                    fn_ClickRightArrow={(d) => console.log("hii")}
                    onDateClick={(d) => setSelectedDate(d?.dateString)}
                //  loader={loader}
                />
                <View>
                    <View style={styles.homeNewsTextView}>
                        <Text style={styles.homeTextLabel}>
                            News
                        </Text>
                        <LinearGradient
                            colors={['white', 'pink']} // Pink-orange gradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.NewsContainer}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>

                            </Text>
                        </LinearGradient>
                    </View>
                </View>
                <View style={styles.iconGrid}>
                    {newsItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.iconItem}
                            onPress={() => navigation.navigate(item.navigate)}
                        >
                            <Image source={item.icon} style={styles.iconImage} />
                            <Text style={styles.iconText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>

    )

}
export default StaffHome;