import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Switch, FlatList } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';


class StaffAddAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            assignClass: '',
            assignSection: '',
            currentDate: '',
            currentTime: '',
            dataSource: [],
            toggle: true,
        }
    }


    async componentDidMount() {
        const assignclass = await AsyncStorage.getItem('@aclass')
        const assignsection = await AsyncStorage.getItem('@asection')

        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log('date', date)
        console.log('time', time)

        this.setState({
            assignClass: assignclass,
            assignSection: assignsection,
            currentDate: date,
            currentTime: time
        })

        this.getViewAttendanceApi()
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }



    getViewAttendanceApi() {
        console.log('called', this.state.assignClass)
        console.log('called', this.state.assignSection)
        console.log('called', this.state.currentDate)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "class_name": this.state.assignClass,
                "class_section": this.state.assignSection,
                "date": this.state.currentDate,
            })
        }
        fetch(myConst.BASEURL + 'viewattendance_studentlist', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->>>', responseJson.data)

                    let response = responseJson.data;

                    const newArray  = response.map(v => ({...v, isPresent: true}))
                    console.log('newArray',newArray)

                    this.setState({
                        dataSource: newArray
                    })

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    getSubmitAttendanceApi() {
        let object = {}
        this.state.dataSource.map(obj => {
            if(obj.isPresent === true){
                object[obj.std_roll] = 1
            }
        });

        console.log('called', object)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "class_name": this.state.assignClass,
                "class_section": this.state.assignSection,
                "date": this.state.currentDate,
                "attendance" : JSON.stringify(object)
            })
        }
        console.log('entered')
        fetch(myConst.BASEURL + 'submit_attendance', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->', responseJson)
                    this.showMessage(responseJson.message)
                    this.props.navigation.navigate('StaffHome')
                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    selectToggleSwitch(value, index){
        console.log(index, value)
        let arr = this.state.dataSource
        arr[index].isPresent = value
        this.setState({dataSource: arr})
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Add Attendance</Text>
                        <View></View>
                    </View>
                </View>

                <View style={styles.RowStyle}>
                    <View style={styles.RowStyle}>
                        <Text style={styles.TextStyle}>Class : </Text>
                        <Text style={styles.NormalTextStyle}>{this.state.assignClass}</Text>
                    </View>
                    <View style={styles.RowStyle}>
                        <Text style={styles.TextStyle}>Section : </Text>
                        <Text style={styles.NormalTextStyle}>{this.state.assignSection}</Text>
                    </View>
                </View>
                <View style={styles.RowStyle}>
                    <View style={styles.RowStyle}>
                        <Text style={styles.TextStyle}>Date : </Text>
                        <Text style={styles.NormalTextStyle}>{this.state.currentDate}</Text>
                    </View>
                    <View style={styles.RowStyle}>
                        <Text style={styles.TextStyle}>Time : </Text>
                        <Text style={styles.NormalTextStyle}>{this.state.currentTime}</Text>
                    </View>
                </View>

                <FlatList

                    data={this.state.dataSource}

                    renderItem={({ item, index }) =>
                        <View style={styles.FlatStyle}>

                            <View style={styles.CardviewStyle}>
                                <Text style={styles.FlatListTextStyle}>{item.Student_name}</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={"#f4f3f4"}
                                    onValueChange={(value) => this.selectToggleSwitch(value,index)}
                                    value={item.isPresent}
                                />
                            </View>
                            <View style={styles.HorizontalLine}></View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />

                <TouchableOpacity
                 style={styles.submitButton2}
                    onPress={() => this.getSubmitAttendanceApi()}
                >
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

export default StaffAddAttendance;