import React, { Component } from 'react';
import { Text, View, ScrollView, Image, BackHandler } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import Header from '../../Header/Header';
import { LocaleConfig } from 'react-native-calendars';
import * as myConst from '../../Baseurl';
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
            total_absent_days: ''
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
        this.attendanceApi();
    }


    attendanceApi() {
        let formData = new FormData()
        formData.append('std_class', this.state.str_class)
        formData.append('std_section', this.state.str_section)
        formData.append('std_roll', this.state.str_rollno)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewattendance', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('attendance--->>>', responseJson)
                // console.log('data-->', responseJson.attendancedate)
                let { attendancedate, holidays } = responseJson;
                var rv = {};
                for (var i = 0; i < attendancedate.length; ++i) {
                    rv[attendancedate[i]] = { marked: true, dotColor: 'blue' };
                }
                for (var i = 0; i < holidays.length; ++i) {
                    rv[holidays[i]] = { marked: true, dotColor: 'red' };
                }

                this.setState({
                    markedDates: rv,
                    totalWorkingDays: responseJson.totalworking_days,
                    total_present_days: responseJson.totalpresentday,
                    total_absent_days: responseJson.totalworking_days - responseJson.totalpresentday
                })
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    render() {
        return (
            <View style={styles.MainContainer}>

                <Header title={'Attendance'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <ScrollView>
                    <View>
                        <View style={styles.CalendarView}>
                            <CalendarList
                                testID={testIDs.horizontalList.CONTAINER}
                                markedDates={this.state.markedDates}
                                current={new Date()}
                                pastScrollRange={24}
                                futureScrollRange={24}
                                horizontal
                                pagingEnabled
                                hideArrows={false}
                                onMonthChange={(month) => { console.log('month changed', month) }}
                            />
                        </View>

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
                </ScrollView>

            </View>
        )
    }
}

export default Attendance;