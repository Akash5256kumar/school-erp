import React, { Component } from 'react';
import { Image, Text, View, Modal, TextInput, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

class StaffIssueSubmission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            file: {},
            isVisiblPickerDialog: false,
            type: '',
            fileName: '',
            fileUri: '',
            fileType: '',
            options: [],
            selectedValue: '',
            id: '',
            studentname: '',
            studentclass: '',
            studentsection: '',
            description: '',
            addmission_no: ''
        }
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


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@id')
        this.setState({
            id: value
        })
        this.getIssueTypeApi();
    }


    getIssueTypeApi() {
        let data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        this.setState({ isLoading: true });
        fetch(myConst.BASEURL + 'issuedtypes', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    console.log('responseJson-->', responseJson.data)

                    let response = responseJson.data;
                    const names = response.map(function (user) {
                        return user.type;
                    });
                    console.log(names);
                    let selectIssue = ["Select Issue Type"]
                    const interest = [...selectIssue, ...names];
                    console.log(interest)
                    this.setState({
                        options: interest
                    })

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    changeAdmissionNo = (addmission_no) => {
        this.setState({ addmission_no: addmission_no })
    }
    changeName = (studentname) => {
        this.setState({ studentname: studentname });
    }
    changeClass = (studentclass) => {
        this.setState({ studentclass: studentclass })
    }
    changeSection = (studentsection) => {
        this.setState({ studentsection: studentsection })
    }
    changeDescription = (description) => {
        this.setState({ description: description })
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    valueChangeHandler(object) {
        this.setState(object, () => {
            const { addmission_no } = this.state;
            if ((addmission_no !== '')) {
                this.getStudentInfoApi()
            }
        });
    }


    getStudentInfoApi() {
        const { addmission_no } = this.state;
        if (addmission_no == '') {
            this.showMessage('Please enter admission number.')
        } else {
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": this.state.addmission_no
                })
            }
            fetch(myConst.BASEURL + 'studentprofile', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('data-->', responseJson.data)
                    if (responseJson.status === true) {

                        let response = responseJson.data
                        this.setState({
                            studentname: response.Student_name,
                            studentclass: response.Student_class,
                            studentsection: response.Student_section
                        })

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


    apiCall() {
        const { selectedValue, startDate, endDate, subject, description, fileUri } = this.state;
        console.log('uri', fileUri)
        if (fileUri) {
            this.issueSubmitWithImageApi()
        } else {
            this.issueSubmitApi()
        }
    }


    issueSubmitApi() {
        console.log('called without image')
        const { addmission_no, studentname, studentclass, studentsection, description } = this.state;
        if (addmission_no == '') {
            this.showMessage('Please enter admission number.')
        } else if (studentname == '') {
            this.showMessage('Please enter student Name.')
        } else if (studentclass == '') {
            this.showMessage('Please enter student Class.')
        } else if (studentsection == '') {
            this.showMessage('Please enter student section.')
        } else if (description == '') {
            this.showMessage('Please enter description.')
        } else {
            let formData = new FormData()
            formData.append('user_id', id)
            formData.append('admission_no', this.state.addmission_no)
            formData.append('name', this.state.studentname)
            formData.append('section', this.state.studentsection)
            formData.append('class', this.state.studentclass)
            formData.append('type', this.state.selectedValue)
            // formData.append('file', { uri: this.state.fileUri, name: this.state.fileName, type: this.state.fileType })
            formData.append('reason', this.state.description)
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
            fetch(myConst.BASEURL + 'issuedraise', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('data-->', responseJson)
                    if (responseJson.status === true) {
                        this.props.navigation.navigate('StaffHome')
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


    issueSubmitWithImageApi() {
        console.log('called with image')
        const { addmission_no, studentname, studentclass, studentsection, description } = this.state;
        if (addmission_no == '') {
            this.showMessage('Please enter admission number.')
        } else if (studentname == '') {
            this.showMessage('Please enter student Name.')
        } else if (studentclass == '') {
            this.showMessage('Please enter student Class.')
        } else if (studentsection == '') {
            this.showMessage('Please enter student section.')
        } else if (description == '') {
            this.showMessage('Please enter description.')
        } else {
            let formData = new FormData()
            formData.append('user_id', id)
            formData.append('admission_no', this.state.addmission_no)
            formData.append('name', this.state.studentname)
            formData.append('section', this.state.studentsection)
            formData.append('class', this.state.studentclass)
            formData.append('type', this.state.selectedValue)
            formData.append('file', { uri: this.state.fileUri, name: this.state.fileName, type: this.state.fileType })
            formData.append('reason', this.state.description)
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
            fetch(myConst.BASEURL + 'issuedraise', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('data-->', responseJson)
                    if (responseJson.status === true) {
                        this.props.navigation.navigate('StaffHome')
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
                    })
                    console.log('fileeee---->>>>>>>>>', this.state.fileUri)
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
                        fileUri: response.assets[0].uri,
                        fileType: response.assets[0].type
                    })
                    console.log('fnameeee---->>>>>>>>>', this.state.fileUri)
                } catch (error) {
                    console.log(error)
                }
            })
            this.setState({ isVisiblPickerDialog: false })


        }
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
                        <Text style={styles.HeaderText}>Issue Submission</Text>
                        <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffViewRequest')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/project.png')} />
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.ContainerStyle}>
                        <Text style={styles.HeadingText}>Admission Number</Text>
                        <View style={styles.RowStyle}>
                            <TextInput
                                keyboardType='phone-pad'
                                style={styles.TextInputStyle}
                                onChangeText={(addmission_no) => this.valueChangeHandler({ addmission_no: addmission_no })}
                            ></TextInput>
                        </View>

                        <Text style={styles.HeadingText}>Name</Text>
                        <View style={styles.RowStyle}>
                            <TextInput style={styles.TextInputStyle}
                                value={this.state.studentname}
                                onChangeText={this.changeName}
                            ></TextInput>
                        </View>

                        <Text style={styles.HeadingText}>Class</Text>
                        <View style={styles.RowStyle}>
                            <TextInput style={styles.TextInputStyle}
                                value={this.state.studentclass}
                                onChangeText={this.changeClass}
                            ></TextInput>
                        </View>

                        <Text style={styles.HeadingText}>Section</Text>
                        <TextInput style={styles.TextInputStyle}
                            value={this.state.studentsection}
                            onChangeText={this.changeSection}
                        ></TextInput>

                        <Text style={styles.HeadingText}>Issue Type</Text>
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

                        <Text style={styles.HeadingText}>Description</Text>
                        <View style={styles.RowStyle}>
                            <TextInput
                                multiline={true}
                                style={styles.DescriptionBoxStyle}
                                onChangeText={this.changeDescription}
                            ></TextInput>
                        </View>

                        <Text style={styles.HeadingText}>File Attachment</Text>
                        <View style={styles.ChooseFileBoxStyle}>
                            <Text style={styles.SelectFileText}>{this.state.fileName}</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ isVisiblPickerDialog: true })}
                            >
                                <Text style={styles.chooseFileButton}>Choose File</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={styles.button}
                            onPress={() => this.apiCall()}
                        >
                            <Text style={styles.buttonText}>SUBMIT</Text>
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

export default StaffIssueSubmission;