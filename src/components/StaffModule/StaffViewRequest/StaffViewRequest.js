import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';


class StaffViewRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            user_id: '',
            status: ''
        }
    }


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@id')
        this.setState({
            user_id: value
        })
        this.viewRequestRaisedApi()
    }


    viewRequestRaisedApi() {
        let formData = new FormData()
        formData.append('user_id', this.state.user_id)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'issuedraisebyuser', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('viewRequest-->', responseJson)
                let response = responseJson.data
                for (let i = 0; i < response.length; i++) {
                    if (response[i].status === 1) {
                        this.setState({ status: 'Approved' })
                    } else if (response[i].status === 0) {
                        this.setState({ status: 'Pending' })
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


    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffHome')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>View Request</Text>
                        <View></View>
                    </View>
                </View>

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.CardViewStyle}>
                                    <View style={styles.DocImageAndTextStyle}>
                                        <View style={styles.TextViewStyle}>
                                            <View style={styles.RowStyle}>
                                                <Text style={styles.DashboardTextStyle}>Student Name: </Text>
                                                <Text style={styles.DateText}> {item?.name}</Text>
                                            </View>
                                            <View style={{ height: 60 }} >
                                                <Text style={styles.DashboardTextStyle}>Description</Text>
                                                <Text style={styles.DateText}>{item?.reason}</Text>
                                            </View>
                                            <View style={styles.RowStyle}>
                                                <Text style={styles.DashboardTextStyle}>Class - </Text>
                                                <Text style={styles.DateText}>{item?.class}</Text>
                                            </View>

                                            <View style={styles.RowStyle}>
                                                <Text style={styles.DashboardTextStyle}>Section - </Text>
                                                <Text style={styles.DateText}>{item?.section}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.GreenStatusBackground}>
                                        <Text style={styles.StatusText}>{this.state.status}</Text>
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
export default StaffViewRequest;