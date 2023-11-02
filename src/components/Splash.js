import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const baseColor = '#0747a6'

class Splash extends Component {
    // console.log('spl')
    // const navigation = useNavigation()
    // componentDidMount() {
    //     setTimeout(() => {
    //         // go to Home page
    //         this.props.navigation.navigate('Login')
    //     }, 2500)
    // }

    componentDidMount() {
        setTimeout(async () => {
            console.log('splash screen')
            const value = await AsyncStorage.getItem('@std_roll')
            const role = await AsyncStorage.getItem('@role')
            console.log('rollno->', value)
            if (value !== null) {
                this.props.navigation.navigate('Dashboard')
                console.log('student')
            } else if(role !== null){
                this.props.navigation.navigate('StaffHome')
                console.log('staff')
            } else {
                this.props.navigation.navigate('Login')
                console.log('loginnnnn')
            } 
            // navigation.navigate('Login')
        }, 8000);
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.logoImage}
                        source={require('../assests/images/new_logo.png')}
                    />
                </View>
                <View style={styles.gifContainer}>
                    <Image style={styles.gif}
                        source={require('../assests/images/splash.gif')}
                        resizeMode='contain'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },

    logoImage: {
        marginTop: 15
    },

    gifContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    gif: {
        width: '100%',
        height: '100%'
    }
});
export default Splash;