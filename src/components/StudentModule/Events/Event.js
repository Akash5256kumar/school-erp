import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import moment from 'moment';

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            classes: '',
            dataSource: []
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
        const value = await AsyncStorage.getItem('@class')
        console.log('value-->>', value)
        this.setState({
            classes: value
        })
        this.eventApi()
    }


    eventApi() {
        console.log(this.state.classes);
        let formData = new FormData()
        formData.append('std_class', this.state.classes)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewevents', data)
            .then((response) => response.json())
            .then(responseJson => {
                console.log('events--->>>', responseJson.data.past)
                this.setState({
                    dataSource: responseJson.data.past
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
                        <Image style={styles.EventImage}
                            source={require("../../../assests/images/event.png")} />
                    </View>
                    <Text style={styles.HeaderText}>Calendar of Events</Text>
                </View>

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item, index }) =>
                        <View style={styles.FlatStyle}>
                            <View style={styles.CardView}>

                                <View style={styles.CardviewStyle}>
                                    <View style={styles.CircleShapeView}>
                                        <Image style={styles.AssignmentImage}
                                            source={require("../../../assests/images/cake.png")} />
                                    </View>
                                    <View style={styles.TextViewStyle}>
                                        <Text style={styles.TextStyle}>{item.event_name}</Text>
                                        <Text style={styles.TextDate}>{moment(item.event_time).format('DD-MM-YYYY')}</Text>
                                    </View>
                                </View>

                                <View>
                                    <Image style={styles.AssignmentDownloadImage}
                                        source={require("../../../assests/images/calendar.png")} />
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
export default Event;