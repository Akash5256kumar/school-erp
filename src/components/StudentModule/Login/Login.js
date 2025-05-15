import React, {Component, version} from 'react';
import DatePicker from 'react-native-date-picker';
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import styles from './style';
const baseColor = '#0747a6';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import {StackNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonButton from '../../../components/Button/CommonButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import moment from 'moment';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dob: '',
      open: false,
      admissionNo: '',
      deviceVersion: '',
      deviceName: '',
      deviceType: '',
      time: '',
      token: '',
      ad_Visible: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@token');
    const Dversion = DeviceInfo.getSystemVersion();
    const Dname = DeviceInfo.getSystemName();
    const Dtype = DeviceInfo.getModel();
    console.log('version-->', Dversion);
    console.log('name-->', Dname);
    console.log('type-->', Dtype);
    console.log('token--->', token);
    this.setState({
      deviceVersion: Dversion,
      deviceName: Dname,
      deviceType: Dtype,
      token: token,
    });
  }

  changeDateOfBirth = dob => {
    this.setState({dob: dob});
  };
  changeAdmissionNumber = admissionNo => {
    this.setState({admissionNo: admissionNo});
  };

  formatAMPM(date) {
    console.log('vdjvndjv');
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  showMessage(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270',
    });
  }

  loginApi() {
    // this.props.navigation.navigate('Dashboard');
    // return;
    const {dob, admissionNo, deviceVersion, deviceType, deviceName, token} =
      this.state;
    console.log('dob', dob);
    if (admissionNo == '') {
      this.showMessage('Please enter admission number.');
    } else if (dob == '') {
      this.showMessage('Please enter DOB.');
    } else {
      let data = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          std_roll: admissionNo,
          password: moment(dob).format('YYYY-MM-DD'),
          deviceType: deviceType,
          deviceToken: token,
          deviceVersion: deviceVersion,
          deviceName: deviceName,
        }),
      };
      console.log('data', data);
      let self = this;
      this.setState({isLoading: true});
      fetch(myConst.BASEURL + 'login', data)
        .then(response => response.json())
        .then(async responseJson => {
          console.log('responseJson-->', responseJson);
          if (responseJson.status === true) {
            const currentdate = new Date();
            const date =
              currentdate.getDate() +
              '/' +
              (currentdate.getMonth() + 1) +
              '/' +
              currentdate.getFullYear();
            console.log('date', date);
            const time = this.formatAMPM(currentdate);
            console.log('timeeee--->', time);
            this.setState({isLoading: false});
            await AsyncStorage.setItem('@id', String(responseJson.data.id));
            await AsyncStorage.setItem(
              '@class',
              responseJson.data.Student_class,
            );
            await AsyncStorage.setItem(
              '@section',
              responseJson.data.Student_section,
            );
            await AsyncStorage.setItem('@name', responseJson.data.Student_name);
            await AsyncStorage.setItem('@std_roll', responseJson.data.std_roll);
            await AsyncStorage.setItem('@date', date);
            await AsyncStorage.setItem('@time', time);
            self.props.navigation.navigate('Dashboard');
          } else if (responseJson.status === false) {
            this.showMessage(responseJson.message);
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({isLoading: false});
        });
    }
  }

  render() {
    return (
      <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{flex: 1}}>
        <DatePicker
          style={styles.datePickerStyle}
          date={this.state.dob || new Date()}
          open={this.state.open}
          mode="date"
          modal
          placeholder="Type Date Of Birth"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onConfirm={date => {
            console.log(date);
            this.setState({open: false, dob: date});
          }}
          onCancel={() => {
            this.setState({open: false});
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
        <View style={styles.HomeScreenView}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.container}>
              <View>
                <Image
                  style={styles.loginImage}
                  source={require('../../../assests/images/login_image.png')}
                />
              </View>
              <View style={styles.loginForm}>
                <Text style={styles.loginText}>Admission No.</Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Type Admission Number"
                    placeholderTextColor={'#59597540'}
                    style={styles.TextInputStyleClass}
                    keyboardType="numeric"
                    returnKeyLabel='Done'
                    returnKeyType='done'
                    secureTextEntry={this.state.ad_Visible}
                    // placeholderTextColor='#635d83'
                    onChangeText={this.changeAdmissionNumber}></TextInput>
                  <Pressable
                    onPress={() =>
                      this.setState({ad_Visible: !this.state.ad_Visible})
                    }>
                    <Image
                      source={constant.Icons.newsEyeIcon}
                      style={styles.eyeIcon}
                    />
                  </Pressable>
                </View>
                <View>
                  <Text style={styles.loginText}>DOB</Text>
                  <Pressable
                    onPress={() => {
                      this.setState({open: true});
                    }}
                    style={styles.inputView}>
                    <Text style={{marginLeft: 20, color: 'black'}}>
                      {this?.state?.dob
                        ? moment(this?.state?.dob).format('DD-MM-YYYY')
                        : 'select DOB'}
                    </Text>

                    {/* <Image source={constant.Icons.newsEyeIcon} style={styles.eyeIcon} /> */}
                  </Pressable>
                </View>
                <CommonButton
                  title="Log in"
                  extStyle={{marginTop: '15%', marginHorizontal: '15%'}}
                  buttonClick={() => this.loginApi()}
                />
                {/* <TouchableOpacity style={styles.button}
                                onPress={() => this.loginApi()}
                            >
                                <Text style={styles.buttonText}>Log in</Text>
                            </TouchableOpacity> */}
                <Text style={styles.staffLoginText}>
                  If you are a Staff member than please{'\n'}click here to login
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('StaffLogin')}>
                  <Text style={styles.staffLoginButton}>Staff Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
export default Login;
