import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, BackHandler,ScrollView, Platform, Pressable } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-community/async-storage";
import { resW } from '../../../Utils/Constant';
import moment from 'moment';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            studentName: '',
            rollNo: '',
            phoneNum: '',
            dob: '',
            class: '',
            section: '',
            residental: '',
            staff: '',
            fatherName: '',
            motherName: '',
            parentPhnNum: '',
            parentAddress: '',
            Foccupation: '',
            dayScholar: '',
            id: '',
            profileData:{},
            active:1
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
        const value = await AsyncStorage.getItem('@id')
        console.log('value-->>', value)
        this.setState({
            id: value
        })
        this.ProfileApi()
    }


    ProfileApi() {
        let formData = new FormData()
        formData.append('id', this.state.id)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'studentprofile', data)
            .then((response) => response.json())
            .then(responseJson => {
                console.log('responseJson-->', responseJson.data)
                if (responseJson.status === true) {
                    let response = responseJson.data
                    if (response.day_scholar === 1) {
                        this.setState({ dayScholar: 'Day Scholar' })
                    } else if (response.day_scholar === 2) {
                        this.setState({ dayScholar: 'Residential' })
                    }
                    this.setState({
                        studentName: response.Student_name,
                        rollNo: response.std_roll,
                        class: response.Student_class,
                        section: response.Student_section,
                        residental: response.Student_name,
                        dob: response.dob,
                        phoneNum: response.phoneno,
                        staff: response.staff,
                        fatherName: response.F_name,
                        motherName: response.M_name,
                        parentAddress: response.Fofficeaddress,
                        parentPhnNum: response.F_mobile,
                        Foccupation: response.F_occupation,
                        profileData:responseJson?.data
                    })
                } else if (responseJson.staus === false) {

                    // console.log('status-->>>>', responseJson.status)
                    Snackbar.show({
                        text: responseJson.message,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: '#f15270'
                    });
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

 getText(title){
   if(title){
    return title.charAt(0).toUpperCase() + title.slice(1)
   }else{
    return '----'
   }
 }

 fn_Edit(){
    this.props.navigation.navigate("EditProfile",{"profileData":this.state.profileData})
 }


    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
                <View style={{backgroundColor:'#fff'}}>
                    <ImageBackground style={styles.ContainerImage}
                        source={require('../../../assests/images/profile_shape.jpg')}>
                        <View style={{height:Platform.OS==='ios' ? resW(8): resW(0)}} />
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:resW(3)}}>
                        <TouchableOpacity   onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Pressable style={styles.editButton} onPress={()=>this.fn_Edit()} >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                        </View>
                        <View style={styles.ProfileImageBackground}>
                            <Image style={styles.ProfileImage}
                                source={require('../../../assests/images/businessman.png')} />
                            <Text style={styles.TextName}>{this.state.studentName}</Text>
                            <Text style={styles.TextAddress}>{this.state.rollNo}</Text>
                        </View>
                    </ImageBackground>

                    <View style={styles.buttonMainView}>
                    <Pressable style={this.state.active=== 1 ? styles.buttonStyle : styles.buttonStyle2}  onPress={()=>this.setState({active:1})}  >
                        <Text style={this.state.active=== 1 ? styles.buttonTextStyle : styles.buttonTextStyle2}>Student</Text>
                    </Pressable>
                    <Pressable style={this.state.active === 2 ? styles.buttonStyle : styles.buttonStyle2} onPress={()=>this.setState({active:2})}  >
                        <Text style={this.state.active === 2 ? styles.buttonTextStyle : styles.buttonTextStyle2}>Parents</Text>
                    </Pressable>
                    <Pressable style={this.state.active === 3 ? styles.buttonStyle : styles.buttonStyle2} onPress={()=>this.setState({active:3})}  >
                        <Text style={this.state.active=== 3 ? styles.buttonTextStyle : styles.buttonTextStyle2}>Guardian</Text>
                    </Pressable>
                </View>

                   {this.state.active  === 1 && <View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>General</Text>
                        <View style={styles.profileCardSubView}>
                        <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Date of Birth</Text>
                        <Text style={styles.profileCardValue}>{moment(this.state.dob).format("DD-MM-YYYY")}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Email ID</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.email)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Gender</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.gender)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Religious Belief</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.religious)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Category</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.category)}</Text>
                      </View>

                      </View>
                    </View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Educational Details</Text>
                        <View style={styles.profileCardSubView}>
                        <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Admission No</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.std_roll}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Date of Admission</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.admission_date ? this.state.profileData?.admission_date : "----" }</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Student Type</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.student_type}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>APAAR ID</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.apaar_id ? this.state.profileData?.apaar_id : "----"}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>PEN ID</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.pan_id ? this.state.profileData?.pan_id : '----'}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Class</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.std_class}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Section</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.std_section}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Stream Chosen</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.stream ? this.state.profileData?.stream : '----'}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Optional Subject</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.optional_sub ? this.state.profileData?.optional_sub : "----"}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Subject Combination</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.subject_combination ? this.state.profileData?.subject_combination : '----'}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Class Teacher Name</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.staff)}</Text>
                      </View>

                      </View>
                    </View>

                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Medical Details</Text>
                        <View style={styles.profileCardSubView}>
                        <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Blood Group</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.bloodgroup}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Any Medical Condition</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.medical_condition ? this.state.profileData?.medical_condition : "----"}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Allergies</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.allergy ? this.state.profileData?.allergy : "----"}</Text>
                      </View>

                      </View>
                    </View>


                    <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Address Details</Text>
                        <View style={styles.profileCardSubView}>
                        <Text style={styles.profileTitle2}>Correspondence Address</Text>
                        <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Address</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.address)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>City</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.city)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>State</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.state)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Country</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.country)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Pin Code</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.pincode ? this.state.profileData?.pincode : "----"}</Text>
                      </View>

                      <Text style={styles.profileTitle2}>Permanent Address</Text>
                        <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Address</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.perm_address)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>City</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.perm_city)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>State</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.perm_state)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Country</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.perm_country)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Pin Code</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.perm_pincode ? this.state.profileData?.perm_pincode : '----'}</Text>
                      </View>
                      
                      </View>
                    </View>

                     <View style={styles.profileCardMainView}>
                        <Text style={styles.profileTitle}>Previous School Details</Text>
                        <View style={styles.profileCardSubView}>
                        <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>School Name</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.previous_scl_name)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Transfer Certificate Copy</Text>
                        <Text style={styles.profileCardValue}>{this.state.profileData?.prev_certificate}</Text>
                      </View>

                      </View>
                    </View>
                    </View>}

                    {this.state.active  === 2 && <View>

<View style={styles.profileCardMainView}>
    <Text style={styles.profileTitle}>Father's Personal Details</Text>
    <View style={styles.profileCardSubView}>
    <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Name</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.getText(this.state.profileData?.F_name))}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Mobile No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.F_mobile ? this.state.profileData?.F_mobile : '----'}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Whatsapp No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.F_telephon ? this.state.profileData?.F_telephon : '----'}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Email ID</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.F_email)}</Text>
  </View>


  <Text style={styles.profileTitle2}>Official Details</Text>
    <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Organization</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.F_organization)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Occupation</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.F_occupation)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Designation</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.F_designation)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Office No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.Foficemobile ? this.state.profileData?.Foficemobile : '----'}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Office Address</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.Fofficeaddress)}</Text>
  </View>
  
  </View>
</View>

<View style={styles.profileCardMainView}>
    <Text style={styles.profileTitle}>Mother's Personal Details</Text>
    <View style={styles.profileCardSubView}>
    <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Name</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.M_name)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Mobile No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.M_mobile}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Whatsapp No</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.M_whatsapp)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Email ID</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.M_email)}</Text>
  </View>


  <Text style={styles.profileTitle2}>Official Details </Text>
    <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Organization</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.M_organization)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Occupation</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.M_occupation)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Designation</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.M_designation)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Office No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.Mofficemobile ? this.state.profileData?.Mofficemobile : '----'}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Office Address</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.Mofficeaddress)}</Text>
  </View>
  
  </View>
</View>


</View>}

{this.state.active  === 3 && <View>

<View style={styles.profileCardMainView}>
    <Text style={styles.profileTitle}>Personal Details</Text>
    <View style={styles.profileCardSubView}>
    <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Name</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_name)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Relation</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_relation)}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Mobile No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.L_mobile}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Whatsapp No</Text>
    <Text style={styles.profileCardValue}>{this.state.profileData?.L_whatsup_no}</Text>
  </View>

  <View style={styles.profileCardView}>
      <Text style={styles.profileCardTitle}>Email ID</Text>
    <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_email)}</Text>
  </View>


  <Text style={styles.profileTitle2}>Residential Details</Text>
  <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Address</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_address)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>City</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_city)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>State</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_state)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Country</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_country)}</Text>
                      </View>

                      <View style={styles.profileCardView}>
                          <Text style={styles.profileCardTitle}>Pin Code</Text>
                        <Text style={styles.profileCardValue}>{this.getText(this.state.profileData?.L_pincode)}</Text>
                      </View>
  
  </View>
</View>

</View>}
                  <View style={{height:resW(5)}} />
                </View>
            </ScrollView>
        )
    }
}
export default Profile;