import React, { Component, version } from 'react';
import { Image, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'


class StaffAttendance extends Component {


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
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Attendance</Text>
                        <View></View>
                    </View>
                </View>

                <View style={styles.ButtonContainerStyle}>

                    <View style={styles.TabCardView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffAddAttendance')}>
                            <Image style={styles.IconStyle}
                                source={require("../../../assests/images/addAttendance.png")} />
                            <Text style={styles.CardviewText}>Add Attendance</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.TabCardView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffViewStudentAttendance')}>
                            <Image style={styles.IconStyle}
                                source={require("../../../assests/images/viewAttendance.png")} />
                            <Text style={styles.CardviewText}>View Attendance</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

}


export default StaffAttendance;