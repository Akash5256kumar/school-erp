import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, ImageBackground, ScrollView, BackHandler, Alert } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'


class StaffHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            role: ''
        }

    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        // BackHandler.exitApp();
        Alert.alert(
            'Exit',
            'Are you sure you want to exit ?',
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: () => {
                        BackHandler.exitApp();
                    }
                },
            ],
            { cancelable: false }
        )
        return true;
    };



    async componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            // call your refresh method here
            console.log('home screen')
            const teacherName = await AsyncStorage.getItem('@name')
            const teacherRole = await AsyncStorage.getItem('@role')
            console.log('teacherName-->>', teacherName)
            console.log('teacherRole-->>', teacherRole)
            this.setState({
                role: teacherRole,
                name: teacherName
            })
        });


    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <View>
                    <ImageBackground style={styles.ContainerImage}
                        source={require('../../../assests/images/Dashboard_header_new.png')}>

                        <View style={styles.HeaderView}>
                            <View></View>
                            <Text style={styles.HeaderText}>Dashboard</Text>
                            <TouchableOpacity onPress={() =>
                            Alert.alert(
                                'Log out',
                                'Do you want to logout?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            AsyncStorage.clear();
                                            this.props.navigation.navigate('Login')
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }>
                                <Image style={styles.HeaderImage}
                                    source={require('../../../assests/images/s_logout.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ProfileImageBackground}>
                            <Image style={styles.ProfileImage}
                                source={require('../../../assests/images/businessman.png')} />
                            <View style={styles.HeaderImageStyle}>
                                <Text style={styles.TextName}>{this.state.name}</Text>
                                <Text style={styles.TextAddress}>{this.state.role}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <ScrollView>
                    <View style={{ marginStart: 15, marginEnd: 15 }}>
                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('StaffProfile')}
                            >
                                <View style={styles.ProfileCircleShapeView}>
                                    <Text style={styles.GridText}>Profile</Text>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/staff_profile.png')} />

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('StaffViewLeave')}
                            >
                                <View style={styles.ApplyLeavesCircleShapeView}>
                                    <Text style={styles.GridText}>Apply Leaves</Text>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/apply_leaves.png')} />
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('StaffIssueSubmission')}
                            >
                                <View style={styles.IssueCircleShapeView}>
                                    <Text style={styles.GridText}>Issue Submission</Text>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/issue.png')} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('StaffAddItem')}
                            >
                                <View style={styles.AddItemCircleShapeView}>
                                    <Text style={styles.GridText}>Add Item Query</Text>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/add_items.png')} />
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('StaffSupportSystem')}
                            >
                                <View style={styles.SupportCircleShapeView}>
                                    <Text style={styles.GridText}>Support System</Text>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/staff_support.png')} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('StaffAttendance')}
                            >
                                <View style={styles.AttendenceCircleShapeView}>
                                    <Text style={styles.GridText}>Attendance</Text>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/staff_attendance.png')} />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            </View>

        )
    }
}
export default StaffHome;