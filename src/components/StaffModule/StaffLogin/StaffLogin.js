// import React, { Component } from 'react';
// import {
//   Image,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import styles from './style';
// import * as myConst from '../../Baseurl';
// import Snackbar from 'react-native-snackbar';
// import CommonHeader from '../../CommonHeader';
// import LinearGradient from 'react-native-linear-gradient';
// import CommonButton from '../../../components/Button/CommonButton';
// import { saveUserData } from '../../Redux/Slice/userSlice';
// class StaffLogin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { email: '', password: '', isLoading: false };
//   }

//   changeEmail = email => this.setState({ email });
//   changePassword = password => this.setState({ password });

//   showMessage(message) {
//     Snackbar.show({
//       text: message,
//       duration: Snackbar.LENGTH_SHORT,
//       backgroundColor: '#f15270',
//     });
//   }

//   loginApi = async () => {
//     const { email, password } = this.state;
//     if (!email) return this.showMessage('Please enter email address.');
//     if (!password) return this.showMessage('Please enter password.');

//     this.setState({ isLoading: true });

//     try {
//       const res = await fetch(myConst.BASEURL + 'staff_login', {
//         method: 'POST',
//         headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const resJson = await res.json();
//       console.log("resonse staff login details ", resJson)

//       if (resJson.status) {
//         await AsyncStorage.setItem('userData', JSON.stringify(resJson.data))
//         await AsyncStorage.setItem('@id', String(resJson.data.id));
//         await AsyncStorage.setItem('@name', resJson.data.name);
//         await AsyncStorage.setItem('@email', resJson.data.email);
//         if (resJson.data.assignclass) await AsyncStorage.setItem('@aclass', resJson.data.assignclass);
//         if (resJson.data.assignsection) await AsyncStorage.setItem('@asection', resJson.data.assignsection);
//         if (resJson.data.role_type) await AsyncStorage.setItem('@role', resJson.data.role_type);
//         await AsyncStorage.setItem('@date', resJson.data.created_at);

//         dispatch(saveUserData({'data': resJson.data}))
//         this.props.navigation.navigate('StaffModuleBottomTabs');
//       } else {
//         this.showMessage(resJson.message);
//       }
//     } catch (error) {
//       console.log(error);
//       this.showMessage('Something went wrong. Please try again.');
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   render() {
//     return (
//       <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
//         <SafeAreaView style={{ flex: 1 }}>
//           <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           >
//             <ScrollView
//               contentContainerStyle={{ flexGrow: 1 }}
//               keyboardShouldPersistTaps="handled"
//             >
//               <View style={{ flex: 1, justifyContent: 'space-between' }}>
//                 {/* Header */}
//                 <CommonHeader
//                   onLeftClick={() => this.props.navigation.goBack()}
//                 />

//                 {/* Top Image */}
//                 <Image
//                   style={styles.loginImage}
//                   source={require('../../../assests/images/staff_login1.png')}
//                   resizeMode="contain"
//                 />

//                 {/* Login Form at Bottom */}
//                 <View style={styles.loginForm}>
//                   <Text style={styles.loginText}>Login</Text>

//                   <TextInput
//                     placeholder="Email"
//                     style={styles.TextInputStyleClass}
//                     placeholderTextColor="#635d83"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     onChangeText={this.changeEmail}
//                   />

//                   <TextInput
//                     placeholder="Password"
//                     style={styles.TextInputStyleClass}
//                     placeholderTextColor="#635d83"
//                     secureTextEntry
//                     onChangeText={this.changePassword}
//                   />

//                   {/* <TouchableOpacity style={styles.button} onPress={this.loginApi}>
//                     <Text style={styles.buttonText}>Log in</Text>
//                   </TouchableOpacity> */}
//                   <CommonButton
//                     title="Log in"
//                     extStyle={{ marginTop: '15%', marginHorizontal: '15%' }}
//                     buttonClick={this.loginApi}
//                   // isLoading={isLoading}
//                   />
//                 </View>
//               </View>
//             </ScrollView>
//           </KeyboardAvoidingView>
//         </SafeAreaView>
//       </LinearGradient>
//     );
//   }
// }

// export default StaffLogin;

import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { useDispatch } from "react-redux";

import { loginStaff } from "../../../api";
import Snackbar from "react-native-snackbar";
import LinearGradient from "react-native-linear-gradient";
import CommonButton from "../../../components/Button/CommonButton";
import { saveUserData } from "../../Redux/Slice/userSlice";
import AppInput from "../../../components/common/AppInput";
import authLayoutStyles from "../../../components/common/authLayoutStyles";
import { persistStaffSession } from "../../../Utils/authSession";
import * as constant from "../../../Utils/Constant";

const StaffLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: "#f15270",
    });
  };

  const loginApi = async () => {
    if (!email) return showMessage("Please enter email address.");
    if (!password) return showMessage("Please enter password.");

    setIsLoading(true);

    try {
      const resJson = await loginStaff({ email, password });

      if (resJson?.status && resJson?.token && resJson?.data) {
        const normalizedToken = await persistStaffSession({
          token: resJson.token,
          userData: resJson.data,
        });
        dispatch(saveUserData({ token: normalizedToken, data: resJson.data }));
        navigation.reset({ index: 0, routes: [{ name: "StaffModuleBottomTabs" }] });
      } else {
        showMessage(resJson?.message || "Unable to sign in.");
      }
    } catch (error) {
      console.log(error);
      showMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#DFE6FF", "#ffffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={authLayoutStyles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={authLayoutStyles.container}>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={authLayoutStyles.backButton}
              >
                <ChevronLeft
                  color={constant.baseTextColor}
                  size={
                    constant.compactComponentSizes.iconLg +
                    constant.compactSpacing.xs
                  }
                  strokeWidth={2.4}
                />
              </Pressable>

              <View style={authLayoutStyles.heroSection}>
                <Image
                  style={authLayoutStyles.loginImage}
                  source={require("../../../assests/images/staff_login1.png")}
                  resizeMode="contain"
                />
              </View>

              <View style={authLayoutStyles.loginForm}>
                <Text style={authLayoutStyles.loginText}>Login</Text>

                <AppInput
                  placeholder="Email"
                  containerStyle={authLayoutStyles.field}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                />

                <AppInput
                  placeholder="Password"
                  containerStyle={authLayoutStyles.field}
                  onRightIconPress={() =>
                    setHidePassword((previous) => !previous)
                  }
                  rightIcon={
                    hidePassword
                      ? constant.Icons.eyeCloseIcon
                      : constant.Icons.newsEyeIcon
                  }
                  secureTextEntry={hidePassword}
                  onChangeText={setPassword}
                  value={password}
                />

                <CommonButton
                  title="Log in"
                  extStyle={authLayoutStyles.button}
                  buttonClick={loginApi}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default StaffLogin;
