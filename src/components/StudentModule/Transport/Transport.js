import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Header from '../../Header/Header';


class Transport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            busNo: '',
            incharge: '',
            contactNo: '',
            routeName: '',
            routeNo: '',
            stopName: '',
            stopNo: '',
            pickUpTime: '',
            dropTime: '',
            driverName: '',
            driverNo: '',
            std_roll: ''
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
        const value = await AsyncStorage.getItem('@std_roll')
        console.log('value-->>', value)
        this.setState({
            std_roll: value
        })
        this.TransportApi()
    }


    TransportApi() {
        let formData = new FormData()
        formData.append('std_roll', this.state.std_roll)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewtransport', data)
            .then((response) => response.json())
            .then(responseJson => {
                console.log('responseJson-->', responseJson)
                if (responseJson.status === true) {
                    const response = responseJson.data[0]
                    this.setState({
                        busNo: response.bus_no,
                        incharge: response.incharge,
                        contactNo: response.contact_no,
                        routeName: response.route_name,
                        routeNo: response.route_no,
                        stopName: response.stop_name,
                        stopNo: response.stop_no,
                        pickUpTime: response.pickup_time,
                        dropTime: response.drop_time,
                        driverName: response.driver_name,
                        driverNo: response.driver_mobile_no
                    })
                } else if (responseJson.staus === false) {

                    Snackbar.show({
                        text: responseJson.message,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: '#f15270'
                    });
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    render() {
        return (
            <View style={styles.MainContainerStyle}>
                <Header title={'Transport'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <ScrollView>
                    <View>
                        <View style={styles.RowStyle}>
                            <View style={styles.BusTextStyle}>
                                <Text style={styles.BusText}>Bus No.</Text>
                                <Text style={styles.BusNoText}>{this.state.busNo}</Text>
                            </View>
                            <Image style={styles.BusImageStyle}
                                source={require('../../../assests/images/blue_bus.png')} />
                        </View>

                        <View style={styles.HorizontalLine}>
                        </View>

                        <View style={styles.detailsView}>
                            <View style={styles.DetailsContainer}>
                                <Image style={styles.ContainerImage}
                                    source={require('../../../assests/images/bus.png')} />
                                <Text style={styles.ContainerText}>Bus Details</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Incharge</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.incharge}</Text>
                                </View>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Contact no.</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.contactNo}</Text>
                                </View>
                            </View>

                            <View style={styles.DetailsContainer}>
                                <Image style={styles.ContainerImage}
                                    source={require('../../../assests/images/route.png')} />
                                <Text style={styles.ContainerText}>Route Details</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Route Name</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.routeName}</Text>
                                </View>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Route no.</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.routeNo}</Text>
                                </View>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Stop Name</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.stopName}</Text>
                                </View>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Stop no.</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.stopNo}</Text>
                                </View>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Pickup Time</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.TextDropTime}>Drop Time</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                            </View>

                            <View style={styles.RowStyle}>
                                <Text style={styles.TextTime}>{this.state.pickUpTime}</Text>
                                <Text style={styles.TextTime}>{this.state.dropTime}</Text>
                            </View>

                            <View style={styles.DetailsContainer}>
                                <Image style={styles.ContainerImage}
                                    source={require('../../../assests/images/driver.png')} />
                                <Text style={styles.ContainerText}>Driver Details</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Driver Name</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.driverName}</Text>
                                </View>
                            </View>

                            <View style={styles.LastRowStyle}>
                                <View style={styles.InnerRowStyle}>
                                    <Text style={styles.LeftSideText}>Driver Mo. no.</Text>
                                    <Image style={styles.ArrowImage}
                                        source={require('../../../assests/images/right_arrow.png')} />
                                </View>
                                <View>
                                    <Text style={styles.RightSideText}>{this.state.driverNo}</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                </ScrollView>

            </View>
        )
    }
}
export default Transport;