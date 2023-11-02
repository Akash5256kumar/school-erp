import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
const baseColor = '#0747a6'
import * as myConst from './Baseurl';
import Snackbar from 'react-native-snackbar';
import Header from './Header/Header';

class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: '',
            mobileNo: '',
            message: ''
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


    changeUserId = (userId) => {
        this.setState({ userId: userId });
    }
    changeMobileNumber = (mobileNo) => {
        this.setState({ mobileNo: mobileNo })
    }
    changeMessage = (message) => {
        this.setState({ message: message })
    }

    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    contactUsApi() {
        const { userId, mobileNo, message } = this.state;
        if (userId == '') {
            this.showMessage('Please enter Login/UserId.')
        } else if (mobileNo == '') {
            this.showMessage('Please enter mobile number.')
        } else if (message == '') {
            this.showMessage('Please enter message.')
        } else {
            let formData = new FormData()
            formData.append('url', 'statyug.url')
            formData.append('login_user_id', userId)
            formData.append('mobile_no', mobileNo)
            formData.append('message', message)
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
            let self = this;
            this.setState({ isLoading: true });
            fetch(myConst.BASEURL + 'needhelp', data)
                .then((response) => response.json())
                // .then((json) => {
                //     console.log('login res -> ', JSON.stringify(json));
                // })
                .then(async (responseJson) => {
                    console.log('responseJson-->', responseJson)
                    if (responseJson.status === true) {
                        this.setState({
                            userId: '',
                            mobileNo: '',
                            message: ''
                        })
                        this.showMessage(responseJson.message)
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
            <View style={styles.MainContainer}>
                <Header title={'Contact Us'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <View style={styles.ContactForm}>
                    <Text style={styles.TextView}>*Enter URL</Text>
                    <Text style={styles.EditTextStyle}>statyug.url</Text>
                    <Text style={styles.TextView}>*Login User ID</Text>
                    <TextInput style={styles.EditTextStyle}
                        placeholder='Login / User ID'
                        placeholderTextColor='grey'
                        onChangeText={this.changeUserId}
                        value={this.state.userId}
                    >
                    </TextInput>

                    <Text style={styles.TextView}>*Mobile no.</Text>
                    <TextInput style={styles.EditTextStyle}
                        placeholder='Contact no.'
                        keyboardType='numeric'
                        placeholderTextColor='grey'
                        onChangeText={this.changeMobileNumber}
                        value={this.state.mobileNo}
                    >
                    </TextInput>

                    <Text style={styles.TextView}>*Message</Text>
                    <TextInput style={styles.EditTextStyle}
                        placeholder='Type your message here'
                        placeholderTextColor='grey'
                        onChangeText={this.changeMessage}
                        value={this.state.message}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={() => this.contactUsApi()}>
                        <Text style={styles.submitButton}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        padding: 12
    },

    HeaderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: 20
    },

    HeaderImage: {
        height: 25, width: 30
    },

    ContactForm: {
        marginTop: 30,
        marginStart: 20,
        marginEnd: 20
    },

    TextView: {
        fontSize: 18,
        color: baseColor,
        marginLeft: 5,
    },

    EditTextStyle: {
        height: 45,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: 'blue',
        color: 'black',
    },

    submitButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: baseColor,
        padding: 8,
        paddingLeft: 40,
        paddingRight: 40,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },

    button: {
        alignItems: 'center',
        padding: 20,
        paddingStart: 10,
        paddingEnd: 10
    },

});

export default ContactUs;