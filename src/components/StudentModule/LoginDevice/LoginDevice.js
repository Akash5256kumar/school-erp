import React, { Component } from 'react';
import { Text, View, Image, FlatList, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Header from '../../Header/Header';

class LoginDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            type: '',
            version: '',
            name: '',
            serialNo: ''
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
        this.loginDeviceApi();
    }


    loginDeviceApi() {
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
        fetch(myConst.BASEURL + 'logindevices', data)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('logindevices--->>>', responseJson)
                // console.log('data-->', responseJson.data)

                this.setState({
                    dataSource: responseJson.data,
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

                <Header title={'Login Devices'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.TextLeft}>Serial No:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.TextRight}>{item.id}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.TextLeft}>App Version:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.TextRight}>{item.deviceVersion}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.TextLeft}>Device Name:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.TextRight}>{item.deviceName}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.TextLeft}>Device Type:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.TextRight}>{item.deviceType}</Text>
                                    </View>
                                    {/* <View>
                                        <Image style={styles.DeleteImageStyle}
                                            source={require('../../assests/images/delete.png')} />
                                    </View> */}
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

export default LoginDevice;