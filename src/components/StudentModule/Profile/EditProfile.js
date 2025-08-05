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
} from 'react-native';
import styles from './EditProfileStyle';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';


const EditProfile = (props) => {
    const {navigation,route } = props
    const profileData = route.params.profileData
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [profilePic, setProfilePic] = useState('')    
    const [isEdit, setIsEdit] = useState(false)
    const [gender,setGender]  = useState({})
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
    const [per_state,per_setState] = useState('')
    const [per_country,per_setCountry] = useState('')
    const [per_pincode,setper_Pincode] = useState('')
    const  [schoolName,setSchoolName] = useState('')
    const [certif_Copy,setCertif_Copy] = useState('')
 

    useEffect(()=>{
    setName(profileData?.name)
    setEmail(profileData?.email)
    setDob(profileData?.dob)
    },[])


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
            <Pressable style={styles.profileButton}>
            <Image style={styles.ProfileImage} source={require('../../../assests/images/businessman.png')} />
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
                 onChangeText={(t)=>setName(t)}
                >{email}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Religious</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setName(t)}
                >{name}</TextInput>
            </View>

            <View style={styles.cardView}>
                <Text style={styles.cardTitle}>Category</Text>
                <TextInput
                 style={styles.cardInput}
                 onChangeText={(t)=>setName(t)}
                >{name}</TextInput>
            </View>
        </ScrollView>

      </View>
    </LinearGradient>
  );
};

export default EditProfile;
