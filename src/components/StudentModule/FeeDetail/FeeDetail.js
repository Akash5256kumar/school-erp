import React, { Component } from 'react'
import { Text, View, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
import Header from '../../Header/Header';
import moment from 'moment';
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

class FeeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutionFees: '',
            admissionFees: '',
            otherFee: '',
            hostelFee: '',
            lateFee: '',
            lateFeeDuration: '',
            amount: '',
            planType: '',
            isMonthly: false,
            BeforeDueDate: '',
            DueDate: ''
        }
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('FeeDueDetail')
        return true;
    };


    async componentDidMount() {
        const monthName = await AsyncStorage.getItem('@monthName')
        console.log('monthName-->', monthName)

        const planTypes = await AsyncStorage.getItem('@planType')
        const tutionFees = await AsyncStorage.getItem('@tution_fees')
        const admissionFees = await AsyncStorage.getItem('@admission_fees')
        const otherFee = await AsyncStorage.getItem('@other_fees')
        // hostelFee = await AsyncStorage.getItem('@hostel_fees')
        const lateFee = await AsyncStorage.getItem('@late_fees')
        const lateFeeDuration = await AsyncStorage.getItem('@late_fees_duration')
        console.log('Tution-->', tutionFees)
        console.log('admission', lateFeeDuration)
        console.log('plan', planTypes)
        // const amount = ((+tutionFees) + (+otherFee));

        this.setState({
            tutionFees: tutionFees,
            admissionFees: admissionFees,
            otherFee: otherFee,
            lateFee: lateFee,
            lateFeeDuration: lateFeeDuration,
            // amount: amount,
            planType: planTypes
        })

        if (this.state.planType = 1) {
            const dateObj = new Date()        
            var monthNum = moment().month(monthName).format("MM")

            var date = dateObj.getFullYear() + "-" + monthNum + "-" + "01"
            console.log(date)
            var d = new Date(date);
            
            var newDueDate = d.toString().split("/").reverse().join("/");
            // console.log('formatDate',newDueDate)
            d.setDate(d.getDate() + JSON.parse(this.state.lateFeeDuration));
            var dueDate = d.toISOString().split('T')[0]
            // console.log(dueDate)

            var d1 = new Date(dueDate);
            d1.setDate(d1.getDate() - 15);
            var beforeDueDate = d1.toISOString().split('T')[0]

            var formatBeforeDueDate = moment(beforeDueDate).format('DD-MM-YYYY');
            var formatDueDate = moment(dueDate).format('DD-MM-YYYY');
            console.log(formatBeforeDueDate, formatDueDate)

            this.setState({
                DueDate: formatDueDate,
                BeforeDueDate: formatBeforeDueDate
            })

            const monthNumber = dateObj.getMonth()
            const monthN = monthNames[monthNumber]
            if (monthName === monthN) {
                this.setState({
                    isMonthly: true
                })
            } else {
                this.setState({
                    isMonthly: false
                })
            }
        }

        if (!this.state.isMonthly) {
            const amount = Number(tutionFees.replace(/,/g,'')) + Number(otherFee.replace(/,/g,'')) + Number(this.state.lateFee.replace(/,/g,''));
            this.setState({
                amount: amount,
            })
        } else {
            const amount = Number(tutionFees.replace(/,/g,'') + Number(otherFee.replace(/,/g,'')));
            this.setState({
                amount: amount,
            })
        }
    }


    render() {
        return (
            <View style={styles.MainContainer}>

                <Header title={'Fee Details'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <View style={styles.FlatListView}>
                    {!this.state.isMonthly && (
                        <>
                            <View style={styles.RowStyle}>
                                <View><Text style={styles.TextLeft}>Fine</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.lateFee}</Text></View>
                            </View>
                        </>
                    )}

                    <View style={styles.RowStyle}>
                        <View><Text style={styles.TextLeft}>Tution Fee</Text></View>
                        <View><Text style={styles.TextRight}>{this.state.tutionFees}</Text></View>
                    </View>

                    <View style={styles.RowStyle}>
                        <View><Text style={styles.TextLeft}>Others</Text></View>
                        <View><Text style={styles.TextRight}>{this.state.otherFee}</Text></View>
                    </View>

                    {!this.state.isMonthly && (
                        <>
                            <View style={styles.RowStyle}>
                                <View><Text style={styles.TextLeft}>Before Due Date</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.BeforeDueDate}</Text></View>
                            </View>

                            <View style={styles.RowStyle}>
                                <View><Text style={styles.TextLeft}>Due Date</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.DueDate}</Text></View>
                            </View>
                        </>
                    )}

                    <View style={styles.RowStyle}>
                        <View><Text style={styles.TextLeft}>Fees After Due Date</Text></View>
                        <View><Text style={styles.TextRight}>{this.state.amount}</Text></View>
                    </View>
                </View>

                <View style={styles.FlatListView}>
                    <View style={styles.SummaryCardView}>
                        <Text style={styles.SummaryText}>Summary</Text>
                        <View style={styles.RowStyle}>
                            <View><Text style={styles.TextLeft}>Total Fee</Text></View>
                            <View><Text style={styles.TextRight}>{this.state.amount}/-</Text></View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }

}

export default FeeDetail;