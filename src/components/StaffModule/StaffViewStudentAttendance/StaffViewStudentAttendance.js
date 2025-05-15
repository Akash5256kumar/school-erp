import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  FlatList,
} from 'react-native';
import styles from './style';
const baseColor = '#0747a6';
import * as myConst from '../../Baseurl';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
const today = new Date();
const disableFutureDt = current => {
  return current.isBefore(today);
};

class StaffViewStudentAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      classoptions: [],
      sectionoptions: [],
      selectedClass: '',
      selectedSection: '',
      date: '',
      dataSource: [],
      image: '',
    };
  }

  componentDidMount() {
    this.getStudentClassApi();
    this.getStudentSectionApi();
  }

  showMessage(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270',
    });
  }

  getStudentClassApi() {
    let data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    this.setState({isLoading: true});
    fetch(myConst.BASEURL + 'getclasses', data)
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.status === true) {
          console.log('studentClassApiResponse-->', responseJson.data);
          this.setState({isLoading: false});

          let response = responseJson.data;
          const studentClass = response.map(function (user) {
            return user.name;
          });

          console.log(studentClass);
          let selectIssue = ['Select Class'];
          const interest = [...selectIssue, ...studentClass];
          console.log(interest);
          this.setState({
            classoptions: interest,
          });
        } else if (responseJson.status === false) {
          this.showMessage(responseJson.message);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  getStudentSectionApi() {
    let data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    this.setState({isLoading: true});
    fetch(myConst.BASEURL + 'getsection', data)
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.status === true) {
          console.log('studentSectionApiResponse-->', responseJson.data);
          this.setState({isLoading: false});

          let response = responseJson.data;
          const studentSection = response.map(function (user) {
            return user.name;
          });

          console.log(studentSection);
          let selectIssue = ['Select Section'];
          const interest = [...selectIssue, ...studentSection];
          console.log(interest);
          this.setState({
            sectionoptions: interest,
          });
        } else if (responseJson.status === false) {
          this.showMessage(responseJson.message);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  valueChangeHandler(object) {
    this.setState(object, () => {
      const {date, selectedClass, selectedSection} = this.state;
      if (
        date !== '' &&
        selectedClass !== 'Select Class' &&
        selectedSection !== 'Select Section'
      ) {
        this.getViewAttendanceApi();
      }
    });
  }

  changeDate = date => {
    this.setState({date: date});
    console.log(this.state.date);
    this.valueChangeHandler();
  };

  getViewAttendanceApi() {
    console.log('called', 'entered');
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class_name: this.state.selectedClass,
        class_section: this.state.selectedSection,
        date: this.state.date,
      }),
    };
    this.setState({isLoading: true});
    fetch(myConst.BASEURL + 'viewattendance_studentlist', data)
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.status === true) {
          console.log('viewAttendanceResponse-->', responseJson.data);
          this.setState({isLoading: false});

          let response = responseJson.data;
          let presentStudent = responseJson.presentstudent;
          console.log('present', presentStudent);

          for (let i = 0; i < response.length; i++) {
            let filteredArr = presentStudent.some(
              presentStudent => response[i].std_roll == presentStudent,
            );
            console.log(response[i].std_roll, filteredArr);
            if (filteredArr == true) {
              response[i].image = require('../../../assests/images/check.png');
            } else {
              response[i].image = require('../../../assests/images/close.png');
            }
          }

          this.setState({
            dataSource: response,
          });
        } else if (responseJson.status === false) {
          this.showMessage(responseJson.message);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.HeaderBackground}>
          <View style={styles.HeaderStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.HeaderArrowImage}
                source={require('../../../assests/images/leftarrow.png')}
              />
            </TouchableOpacity>
            <Text style={styles.HeaderText}>View Attendance</Text>
            <View></View>
          </View>
        </View>

        <View style={styles.RowStyle}>
          <Text style={styles.TextStyle}>Select Class</Text>
          <View style={styles.DropDownBackground}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.selectedClass}
              onValueChange={itemValue => {
                this.valueChangeHandler({selectedClass: itemValue});
              }}>
              {this.state.classoptions.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.RowStyle}>
          <Text style={styles.TextStyle}>Select Section</Text>
          <View style={styles.DropDownBackground}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.selectedSection}
              onValueChange={itemValue => {
                this.valueChangeHandler({selectedSection: itemValue});
              }}>
              {this.state.sectionoptions.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.RowStyle}>
          <Text style={styles.TextStyle}>Select Date</Text>
          <View>
            <DatePicker
              style={styles.TextInputStyleClass}
              date={this.state.date}
              // mode="date"
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                placeholderText: {
                  color: '#635d83',
                },
                dateInput: {
                  borderWidth: 0,
                  alignItems: 'flex-start',
                  marginBottom: 25,
                },
              }}
              onDateChange={date => this.valueChangeHandler({date: date})}
            />
          </View>
        </View>

        <View style={styles.HoziontalLineFull}></View>
        <Text style={styles.HeadingText}>Students</Text>

        <FlatList
          data={this.state.dataSource}
          renderItem={({item, index}) => (
            <View style={styles.FlatStyle}>
              <View style={styles.CardviewStyle}>
                <Text style={styles.FlatListTextStyle}>
                  {item.Student_name}
                </Text>
                <Image style={styles.FlatlistImageStyle} source={item.image} />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default StaffViewStudentAttendance;
