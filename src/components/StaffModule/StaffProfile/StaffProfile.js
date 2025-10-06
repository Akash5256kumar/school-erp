// import React, { Component } from 'react';
// import { Text, View, ImageBackground, Image, TouchableOpacity, BackHandler, ScrollView, TextInput, Alert } from 'react-native';
// // import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import styles from './style';
// const baseColor = '#0747a6'
// // import * as myConst from '../Baseurl';
// import Snackbar from 'react-native-snackbar';
// import AsyncStorage from "@react-native-community/async-storage";


// class StaffProfile extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             teacherName: '',
//             teacherEmail: '',
//             teacherRole: '',
//             assignClass: '',
//             assignSection: '',
//             firstName: '',
//             lastName: ''
//         }

//     }


//     async componentDidMount() {
//         const name = await AsyncStorage.getItem('@name')
//         var first = name.split(' ').slice(0, -1).join(' ');
//         var last = name.split(' ').slice(-1).join(' ');
//         console.log('first', first)
//         console.log('last', last)
//         const email = await AsyncStorage.getItem('@email')
//         const role = await AsyncStorage.getItem('@role')
//         const assignclass = await AsyncStorage.getItem('@aclass')
//         const assignsection = await AsyncStorage.getItem('@asection')
//         this.setState({
//             teacherName: name,
//             firstName: first,
//             lastName: last,
//             teacherEmail: email,
//             teacherRole: role,
//             assignClass: assignclass,
//             assignSection: assignsection
//         })
//     }


//     componentWillMount() {
//         BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
//     }

//     componentWillUnmount() {
//         BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
//     }

//     handleBackPress = () => {
//         this.props.navigation.navigate('StaffHome')
//         return true;
//     };

//     // handleBackPress = () => {
//     //     this.props.navigation.goBack()
//     //     // return true;
//     // };

//     handleLogout = () => {
//         Alert.alert(
//             'Log out',
//             'Do you want to logout?',
//             [
//                 { text: 'Cancel', onPress: () => { return null; } },
//                 {
//                     text: 'Confirm',
//                     onPress: async () => {
//                         try {
//                             await AsyncStorage.clear();
//                             // Use reset to clear the stack and navigate to RoleSelectionScreen
//                             this.props.navigation.reset({
//                                 index: 0,
//                                 routes: [{ name: 'RoleSelectionScreen' }],
//                             });
//                         } catch (error) {
//                             console.error('Error during logout:', error);
//                         }
//                     }
//                 },
//             ],
//             { cancelable: false }
//         );
//     };

//     render() {
//         return (
//             <View style={styles.MainContainer}>
//                 <View style={styles.NewRowStyle}>
//                     <TouchableOpacity onPress={() => this.props.navigation.navigate('StaffHome')}>
//                         <Image style={styles.HeaderArrowImage}
//                             source={require('../../../assests/images/arrow_back.png')} />
//                     </TouchableOpacity>
//                     <Text style={styles.ProfileText}>Profile</Text>
//                     <TouchableOpacity onPress={() => this.handleLogout()}>
//                         <Image style={styles.HeaderArrowImage}

//                             source={require('../../../assests/images/logout1.png')} />

//                     </TouchableOpacity>

//                     {/* <Text style={styles.ProfileText}>
//                             logout
//                         </Text> */}
//                 </View>
//                 <ScrollView>


//                     <View style={styles.ProfileImageBackground}>
//                         <Image style={styles.ProfileImage}
//                             source={require('../../../assests/images/businessman.png')} />
//                     </View>

//                     <View>
//                         <View style={styles.CardviewMargin}>
//                             <Text style={styles.GeneralText}>User Information</Text>

//                             <View style={styles.RowStyle}>
//                                 <Text style={styles.BoldTextLeft}>Name</Text>
//                                 <Text style={styles.BoldTextRight}>Last Name</Text>
//                             </View>

//                             <View style={styles.RowStyle}>
//                                 <Text style={styles.NormalText}>{this.state.firstName}</Text>
//                                 <Text style={styles.NormalText}>{this.state.lastName}</Text>
//                             </View>

//                             <View style={styles.RowStyle}>
//                                 <View style={styles.HorizontalLine}></View>
//                                 <View style={styles.HorizontalLine}></View>
//                             </View>
//                             <Text style={styles.BoldTextLeft}>Email</Text>

//                             <View style={styles.RowStyle}>
//                                 <Text style={styles.EmailText}>{this.state.teacherEmail}</Text>
//                             </View>
//                             <View style={styles.HoziontalLineFull}></View>

//                             <View style={styles.RowStyle}>
//                                 <Text style={styles.BoldTextLeft}>Role Type</Text>
//                                 <Text style={styles.BoldTextRight}>Class Incharge</Text>
//                             </View>

//                             <View style={styles.RowStyle}>
//                                 <Text style={styles.NormalTextViewLeft}>{this.state.teacherRole}</Text>
//                                 <Text style={styles.NormalTextViewLeft}>{this.state.assignClass}-{this.state.assignSection}</Text>
//                             </View>

//                             <View style={styles.RowStyle}>
//                                 <View style={styles.HorizontalLine}></View>
//                                 <View style={styles.HorizontalLine}></View>
//                             </View>

//                             {/* <Text style={styles.BoldTextLeft}>Subject</Text>

//                             <View style={styles.RowStyle}>
//                                 <Text style={styles.NormalTextViewLeft}>bkmkbmkbk</Text>
//                             </View>
//                             <View style={styles.HoziontalLineFull}></View> */}

//                         </View>

//                         {/* <TouchableOpacity style={styles.button}
//                             onPress={() => this.props.navigation.navigate("StaffHome")}
//                         >
//                             <Text style={styles.buttonText}>Save</Text>
//                         </TouchableOpacity> */}
//                     </View>

//                 </ScrollView>
//             </View>
//         )
//     }
// }
// export default StaffProfile;
import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const baseColor = '#0747a6';

const StaffProfile = () => {
  const navigation = useNavigation();

  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherRole, setTeacherRole] = useState('');
  const [assignClass, setAssignClass] = useState('');
  const [assignSection, setAssignSection] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Fetch data from AsyncStorage
  const loadData = async () => {
    try {
      const name = await AsyncStorage.getItem('@name');
      const email = await AsyncStorage.getItem('@email');
      const role = await AsyncStorage.getItem('@role');
      const assignclass = await AsyncStorage.getItem('@aclass');
      const assignsection = await AsyncStorage.getItem('@asection');
      if (name) {
        const first = name.split(' ').slice(0, -1).join(' ');
        const last = name.split(' ').slice(-1).join(' ');
        setTeacherName(name);
        setFirstName(first);
        setLastName(last);
      }

      setTeacherEmail(email || '');
      setTeacherRole(role || '');
      setAssignClass(assignclass || '');
      setAssignSection(assignsection || '');
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  // Back handler
  const handleBackPress = useCallback(() => {
    navigation.navigate('StaffHome');
    return true;
  }, [navigation]);

  useEffect(() => {
    loadData();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [handleBackPress]);

  // Logout function
  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        { text: 'Cancel', onPress: () => null },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: 'RoleSelectionScreen' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.MainContainer}>
      {/* Header */}
      <View style={styles.NewRowStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('StaffHome')}>
          <Image
            style={styles.HeaderArrowImage}
            source={require('../../../assests/images/arrow_back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.ProfileText}>Profile</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={styles.HeaderArrowImage}
            source={require('../../../assests/images/logout1.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        <View style={styles.ProfileImageBackground}>
          <Image
            style={styles.ProfileImage}
            source={require('../../../assests/images/businessman.png')}
          />
        </View>

        <View style={styles.CardviewMargin}>
          <Text style={styles.GeneralText}>User Information</Text>

          <View style={styles.RowStyle}>
            <Text style={styles.BoldTextLeft}>Name</Text>
            <Text style={styles.BoldTextRight}>Last Name</Text>
          </View>

          <View style={styles.RowStyle}>
            <Text style={styles.NormalText}>{firstName}</Text>
            <Text style={styles.NormalText}>{lastName}</Text>
          </View>

          <View style={styles.RowStyle}>
            <View style={styles.HorizontalLine}></View>
            <View style={styles.HorizontalLine}></View>
          </View>

          <Text style={styles.BoldTextLeft}>Email</Text>

          <View style={styles.RowStyle}>
            <Text style={styles.EmailText}>{teacherEmail}</Text>
          </View>

          <View style={styles.HoziontalLineFull}></View>

          <View style={styles.RowStyle}>
            <Text style={styles.BoldTextLeft}>Role Type</Text>
            <Text style={styles.BoldTextRight}>Class Incharge</Text>
          </View>

          <View style={styles.RowStyle}>
            <Text style={styles.NormalTextViewLeft}>{teacherRole}</Text>
            <Text style={styles.NormalTextViewLeft}>
              {assignClass}-{assignSection}
            </Text>
          </View>

          <View style={styles.RowStyle}>
            <View style={styles.HorizontalLine}></View>
            <View style={styles.HorizontalLine}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StaffProfile;
