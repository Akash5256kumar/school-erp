import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';


class StaffSupportUnSolvedDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            s_class: '',
            section: '',
            admissionNo: '',
            issue: '',
            detail: '',
            id: '',
            staff_id: '',
            dataSource: []
        }
    }


    async componentDidMount() {
        const staff_id = await AsyncStorage.getItem('@id')
        const myArray = await AsyncStorage.getItem('@MyItem:key');
        if (myArray !== null) {
            console.log('itemArray-->', JSON.parse(myArray));
        }
        this.setState({
            id: JSON.parse(myObject).id,
            name: JSON.parse(myObject).name,
            s_class: JSON.parse(myObject).std_class,
            admissionNo: JSON.parse(myObject).std_roll,
            section: JSON.parse(myObject).std_section,
            issue: JSON.parse(myObject).issue,
            detail: JSON.parse(myObject).details,
            staff_id: staff_id
        })

        this.supportSystemResponseApi()
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    supportSystemResponseApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "supportsystem_id": this.state.id,
                "staff_id": this.state.staff_id
            })
        }
        fetch(myConst.BASEURL + 'supportsystemresponse', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->', responseJson)


                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>View Support Details</Text>
                        <View></View>
                    </View>
                </View>



                <View style={styles.FlatListView}>
                    <View style={styles.upperCardview}>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Name</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.name}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Class</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.s_class}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Admission No.</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.admissionNo}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Section</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.section}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Issue</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.issue}</Text></View>
                        </View>

                        <View style={styles.BottomRowStyle}>
                            <View><Text style={styles.TextLeft}>Details</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.detail}</Text></View>
                        </View>

                    </View>
                </View>


                <FlatList
                    data={this.state.dataSource}
                    // data={[
                    //     { key: 'Android' }, { key: 'iOS' }, { key: 'Java' }, { key: 'Swift' },
                    //     { key: 'Php' }, { key: 'Hadoop' }, { key: 'Sap' }
                    // ]}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Teacher</Text></View>
                                    <View><Text style={styles.TextRight}>item.ticketno</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Response</Text></View>
                                    <View><Text style={styles.TextRight}>item.created_at</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>File</Text></View>
                                    <View><Text style={styles.TextRight}>item.name</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Deadline</Text></View>
                                    <View><Text style={styles.TextRight}>item.std_class</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Query Date</Text></View>
                                    <View><Text style={styles.TextRight}>item.std_section</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Status</Text></View>
                                    <View><Text style={styles.TextRight}>item.issue</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Date</Text></View>
                                    <View><Text style={styles.TextRight}>item.issue</Text></View>
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

export default StaffSupportUnSolvedDetails;