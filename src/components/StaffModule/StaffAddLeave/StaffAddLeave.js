import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './style';
import AsyncStorage from "@react-native-community/async-storage";
import { CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
const testIDs = require('../../testIDs');
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker'
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


LocaleConfig.locales['en'] = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

class StaffAddLeave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            options: [],
            selectedValue: '',
            startDate: '',
            endDate: '',
            subject: '',
            description: '',
            id: '',
            fileName: '',
            fileType: '',
            file: {},
            isVisiblPickerDialog: false,
            uri: ''
        }
    }


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@id')
        this.setState({
            id: value
        })
        let selectType = ["Select Leave Type", "Casual Leave", "Earn Leave", "Sick Leave"]
        console.log(selectType)
        this.setState({
            options: selectType
        });
    }

    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    changeStartDate = (startDate) => {
        this.setState({ startDate: startDate })
    }
    changeEndDate = (endDate) => {
        this.setState({ endDate: endDate })
    }
    changeSubject = (subject) => {
        this.setState({ subject: subject })
    }
    changeDescription = (description) => {
        this.setState({ description: description })
    }


    applyLeaveApi() {
        console.log('Called without image')
        const { selectedValue, startDate, endDate, subject, description } = this.state;
        if (selectedValue == '') {
            this.showMessage('Please select leave Type.')
        } else if (startDate == '') {
            this.showMessage('Please select start Date.')
        } else if (endDate == '') {
            this.showMessage('Please select end Date.')
        } else if (subject == '') {
            this.showMessage('Please enter subject.')
        } else if (description == '') {
            this.showMessage('Please enter description.')
        } else {
            let formData = new FormData()
            formData.append('user_id', this.state.id)
            formData.append('leave_type', this.state.selectedValue)
            formData.append('subject', this.state.subject)
            formData.append('start_date', this.state.startDate)
            formData.append('end_date', this.state.endDate)
            formData.append('description', this.state.description)
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
            fetch(myConst.BASEURL + 'applyleave', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('data-->', responseJson)
                    if (responseJson.status === true) {
                        this.props.navigation.navigate("StaffHome")
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


    applyLeaveWithImageApi() {
        console.log('called with image')
        const { selectedValue, startDate, endDate, subject, description } = this.state;
        if (selectedValue == '') {
            this.showMessage('Please select leave Type.')
        } else if (startDate == '') {
            this.showMessage('Please select start Date.')
        } else if (endDate == '') {
            this.showMessage('Please select end Date.')
        } else if (subject == '') {
            this.showMessage('Please enter subject.')
        } else if (description == '') {
            this.showMessage('Please enter description.')
        } else {
            let formData = new FormData()
            formData.append('user_id', this.state.id)
            formData.append('leave_type', this.state.selectedValue)
            formData.append('subject', this.state.subject)
            formData.append('start_date', this.state.startDate)
            formData.append('end_date', this.state.endDate)
            formData.append('description', this.state.description)
            formData.append('file', { uri: this.state.uri, name: this.state.fileName, type: this.state.fileType })
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
            fetch(myConst.BASEURL + 'applyleave', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('data-->', responseJson)
                    if (responseJson.status === true) {
                        this.props.navigation.navigate("StaffHome")
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



    selectFile = (type) => {
        const options = {
            mediaType: 'photo',
            videoQuality: 'high',
            quality: 1,
            maxWidth: 0,
            maxHeight: 0,
            includeBase64: false,
            cameraType: 'back',
            selectionLimit: 1,
            saveToPhotos: false,
            durationLimit: 0,
        };
        if (type === 'Gallery') {
            launchImageLibrary(options, (response) => {
                try {
                    console.log(response);
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].uri);
                    console.log(response.assets[0].type);
                    this.setState({
                        fileName: response.assets[0].fileName,
                        uri: response.assets[0].uri,
                        fileType: response.assets[0].type
                    })
                    console.log('fileeee---->>>>>>>>>', this.state.uri)
                } catch (error) {
                    console.log(error)
                }
            })
            this.setState({ isVisiblPickerDialog: false })

        } else if (type === 'Camera') {
            launchCamera(options, (response) => {
                try {
                    console.log(response);
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].uri);
                    console.log(response.assets[0].type);
                    this.setState({
                        fileName: response.assets[0].fileName,
                        uri: response.assets[0].uri,
                        fileType: response.assets[0].type
                    })
                    console.log('fnameeee---->>>>>>>>>', this.state.uri)
                } catch (error) {
                    console.log(error)
                }
            })
            this.setState({ isVisiblPickerDialog: false })

        }
    }


    apiCall() {
        const { selectedValue, startDate, endDate, subject, description, uri } = this.state;
        console.log('uri', uri)
        if (uri) {
            this.applyLeaveWithImageApi()
        } else {
            this.applyLeaveApi()
        }
    }


    render() {
        const { isVisiblPickerDialog } = this.state;
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>New Leave</Text>
                        <View></View>
                    </View>
                </View>

                <ScrollView>
                    <View>
                        <View style={styles.CardviewStyle}>
                            <View style={styles.RowStyle}>
                                <Image style={styles.ImageStyle}
                                    source={require('../../../assests/images/leave_type.png')} />
                                <View style={styles.ColumnStyle}>
                                    <Text style={styles.HeadingText}>Type</Text>
                                    <View style={styles.DropDownBackground}>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.selectedValue}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    selectedValue: itemValue
                                                })
                                            }
                                            }>
                                            {this.state.options.map((item, index) => {
                                                return (<Picker.Item label={item} value={item} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.HoziontalLineFull}></View>

                            <View style={styles.RowStyle}>
                                <Image style={styles.ImageStyle}
                                    source={require('../../../assests/images/cause.png')} />
                                <View style={styles.ColumnStyle}>
                                    <Text style={styles.HeadingText}>Subject</Text>
                                    <TextInput style={styles.NormalText}
                                        underlineColorAndroid='transparent'
                                        placeholder='Please enter Subject..'
                                        placeholderTextColor='grey'
                                        onChangeText={this.changeSubject}></TextInput>
                                </View>
                            </View>

                            <View style={styles.HoziontalLineFull}></View>

                            <View style={styles.RowStyle}>
                                <Image style={styles.ImageStyle}
                                    source={require('../../../assests/images/From.png')} />
                                <View style={styles.ColumnStyle}>
                                    <Text style={styles.HeadingText}>From</Text>

                                    <View>
                                        <DatePicker style={styles.TextInputStyleClass}
                                            date={this.state.startDate}
                                            placeholder="YYYY-MM-DD"
                                            format="YYYY-MM-DD"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={true}
                                            customStyles={{
                                                placeholderText: {
                                                    color: '#635d83'
                                                },
                                                dateInput: {
                                                    borderWidth: 0,
                                                    alignItems: 'flex-start',
                                                    marginBottom: 25
                                                }
                                            }}
                                            onDateChange={(date) => this.changeStartDate(date)}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.HoziontalLineFull}></View>

                            <View style={styles.RowStyle}>
                                <Image style={styles.ImageStyle}
                                    source={require('../../../assests/images/To.png')} />
                                <View style={styles.ColumnStyle}>
                                    <Text style={styles.HeadingText}>To</Text>
                                    <View>
                                        <DatePicker style={styles.TextInputStyleClass}
                                            date={this.state.endDate}
                                            // mode="date"
                                            placeholder="YYYY-MM-DD"
                                            format="YYYY-MM-DD"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={true}
                                            customStyles={{
                                                placeholderText: {
                                                    color: '#635d83'
                                                },
                                                dateInput: {
                                                    borderWidth: 0,
                                                    alignItems: 'flex-start',
                                                    marginBottom: 25
                                                }
                                            }}
                                            onDateChange={(date) => this.changeEndDate(date)}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.HoziontalLineFull}></View>

                            <View style={styles.RowStyle}>
                                <Image style={styles.DescriptionImageStyle}
                                    source={require('../../../assests/images/description.png')} />
                                <View style={styles.ColumnStyle}>
                                    <Text style={styles.HeadingText}>Description</Text>
                                    <TextInput style={styles.NormalText}
                                        underlineColorAndroid='transparent'
                                        placeholder='Please enter Description...'
                                        placeholderTextColor='grey'
                                        onChangeText={this.changeDescription}></TextInput>
                                </View>
                            </View>

                            <View style={styles.HoziontalLineFull}></View>

                            <View style={styles.RowStyle}>
                                <Image style={styles.DescriptionImageStyle}
                                    source={require('../../../assests/images/attached.png')} />
                                <View style={styles.ColumnStyle}>
                                    <Text style={styles.HeadingText}>Attach a file</Text>
                                    <TouchableOpacity onPress={() => this.setState({ isVisiblPickerDialog: true })}>

                                        <Image style={this.state.uri ? styles.uploadImage : styles.AddImage}
                                            source={this.state.uri ? {
                                                uri: this.state.uri
                                            } : require('../../../assests/images/upload_image.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button}
                            onPress={() => this.apiCall()}
                        >
                            <Text style={styles.buttonText}>Apply Leave</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal animationType="slide"
                        transparent visible={isVisiblPickerDialog}
                        presentationStyle="overFullScreen">
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => this.selectFile('Camera')}>
                                    <Text style={styles.modalText}>Choose from Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectFile('Gallery')}>
                                    <Text style={styles.modalText}>Pick from Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ isVisiblPickerDialog: false })}>
                                    <Text style={styles.CancelButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        )
    }


}
export default StaffAddLeave;