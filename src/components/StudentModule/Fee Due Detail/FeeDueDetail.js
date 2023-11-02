import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, BackHandler, Modal } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Snackbar from 'react-native-snackbar';
import * as myConst from '../../Baseurl';
import styles from './style';
import Header from '../../Header/Header';
const baseColor = '#0747a6'
import { NativeModules } from 'react-native';

var radio_props = [
    {
        label: 'Monthly', value: 1, displayValues: [
            { name: 'April', value: 1, code: '04' , month: '04-04'},
            { name: 'May', value: 2, code: '05' , month: '05-05'},
            { name: 'June', value: 3, code: '06' , month: '06-06'},
            { name: 'July', value: 4, code: '07' , month: '07-07'},
            { name: 'August', value: 5, code: '08' , month: '08-08'},
            { name: 'September', value: 6, code: '09' , month: '09-09'},
            { name: 'October', value: 7, code: '10' , month: '10-10'},
            { name: 'November', value: 8, code: '11' , month: '11-11'},
            { name: 'December', value: 9, code: '12' , month: '12-12'},
            { name: 'January', value: 10, code: '01' , month: '01-01'},
            { name: 'Febrary', value: 11, code: '02' , month: '02-02'},
            { name: 'March', value: 12, code: '03' , month: '03-03'}]
    },
    {
        label: 'Quarterly', value: 2, displayValues: [
            { name: 'April-June', value: 1, code: '0406' , month: '04-06'},
            { name: 'July-September', value: 4, code: '0709' , month: '07-09'},
            { name: 'October-December', value: 7, code: '1012' , month: '10-12'},
            { name: 'January-March', value: 10, code: '0103' , month: '01-03'}]
    },
    {
        label: 'Half-Yearly', value: 3, displayValues: [
            { name: 'April-September', value: 1, code: '0409' , month: '04-09'},
            { name: 'October-March', value: 7, code: '1003' , month: '10-03'}]
    },
    {
        label: 'Yearly', value: 4, displayValues: [
            { name: 'April-March', value: 1, code: '0403' , month: '04-03'}]
    },
];


class FeeDueDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            std_roll: '',
            classes: '',
            section: '',
            name: '',
            receiptNo: '',
            amount: '',
            value: '',
            late_fee: '',
            other_fee: '',
            feeAfterDueDate: '',
            admissionFee: '',
            hostel_fees: '',
            late_fees_duration: '',
            tutionFee: '',
            isVisiblPickerDialog: false,
            dataSource: [],
            plan: '',
            totalFee: '',
            newValues: [],
            year: ''
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
        const rollNo = await AsyncStorage.getItem('@std_roll')
        const classes = await AsyncStorage.getItem('@class')
        const section = await AsyncStorage.getItem('@section')
        const name = await AsyncStorage.getItem('@name')
        this.setState({
            std_roll: rollNo,
            classes: classes,
            name: name,
            section: section
        })

        var currentTime = new Date()
        var month = currentTime.getMonth() + 1
        let newMonth = "";
        if (month < 10) {
            console.log(month);
            let num = "0";
            newMonth = num.concat(month)
        } else {
            newMonth = month;
        }

        var year = currentTime.getFullYear()
        this.setState({
            year: year
        })
        console.log(this.state.year)
        this.FeeDueDetailApi()
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    FeeDueDetailApi() {
        let formData = new FormData()
        formData.append('std_roll', this.state.std_roll)
        formData.append('class', this.state.classes)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'feeduedetail', data)
            .then((response) => response.json())
            .then(responseJson => {

                if ((responseJson.status === true) && (responseJson.message === 'success')) {
                    console.log('responseJson-->', responseJson)
                    let response = responseJson.feedata

                    let displayValues = radio_props.filter(obj => obj.value == response[0].plan_type)[0].displayValues;
                    displayValues = displayValues.slice(responseJson.totalfees);

                    console.log('whbvhwbvwqbv--->',displayValues)

                    var result = displayValues.map(function (el, index) {
                        var o = Object.assign({}, el, index);
                        if (displayValues[index].name === 'April' || displayValues[index].value === 1) {
                            o["amount"]= Number(response[0].tution_fees.replace(/,/g,'')) + Number(response[0].other_fees.replace(/,/g,'')) + Number(response[0].late_fees.replace(/,/g,''))

                        } else {
                            console.log("fee"+response[0].tution_fees)
                            // o["amount"]=   Number(response[0].tution_fees.replace(/,/g,''))

                            o["amount"]= Number(response[0].tution_fees.replace(/,/g,'')) + (Number(response[0].other_fees.replace(/,/g,'')))
                        }

                        return o;
                    })

                  console.log('res'+JSON.stringify(result))
                    this.setState({
                        dataSource: result,
                        // amount: ((+response[0].tution_fees) + (+response[0].other_fees)),
                        late_fee: response[0].late_fees,
                        admissionFee: response[0].admission_fees,
                        tutionFee: response[0].tution_fees,
                        other_fee: response[0].other_fees,
                        hostel_fees: response[0].hostel_fees,
                        late_fees_duration: response[0].late_fees_duration,
                        value: response[0].plan_type
                    })
                    console.log('wwwr', 'vjdngj')

                } else if ((responseJson.status === true) && (responseJson.message === 'Please choose plan type for pay the fees')) {
                    console.log('responseJson>>>', responseJson)

                    this.setState({
                        totalFee: '0',
                        isVisiblPickerDialog: true,
                    })
                }
                else if (responseJson.staus === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    FeeStructureDetailApi() {
        this.setState({ isVisiblPickerDialog: false })
        let formData = new FormData()
        formData.append('class', this.state.classes)
        console.log(this.state.classes)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'feestructuredetail', data)
            .then((response) => response.json())
            .then(responseJson => {
                if ((responseJson.status === true) && (responseJson.message === 'success')) {
                    // console.log('responseJson-->', responseJson)
                    let response = responseJson.feedata
                    let filteredObj = response.filter(object => {
                        return object.plan_type == this.state.value
                    })[0] || {};
                    console.log('filterArray-->', filteredObj, radio_props)
                    let displayValues = radio_props.filter(obj => obj.value == this.state.value)[0].displayValues;

                    console.log('display-->', displayValues)
                    var result = displayValues.map(function (el, index) {
                        var o = Object.assign({}, el, index);
                        
                        if (displayValues[index].name === 'April' || displayValues[index].value === 1) {
                            o.amount= ((Number(filteredObj.tution_fees.replace(/,/g,''))) + (Number(filteredObj.other_fees.replace(/,/g,''))) + (Number(filteredObj.late_fees.replace(/,/g,''))))
                        } else {
                            // console.log(index)
                            o.amount= ((Number(filteredObj.tution_fees.replace(/,/g,''))) + (Number(filteredObj.other_fees.replace(/,/g,''))))
                        }

                        return o;
                    })

                    console.log('result-->', result);
                    this.setState({
                        dataSource: result,
                        // amount: ((+filteredObj.tution_fees) + (+filteredObj.other_fees)),
                        late_fee: filteredObj.late_fees,
                        admissionFee: filteredObj.admission_fees,
                        tutionFee: filteredObj.tution_fees,
                        other_fee: filteredObj.other_fees,
                        hostel_fees: filteredObj.hostel_fees,
                        late_fees_duration: filteredObj.late_fees_duration,
                        // newValues: newValues
                    })

                } else if ((responseJson.status === true) && (responseJson.message === 'This class fee strucutre is not defined in our database')) {
                    this.showMessage(responseJson.message)

                }
                else if (responseJson.staus === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    EncryptKeyApi(month) {
        console.log('hit', month)
        let formData = new FormData()
        formData.append('userid', this.state.std_roll)
        formData.append('class', this.state.classes)
        formData.append('section', this.state.section)
        formData.append('amount', this.state.amount)
        formData.append('plan_type', this.state.value)
        formData.append('month', month)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'encryptedvalue', data)
            // .then((response) => response.json())
            .then(async response => {
                const statusCode = response.status;
                console.log(statusCode)

                if (statusCode === 200) {
                    const data = await response.json();
                    console.log('encryptKey-->', data.encrypted_data)
                    this.callNativeModule(data.encrypted_data)
                } else {
                    this.showMessage(responseJson.message)
                }
            }).catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }



    callNativeModule(encryptKey) {
        console.log(typeof (this.state.amount))
        NativeModules.CcavenueEncryptionModule.encrypt(
            encryptKey.toString()
        )
    }


    async viewDetails(item) {
        console.log((this.state.tutionFee))
        console.log('item-->', item.name)

        await AsyncStorage.setItem('@planType', String(this.state.value))
        await AsyncStorage.setItem('@monthName', item.name)
        const tutionFee = this.state.tutionFee != undefined ? this.state.tutionFee : '0'
        await AsyncStorage.setItem('@tution_fees', tutionFee)
        const admissionFee = this.state.admissionFee != undefined ? this.state.admissionFee : '0'
        await AsyncStorage.setItem('@admission_fees', admissionFee)
        const otherFee = this.state.other_fee != undefined ? this.state.other_fee : '0'
        await AsyncStorage.setItem('@other_fees', otherFee)
        // await AsyncStorage.setItem('@hostel_fees', this.state.hostel_fees)
        const lateFee = this.state.late_fee != undefined ? this.state.late_fee : '0'
        await AsyncStorage.setItem('@late_fees', lateFee)
        const lateFeeduration = this.state.late_fees_duration != undefined ? this.state.late_fees_duration : '0'
        await AsyncStorage.setItem('@late_fees_duration', lateFeeduration)

        this.props.navigation.navigate('FeeDetail')
    }



    render() {
        const currMonth = new Date().getMonth() + 1;
        let currMonthCmpr = currMonth < 4 ? (12 - 3) + currMonth : currMonth - 3;
        console.log(currMonthCmpr);
        const { isVisiblPickerDialog } = this.state;
        return (
            <View style={styles.MainContainer}>

                <Header title={'Fee Due Detail'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => {

                        if (item.value < currMonthCmpr || currMonthCmpr == item.value)
                            return (
                                <View style={styles.FlatListView}>
                                    <View style={styles.CardView}>

                                        <View style={styles.CardViewStyle}>

                                            <View style={styles.HeadingContainer}>
                                                <View style={styles.RowStyle}>
                                                    <View>
                                                        <Text style={styles.MonthText}>{item?.name}</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={styles.RowStyle}>
                                                <View>
                                                    <Text style={styles.TextLeft}>Receipt No</Text>
                                                </View>
                                                <View>
                                                    <Image style={styles.AssignmentImage}
                                                        source={require("../../../assests/images/menu.png")} />
                                                </View>
                                                <View>
                                                    <Text style={styles.TextRight}>{'sdv00' + this.state.year + item.code + this.state.std_roll}</Text>
                                                </View>
                                            </View>
{console.log("amount"+JSON.stringify(item))}
                                            <View style={styles.RowStyle}>
                                                <View>
                                                    <Text style={styles.TextLeft}>Amount</Text>
                                                </View>
                                                <View>
                                                    <Image style={styles.AssignmentImage}
                                                        source={require("../../../assests/images/menu.png")} />
                                                </View>
                                                <View>
                                                    <Text style={styles.TextRight}>{item.amount}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.RowStyle}>
                                                <View>
                                                    <Text style={styles.TextLeft}>Pay Mode</Text>
                                                </View>
                                                <View>
                                                    <Image style={styles.AssignmentImage}
                                                        source={require("../../../assests/images/menu.png")} />
                                                </View>
                                                <View>
                                                    <Text style={styles.TextRight}>Online</Text>
                                                </View>
                                            </View>

                                            <View style={styles.DetailsContainer}>
                                                <View style={styles.PayBox}>
                                                    <TouchableOpacity
                                                        onPress={() => this.EncryptKeyApi(item.month)}
                                                    >
                                                        <Text style={styles.ContainerText}>Pay</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={styles.DetailBox}>
                                                    <TouchableOpacity onPress={() => this.viewDetails(item)}>
                                                        <Text style={styles.ContainerText}>Detail</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            )
                    }

                    }
                    keyExtractor={(item, index) => index}
                />

                <Modal animationType="slide"
                    transparent visible={isVisiblPickerDialog}
                    presentationStyle="overFullScreen">
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <View style={styles.PopUpView}>
                                <Text style={styles.TextStyle}>Please choose plan type to pay the fees -:</Text>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={-1}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                    labelColor={baseColor}
                                    buttonColor={baseColor}
                                    fontSize={30}
                                    formHorizontal={false}
                                />
                            </View>
                            <View style={styles.ButtomView}>
                                <TouchableOpacity onPress={() => this.state.value && this.FeeStructureDetailApi()}>
                                    <Text style={styles.modalText}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ isVisiblPickerDialog: false })}>
                                    <Text style={styles.CancelButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}

export default FeeDueDetail;