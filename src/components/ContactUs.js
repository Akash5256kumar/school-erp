import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
const baseColor = '#0747a6'; // Assuming this is needed from the original code
import * as myConst from './Baseurl'; // Assuming this is needed from the original code
import Snackbar from 'react-native-snackbar';
import Header from './Header/Header'; // Assuming Header component is in './Header/Header'
import useStudentAuth from '../store/hooks/useStudentAuth';

const ContactUs = ({ navigation }) => {
    const { token: usertoken } = useStudentAuth();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [message, setMessage] = useState('');

    const handleBackPress = useCallback(() => {
        navigation.navigate('Dashboard');
        return true;
    }, [navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]);

    const showMessage = (msg) => {
        Snackbar.show({
            text: msg,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    };

    const contactUsApi = async () => {
        if (userId === '') {
            showMessage('Please enter Login/UserId.');
        } else if (mobileNo === '') {
            showMessage('Please enter mobile number.');
        } else if (message === '') {
            showMessage('Please enter message.');
        } else {
            setLoading(true);
            let formData = new FormData();
            formData.append('url', 'statyug.url');
            formData.append('login_user_id', userId);
            formData.append('mobile_no', mobileNo);
            formData.append('message', message);

            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : usertoken
                },
                body: formData
            };

            try {
                const response = await fetch(myConst.BASEURL + 'needhelp', data);
                const responseJson = await response.json();

                if (responseJson.status === true) {
                    setUserId('');
                    setMobileNo('');
                    setMessage('');
                    showMessage(responseJson.message);
                } else if (responseJson.status === false) {
                    showMessage(responseJson.message);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.MainContainer}>
            <Header title={'Contact Us'}
                goBack={() => {
                    navigation.goBack();
                }}
            />

            <View style={styles.ContactForm}>
                <Text style={styles.TextView}>*Enter URL</Text>
                <Text style={styles.EditTextStyle}>statyug.url</Text>
                <Text style={styles.TextView}>*Login User ID</Text>
                <TextInput style={styles.EditTextStyle}
                    placeholder='Login / User ID'
                    placeholderTextColor='grey'
                    onChangeText={setUserId}
                    value={userId}
                >
                </TextInput>

                <Text style={styles.TextView}>*Mobile no.</Text>
                <TextInput style={styles.EditTextStyle}
                    placeholder='Contact no.'
                    keyboardType='numeric'
                    placeholderTextColor='grey'
                    onChangeText={setMobileNo}
                    value={mobileNo}
                >
                </TextInput>

                <Text style={styles.TextView}>*Message</Text>
                <TextInput style={styles.EditTextStyle}
                    placeholder='Type your message here'
                    placeholderTextColor='grey'
                    onChangeText={setMessage}
                    value={message}
                >
                </TextInput>
                <TouchableOpacity
                    onPress={contactUsApi}>
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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