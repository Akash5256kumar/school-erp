import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
const baseColor = '#0747a6'
import * as myConst from './Baseurl';
import Header from './Header/Header';

class RateUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
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


    render() {
        return (
            <View style={styles.MainContainer}>
                <Header title={'Rate Us'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <View style={styles.MainContainer}>
                    <View style={styles.container}>
                        <Image style={styles.loginImage}
                            source={require('../assests/images/sdv.png')} />
                    </View>

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

    container: {
        // backgroundColor: baseColor,
        alignItems: 'center',
    },

    loginImage: {
        height: 130,
        // width: 150,
        marginTop: 70,
        alignItems: 'center',
        backgroundColor: 'white'
    },

    HeaderBackground: {
        backgroundColor: baseColor,
        padding: 12
    },

    HeaderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginEnd: 20
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderImage: {
        height: 25, width: 30
    },

});

export default RateUs;

