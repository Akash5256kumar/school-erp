import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";


class StaffViewLeave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            user_id: '',
            casualLeave: '',
            sickLeave: '',
            earnLeave: '',
            remCasualLeave: '',
            remSickLeave: '',
            remEarnLeave: '',
            status: ''
        }

    }


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@id')
        this.setState({
            user_id: value
        })
        console.log('id', this.state.user_id)
        this.viewLeavesApi()
        this.leaveGettingApi()
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('StaffHome')
        return true;
    };



    viewLeavesApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": this.state.user_id
            })
        }
        fetch(myConst.BASEURL + 'viewleaves', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('viewLeaves-->', responseJson)
                let response = responseJson.data
                for (let i = 0; i < response.length; i++) {
                    if (response[i].status === 0) {
                        this.setState({ status: 'Pending' })
                    } else if (response[i].status === 1) {
                        this.setState({ status: 'Approved' })
                    } else if (response[i].status === 2) {
                        this.setState({ status: 'Cancelled' })
                    }
                }
                this.setState({
                    dataSource: response,
                })
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    leaveGettingApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.user_id
            })
        }
        fetch(myConst.BASEURL + 'leavegetting', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('leavegetting-->', responseJson)
                let response = responseJson.data

                var casual_leave = response.casual_leave;
                var annual_leave = response.annual_leave;
                var sick_leave = response.sick_leave;
                var remCasual = casual_leave - response.cousume_casual_leave;
                var remAnnual = annual_leave - response.cousume_annual_leave;
                var remSick = sick_leave - response.cousume_sick_leave;

                this.setState({
                    casualLeave: casual_leave,
                    sickLeave: sick_leave,
                    earnLeave: annual_leave,
                    remCasualLeave: remCasual,
                    remEarnLeave: remAnnual,
                    remSickLeave: remSick
                })

            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    async navigate(item){
        console.log('id', item.id)
        await AsyncStorage.setItem('@new_id', String(item.id))
        this.props.navigation.navigate('StaffLeaveDetail')
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Leaves</Text>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('StaffAddLeave')}>
                                <Image style={styles.HeaderPlusImage}
                                    source={require('../../../assests/images/plus.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={styles.TabBackground}>
                    <View style={styles.RowCardStyle}>

                        <View style={styles.TabCardView}>
                            <Text style={styles.CardviewText}>{this.state.remCasualLeave}</Text>
                            <Text style={styles.CardviewText}>Casual</Text>
                            <Text style={styles.CardviewText}>{this.state.casualLeave} Leaves</Text>
                        </View>

                        <View style={styles.TabCardView}>
                            <Text style={styles.CardviewText}>{this.state.remEarnLeave}</Text>
                            <Text style={styles.CardviewText}>Earn</Text>
                            <Text style={styles.CardviewText}>{this.state.earnLeave} Leaves</Text>
                        </View>

                        <View style={styles.TabCardView}>
                            <Text style={styles.CardviewText}>{this.state.remSickLeave}</Text>
                            <Text style={styles.CardviewText}>Sick</Text>
                            <Text style={styles.CardviewText}>{this.state.sickLeave} Leaves</Text>
                        </View>
                    </View>

                </View>

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item, index }) =>
                        <View style={styles.FlatStyle}>
                            <View style={styles.CardView}>

                                <View style={styles.CardviewStyle}>
                                    <View style={styles.TextViewStyle}>
                                        <Text style={styles.TextStyle}>{item.subject}</Text>
                                        <View style={styles.CircleShapeView}>
                                            <Text style={styles.StatusText}>{this.state.status}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View style={styles.CardviewStyle}>
                                        <Text style={styles.TextDateHeadingStyle}>Start Date - </Text>
                                        <Text style={styles.TextDate}>{item.start_date}</Text>
                                    </View>
                                    <View style={styles.CardviewStyle}>
                                        <Text style={styles.TextDateHeadingStyle}>End Date - </Text>
                                        <Text style={styles.TextDate}>{item.end_date}</Text>
                                    </View>
                                </View>

                                <View style={styles.CardviewStyle}>
                                    <View style={styles.TextViewStyle}>
                                        <Text style={styles.TextLeaveType}>{item.leave_type}</Text>
                                        <View style={styles.BackgroundView}>
                                            <TouchableOpacity
                                                onPress={() => this.navigate(item)}>
                                                <Image style={styles.AssignmentDownloadImage}
                                                    source={require("../../../assests/images/right_arrow.png")} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }


}
export default StaffViewLeave;
