import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import StaffViewSupportDetails from '../StaffSupportSolvedDetails/StaffSupportSolvedDetails';


class StaffSupportSystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            id: '',
            dataSource: [], 
            assignedData: [],
            solvedData: [],
            unsolvedData: [],
            type: ''
        }

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


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@id')
        console.log(value)
        this.setState({
            id: value
        })
        this.supportSystemApi()
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    buttonClicked(type) {
        if (type === 'solved') {
            this.setState({
                type : 'solved',
                dataSource: this.state.solvedData
            })
        } else if (type === 'assigned') {
            this.setState({
                type : 'assigned',
                dataSource: this.state.assignedData
            })
        } else if (type === 'unsolved') {
            this.setState({
                type : 'unsolved',
                dataSource: this.state.unsolvedData
            })
        }
    }


    async viewMoreDetails(item){
        console.log(this.state.type)
        console.log(item)
        if (this.state.type == 'assigned') {
            await AsyncStorage.setItem('@MyItem:key', JSON.stringify(item));
            this.props.navigation.navigate('StaffSupportAssignedDetails')
        } else if (this.state.type == 'solved') {
            await AsyncStorage.setItem('@MyItem:key', JSON.stringify(item));
            this.props.navigation.navigate('StaffSupportSolvedDetails')
        } else if (this.state.type == 'unsolved') {
            await AsyncStorage.setItem('@MyItem:key', JSON.stringify(item));
            this.props.navigation.navigate('StaffSupportUnSolvedDetails')
        }
    }


    supportSystemApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "staff_id": this.state.id
            })
        }
        fetch(myConst.BASEURL + 'supportsystem', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->', responseJson)

                    this.setState({
                        type : 'assigned',
                        dataSource: responseJson.assigned,
                        unsolvedData: responseJson.unSolved,
                        assignedData: responseJson.assigned,
                        solvedData: responseJson.solved
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



    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffHome')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Support System</Text>
                        <View></View>
                    </View>
                </View>

                <View style={styles.TabBackground}>
                    <View style={styles.RowCardStyle}>

                        <View style={styles.TabCardView}>
                            <TouchableOpacity
                            onPress={() => this.buttonClicked('assigned')}
                            >
                                <Text style={styles.CardviewText}>Assigned</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.TabCardView}>
                            <TouchableOpacity
                             onPress={() => this.buttonClicked('unsolved')}
                            >
                                <Text style={styles.CardviewText}>UnSolved</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.TabCardView}>
                            <TouchableOpacity
                            onPress={() => this.buttonClicked('solved')}
                            >
                                <Text style={styles.CardviewText}>Solved</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Ticketno.</Text></View>
                                    <View><Text style={styles.TextRight}>{item.ticketno}</Text></View>
                                    <View>
                                        <TouchableOpacity
                                        onPress={() => this.viewMoreDetails(item)}
                                        >
                                            <Image style={styles.ViewMoreImage}
                                                source={require('../../../assests/images/view_more.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Date</Text></View>
                                    <View><Text style={styles.TextRight}>{item.created_at}</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Name</Text></View>
                                    <View><Text style={styles.TextRight}>{item.name}</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Class</Text></View>
                                    <View><Text style={styles.TextRight}>{item.std_class}</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Section</Text></View>
                                    <View><Text style={styles.TextRight}>{item.std_section}</Text></View>
                                </View>

                                <View style={styles.BottomRowStyle}>
                                    <View><Text style={styles.TextLeft}>Issue</Text></View>
                                    <View><Text style={styles.TextRight}>{item.issue}</Text></View>
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

export default StaffSupportSystem;