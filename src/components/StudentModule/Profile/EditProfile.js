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


const EditProfile = (props) => {
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


    const matchBloodGroup = (value) => {
        return bloodGroupList.find(group => group.code === value);
      };

      const findGender = (value) => {
        return genderList.find(gender => gender.code === value);
      };
 

    useEffect(()=>{
    setName(profileData?.name)
    setEmail(profileData?.email)
    setDob(profileData?.dob)
    // setGender(profileData?.gender)
    setCategory(profileData?.category)
    setReligious(profileData?.religious)
    setMedicalCond(profileData?.medical_condition)
    setAllergy(profileData?.allergy)
    setAddress(profileData?.address)
    setCity(profileData?.city)
    setState(profileData?.state)
    setCountry(profileData?.country)
    setPincode(profileData?.pincode)
    setPer_Address(profileData?.perm_address)
    setper_City(profileData?.perm_city)
    setPer_State(profileData?.perm_state)
    setPer_Country(profileData?.perm_country)
    setper_Pincode(profileData?.perm_pincode)
    setSchoolName(profileData?.previous_scl_name)
    profileData?.prev_certificate&& setCertif_Copy("http://139.59.90.236:86/images/student_image/prev_certificate/"+profileData?.prev_certificate)

    profileData?.studentimage && setProfilePic("http://139.59.90.236:86/images/student_image/STUDENT/"+profileData?.studentimage)
  
  
    if(profileData?.bloodgroup != null){
    const result = matchBloodGroup(profileData?.bloodgroup);
    result != undefined && Object.keys(result).length > 0 && setBloodGroup(result.code)
    }

    if(profileData?.gender != null){
        const result = findGender(profileData?.gender);
        result != undefined && Object.keys(result).length > 0 && setGender(result.description)
        }

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

    const fn_UpdateProfile= async()=>{
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
            id : profileData?.id,
            bloodgroup: bloodGroup,
            phoneno:profileData?.phoneno,
            address: address,
            // studentimage:imageParam,
            religious: religious,
            category: category,
            gender: gender,
            // prev_certificate: "",
            allergy: allergy,
            medical_condition: medicalCond,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
            perm_address: per_Address,
            perm_pincode: per_pincode,
            perm_city: per_city,
            perm_state: per_state,
            perm_country: per_country,
            previous_scl_name : schoolName,
            ...(isEdit && { studentimage: imageParam }),
            ...(certifEdit && { prev_certificate: certifImageParam })

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
            },
            body: formData
        }

        console.log("data",JSON.stringify(data))

        fetch(myConst.BASEURL + 'updateStudentProfile', data)
        .then((response) => response.json())
        .then(async (responseJson) => {
            console.log('data-->', responseJson)
            setEmptyLoader(false)
            if (responseJson.status === true) {
                await AsyncStorage.setItem('userData', JSON.stringify(responseJson?.data)); // safer with JSON.stringify
                navigation.goBack()
            } else if (responseJson.status === false) {
                // showMessage(responseJson.message)
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
          title={'Profile'}
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
            <Text style={[styles.profileTitle]}>{name}</Text>
            <Text style={[styles.profileTitle]}>{profileData?.std_roll}</Text>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>DOB</Text>
                {/* <Pressable style={styles.cardInput} onPress={()=>setOpenPicker(true)} >
                  <Text style={styles.cardInput}>{dob}</Text>
                </Pressable> */}
                <TextInput
                 style={styles.cardInput}
                 editable={false}
                 onChangeText={(t)=>setDob(t)}
                >{dob}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Email ID</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setEmail(t)}
                >{email}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Gender</Text>
                <View style={{height:constant.resW(13)}}>
                <SelectDropList 
                        list={genderList}
                        title={gender === '' ? 'Select Gender' : gender}
                        buttonExt={styles.dropList}
                        textExt={styles.dropListText}
                        on_Select={(d)=>setGender(d.code)}
                        />
                        </View>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Religious</Text>
                <TextInput
                 style={styles.cardInput}
                 editable={false}
                 onChangeText={(t)=>setReligious(t)}
                >{religious}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Category</Text>
                <TextInput
                 style={styles.cardInput}
                 editable={false}
                 onChangeText={(t)=>setCategory(t)}
                >{category}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Blood Group</Text>
                <View style={{height:constant.resW(13)}}>
                <SelectDropList 
                        list={bloodGroupList}
                        title={bloodGroup === '' ? 'Select Blood group' : bloodGroup}
                        buttonExt={styles.dropList}
                        textExt={styles.dropListText}
                        on_Select={(d)=>setBloodGroup(d.description)}
                        />
                        </View>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Any Medical condition</Text>
                <TextInput
                multiline
                 style={[styles.cardInput,{height:constant.resW(25), textAlignVertical:'top'}]}
                 onChangeText={(t)=>setMedicalCond(t)}
                >{medicalCond}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Allergies</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setAllergy(t)}
                >{allergy}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle2}>Correspondence Address</Text>
            </View>
  
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
                 keyboardType='numeric'
                 maxLength={6}
                 style={styles.cardInput}
                 onChangeText={(t)=>setPincode(t)}
                >{pincode}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle2}>Permanent Address</Text>
            </View>
  
            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Address</Text>
                <TextInput
                multiline
                 style={[styles.cardInput,{height:constant.resW(25), textAlignVertical:'top'}]}
                 onChangeText={(t)=>setPer_Address(t)}
                >{per_Address}</TextInput>
            </View>
            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>City</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setper_City(t)}
                >{per_city}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>State</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setPer_State(t)}
                >{per_state}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Country</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setPer_Country(t)}
                >{per_country}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>PinCode</Text>
                <TextInput
                 style={styles.cardInput}
                 keyboardType='numeric'
                 maxLength={6}
                 onChangeText={(t)=>setper_Pincode(t)}
                >{per_pincode}</TextInput>
            </View>
            

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Previous School Name</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setSchoolName(t)}
                >{schoolName}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Transfer Certificate Copy:</Text>
                <Pressable style={styles.certifButton} onPress={()=>setCertifModal(true)}>
                    {
                        certif_Copy ===  '' ?
                        <Image source={require('../../../assests/images/add.png')} resizeMode='contain' style={styles.plusStyle} />
                      :
                      <Image source={{uri:certif_Copy}} style={styles.certifyStyle} resizeMode='stretch' />

                    }
                </Pressable>
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

export default EditProfile;
