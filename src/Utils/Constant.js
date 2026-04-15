import React from "react";
import { Dimensions, View } from "react-native";
import Snackbar from "react-native-snackbar";

import {
  componentSizes,
  radii,
  spacing,
  typography,
} from "../constants/designSystem";
import { normalizeFont } from "./responsive";

const baseIconPath = "../assests/Icons/";
const baseImagePath = "../assests/images/";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const compactPercentFactor = (value) => {
  if (value >= 60) {
    return 1;
  }

  if (value >= 30) {
    return 0.98;
  }

  if (value >= 12) {
    return 0.94;
  }

  return 0.9;
};

export const DeviceWidth = screenWidth;
export const DeviceHeight = screenHeight;

export const resH = (value) =>
  (windowHeight * value * compactPercentFactor(value)) / 100;
export const resW = (value) =>
  (windowWidth * value * compactPercentFactor(value)) / 100;

export const DEFAULT_TIMEOUT = 15000;
export const MAX_RETRIES = 2;

export const baseColor = "#5E3BF9";
export const baseColor2 = "#A902FE";
export const baseTextColor = "#595975";
export const Primary_Color = "#C47A4F";
export const whiteColor = "#FFFFFF";
export const GrayColor = "#808080";
export const darkColor = "#3C3C3C";
export const blackColor = "#000000";
export const grayColor = "gray";
export const lightGrayColor = "#F4F4F4";
export const lightGrey = "#F1ECEC";
export const SilverColor = "#F5F5F5";
export const BattleshipGrey = "#E0E0E0";
export const Blue = "#0747A6";

export const LinearGradientColor = ["#A902FE", "#5E3BF9"];
export const LinearwhiteColor = [whiteColor, whiteColor];

export const font10 = normalizeFont(10);
export const font12 = typography.fontSmall;
export const font13 = normalizeFont(13);
export const font14 = typography.fontRegular;
export const font15 = normalizeFont(15);
export const font15_5 = normalizeFont(15.5);
export const font16 = typography.fontMedium;
export const font17 = normalizeFont(17);
export const font18 = typography.fontLarge;
export const font19 = normalizeFont(19);
export const font19_5 = normalizeFont(19.5);
export const font20 = typography.fontXL;
export const font21 = normalizeFont(21);
export const font22 = normalizeFont(22);
export const font24 = normalizeFont(24);
export const font26 = normalizeFont(26);
export const font28 = normalizeFont(28);
export const font30 = normalizeFont(30);
export const font32 = normalizeFont(32);
export const font34 = normalizeFont(34);
export const font36 = normalizeFont(36);

export const typeBlack = "Inter-Black";
export const typeExtraBold = "Inter-ExtraBold";
export const typeBold = "Inter-Bold";
export const typeRegular = "Inter-Regular";
export const typeMedium = "Inter-Medium";
export const typeSemiBold = "Inter-SemiBold";
export const typeLight = "Inter-Light";

export const compactSpacing = spacing;
export const compactRadii = radii;
export const compactComponentSizes = componentSizes;

export const Icons = {
  homeIcon: require(baseIconPath + "homeIcon.png"),
  homeWork: require(baseIconPath + "homeWork.png"),
  eyeCloseIcon: require(baseIconPath + "eyeCloseIcon.png"),
  notesIcon: require(baseIconPath + "notesIcon.png"),
  eventIcon: require(baseIconPath + "eventIcon.png"),
  summeryIcon: require(baseIconPath + "summery.png"),
  bookIcon: require(baseIconPath + "book.png"),
  news: require(baseImagePath + "news.png"),
  examIcon: require(baseIconPath + "examIcon.png"),
  attendanceIcon: require(baseIconPath + "attendance.png"),
  feeDueIcon: require(baseIconPath + "feeDue.png"),
  transportIcon: require(baseIconPath + "transport.png"),
  backArrowIcon: require(baseIconPath + "backIcon.png"),
  newsIcon: require(baseIconPath + "news.png"),
  searchIcon: require(baseIconPath + "search.png"),
  attachIcon: require(baseIconPath + "attachIcon.png"),
  downloadIcon: require(baseIconPath + "download.png"),
  newsEyeIcon: require(baseIconPath + "newsEye.png"),
  notifyIcon: require(baseIconPath + "notify.png"),
  assignment: require(baseIconPath + "assignment.png"),
  notes: require(baseIconPath + "notes.png"),
  drawerIcon: require(baseIconPath + "drawerIcon.png"),
  hayIcon: require(baseIconPath + "HiiIcon.png"),
  bellIcon: require(baseIconPath + "bellIcon.png"),
  logout: require(baseIconPath + "logout.png"),
  drawerHome: require(baseIconPath + "drawerHome.png"),
  sibling: require(baseIconPath + "sibling.png"),
  rating: require(baseIconPath + "drawerStar.png"),
  loginDevice: require(baseIconPath + "loginDevice.png"),
  drawerContact: require(baseIconPath + "drawerContact.png"),
  bottomViewSystem: require(baseIconPath + "viewSystem.png"),
  bottomAchivement: require(baseIconPath + "bottomAchievement.png"),
  bottomMedia: require(baseIconPath + "bottomMedia.png"),
  bottomSupport: require(baseIconPath + "bottomSupport.png"),
  filterIcon: require(baseIconPath + "filterIcon.png"),
  complain_assignment: require(baseIconPath + "complain_assignment.png"),
  pending: require(baseIconPath + "pending.png"),
  solved: require(baseIconPath + "Solved.png"),
  upArrow: require(baseIconPath + "upArrow.png"),
  downArrow: require(baseIconPath + "downArrow.png"),
  evs: require(baseIconPath + "evs.png"),
  chemistry: require(baseIconPath + "chemistry.png"),
  physies: require(baseIconPath + "physies.png"),
  bio: require(baseIconPath + "bio.png"),
  sanskrit: require(baseIconPath + "sanskrit.png"),
  hindi: require(baseIconPath + "hindi.png"),
  math: require(baseIconPath + "math.png"),
  english: require(baseIconPath + "english.png"),
  history: require(baseIconPath + "history.png"),
  bussinessStudy: require(baseIconPath + "bussinessStudy.png"),
  socialscience: require(baseIconPath + "socialscience.png"),
  computer: require(baseIconPath + "computer.png"),
  psycology: require(baseIconPath + "psycology.png"),
  politicalscience: require(baseIconPath + "politicalscience.png"),
  economic: require(baseIconPath + "economic.png"),
  music: require(baseIconPath + "music.png"),
  Accounts: require(baseIconPath + "Accounts.png"),
  physicaleduction: require(baseIconPath + "physicaleduction.png"),
  edit: require(baseIconPath + "edit.png"),
  drawer: require(baseIconPath + "drawer.png"),
  studHomeImage: require(baseImagePath + "studHomeWork.png"),
  studFeeDue: require(baseImagePath + "studFeeDue.png"),
  achivement: require(baseImagePath + "achivement.png"),
  planner: require(baseImagePath + "planner.png"),
  support: require(baseImagePath + "support.png"),
  grade: require(baseImagePath + "grade.png"),
  add: require(baseImagePath + "add.png"),
  house: require(baseImagePath + "house.png"),
  bell: require(baseImagePath + "bell.png"),
  proficiency: require(baseIconPath + "proficiency.png"),
  libraryIcon: require(baseIconPath + "libraryIcon.png"),
  leaveIcon: require(baseIconPath + "leaveIcon.png"),
  SupportIcon: require(baseIconPath + "SupportIcon.png"),
  profileIcon: require(baseIconPath + "profileIcon.png"),
  notificationIcon: require(baseIconPath + "notification.png"),
  StaffAttendanceIcon: require(baseIconPath + "Staffattendance.png"),
  StudentComplaintIcon: require(baseIconPath + "StudentComplaint.png"),
  homeWorkIcon: require(baseIconPath + "homeWorkIcon.png"),
  notesIcon1: require(baseIconPath + "notesIcon1.png"),
  fornightlyplannericon1: require(baseIconPath + "fornightlyplannericon1.png"),
  gradesIcon: require(baseIconPath + "gradesIcon.png"),
  studentperformanceIcon: require(baseIconPath + "studentperformance.png"),
  MultimediaIcon: require(baseIconPath + "MultimediaIcon.png"),
  AddIcon: require(baseIconPath + "addIcon.png"),
  CrossIcon: require(baseIconPath + "CrossIcon.png"),
  Search: require(baseImagePath + "search.png"),
  UserEdit: require(baseIconPath + "UserEdit.png"),
  changePassword: require(baseIconPath + "changePassword.png"),
  InfoIcon: require(baseIconPath + "infoIcon.png"),
  LogoutIcon: require(baseImagePath + "logout1.png"),
  RightArrow: require(baseIconPath + "rightArrow.png"),
  profileimg: require(baseImagePath + "businessman.png"),
  Filter: require(baseIconPath + "Filter.png"),
};

export const showAlert = (message) => {
  Snackbar.show({
    text: message,
    backgroundColor: "#F15270",
    duration: Snackbar.LENGTH_LONG,
  });
};

export const listSpace = (height) => <View style={{ height }} />;
