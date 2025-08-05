// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/components/Splash';
import Login from './src/components/StudentModule/Login/Login';
import Home from './src/components/StudentModule/Home/Home';
import Assignment from './src/components/StudentModule/Assignments/Assignment';
import Event from './src/components/StudentModule/Events/Event';
import Attendance from './src/components/StudentModule/Attendance/Attendance';
import Profile from './src/components/StudentModule/Profile/Profile';
import Transport from './src/components/StudentModule/Transport/Transport';
import Dashboard from './src/components/StudentModule/Dashboard/Dashboard';
import DrawerNavigation from './src/components/DrawerNavigation';
import Syllabus from './src/components/StudentModule/Syllabus/Syllabus';
import Holiday from './src/components/StudentModule/Holiday/Holiday';
import News from './src/components/StudentModule/News/News';
import Multimedia from './src/components/StudentModule/Multimedia/Multimedia';
import Video from './src/components/Video';
import FeeSummary from './src/components/StudentModule/FeeSummary/FeeSummary';
import FeeDetail from './src/components/StudentModule/FeeDetail/FeeDetail';
import FeeDueDetail from './src/components/StudentModule/Fee Due Detail/FeeDueDetail';
import SideBar from './src/components/SideBar';
import Library from './src/components/StudentModule/Library/Library';
import LoginDevice from './src/components/StudentModule/LoginDevice/LoginDevice';
import RateUs from './src/components/RateUs';
import ContactUs from './src/components/ContactUs';
import Achievement from './src/components/StudentModule/Achievements/Achievement';
import Searchbar from './src/components/SearchBar';
import Header from './src/components/Header/Header';
import Notification from './src/components/StudentModule/Notification/Notification';
import Sibling from './src/components/StudentModule/Siblings/Sibling';
import HelpSupport from './src/components/StudentModule/Help&Support/Help&Support';
import ViewSupportSystem from './src/components/StudentModule/ViewSupportSystem/ViewSupportSystem';
import ViewMoreSupportSystem from './src/components/StudentModule/ViewMoreSupportSystem/ViewMoreSupportSystem';
import StaffLogin from './src/components/StaffModule/StaffLogin/StaffLogin';
import StaffProfile from './src/components/StaffModule/StaffProfile/StaffProfile';
import StaffHome from './src/components/StaffModule/StaffHome/StaffHome';
import StaffViewLeave from './src/components/StaffModule/StaffViewLeave/StaffViewLeave';
import StaffAddLeave from './src/components/StaffModule/StaffAddLeave/StaffAddLeave';
import StaffAddItem from './src/components/StaffModule/StaffAddItem/StaffAddItem';
import StaffIssueSubmission from './src/components/StaffModule/StaffIssueSubmission/StaffIssueSubmission';
import StaffSupportSystem from './src/components/StaffModule/StaffSupportSystem/StaffSupportSystem';
import StaffAttendance from './src/components/StaffModule/StaffAttendance/StaffAttendance';
import StaffViewRequest from './src/components/StaffModule/StaffViewRequest/StaffViewRequest';
import StaffAddAttendance from './src/components/StaffModule/StaffAddAttendance/StaffAddAttendance';
import StaffViewStudentAttendance from './src/components/StaffModule/StaffViewStudentAttendance/StaffViewStudentAttendance';
import StaffViewItemQuery from './src/components/StaffModule/StaffViewItemQuery/StaffViewItemQuery';
import StaffViewItemQueryDetails from './src/components/StaffModule/StaffViewItemQueryDetails/StaffViewItemQueryDetails';
import StaffLeaveDetail from './src/components/StaffModule/StaffLeaveDetail/StaffLeaveDetail';
import StaffSupportSolvedDetails from './src/components/StaffModule/StaffSupportSolvedDetails/StaffSupportSolvedDetails';
import StaffSupportAssignedDetails from './src/components/StaffModule/StaffSupportAssignedDetails/StaffSupportAssignedDetails';
import StaffSupportUnSolvedDetails from './src/components/StaffModule/StaffSupportUnSolvedDetails/StaffSupportUnSolvedDetails';
// import crashlytics from '@react-native-firebase/crashlytics';
import VersionCheck from 'react-native-version-check';
import {Alert, BackHandler, Linking} from 'react-native';
import SubjectScreen from './src/components/StudentModule/SubjectScreen/SubjectScreen';
import EditProfile from './src/components/StudentModule/Profile/EditProfile';
const Stack = createNativeStackNavigator();

const App = () => {
  // const getUserDetails = () => {
  //   try {
  //     crashlytics().setUserId('userId');
  //     // If u have single value return from response
  //     // crashlytics().setAttribute('userName', 'userName Value');

  //     // If u have multiple values returnfrom response
  //     crashlytics().setAttributes({
  //       // role: 'admin',
  //       // followers: '13',
  //       email: user.email,
  //       username: user.username,
  //     });
  //   } catch (err) {
  //     crashlytics().recordError(err);
  //   }
  // };

  // React.useEffect( async() => {
  //   console.log('dvndjvnjdv')
  //   const latestVersion = await VersionCheck.getLatestVersion();
  //   const currentVersion = VersionCheck.getCurrentVersion()
  //   console.log(latestVersion, currentVersion);
  //   checkVersion();
  //   crashlytics().crash();
  //   crashlytics().log('Analytics Page Just Mounted');
  //   getUserDetails();
  //   return () => {
  //     crashlytics().log('Analytics Page Just Unmounted');
  //   };
  // }, []);

  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        //Alert the user and direct to the app url
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using..',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {}
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Assignment" component={Assignment} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Multimedia" component={Multimedia} />
        <Stack.Screen name="Syllabus" component={Syllabus} />
        <Stack.Screen name="Holiday" component={Holiday} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="LoginDevice" component={LoginDevice} />
        <Stack.Screen name="RateUs" component={RateUs} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Achievement" component={Achievement} />
        <Stack.Screen name="FeeSummary" component={FeeSummary} />
        <Stack.Screen name="FeeDetail" component={FeeDetail} />
        <Stack.Screen name="Searchbar" component={Searchbar} />
        <Stack.Screen name="FeeDueDetail" component={FeeDueDetail} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Sibling" component={Sibling} />
        <Stack.Screen name="ViewSupportSystem" component={ViewSupportSystem} />
        <Stack.Screen
          name="ViewMoreSupportSystem"
          component={ViewMoreSupportSystem}
        />
        <Stack.Screen name="Transport" component={Transport} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SideBar" component={SideBar} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="StaffLogin" component={StaffLogin} />
        <Stack.Screen name="StaffProfile" component={StaffProfile} />
        <Stack.Screen name="StaffHome" component={StaffHome} />
        <Stack.Screen name="StaffViewLeave" component={StaffViewLeave} />
        <Stack.Screen name="StaffAddLeave" component={StaffAddLeave} />
        <Stack.Screen name="StaffAddItem" component={StaffAddItem} />
        <Stack.Screen
          name="StaffIssueSubmission"
          component={StaffIssueSubmission}
        />
        <Stack.Screen name="StaffAttendance" component={StaffAttendance} />
        <Stack.Screen
          name="StaffSupportSystem"
          component={StaffSupportSystem}
        />
        <Stack.Screen name="StaffViewRequest" component={StaffViewRequest} />
        <Stack.Screen
          name="StaffAddAttendance"
          component={StaffAddAttendance}
        />
        <Stack.Screen
          name="StaffViewStudentAttendance"
          component={StaffViewStudentAttendance}
        />
        <Stack.Screen
          name="StaffViewItemQuery"
          component={StaffViewItemQuery}
        />
        <Stack.Screen
          name="StaffViewItemQueryDetails"
          component={StaffViewItemQueryDetails}
        />
        <Stack.Screen name="StaffLeaveDetail" component={StaffLeaveDetail} />
        <Stack.Screen
          name="StaffSupportSolvedDetails"
          component={StaffSupportSolvedDetails}
        />
        <Stack.Screen
          name="StaffSupportAssignedDetails"
          component={StaffSupportAssignedDetails}
        />
        <Stack.Screen
          name="StaffSupportUnSolvedDetails"
          component={StaffSupportUnSolvedDetails}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
