import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, BackHandler, ScrollView, Platform, Pressable } from 'react-native';
import styles from './style'; // Assuming style.js contains the styles
const baseColor = '#0747a6'; // Assuming this is needed from the original code
import * as myConst from '../../Baseurl'; // Assuming this is needed from the original code
import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-community/async-storage";
import { resW } from '../../../Utils/Constant'; // Assuming this is needed from the original code
import moment from 'moment';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const userData = useSelector(state=>state.userSlice.userData)
  const usertoken = useSelector(state=>state.userSlice.token)
    const [loading, setLoading] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [dob, setDob] = useState('');
    const [studentClass, setStudentClass] = useState(''); // Renamed to avoid conflict with 'class' keyword
    const [section, setSection] = useState('');
    const [residental, setResidental] = useState('');
    const [staff, setStaff] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [parentPhnNum, setParentPhnNum] = useState('');
    const [parentAddress, setParentAddress] = useState('');
    const [Foccupation, setFoccupation] = useState('');
    const [dayScholar, setDayScholar] = useState('');
    const [id, setId] = useState('');
    const [profileData, setProfileData] = useState({});
    const [active, setActive] = useState(1);
    const [profilePic, setProfilePic] = useState('');
    const [M_ProfilePic, setM_ProfilePic] = useState('');
    const [F_ProfilePic, setF_ProfilePic] = useState('');
    const [G_ProfilePic, setG_ProfilePic] = useState('');

    const handleBackPress = useCallback(() => {
        navigation.navigate('Dashboard');
        return true;
    }, [navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]);

    const ProfileApi = useCallback(async () => {
        setLoading(true);
        try {
            const storedId = await AsyncStorage.getItem('@id');
            if (storedId) {
                setId(storedId);
            }

            let formData = new FormData();
            formData.append('id', storedId || id); // Use storedId if available, otherwise current id state

            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : usertoken
                },
                body: formData
            };

            const response = await fetch(myConst.BASEURL + 'studentprofile', data);
            const responseJson = await response.json();

            if (responseJson.status === true) {
                let responseData = responseJson.data;
                if (responseData.day_scholar === 1) {
                    setDayScholar('Day Scholar');
                } else if (responseData.day_scholar === 2) {
                    setDayScholar('Residential');
                }
                setStudentName(responseData.Student_name);
                setRollNo(responseData.std_roll);
                setStudentClass(responseData.Student_class);
                setSection(responseData.Student_section);
                setResidental(responseData.Student_name); // This seems like a potential copy-paste error from the original. Should it be something else?
                setDob(responseData.dob);
                setPhoneNum(responseData.phoneno);
                setStaff(responseData.staff);
                setFatherName(responseData.F_name);
                setMotherName(responseData.M_name);
                setParentAddress(responseData.Fofficeaddress);
                setParentPhnNum(responseData.F_mobile);
                setFoccupation(responseData.F_occupation);
                setProfileData(responseJson?.data);

                responseData?.studentimage && setProfilePic("http://139.59.90.236:86/images/student_image/STUDENT/" + responseData.studentimage);
                responseData?.fatherimage && setF_ProfilePic("http://139.59.90.236:86/images/student_image/FATHER/" + responseData.fatherimage);
                responseData?.motherimage && setM_ProfilePic("http://139.59.90.236:86/images/student_image/MOTHER/" + responseData.motherimage);
                responseData?.gaurdianimg && setG_ProfilePic("http://139.59.90.236:86/images/student_image/GUARDIAN/" + responseData.gaurdianimg);

            } else {
                Snackbar.show({
                    text: responseJson.message,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: '#f15270'
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        const fetchIdAndProfile = async () => {
            const value = await AsyncStorage.getItem('@id');
            if (value) {
                setId(value);
            }
            ProfileApi(); // Initial fetch
        };

        fetchIdAndProfile();

        // Add listener for screen focus
        const unsubscribe = navigation.addListener('focus', () => {
            ProfileApi(); // Fetch fresh data every time the screen is focused
        });

        return unsubscribe; // Cleanup the listener
    }, [navigation, ProfileApi]);

    const getText = (title) => {
        if (title) {
            return title.charAt(0).toUpperCase() + title.slice(1);
        } else {
            return '----';
        }
    };

    const fn_Edit = () => {
        navigation.navigate("EditProfile", { "profileData": profileData });
    };

    const fn_EditGuardian = () => {
        navigation.navigate("GuardianEditProfile", { "profileData": profileData });
    };

    const fn_ParentEdit = () => {
        navigation.navigate("ParentsEditProfile", { "profileData": profileData });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
            <View style={{ backgroundColor: '#fff' }}>
                <ImageBackground style={styles.ContainerImage}
                    source={require('../../../assests/images/profile_shape.jpg')}>
                    <View style={{ height: Platform.OS === 'ios' ? resW(8) : resW(0) }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: resW(3) }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.ProfileImageBackground}>
                        <Image style={styles.ProfileImage}
                            source={profilePic != '' ? { uri: profilePic } : require('../../../assests/images/businessman.png')} />
                        <Text style={styles.TextName}>{studentName}</Text>
                        <Text style={styles.TextAddress}>{rollNo}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.buttonMainView}>
                    <Pressable style={active === 1 ? styles.buttonStyle : styles.buttonStyle2} onPress={() => setActive(1)}  >
                        <Text style={active === 1 ? styles.buttonTextStyle : styles.buttonTextStyle2}>Student</Text>
                    </Pressable>
                    <Pressable style={active === 2 ? styles.buttonStyle : styles.buttonStyle2} onPress={() => setActive(2)}  >
                        <Text style={active === 2 ? styles.buttonTextStyle : styles.buttonTextStyle2}>Parents</Text>
                    </Pressable>
                    <Pressable style={active === 3 ? styles.buttonStyle : styles.buttonStyle2} onPress={() => setActive(3)}  >
                        <Text style={active === 3 ? styles.buttonTextStyle : styles.buttonTextStyle2}>Guardian</Text>
                    </Pressable>
                </View>

                {active === 1 && <View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>General</Text>
                        <View style={styles.profileCardSubView}>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Date of Birth</Text>
                                <Text style={styles.profileCardValue}>{moment(dob).format("DD-MM-YYYY")}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Email ID</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.email)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Gender</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.gender)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Religious Belief</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.religious)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Category</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.category)}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Educational Details</Text>
                        <View style={styles.profileCardSubView}>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Admission No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.std_roll}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Date of Admission</Text>
                                <Text style={styles.profileCardValue}>{profileData?.admission_date ? profileData?.admission_date : "----"}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Student Type</Text>
                                <Text style={styles.profileCardValue}>{profileData?.student_type}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>APAAR ID</Text>
                                <Text style={styles.profileCardValue}>{profileData?.apaar_id ? profileData?.apaar_id : "----"}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>PEN ID</Text>
                                <Text style={styles.profileCardValue}>{profileData?.pan_id ? profileData?.pan_id : '----'}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Class</Text>
                                <Text style={styles.profileCardValue}>{profileData?.std_class}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Section</Text>
                                <Text style={styles.profileCardValue}>{profileData?.std_section}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Stream Chosen</Text>
                                <Text style={styles.profileCardValue}>{profileData?.stream ? profileData?.stream : '----'}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Optional Subject</Text>
                                <Text style={styles.profileCardValue}>{profileData?.optional_sub ? profileData?.optional_sub : "----"}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Subject Combination</Text>
                                <Text style={styles.profileCardValue}>{profileData?.subject_combination ? profileData?.subject_combination : '----'}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Class Teacher Name</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.staff)}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Medical Details</Text>
                        <View style={styles.profileCardSubView}>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Blood Group</Text>
                                <Text style={styles.profileCardValue}>{profileData?.bloodgroup}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Any Medical Condition</Text>
                                <Text style={styles.profileCardValue}>{profileData?.medical_condition ? profileData?.medical_condition : "----"}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Allergies</Text>
                                <Text style={styles.profileCardValue}>{profileData?.allergy ? profileData?.allergy : "----"}</Text>
                            </View>

                        </View>
                    </View>


                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Address Details</Text>
                        <View style={styles.profileCardSubView}>
                            <Text style={styles.profileTitle2}>Correspondence Address</Text>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Address</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.address)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>City</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.city)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>State</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.state)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Country</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.country)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Pin Code</Text>
                                <Text style={styles.profileCardValue}>{profileData?.pincode ? profileData?.pincode : "----"}</Text>
                            </View>

                            <Text style={styles.profileTitle2}>Permanent Address</Text>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Address</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.perm_address)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>City</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.perm_city)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>State</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.perm_state)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Country</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.perm_country)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Pin Code</Text>
                                <Text style={styles.profileCardValue}>{profileData?.perm_pincode ? profileData?.perm_pincode : '----'}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Previous School Details</Text>
                        <View style={styles.profileCardSubView}>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>School Name</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.previous_scl_name)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Transfer Certificate Copy</Text>
                                {profileData?.prev_certificate &&
                                    <Image source={{ uri: "http://139.59.90.236:86/images/student_image/prev_certificate/" + profileData?.prev_certificate }} resizeMode='stretch' style={{ height: resW(15), width: resW(15), borderRadius: 5 }} />
                                }
                            </View>

                        </View>
                        <Pressable style={styles.editButton} onPress={fn_Edit} >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>

                </View>}

                {active === 2 && <View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Father's Personal Details</Text>

                        <View style={styles.profileCardSubView}>
                            <Image style={[styles.ProfileImage2]} source={F_ProfilePic != '' ? { uri: F_ProfilePic } : require('../../../assests/images/businessman.png')} />

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Name</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.F_name)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Mobile No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.F_mobile ? profileData?.F_mobile : '----'}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Email ID</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.F_email)}</Text>
                            </View>


                            <Text style={styles.profileTitle2}>Official Details</Text>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Organization</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.F_organization)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Occupation</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.F_occupation)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Designation</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.F_designation)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Office No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.Foficemobile ? profileData?.Foficemobile : '----'}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Office Address</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.Fofficeaddress)}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Mother's Personal Details</Text>
                        <View style={styles.profileCardSubView}>
                            <Image style={[styles.ProfileImage2]} source={M_ProfilePic != '' ? { uri: M_ProfilePic } : require('../../../assests/images/businessman.png')} />

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Name</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.M_name)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Mobile No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.M_mobile}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Email ID</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.M_email)}</Text>
                            </View>


                            <Text style={styles.profileTitle2}>Official Details </Text>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Organization</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.M_organization)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Occupation</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.M_occupation)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Designation</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.M_designation)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Office No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.Mofficemobile ? profileData?.Mofficemobile : '----'}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Office Address</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.Mofficeaddress)}</Text>
                            </View>

                        </View>
                        <Pressable style={styles.editButton} onPress={fn_ParentEdit} >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>


                </View>}

                {active === 3 && <View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Personal Details</Text>
                        <View style={styles.profileCardSubView}>
                            <Image style={[styles.ProfileImage2]} source={G_ProfilePic != '' ? { uri: G_ProfilePic } : require('../../../assests/images/businessman.png')} />

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Name</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_name)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Relation</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_relation)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Mobile No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.L_mobile}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Whatsapp No</Text>
                                <Text style={styles.profileCardValue}>{profileData?.L_whatsup_no}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Email ID</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_email)}</Text>
                            </View>


                            <Text style={styles.profileTitle2}>Residential Details</Text>
                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Address</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_address)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>City</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_city)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>State</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_state)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Country</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_country)}</Text>
                            </View>

                            <View style={styles.profileCardView}>
                                <Text style={styles.profileCardTitle}>Pin Code</Text>
                                <Text style={styles.profileCardValue}>{getText(profileData?.L_pincode)}</Text>
                            </View>

                        </View>
                        <Pressable style={styles.editButton} onPress={fn_EditGuardian} >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    </View>

                </View>}
                <View style={{ height: resW(5) }} />
            </View>
        </ScrollView>
    );
};
export default Profile;