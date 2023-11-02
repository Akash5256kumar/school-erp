import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'


class StaffSupportAssignedDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            feedbackOptions: [],
            deadlineOptions: [],
            selectedFeedbackStatus: '',
            selectedDeadlineStatus: '',
            isVisiblPickerDialog: false,
            fileName: '',
            fileUri: '',
            fileType: '',
            dob: '',
            feedbackResponse: '',
            name: '',
            s_class: '',
            section: '',
            admissionNo: '',
            issue: '',
            detail: '',
            feedback: '',
            id: '',
            isDeadlineCardView: true,
            isFeedBackCardView: true,
            tName: '',
            statusId: ''
        }
    }

    async componentDidMount() {
        const teacherName = await AsyncStorage.getItem('@name')
        const myArray = await AsyncStorage.getItem('@MyItem:key');
        if (myArray !== null) {
            console.log('itemArray-->', JSON.parse(myArray));
            // console.log(teacherName)
            this.setState({
                id: JSON.parse(myArray).id,
                name: JSON.parse(myArray).name,
                s_class: JSON.parse(myArray).std_class,
                admissionNo: JSON.parse(myArray).std_roll,
                section: JSON.parse(myArray).std_section,
                issue: JSON.parse(myArray).issue,
                detail: JSON.parse(myArray).details,
                feedback: JSON.parse(myArray).feedback,
                tName: teacherName
            })
        }
        let feedback = ["Select Status", "Process", "Solved", "UnSolved"]
        let deadline = ["Select Status", "Accept"]
        console.log(feedback)
        console.log(deadline)
        this.setState({
            feedbackOptions: feedback,
            deadlineOptions: deadline
        });
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    changeDateOfBirth = (dob) => {
        this.setState({ dob: dob });
    }
    changeFeedback = (feedbackResponse) => {
        this.setState({ feedbackResponse: feedbackResponse });
    }


    supportDeadlineApi() {
        const { dob, selectedDeadlineStatus } = this.state;
        console.log(selectedDeadlineStatus)
        if (selectedDeadlineStatus == '' || selectedDeadlineStatus == 'Select Status') {
            this.showMessage('Please enter status.')
        } else if (dob == '') {
            this.showMessage('Please enter deadline of query.')
        } else {
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "supportsystem_id": this.state.id,
                    "deadline": this.state.dob
                })
            }
            fetch(myConst.BASEURL + 'supportdeadline', data)
                .then((response) => response.json())
                .then(async (responseJson) => {
                    if (responseJson.status === true) {
                        console.log('responseJson-->', responseJson)
                        this.setState({ isDeadlineCardView: false })

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



    supportFeedbackApi() {
        const { feedbackResponse, selectedFeedbackStatus } = this.state;
        console.log(selectedFeedbackStatus)
        if (selectedFeedbackStatus == '' || selectedFeedbackStatus == 'Select Status') {
            this.showMessage('Please enter status.')
        } else if (feedbackResponse == '') {
            this.showMessage('Please enter feedback response.')
        } else {
            let statusId;
            if (selectedFeedbackStatus == 'Process') {
                statusId = 5
            } else if (selectedFeedbackStatus == 'Solved') {
                statusId = 2
            } else if (selectedFeedbackStatus == 'UnSolved') {
                statusId = 3
            }
            let formData = new FormData()
            formData.append('supportsystem_id', this.state.id)
            formData.append('status', statusId)
            formData.append('feedback', this.state.feedbackResponse)
            formData.append('name', this.state.tName)
            formData.append('feedbackfile', { uri: this.state.fileUri, name: this.state.fileName, type: this.state.fileType })
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            }
            fetch(myConst.BASEURL + 'supportfeedback', data)
                .then((response) => response.json())
                .then(async (responseJson) => {
                    if (responseJson.status === true) {
                        console.log('responseJson-->', responseJson)
                        this.setState({ isFeedBackCardView: false })

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
                        fileUri: response.assets[0].uri,
                        fileType: response.assets[0].type
                    });
                    console.log('fileeee---->>>>>>>>>', this.state.fileUri)
                } catch (error) {
                    console.log(error)
                }
            })
            this.setState({ isVisiblPickerDialog: false })

        }
    }


    deadlineResetbutton() {
        this.setState({
            selectedDeadlineStatus: 'Select Status',
            dob: ''
        })
    }


    feedbackResetbutton() {
        this.setState({
            selectedFeedbackStatus: 'Select Status',
            feedbackResponse: ''
        })
    }


    render() {
        const { isVisiblPickerDialog } = this.state;
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>View Support Details</Text>
                        <View></View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.FlatListView}>
                        <View style={styles.CardView}>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Name</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.name}</Text></View>
                            </View>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Class</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.s_class}</Text></View>
                            </View>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Admission No.</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.admissionNo}</Text></View>
                            </View>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Section</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.section}</Text></View>
                            </View>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Issue</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.issue}</Text></View>
                            </View>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Details</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.issue}</Text></View>
                            </View>

                            <View style={styles.BottomRowStyle}>
                                <View><Text style={styles.TextLeft}>Feedback</Text></View>
                                <View><Text style={styles.TextRight}>{this.state.feedback}</Text></View>
                            </View>

                        </View>
                    </View>

                    {this.state.isDeadlineCardView && (
                        <>
                            <View style={styles.FlatListView}>
                                <View style={styles.DeadlineCardView}>

                                    <View style={styles.deadlineCardRow}>
                                        <View><Text style={styles.NormalText}>Status</Text></View>
                                        <View style={styles.rowIconStyle}>
                                            <View style={styles.DropDownBackground}>
                                                <Picker
                                                    mode='dropdown'
                                                    selectedValue={this.state.selectedDeadlineStatus}
                                                    onValueChange={(itemValue) => {
                                                        this.setState({
                                                            selectedDeadlineStatus: itemValue
                                                        })
                                                    }}
                                                >
                                                    {this.state.deadlineOptions.map((item, index) => {
                                                        return (<Picker.Item label={item} value={item} key={index} />)
                                                    })}
                                                </Picker>
                                            </View>

                                            <Image style={styles.ImageStyle}
                                                source={require('../../../assests/images/leftarrow.png')} />
                                        </View>
                                    </View>

                                    <View style={styles.deadlineCardRow}>
                                        <View><Text style={styles.NormalText}>Deadline of query</Text></View>
                                        <View>
                                            <View>
                                                <DatePicker style={styles.TextInputStyleClass}
                                                    date={this.state.dob}
                                                    // mode="date"
                                                    placeholder="YYYY-MM-DD"
                                                    format="YYYY-MM-DD"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    showIcon={false}
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
                                                    onDateChange={(date) => this.changeDateOfBirth(date)}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.ButtonContainerStyle}>
                                        <TouchableOpacity style={styles.button}
                                            onPress={() => this.supportDeadlineApi()}
                                        >
                                            <Text style={styles.buttonText}>SAVE</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.button}
                                            onPress={() => this.deadlineResetbutton()}
                                        >
                                            <Text style={styles.buttonText}>RESET</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                        </>
                    )
                    }

                    {this.state.isFeedBackCardView && (
                        <>
                            <View style={styles.FlatListView}>
                                <View style={styles.FeedbackCardView}>

                                    <View style={styles.deadlineCardRow}>
                                        <View><Text style={styles.NormalText}>Status</Text></View>
                                        <View style={styles.rowIconStyle}>
                                            <View style={styles.DropDownBackground}>
                                                <Picker
                                                    mode='dropdown'
                                                    selectedValue={this.state.selectedFeedbackStatus}
                                                    onValueChange={(itemValue) => {
                                                        this.setState({
                                                            selectedFeedbackStatus: itemValue
                                                        })
                                                    }}
                                                >
                                                    {this.state.feedbackOptions.map((item, index) => {
                                                        return (<Picker.Item label={item} value={item} key={index} />)
                                                    })}
                                                </Picker>
                                            </View>

                                            <Image style={styles.ImageStyle}
                                                source={require('../../../assests/images/leftarrow.png')} />
                                        </View>
                                    </View>

                                    <View style={styles.deadlineCardRow}>
                                        <View><Text style={styles.NormalText}>Response</Text></View>
                                        <View style={styles.RowStyle}>
                                            <TextInput
                                                multiline={true}
                                                placeholder='Enter response..'
                                                placeholderTextColor='grey'
                                                value={this.state.feedbackResponse}
                                                onChangeText={this.changeFeedback}
                                                style={styles.DescriptionBoxStyle}></TextInput>
                                        </View>
                                        <View><Text style={styles.NormalText}>Attachment (optional)</Text></View>
                                        <View style={styles.ChooseFileBoxStyle}>
                                            <Text style={styles.SelectFileText}>{this.state.fileName}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ isVisiblPickerDialog: true })}
                                            >
                                                <Text style={styles.chooseFileButton}>Choose File</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.ButtonContainerStyle}>
                                        <TouchableOpacity style={styles.button}
                                            onPress={() => this.supportFeedbackApi()}
                                        >
                                            <Text style={styles.buttonText}>SAVE</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.button}
                                            onPress={() => this.feedbackResetbutton()}
                                        >
                                            <Text style={styles.buttonText}>RESET</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </>
                    )
                    }

                    <Modal animationType="slide"
                        transparent visible={isVisiblPickerDialog}
                        presentationStyle="overFullScreen">
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
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

export default StaffSupportAssignedDetails;