import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RadioForm from 'react-native-simple-radio-button';
import Snackbar from 'react-native-snackbar';
import * as myConst from '../../Baseurl';
import styles from './style';
import Header from '../../Header/Header';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

const baseColor = '#0747a6';

const radio_props = [
  {
    label: 'Monthly',
    value: 1,
    displayValues: [
      { name: 'April', value: 1, code: '04', month: '04-04' },
      { name: 'May', value: 2, code: '05', month: '05-05' },
      { name: 'June', value: 3, code: '06', month: '06-06' },
      { name: 'July', value: 4, code: '07', month: '07-07' },
      { name: 'August', value: 5, code: '08', month: '08-08' },
      { name: 'September', value: 6, code: '09', month: '09-09' },
      { name: 'October', value: 7, code: '10', month: '10-10' },
      { name: 'November', value: 8, code: '11', month: '11-11' },
      { name: 'December', value: 9, code: '12', month: '12-12' },
      { name: 'January', value: 10, code: '01', month: '01-01' },
      { name: 'Febrary', value: 11, code: '02', month: '02-02' },
      { name: 'March', value: 12, code: '03', month: '03-03' },
    ],
  },
  {
    label: 'Quarterly',
    value: 2,
    displayValues: [
      { name: 'April-June', value: 1, code: '0406', month: '04-06' },
      { name: 'July-September', value: 4, code: '0709', month: '07-09' },
      { name: 'October-December', value: 7, code: '1012', month: '10-12' },
      { name: 'January-March', value: 10, code: '0103', month: '01-03' },
    ],
  },
  {
    label: 'Half-Yearly',
    value: 3,
    displayValues: [
      { name: 'April-September', value: 1, code: '0409', month: '04-09' },
      { name: 'October-March', value: 7, code: '1003', month: '10-03' },
    ],
  },
  {
    label: 'Yearly',
    value: 4,
    displayValues: [
      { name: 'April-March', value: 1, code: '0403', month: '04-03' },
    ],
  },
];

const FeeDueDetail = ({ navigation }) => {
    const {token: usertoken} = useStudentAuth()
  const [std_roll, setStdRoll] = useState('');
  const [classes, setClasses] = useState('');
  const [section, setSection] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [value, setValue] = useState('');
  const [late_fee, setLateFee] = useState('');
  const [other_fee, setOtherFee] = useState('');
  const [admissionFee, setAdmissionFee] = useState('');
  const [hostel_fees, setHostelFees] = useState('');
  const [late_fees_duration, setLateFeesDuration] = useState('');
  const [tutionFee, setTutionFee] = useState('');
  const [isVisiblPickerDialog, setIsVisiblPickerDialog] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);

  // Show Snackbar
  const showMessage = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270',
    });
  };

  // Handle Back Press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);

  // Get user info & call API
  useEffect(() => {
    (async () => {
      const rollNo = await AsyncStorage.getItem('@std_roll');
      const cls = await AsyncStorage.getItem('@class');
      const sec = await AsyncStorage.getItem('@section');
      const nm = await AsyncStorage.getItem('@name');

      setStdRoll(rollNo);
      setClasses(cls);
      setSection(sec);
      setName(nm);

      const currentTime = new Date();
      setYear(currentTime.getFullYear());

      FeeDueDetailApi(rollNo, cls);
    })();
  }, []);

  // Fee Due Detail API
  const FeeDueDetailApi = async (rollNo, cls) => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append('std_roll', rollNo);
      formData.append('class', cls);

      let response = await fetch(myConst.BASEURL + 'feeduedetail', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization' : usertoken
        },
        body: formData,
      });

      let responseJson = await response.json();

      if (responseJson.status === true && responseJson.message === 'success') {
        let response = responseJson.feedata;
        let planType = 2;

        let displayValues = radio_props.find((obj) => obj.value == planType)
          ?.displayValues;
        displayValues = displayValues.slice(responseJson.totalfees);

        let result = displayValues.map((el, index) => {
          let o = { ...el, index };
          return o;
        });

        setDataSource(result);
        setLateFee(response[0].late_fees);
        setAdmissionFee(response[0].admission_fees);
        setTutionFee(response[0].tution_fees);
        setOtherFee(response[0].other_fees);
        setHostelFees(response[0].hostel_fees);
        setLateFeesDuration(response[0].late_fees_duration);
        setValue(response[0].plan_type);
      } else if (
        responseJson.status === true &&
        responseJson.message === 'Please choose plan type for pay the fees'
      ) {
        setIsVisiblPickerDialog(true);
      } else {
        showMessage(responseJson.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Encrypt Key API
  const EncryptKeyApi = async (month) => {
    try {
      let formData = new FormData();
      formData.append('userid', std_roll);
      formData.append('class', classes);
      formData.append('section', section);
      formData.append('amount', amount);
      formData.append('plan_type', 2);
      formData.append('month', month);

      let response = await fetch(myConst.BASEURL + 'encryptedvalue', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization' : usertoken
        },
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        callNativeModule(data.encrypted_data);
      } else {
        showMessage('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Native Module Call
  const callNativeModule = (encryptKey) => {
    NativeModules.CcavenueEncryptionModule.encrypt(encryptKey.toString());
  };

  // View Details
  const viewDetails = async (item) => {
    await AsyncStorage.setItem('@planType', String(value));
    await AsyncStorage.setItem('@monthName', item.name);
    await AsyncStorage.setItem('@tution_fees', tutionFee || '0');
    await AsyncStorage.setItem('@admission_fees', admissionFee || '0');
    await AsyncStorage.setItem('@other_fees', other_fee || '0');
    await AsyncStorage.setItem('@late_fees', late_fee || '0');
    await AsyncStorage.setItem('@late_fees_duration', late_fees_duration || '0');

    navigation.navigate('FeeDetail');
  };

  const currMonth = new Date().getMonth() + 1;
  let currMonthCmpr = currMonth < 4 ? 9 + currMonth : currMonth - 3;

  return (
    <View style={styles.MainContainer}>
      <Header
        title={'Fee Due Detail'}
        goBack={() => navigation.goBack()}
      />

      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.value < currMonthCmpr || currMonthCmpr === item.value) {
            return (
              <View style={styles.FlatListView}>
                <View style={styles.CardView}>
                  <View style={styles.CardViewStyle}>
                    <View style={styles.HeadingContainer}>
                      <Text style={styles.MonthText}>{item?.name}</Text>
                    </View>

                    <View style={styles.RowStyle}>
                      <Text style={styles.TextLeft}>Receipt No</Text>
                      <Image
                        style={styles.AssignmentImage}
                        source={require('../../../assests/images/menu.png')}
                      />
                      <Text style={styles.TextRight}>
                        {'sdv00' + year + item.code + std_roll}
                      </Text>
                    </View>

                    <View style={styles.RowStyle}>
                      <Text style={styles.TextLeft}>Amount</Text>
                      <Image
                        style={styles.AssignmentImage}
                        source={require('../../../assests/images/menu.png')}
                      />
                      <Text style={styles.TextRight}>{item.amount}</Text>
                    </View>

                    <View style={styles.RowStyle}>
                      <Text style={styles.TextLeft}>Pay Mode</Text>
                      <Image
                        style={styles.AssignmentImage}
                        source={require('../../../assests/images/menu.png')}
                      />
                      <Text style={styles.TextRight}>Online</Text>
                    </View>

                    <View style={styles.DetailsContainer}>
                      <TouchableOpacity onPress={() => EncryptKeyApi(item.month)}>
                        <Text style={styles.ContainerText}>Pay</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => viewDetails(item)}>
                        <Text style={styles.ContainerText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }
          return null;
        }}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={isVisiblPickerDialog}
        presentationStyle="overFullScreen"
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <View style={styles.PopUpView}>
              <Text style={styles.TextStyle}>
                Please choose plan type to pay the fees -:
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={-1}
                onPress={(val) => setValue(val)}
                labelColor={baseColor}
                buttonColor={baseColor}
                fontSize={30}
                formHorizontal={false}
              />
            </View>
            <View style={styles.ButtomView}>
              <TouchableOpacity
                onPress={() => value && FeeDueDetailApi(std_roll, classes)}
              >
                <Text style={styles.modalText}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsVisiblPickerDialog(false)}>
                <Text style={styles.CancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeeDueDetail;
