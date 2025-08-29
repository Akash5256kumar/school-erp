import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  BackHandler,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './EditProfileStyle';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectDropList from '../../SelectDropList';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CommonButton from '../../Button/CommonButton';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';

const bloodGroupList=[
    { "code": "A+", "description": "A+" },
    { "code": "A-", "description": "A-" },
    { "code": "B+", "description": "B+" },
    { "code": "B-", "description": "B-" },
    { "code": "AB+", "description": "AB+" },
    { "code": "AB-", "description": "AB-" },
    { "code": "O+", "description": "O+" },
    { "code": "O-", "description": "O-" }
  ]

  const genderList = [
    { code: "male", description: "Male" },
    { code: "female", description: "Female" },
    { code: "other", description: "Other" },
  ];


const GuardianEditProfile = (props) => {
    const userData = useSelector(state=>state.userSlice.userData)
    const usertoken = useSelector(state=>state.userSlice.token)
    const {navigation,route } = props
    const profileData = route.params.profileData
    const [isVisiblPickerDialog,setIsVisiblPickerDialog] = useState(false)
    const [openPicker,setOpenPicker] = useState(false)
    const [emptyLoader,setEmptyLoader] = useState(false)
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [profilePic, setProfilePic] = useState('') 
    const [profilePicData,setProfilePicData] = useState([])   
    const [isEdit, setIsEdit] = useState(false)
    const [gender,setGender]  = useState('')
    const [dob, setDob] = useState('')
    const [religious,setReligious] = useState('')
    const [category,setCategory] = useState('')
    const [bloodGroup,setBloodGroup]  = useState('')
    const [medicalCond,setMedicalCond] = useState('')
    const [allergy,setAllergy] = useState('')
    const [address,setAddress] = useState('')
    const [city,setCity] = useState("")
    const [state,setState] = useState('')
    const [country,setCountry] = useState('')
    const [pincode,setPincode] = useState('')
    const [per_Address,setPer_Address] = useState('')
    const [per_city,setper_City] = useState("")
    const [per_state,setPer_State] = useState('')
    const [per_country,setPer_Country] = useState('')
    const [per_pincode,setper_Pincode] = useState('')
    const  [schoolName,setSchoolName] = useState('')
    const [certif_Copy,setCertif_Copy] = useState('')
    const [certifEdit,setCertiEdit] = useState(false)
    const [certifData,setCertifData] = useState([])
    const [certifModal,setCertifModal] = useState(false)

    const [relation,setRelation] = useState('')
    const [mobile,setMobile] = useState('')
    const [whatsAppNo,setWhatsAppNo] = useState('')



    useEffect(()=>{
    setName(profileData?.L_name)
    setMobile(profileData?.L_mobile)
    setWhatsAppNo(profileData?.L_whatsup_no)
    setRelation(profileData?.L_relation)
    setAddress(profileData?.L_address)
    setCity(profileData?.L_city)
    setState(profileData?.L_state)
    setCountry(profileData?.L_country)
    setPincode(profileData?.L_pincode)

    profileData?.gaurdianimg && profileData?.gaurdianimg != null && setProfilePic("http://139.59.90.236:86/images/student_image/GUARDIAN/"+profileData?.gaurdianimg)
   

    },[])

      
    const handleBackPress = useCallback(() => {
        navigation.navigate('Profile');
        return true;
      }, [navigation]);
    
      // Lifecycle events
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, [handleBackPress]);
        


   const selectFile = (type) => {
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
                    setProfilePic(response.assets[0].uri)
                    setProfilePicData(response)
                    setIsEdit(true)
                   
                    setIsVisiblPickerDialog(false)
                  
                } catch (error) {
                    console.log(error)
                    setIsVisiblPickerDialog(false)
                }
            })
          

        } else if (type === 'Camera') {
            launchCamera(options, (response) => {
                try {
                    console.log(response);
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].uri);
                    console.log(response.assets[0].type);
                    setProfilePic(response.assets[0].uri)
                    setProfilePicData(response)
                    setIsEdit(true)
                    setIsVisiblPickerDialog(false)
                } catch (error) {
                    setIsVisiblPickerDialog(false)
                    console.log(error)
                }
            })
    }
    }

    const selectCertFile = (type) => {
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
                    setCertif_Copy(response.assets[0].uri)
                    setCertifData(response)
                    setCertiEdit(true)
                   
                    setCertifModal(false)
                  
                } catch (error) {
                    console.log(error)
                    setCertifModal(false)
                }
            })
          

        } else if (type === 'Camera') {
            launchCamera(options, (response) => {
                try {
                    console.log(response);
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].uri);
                    console.log(response.assets[0].type);
                    setCertif_Copy(response.assets[0].uri)
                    setCertifData(response)
                    setCertiEdit(true)
                    setCertifModal(false)
                } catch (error) {
                    setCertifModal(false)
                    console.log(error)
                }
            })
    }
    }

   const showMessage=(message)=> {
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#f15270',
        });
      }

      validateMobileNumber = (number) => {
        const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number pattern
        return mobileRegex.test(number);
      };

    const fn_UpdateProfile=()=>{
        if(name === ''){
            showMessage("Please enter Name")
            return true
        }
        if(relation === ''){
            showMessage("Please enter Relation")
            return true
        }
        // if(mobile != '' && validateMobileNumber(mobile)){
        //     showMessage("Please enter a valid 10-digit mobile number")
        //     return true
        // }

        let imageParam
        if(isEdit){
        imageParam =  {
            uri: profilePicData?.assets[0].uri,
            type: profilePicData?.assets[0].type,
            name: profilePicData?.assets[0].fileName,
          }
        }

      setEmptyLoader(true)
        const paramData = {
            "id": profileData?.id,
            "L_address": address,
            "L_city": city,
            "L_country": country,
            "L_mobile": mobile,
            "L_name": name,
            "L_pincode": pincode,
            "L_relation": relation,
            "L_state": state,
            "L_whatsup_no": whatsAppNo,
            ...(isEdit && { "gaurdianimg": imageParam }),

          };
          const formData = new FormData();

          Object.entries(paramData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              formData.append(key, value);
            }
          });

          let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : usertoken
            },
            body: formData
        }

        console.log("data",JSON.stringify(data))

        fetch(myConst.BASEURL + 'updateStudentProfile', data)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('data-->', responseJson)
            setEmptyLoader(false)
            if (responseJson.status === true) {
                navigation.goBack()
            } else if (responseJson.status === false) {
                setTimeout(()=>{
                    showMessage(responseJson.message)
                },500)
               
            }
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => {
            setEmptyLoader(false)
            // this.setState({ isLoading: false });
        })

    }

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader
          title={'Guardian Profile'}
          onLeftClick={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
            <Pressable style={styles.profileButton} onPress={()=>setIsVisiblPickerDialog(true)}>
            <Image style={styles.ProfileImage} resizeMode='cover' source={ profilePic==='' ? require('../../../assests/images/businessman.png') : {uri:profilePic}} />
            <View style={styles.editIconView} >
                <Image source={constant.Icons.edit} tintColor={constant.baseColor} style={styles.editIcon} />
            </View>
            </Pressable>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Name</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setName(t)}
                >{name}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Relation</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setRelation(t)}
                >{relation}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Mobile No.</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={10}
                 onChangeText={(t)=>setMobile(t)}
                >{mobile}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>WhatsappNo</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={10}
                 onChangeText={(t)=>setWhatsAppNo(t)}
                >{whatsAppNo}</TextInput>
            </View>

            {/* <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Email ID</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setEmail(t)}
                >{email}</TextInput>
            </View> */}

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Address</Text>
                <TextInput
                multiline
                 style={[styles.cardInput,{height:constant.resW(25), textAlignVertical:'top'}]}
                 onChangeText={(t)=>setAddress(t)}
                >{address}</TextInput>
            </View>
            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>City</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setCity(t)}
                >{city}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>State</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setState(t)}
                >{state}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Country</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setCountry(t)}
                >{country}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>PinCode</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={6}
                 onChangeText={(t)=>setPincode(t)}
                >{pincode}</TextInput>
            </View>

           <CommonButton 
                    title="Submit"
                    extStyle={{marginTop:'10%',marginBottom:'15%'}}
                    buttonClick={()=>{fn_UpdateProfile()}}
                   />

        </ScrollView>

      </View>

      <Modal animationType="slide"
                    transparent visible={isVisiblPickerDialog}
                    presentationStyle="overFullScreen">
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => selectFile('Camera')}>
                                <Text style={styles.modalText}>Choose from Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectFile('Gallery')}>
                                <Text style={styles.modalText}>Pick from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsVisiblPickerDialog(false)}>
                                <Text style={styles.CancelButton}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
     </Modal>

     <Modal animationType="slide"
                    transparent visible={certifModal}
                    presentationStyle="overFullScreen">
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => selectCertFile('Camera')}>
                                <Text style={styles.modalText}>Choose from Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectCertFile('Gallery')}>
                                <Text style={styles.modalText}>Pick from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setCertifModal(false)}>
                                <Text style={styles.CancelButton}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
     </Modal>

     <Modal animationType="slide"
                    transparent visible={emptyLoader}
                    presentationStyle="overFullScreen">
                    <View style={[styles.viewWrapper,{alignItems:'center'}]}>
                        <View style={styles.modalView}>
                           
                           <ActivityIndicator size={'large'} color={constant.baseColor} />
                        </View>
                    </View>
     </Modal>

     <DatePicker
          style={styles.datePickerStyle}
          date={new Date() }
          open={openPicker}
          mode="date"
          modal
          placeholder="Type Date Of Birth"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onConfirm={date => {
            console.log(date);
            // this.setState({open: false, dob: date});
          }}
          onCancel={() => {
            // this.setState({open: false});
          }}
          customStyles={{
            placeholderText: {
              color: '#59597530',
              fontFamily: constant.typeMedium,
            },
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
              paddingHorizontal: '4%',
              fontFamily: constant.typeMedium,
              color: constant.blackColor,

              // marginBottom: 25,
              // backgroundColor:'red',
              // alignSelf:'center',
              // height:'100%'
            },
          }}
        />
    </LinearGradient>
  );
};

export default GuardianEditProfile;
