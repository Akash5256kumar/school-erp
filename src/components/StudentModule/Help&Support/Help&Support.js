import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Modal, BackHandler,StatusBar,SafeAreaView, Pressable, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
const baseColor = '#0747a6'
import styles from './style';
import Snackbar from 'react-native-snackbar';
import * as myConst from '../../Baseurl';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import CommonButton from '../../Button/CommonButton';
class HelpSupport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            title: '',
            issue: '',
            file: {},
            isVisiblPickerDialog: false,
            type: '',
            fileName: '',
            fileUri: '',
            fileType: '',
            options: [],
            selectedValue: '',
            std_roll: '',
            uri: '',
            name:''
        }

    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home')
        return true;
    };



    async componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            const value = await AsyncStorage.getItem('@std_roll')
            const studentName = await AsyncStorage.getItem('@name')
            console.log('value-->>', value)
            this.setState({
                std_roll: value,
                issue: '',
                uri: '',
                selectedValue: '',
                name:studentName,
            })
            this.supportTypeApi();

        });
    }


    changeIssue = (issue) => {
        this.setState({ issue: issue })
    }

    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
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



    helpSupportApi() {
        const { issue } = this.state;
        if (issue == '') {
            this.showMessage('Please enter issue.')
        } else {
            let formData = new FormData()
            formData.append('admission_no', this.state.std_roll)
            formData.append('title', this.state.selectedValue)
            formData.append('issue', issue)
            formData.append('file', { uri: this.state.uri, name: this.state.fileName, type: this.state.fileType })
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }
            fetch(myConst.BASEURL + 'support', data)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('data-->', responseJson)
                    if (responseJson.status === true) {
                        this.props.navigation.navigate('Home')
                        // this.showMessage(responseJson.message)
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



    supportTypeApi() {
        let data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
        fetch(myConst.BASEURL + 'supporttype', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('data-->', responseJson.data)
                if (responseJson.status === true) {
                    let selectIssue = ["Select Issue"]
                    const interest = [...selectIssue, ...responseJson.data];
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



    render() {
        const { isVisiblPickerDialog } = this.state;
        return (
            <SafeAreaView style={{flex:1}}>
            <LinearGradient colors={['#DFE6FF','#ffffff']} style={{flex:1}} >
            <CommonHeader 
            title={'Help & Support'}
            onLeftClick={() => {
                this.props.navigation.navigate('Home')
            }}
            />
           <ScrollView>
            <View style={styles.MainContainer}>
                {/* <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Help & Support</Text>
                        <View></View>
                    </View>
                </View> */}
          
             <Image style={styles.ProfileImage} resizeMode='contain' source={require('../../../assests/images/businessman.png')} />
             <Text style={styles.name}>{this.state.name}</Text>
             <Text style={styles.rollno}>{this.state.std_roll}</Text>
                <View style={styles.HelpSupportform}>
                    {/* <Text style={styles.TextView}>Admission Number</Text>

                    <Text style={styles.EditTextStyle}>{this.state.std_roll}</Text>

                    <Text style={styles.TextView}>Select Issue</Text> */}

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
                    <View style={styles.midView}>
                    <TextInput style={styles.IssueStyle}
                        placeholder='Issue Description'
                        placeholderTextColor={constant.grayColor}
                        multiline
                        onChangeText={this.changeIssue}
                        value={this.state.issue}
                    >
                    </TextInput>
                   {this.state.uri != ''&& <Image style={styles.uploadImage2 } source={{uri: this.state.uri}} /> }
                    <Pressable style={styles.attachView} onPress={()=>this.setState({ isVisiblPickerDialog: true })}>
                        <Text style={styles.attachText}>Attach Files</Text>
                        <Image source={constant.Icons.attachIcon} style={styles.attachImage} />
                    </Pressable>
                    </View>

                    

                    {/* <Text style={styles.TextView}>Issue</Text> */}
                  
{/* 
                    <Text style={styles.TextView}>Upload Files</Text>
                    <TouchableOpacity onPress={() => this.setState({ isVisiblPickerDialog: true })}>

                        <View style={styles.UploadFilesStyle}>
                            <Image style={this.state.uri ? styles.uploadImage : styles.HeaderArrowImage}
                                source={this.state.uri ? {
                                    uri: this.state.uri
                                } : require('../../../assests/images/upload_image.png')} />
                            <Text style={styles.AddImageText}>Add Images</Text>

                        </View>
                    </TouchableOpacity> */}
                   <CommonButton 
                    title="Submit"
                    extStyle={{marginTop:'10%',marginBottom:'15%'}}
                    buttonClick={()=>{this.helpSupportApi()}}
                   />
                   
                    {/* <TouchableOpacity
                        onPress={() => this.helpSupportApi()}>
                        <Text style={styles.submitButton}>Submit</Text>
                    </TouchableOpacity> */}

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
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        )
    }

}

export default HelpSupport;