import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-community/async-storage";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            studentName: '',
            rollNo: '',
            phoneNum: '',
            dob: '',
            class: '',
            section: '',
            residental: '',
            staff: '',
            fatherName: '',
            motherName: '',
            parentPhnNum: '',
            parentAddress: '',
            Foccupation: '',
            dayScholar: '',
            id: ''
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
        const value = await AsyncStorage.getItem('@id')
        console.log('value-->>', value)
        this.setState({
            id: value
        })
        this.ProfileApi()
    }


    ProfileApi() {
        let formData = new FormData()
        formData.append('id', this.state.id)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'studentprofile', data)
            .then((response) => response.json())
            .then(responseJson => {
                // console.log('responseJson-->', responseJson.data)
                if (responseJson.status === true) {
                    let response = responseJson.data
                    if (response.day_scholar === 1) {
                        this.setState({ dayScholar: 'Day Scholar' })
                    } else if (response.day_scholar === 2) {
                        this.setState({ dayScholar: 'Residential' })
                    }
                    this.setState({
                        studentName: response.Student_name,
                        rollNo: response.std_roll,
                        class: response.Student_class,
                        section: response.Student_section,
                        residental: response.Student_name,
                        dob: response.dob,
                        phoneNum: response.phoneno,
                        staff: response.staff,
                        fatherName: response.F_name,
                        motherName: response.M_name,
                        parentAddress: response.Fofficeaddress,
                        parentPhnNum: response.F_mobile,
                        Foccupation: response.F_occupation
                    })
                } else if (responseJson.staus === false) {

                    // console.log('status-->>>>', responseJson.status)
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
        console.log('state--->', this.state.studentName);
        return (
            <ScrollView>
                <View>
                    <ImageBackground style={styles.ContainerImage}
                        source={require('../../../assests/images/profile_shape.jpg')}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <View style={styles.ProfileImageBackground}>
                            <Image style={styles.ProfileImage}
                                source={require('../../../assests/images/businessman.png')} />
                            <Text style={styles.TextName}>{this.state.studentName}</Text>
                            <Text style={styles.TextAddress}>{this.state.rollNo}</Text>
                        </View>
                    </ImageBackground>

                    <View style={{ backgroundColor: 'white' }}>
                        <View style={styles.CardviewMargin}>
                            <ImageBackground style={styles.DetailContainerBackround}
                                imageStyle={styles.ImageBorderStyle}
                                source={require('../../../assests/images/bg_shape.png')}>
                                <View style={styles.CardStyle}>
                                    <Text style={styles.GeneralText}>General</Text>

                                    <View style={styles.RowStyle}>
                                        <View style={styles.RowInnerStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/icon_birthday.png')} />
                                            <Text style={styles.BoldText}>Date of Birth</Text>
                                        </View>

                                        <View style={styles.RowInnerStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/residental.png')} />
                                            <Text style={styles.BoldText}>Day Scholar/Residental</Text>
                                        </View>
                                    </View>

                                    <View style={styles.NewRowStyle}>
                                        <Text style={styles.NormalText}>{this.state.dob}</Text>
                                        <Text style={styles.NormalText}>{this.state.dayScholar}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <View style={styles.RowInnerStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/class_sec.png')} />
                                            <Text style={styles.BoldText}>Class/Section</Text>
                                        </View>

                                        <View style={styles.RowInnerStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/call.png')} />
                                            <Text style={styles.BoldText}>Phone number</Text>
                                        </View>
                                    </View>

                                    <View style={styles.NewRowStyle}>
                                        <Text style={styles.NormalText}>{this.state.class}/{this.state.section}</Text>
                                        <Text style={styles.NormalText}>{this.state.phoneNum}</Text>
                                    </View>

                                    <View style={styles.RowInnerStyle}>
                                        <View style={styles.RowInnerStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/notes.png')} />
                                            <Text style={styles.BoldText}>Teacher's Name</Text>
                                        </View>
                                    </View>

                                    <View style={styles.RowInnerStyle}>
                                        <Text style={styles.NormalText}>{this.state.staff}</Text>
                                    </View>
                                </View>
                            </ImageBackground>

                            <ImageBackground style={styles.DetailContainerBackround}
                                imageStyle={styles.ImageBorderStyle}
                                source={require('../../../assests/images/bg_shape.png')}>
                                <View style={{ display: 'flex', marginStart: 10, marginEnd: 10 }}>
                                    <Text style={styles.GeneralText}>General</Text>

                                    <View style={styles.RowStyle}>
                                        <View style={styles.ImageStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/icon_birthday.png')} />
                                            <Text style={styles.BoldText}>Father's Name</Text>
                                        </View>

                                        <View style={styles.ImageStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/residental.png')} />
                                            <Text style={styles.BoldText}>Mother's Name</Text>
                                        </View>
                                    </View>

                                    <View style={styles.NewRowStyle}>
                                        <Text style={styles.NormalText}>{this.state.fatherName}</Text>
                                        <Text style={styles.NormalText}>{this.state.motherName}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <View style={styles.ImageStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/class_sec.png')} />
                                            <Text style={styles.BoldText}>Father's  Occupation</Text>
                                        </View>

                                        <View style={styles.ImageStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/call.png')} />
                                            <Text style={styles.BoldText}>Phone number</Text>
                                        </View>
                                    </View>

                                    <View style={styles.NewRowStyle}>
                                        <Text style={styles.NormalText}>{this.state.Foccupation}</Text>
                                        <Text style={styles.NormalText}>{this.state.parentPhnNum}</Text>
                                    </View>

                                    <View style={styles.ImageStyle}>
                                        <View style={styles.ImageStyle}>
                                            <Image style={styles.IconStyle}
                                                source={require('../../../assests/images/notes.png')} />
                                            <Text style={styles.BoldText}>Address</Text>
                                        </View>
                                    </View>

                                    <View style={styles.ImageStyle}>
                                        <Text style={styles.NormalText}>{this.state.parentAddress}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default Profile;