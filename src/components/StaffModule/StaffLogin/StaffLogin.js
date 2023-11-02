import React, { Component, version } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import { StackNavigator } from 'react-navigation';

class StaffLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            deviceVersion: '',
            deviceName: '',
            deviceType: '',
            token: ''
        }
    }

    changeEmail = (email) => {
        this.setState({ email: email });
    }
    changePassword = (password) => {
        this.setState({ password: password })
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    loginApi() {
        // this.props.navigation.navigate('StaffHome');
        // return;
        const { email, password } = this.state;
        if (email == '') {
            this.showMessage('Please enter email address.')
        } else if (password == '') {
            this.showMessage('Please enter password.')
        } else {
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                })
            }
            let self = this;
            this.setState({ isLoading: true });
            fetch(myConst.BASEURL + 'staff_login', data)
                .then((response) => response.json())
                .then(async (responseJson) => {
                    console.log('responseJson-->', responseJson)
                    if (responseJson.status === true) {
                        
                        this.setState({ isLoading: false });
                        await AsyncStorage.setItem('@id', String(responseJson.data.id))
                        await AsyncStorage.setItem('@name', responseJson.data.name)
                        await AsyncStorage.setItem('@email', responseJson.data.email)
                        await AsyncStorage.setItem('@aclass', responseJson.data.assignclass)
                        await AsyncStorage.setItem('@asection', responseJson.data.assignsection)
                        await AsyncStorage.setItem('@role', responseJson.data.role_type)
                        await AsyncStorage.setItem('@date', responseJson.data.created_at)
                        self.props.navigation.navigate('StaffHome');
                    } else if (responseJson.status === false) {
                        this.showMessage(responseJson.message)
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    this.setState({ isLoading: false });
                })
        }
    }


    render() {
        return (
            <View style={styles.HomeScreenView}>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <Image style={styles.loginImage}
                                source={require('../../../assests/images/staff_login.png')} />
                        </View>
                        <View style={styles.loginForm}>
                            <Text style={styles.loginText}>Login</Text>
                            <TextInput placeholder='EMAIL'
                                style={styles.TextInputStyleClass}
                                placeholderTextColor='#635d83'
                                onChangeText={this.changeEmail}
                                >
                            </TextInput>

                            <View>
                            <TextInput placeholder='PASSWORD'
                                style={styles.TextInputStyleClass}
                                placeholderTextColor='#635d83'
                                secureTextEntry={true}
                                onChangeText={this.changePassword}
                                >
                            </TextInput>
                            </View>

                            <TouchableOpacity style={styles.button}
                                onPress={() => this.loginApi()}
                            >
                                <Text style={styles.buttonText}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default StaffLogin;