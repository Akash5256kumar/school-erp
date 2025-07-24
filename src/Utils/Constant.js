import React from 'react';
import {Dimensions, Platform, StatusBar, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
const {width, height} = Dimensions.get('screen');
const baseIconPath = '../assests/Icons/';
const window_Height = Dimensions.get('window').height;
const window_Width = Dimensions.get('window').width;
export const DeviceWidth = Dimensions.get('screen').width;
export const DeviceHeight = Dimensions.get('screen').height;

export const resH = h => {
  return (window_Height * h) / 100;
};

export const resW = w => {
  return (window_Width * w) / 100;
};

export const LinearGradientColor = ['#A902FE', '#5E3BF9'];

export const baseColor = '#5E3BF9';
export const baseColor2 = '#A902FE';
export const baseTextColor = '#595975'; //base color in v2
export const Primary_Color = '#C47A4F';
export const whiteColor = '#ffffff';
export const GrayColor = '#808080';
export const darkColor = '#3c3c3c';
export const blackColor = '#000000';
export const grayColor = 'gray';
export const lightGrayColor = '#F4F4F4';

//fontSize
export const font10 = (DeviceWidth * 2.5) / 100;
export const font12 = (DeviceWidth * 2.9) / 100;
export const font13 = (DeviceWidth * 3.2) / 100;
export const font14 = (DeviceWidth * 3.4) / 100;
export const font15 = (DeviceWidth * 3.7) / 100;
export const font15_5 = (DeviceWidth * 3.8) / 100;
export const font16 = (DeviceWidth * 3.9) / 100;
export const font17 = (DeviceWidth * 4.1) / 100;
export const font18 = (DeviceWidth * 4.3) / 100;
export const font19 = (DeviceWidth * 4.5) / 100;
export const font19_5 = (DeviceWidth * 4.7) / 100;
export const font20 = (DeviceWidth * 4.6) / 100;
export const font21 = (DeviceWidth * 5.1) / 100;
export const font22 = (DeviceWidth * 5.3) / 100;
export const font24 = (DeviceWidth * 5.8) / 100;
export const font26 = (DeviceWidth * 6.3) / 100;
export const font28 = (DeviceWidth * 6.8) / 100;
export const font30 = (DeviceWidth * 7.3) / 100;
export const font32 = (DeviceWidth * 7.8) / 100;
export const font34 = (DeviceWidth * 8.3) / 100;
export const font36 = (DeviceWidth * 8.7) / 100;

export const typeBlack = 'Inter-Black';
export const typeExtraBold = 'Inter-ExtraBold';
export const typeBold = 'Inter-Bold';
export const typeRegular = 'Inter-Regular';
export const typeMedium = 'Inter-Medium';
export const typeSemiBold = 'Inter-SemiBold';
export const typeLight = 'Inter-Light';

export const Icons = {
  homeIcon: require(baseIconPath + 'home.png'),
  homeWork: require(baseIconPath + 'homeWork.png'),
  eyeCloseIcon: require(baseIconPath + 'eyeCloseIcon.png'),
  notesIcon: require(baseIconPath + 'notesIcon.png'),
  eventIcon: require(baseIconPath + 'eventIcon.png'),
  summeryIcon: require(baseIconPath + 'summery.png'),
  bookIcon: require(baseIconPath + 'book.png'),
  news: require(baseIconPath + 'newsIcon.png'),
  examIcon: require(baseIconPath + 'examIcon.png'),
  attendanceIcon: require(baseIconPath + 'attendance.png'),
  feeDueIcon: require(baseIconPath + 'feeDue.png'),
  transportIcon: require(baseIconPath + 'transport.png'),
  backArrowIcon: require(baseIconPath + 'backIcon.png'),
  newsIcon: require(baseIconPath + 'news.png'),
  searchIcon: require(baseIconPath + 'search.png'),
  attachIcon: require(baseIconPath + 'attachIcon.png'),
  downloadIcon: require(baseIconPath + 'download.png'),
  newsEyeIcon: require(baseIconPath + 'newsEye.png'),
  notifyIcon: require(baseIconPath + 'notify.png'),
  assignment: require(baseIconPath + 'assignment.png'),
  notes: require(baseIconPath + 'notes.png'),
  drawerIcon: require(baseIconPath + 'drawerIcon.png'),
  hayIcon: require(baseIconPath + 'HiiIcon.png'),
  bellIcon: require(baseIconPath + 'bellIcon.png'),
  logout: require(baseIconPath + 'logout.png'),
  drawerHome: require(baseIconPath + 'drawerHome.png'),
  sibling: require(baseIconPath + 'sibling.png'),
  rating: require(baseIconPath + 'drawerStar.png'),
  loginDevice: require(baseIconPath + 'loginDevice.png'),
  drawerContact: require(baseIconPath + 'drawerContact.png'),
  bottomViewSystem: require(baseIconPath + 'viewSystem.png'),
  bottomAchivement: require(baseIconPath + 'bottomAchievement.png'),
  bottomMedia: require(baseIconPath + 'bottomMedia.png'),
  bottomSupport: require(baseIconPath + 'bottomSupport.png'),
  filterIcon: require(baseIconPath + 'filterIcon.png'),
  complain_assignment: require(baseIconPath + 'complain_assignment.png'),
  pending: require(baseIconPath + 'pending.png'),
  solved: require(baseIconPath + 'Solved.png'),
  upArrow: require(baseIconPath + 'upArrow.png'),
  downArrow: require(baseIconPath + 'downArrow.png'),
  evs : require(baseIconPath + 'evs.png'),
  chemistry : require(baseIconPath + 'chemistry.png'),
  physies : require(baseIconPath + 'physies.png'),
  bio : require(baseIconPath + 'bio.png'),
  sanskrit : require(baseIconPath + 'sanskrit.png'),
  hindi : require(baseIconPath + 'hindi.png'),
  math : require(baseIconPath + 'math.png'),
  english : require(baseIconPath + 'english.png'),
  history : require(baseIconPath + 'history.png'),
  bussinessStudy : require(baseIconPath + 'bussinessStudy.png'),
  socialscience : require(baseIconPath + 'socialscience.png'),
  computer : require(baseIconPath + 'computer.png'),
  psycology : require(baseIconPath + 'psycology.png'),
  politicalscience : require(baseIconPath + 'politicalscience.png'),
  economic : require(baseIconPath + 'economic.png'),
  music : require(baseIconPath + 'music.png'),
  Accounts : require(baseIconPath + 'Accounts.png'),
  physicaleduction : require(baseIconPath + 'physicaleduction.png'),

};

export const showAlert = message => {
  Snackbar.show({
    text: message,
    backgroundColor: '#f15270',
    // fontFamily:typeMedium,
    duration: Snackbar.LENGTH_LONG,
  });
};

export const listSpace = h => {
  return <View style={{height: h}} />;
};
