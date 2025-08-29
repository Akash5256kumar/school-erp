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
import styles from './ParentsEditProfileStyle';
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


const ParentsEditProfile = (props) => {
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

    const [org,setOrg] = useState('')
    const [occup,setOccup] = useState('')
    const [desig,setDesig] = useState('')
    const [officeNo,setOfficeNo] = useState('')
    const [officeAdd,setOfficeAdd] = useState('')
    const [M_org,setM_Org] = useState('')
    const [M_occup,setM_Occup] = useState('')
    const [M_desig,setM_Desig] = useState('')
    const [M_officeNo,setM_OfficeNo] = useState('')
    const [M_officeAdd,setM_OfficeAdd] = useState('')
    const [M_name,setM_Name] = useState('')
    const [M_email, setM_Email] = useState('')
    const [M_mobile,setM_Mobile] = useState('')
    const [M_whatsAppNo,setM_WhatsAppNo] = useState('')



    useEffect(()=>{
    setName(profileData?.F_name)
    setMobile(profileData?.F_mobile)
    // setWhatsAppNo(profileData?.L_whatsup_no)
     setOccup(profileData?.F_occupation)
    setOrg(profileData?.F_organization)
    setEmail(profileData?.F_email)
    setDesig(profileData?.F_designation)
    setOfficeAdd(profileData?.Fofficeaddress)
    setOfficeNo(profileData?.Foficemobile)
   
    profileData?.fatherimage && profileData?.fatherimage != null && setProfilePic("http://139.59.90.236:86/images/student_image/FATHER/"+profileData?.fatherimage)
   
    setM_Name(profileData?.M_name)
    setM_Mobile(profileData?.M_mobile)
    // setM_WhatsAppNo(profileData?.L_whatsup_no)
     setM_Occup(profileData?.M_occupation)
    setM_Org(profileData?.M_organization)
    setM_Email(profileData?.M_email)
    setM_Desig(profileData?.M_designation)
    setM_OfficeAdd(profileData?.Mofficeaddress)
    setM_OfficeNo(profileData?.Mofficemobile)
    profileData?.motherimage && profileData?.motherimage != null && setCertif_Copy("http://139.59.90.236:86/images/student_image/MOTHER/"+profileData?.motherimage)

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

    const   validateMobileNumber = (number) => {
        const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number pattern
        return mobileRegex.test(number);
      };

    const  validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const fn_UpdateProfile=()=>{

        if(name === ''){
            showMessage('Please enter Father name')
            return true
        }
        if(email === ''){
            showMessage('Please enter Father email')
            return true
        }
        if(!validateEmail(email)){
            showMessage('Please enter Father valid email')
            return true
        }
        if(mobile === ''){
            showMessage('Please enter Father mobile no')
            return true
        }
        // if(!validateMobileNumber(Number(mobile))){
        //     console.log("asadfa"+validateMobileNumber(Number(mobile)))
        //     showMessage('Please enter Father valid mobile no')
        //     return true
        // }
        if(M_name === ''){
            showMessage('Please enter Mother name')
            return true
        }
        if(M_email === ''){
            showMessage('Please enter Mother email')
            return true
        }
        if(M_mobile === ''){
            showMessage('Please enter Mother mobile no')
            return true
        }
     
        let imageParam
        let certifImageParam
        if(isEdit){
        imageParam =  {
            uri: profilePicData?.assets[0].uri,
            type: profilePicData?.assets[0].type,
            name: profilePicData?.assets[0].fileName,
          }
        }

        if(certifEdit){
            certifImageParam =  {
                uri: certifData?.assets[0].uri,
                type: certifData?.assets[0].type,
                name: certifData?.assets[0].fileName,
              }
            }

      setEmptyLoader(true)
        const paramData = {
            "id": profileData?.id,
            "F_designation": desig,
            "F_email": email,
            "F_mobile":mobile,
            "F_name": name,
            "F_occupation": occup,
            "F_organization": org,
            "Fofficeaddress": officeAdd,
            "Foficemobile": officeNo,
            "M_designation": M_desig,
            "M_email": M_email,
            "M_mobile": M_mobile,
            "M_name": M_name,
            "M_occupation": M_occup,
            "M_organization": M_org,
            "Mofficeaddress": M_officeAdd,
            "Mofficemobile": M_officeNo,
            ...(isEdit && { "fatherimage": imageParam }),
            ...(certifEdit && { "motherimage": certifImageParam })

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
          title={'Parents Profile'}
          onLeftClick={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
        <View style={styles.cardView}>
                <Text style={styles.cardTitle2}>Father Details</Text>
            </View>
            
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
                <Text style={styles.cardTitle}>Email ID</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setEmail(t)}
                >{email}</TextInput>
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

            {/* <View style={styles.cardView}>
                <Text style={styles.cardTitle}>WhatsappNo</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={10}
                 onChangeText={(t)=>setWhatsAppNo(t)}
                >{whatsAppNo}</TextInput>
            </View> */}

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Organization</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setOrg(t)}
                >{org}</TextInput>
            </View>

            
            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Occupation</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setOccup(t)}
                >{occup}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Designation</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setDesig(t)}
                >{desig}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Office No.</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={10}
                 onChangeText={(t)=>setOfficeNo(t)}
                >{officeNo}</TextInput>
            </View>


            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Office Address</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setOfficeAdd(t)}
                >{officeAdd}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle2}>Mother Details</Text>
            </View>
            
            <Pressable style={styles.profileButton} onPress={()=>setCertifModal(true)}>
            <Image style={styles.ProfileImage} resizeMode='cover' source={ certif_Copy==='' ? require('../../../assests/images/businessman.png') : {uri:certif_Copy}} />
            <View style={styles.editIconView} >
                <Image source={constant.Icons.edit} tintColor={constant.baseColor} style={styles.editIcon} />
            </View>
            </Pressable>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Name</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_Name(t)}
                >{M_name}</TextInput>
            </View>

          <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Email ID</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_Email(t)}
                >{M_email}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Mobile No.</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={10}
                 onChangeText={(t)=>setM_Mobile(t)}
                >{M_mobile}</TextInput>
            </View>

            {/* <View style={styles.cardView}>
                <Text style={styles.cardTitle}>WhatsappNo</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={10}
                 onChangeText={(t)=>setM_WhatsAppNo(t)}
                >{M_whatsAppNo}</TextInput>
            </View> */}

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Organization</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_Org(t)}
                >{M_org}</TextInput>
            </View>

            
            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Occupation</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_Occup(t)}
                >{M_occup}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Designation</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_Desig(t)}
                >{M_desig}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Office No.</Text>
                <TextInput
                 keyboardType='numeric'
                 maxLength={10}
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_OfficeNo(t)}
                >{M_officeNo}</TextInput>
            </View>


            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Office Address</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setM_OfficeAdd(t)}
                >{M_officeAdd}</TextInput>
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

export default ParentsEditProfile;
