import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
class StaffLeaveDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            id: '',
            leaveType: '',
            userName: '',
            subject: '',
            startDate: '',
            endDate: '',
            descrption: '',
            status: '',
            createdAt: '',
            attachment: '',
            remark: ''
        }
    }
    async componentDidMount() {
        const value = await AsyncStorage.getItem('@new_id')
        this.setState({
            id: value
        })
        console.log('id', value)
        this.leaveDetailApi()
    }
    leaveDetailApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.id
            })
        }
        fetch(myConst.BASEURL + 'leavedetail', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('viewLeaves-->', responseJson)
                let response = responseJson.data
                if (response.status === 0) {
                    this.setState({ status: 'Pending' })
                } else if (response.status === 1) {
                    this.setState({ status: 'Approved' })
                } else if (response.status === 2) {
                    this.setState({ status: 'Cancelled' })
                }
                if (response.server_ip != null) {
                    var serverip = response.server_ip + "/images/leaverelated/";
                    var file1 = serverip + response.file;
                    console.log("file1", file1);
                    this.setState({
                        attachment: file1
                    })
                } else {
                    var url = "http://139.59.90.236:82/images/leaverelated/";
                    var file2 = url + response.file;
                    console.log("file2", file2);
                    this.setState({
                        attachment: file2
                    })
                }
                this.setState({
                    leaveType: response.leave_type,
                    userName: response.userdetail.name,
                    startDate: response.start_date,
                    endDate: response.end_date,
                    subject: response.subject,
                    createdAt: response.created_at,
                    descrption: response.description,
                    remark: response.remark,
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
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Leave Details</Text>
                        <View>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View>
                        <Text style={styles.TextStyle}>Details of the Leave : </Text>
                    </View>

                    <View style={styles.CardViewStyle}>
                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Leave Type</Text></View>
                            <View>
                                <Text style={styles.TextRight}>
                                    {this.state.leaveType}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Username</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.userName}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Subject</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.subject}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Start Date</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.startDate}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>End Date</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.endDate}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Description</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.descrption}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Status</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.status}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Created At</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.createdAt}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Attachment</Text></View>
                            <View><Text style={styles.fileRightText}
                                onPress={() => Linking.openURL(this.state.attachment)}>{this.state.attachment}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Remark</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.remark}</Text></View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default StaffLeaveDetail;