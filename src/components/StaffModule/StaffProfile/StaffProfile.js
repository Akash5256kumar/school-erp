import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, BackHandler } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './style';
const baseColor = '#0747a6'
// import * as myConst from '../Baseurl';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-community/async-storage";


class StaffProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            teacherName: '',
            teacherEmail: '',
            teacherRole: '',
            assignClass: '',
            assignSection: '',
            firstName: '',
            lastName: ''
        }

    }


    async componentDidMount(){
        const name = await AsyncStorage.getItem('@name')
        var first = name.split(' ').slice(0, -1).join(' ');
        var last = name.split(' ').slice(-1).join(' ');
        console.log('first', first)
        console.log('last', last)
        const email = await AsyncStorage.getItem('@email')
        const role = await AsyncStorage.getItem('@role')
        const assignclass = await AsyncStorage.getItem('@aclass')
        const assignsection = await AsyncStorage.getItem('@asection')
        this.setState({
            teacherName: name,
            firstName: first,
            lastName: last,
            teacherEmail: email,
            teacherRole: role,
            assignClass: assignclass,
            assignSection: assignsection
        })
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
    


    render() {
        return (
            <View style={styles.MainContainer}>
                <ScrollView>

                    <View style={styles.NewRowStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffHome')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/arrow_back.png')} />
                        </TouchableOpacity>
                        <Text style={styles.ProfileText}>Profile</Text>
                        <Text></Text>
                    </View>
                    <View style={styles.ProfileImageBackground}>
                        <Image style={styles.ProfileImage}
                            source={require('../../../assests/images/businessman.png')} />
                    </View>

                    <View>
                        <View style={styles.CardviewMargin}>
                            <Text style={styles.GeneralText}>User Information</Text>

                            <View style={styles.RowStyle}>
                                <Text style={styles.BoldTextLeft}>Name</Text>
                                <Text style={styles.BoldTextRight}>Last Name</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <Text style={styles.NormalText}>{this.state.firstName}</Text>
                                <Text style={styles.NormalText}>{this.state.lastName}</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.HorizontalLine}></View>
                                <View style={styles.HorizontalLine}></View>
                            </View>
                            <Text style={styles.BoldTextLeft}>Email</Text>

                            <View style={styles.RowStyle}>
                                <Text style={styles.EmailText}>{this.state.teacherEmail}</Text>
                            </View>
                            <View style={styles.HoziontalLineFull}></View>

                            <View style={styles.RowStyle}>
                                <Text style={styles.BoldTextLeft}>Role Type</Text>
                                <Text style={styles.BoldTextRight}>Class Incharge</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <Text style={styles.NormalTextViewLeft}>{this.state.teacherRole}</Text>
                                <Text style={styles.NormalTextViewLeft}>{this.state.assignClass}-{this.state.assignSection}</Text>
                            </View>

                            <View style={styles.RowStyle}>
                                <View style={styles.HorizontalLine}></View>
                                <View style={styles.HorizontalLine}></View>
                            </View>

                            {/* <Text style={styles.BoldTextLeft}>Subject</Text>

                            <View style={styles.RowStyle}>
                                <Text style={styles.NormalTextViewLeft}>bkmkbmkbk</Text>
                            </View>
                            <View style={styles.HoziontalLineFull}></View> */}

                        </View>

                        {/* <TouchableOpacity style={styles.button}
                            onPress={() => this.props.navigation.navigate("StaffHome")}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity> */}
                    </View>

                </ScrollView>
            </View>
        )
    }
}
export default StaffProfile;