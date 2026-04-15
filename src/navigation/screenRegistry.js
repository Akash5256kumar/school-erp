import Splash from '../components/Splash';
import Login from '../components/StudentModule/Login/Login';
import Home from '../components/StudentModule/Home/Home';
import Assignment from '../components/StudentModule/Assignments/Assignment';
import Event from '../components/StudentModule/Events/Event';
import Attendance from '../components/StudentModule/Attendance/Attendance';
import Profile from '../components/StudentModule/Profile/Profile';
import Transport from '../components/StudentModule/Transport/Transport';
import Dashboard from '../components/StudentModule/Dashboard/Dashboard';
import DrawerNavigation from '../components/DrawerNavigation';
import Syllabus from '../components/StudentModule/Syllabus/Syllabus';
import Holiday from '../components/StudentModule/Holiday/Holiday';
import News from '../components/StudentModule/News/News';
import NewsDetail from '../components/StudentModule/News/NewsDetail';
import EventDetail from '../components/StudentModule/Events/EventDetail';
import ExamDetail from '../components/StudentModule/Syllabus/ExamDetail';
import SyllabusDetail from '../components/StudentModule/Syllabus/SyllabusDetail';
import Multimedia from '../components/StudentModule/Multimedia/Multimedia';
import Video from '../components/Video';
import FeeSummary from '../components/StudentModule/FeeSummary/FeeSummary';
import FeeDetail from '../components/StudentModule/FeeDetail/FeeDetail';
import FeeDueDetail from '../components/StudentModule/Fee Due Detail/FeeDueDetail';
import SideBar from '../components/SideBar';
import Library from '../components/StudentModule/Library/Library';
import LoginDevice from '../components/StudentModule/LoginDevice/LoginDevice';
import RateUs from '../components/RateUs';
import ContactUs from '../components/ContactUs';
import Achievement from '../components/StudentModule/Achievements/Achievement';
import Searchbar from '../components/SearchBar';
import Header from '../components/Header/Header';
import Notification from '../components/StudentModule/Notification/Notification';
import Sibling from '../components/StudentModule/Siblings/Sibling';
import HelpSupport from '../components/StudentModule/Help&Support/Help&Support';
import ViewSupportSystem from '../components/StudentModule/ViewSupportSystem/ViewSupportSystem';
import ViewMoreSupportSystem from '../components/StudentModule/ViewMoreSupportSystem/ViewMoreSupportSystem';
import StaffLogin from '../components/StaffModule/StaffLogin/StaffLogin';
import StaffProfile from '../components/StaffModule/StaffProfile/StaffProfile';
import StaffHome from '../components/StaffModule/StaffHome/StaffHome';
import StaffViewLeave from '../components/StaffModule/StaffViewLeave/StaffViewLeave';
import StaffAddLeave from '../components/StaffModule/StaffAddLeave/StaffAddLeave';
import StaffAddItem from '../components/StaffModule/StaffAddItem/StaffAddItem';
import StaffIssueSubmission from '../components/StaffModule/StaffIssueSubmission/StaffIssueSubmission';
import StaffSupportSystem from '../components/StaffModule/StaffSupportSystem/StaffSupportSystem';
import StaffAttendance from '../components/StaffModule/StaffAttendance/StaffAttendance';
import StaffViewRequest from '../components/StaffModule/StaffViewRequest/StaffViewRequest';
import StaffAddAttendance from '../components/StaffModule/StaffAddAttendance/StaffAddAttendance';
import StaffViewStudentAttendance from '../components/StaffModule/StaffViewStudentAttendance/StaffViewStudentAttendance';
import StaffViewItemQuery from '../components/StaffModule/StaffViewItemQuery/StaffViewItemQuery';
import StaffViewItemQueryDetails from '../components/StaffModule/StaffViewItemQueryDetails/StaffViewItemQueryDetails';
import StaffLeaveDetail from '../components/StaffModule/StaffLeaveDetail/StaffLeaveDetail';
import StaffSupportSolvedDetails from '../components/StaffModule/StaffSupportSolvedDetails/StaffSupportSolvedDetails';
import StaffSupportAssignedDetails from '../components/StaffModule/StaffSupportAssignedDetails/StaffSupportAssignedDetails';
import StaffSupportUnSolvedDetails from '../components/StaffModule/StaffSupportUnSolvedDetails/StaffSupportUnSolvedDetails';
import SubjectScreen from '../components/StudentModule/SubjectScreen/SubjectScreen';
import EditProfile from '../components/StudentModule/Profile/EditProfile';
import GuardianEditProfile from '../components/StudentModule/Profile/GuardianEditProfile';
import ParentsEditProfile from '../components/StudentModule/Profile/ParentsEditProfile';
import HomeScreen from '../components/StudentModule/Home/HomeScreen';
import Notes from '../components/StudentModule/Notes/Notes';
import NotesList from '../components/StudentModule/Notes/NotesList';
import Grade from '../components/StudentModule/Grade/Grade';
import FortnightlyPlanner from '../components/StudentModule/FortnightlyPlanner/FortnightlyPlanner';
import FortnightlyPlannerList from '../components/StudentModule/FortnightlyPlanner/FortnightlyPlannerList';
import ProficiencyScreen from '../../proficiencyScreen';
import StudentPerformace from '../components/StudentModule/SPR/StudentPerformace';
import RoleSelectionScreen from '../components/RoleScreen/RoleSelectionScreen';
import StaffModuleBottomTabs from '../components/StaffModule/StaffModuleBottomTabs/StaffModuleBottomTabs';
import StaffLibrary from '../components/StaffModule/StaffLibrary/StaffLibrary';
import StudentComplaint from '../components/StaffModule/Staff_Student_Complaint/StudentComplaint';
import StaffModuleHomeWork from '../components/StaffModule/StaffModuleHomework/StaffModuleHomeWork';
import StaffModuleStudentPerformance from '../components/StaffModule/StaffModuleStudentPerformance/StaffModuleStudentPerformance';
import StaffModuleMultiMedia from '../components/StaffModule/StaffModuleMultiMedia/StaffModuleMultiMedia';
import StaffModuleResultAndGrades from '../components/StaffModule/StaffModuleResultAndGrades/StaffModuleResultAndGrades';
import StaffModuleFornightlyPlanner from '../components/StaffModule/StaffModuleFornightlyPlanner/StaffModuleFornightlyPlanner';
import StaffModuleNotes from '../components/StaffModule/StaffModuleNotes/StaffModuleNotes';
import AddComplaint from '../components/StaffModule/Staff_Student_Complaint/AddComplaint';
import StaffAddPlanner from '../components/StaffModule/StaffModuleFornightlyPlanner/StaffAddPlanner';
import StaffAddNotes from '../components/StaffModule/StaffModuleNotes/StaffAddNotes';
import ViewStaffFornightlyPlanner from '../components/StaffModule/StaffModuleFornightlyPlanner/ViewStaffFornightlyPlanner';
import StaffEditFornightlyPlanner from '../components/StaffModule/StaffModuleFornightlyPlanner/StaffEditFornightlyPlanner';
import StaffViewNotes from '../components/StaffModule/StaffModuleNotes/StaffViewNotes';
import StaffEditNotes from '../components/StaffModule/StaffModuleNotes/StaffEditNotes';
import StaffAddHomeWork from '../components/StaffModule/StaffModuleHomework/StaffAddHomeWork';
import StaffEditHomeWork from '../components/StaffModule/StaffModuleHomework/StaffEditHomeWork';
import StaffViewHomeWork from '../components/StaffModule/StaffModuleHomework/StaffViewHomeWork';
import StaffAddMultiMedia from '../components/StaffModule/StaffModuleMultiMedia/StaffAddMultiMedia';
import StaffEditMultiMedia from '../components/StaffModule/StaffModuleMultiMedia/StaffEditMultiMedia';
import StaffViewMultiMedia from '../components/StaffModule/StaffModuleMultiMedia/StaffViewMultiMedia';
import StaffMediaWebView from '../components/StaffModule/StaffModuleMultiMedia/StaffMediaWebView';
import EditStaffProfile from '../components/StaffModule/StaffProfile/EditProfile';
import StaffChangePassword from '../components/StaffModule/StaffProfile/StaffChangePassword';
import TeachingInfo from '../components/StaffModule/StaffProfile/TeachingInfo';
import StaffModuleAddSPR from '../components/StaffModule/StaffModuleStudentPerformance/StaffModuleAddSPR';
import StaffModuleStudentPerformanceDetail from '../components/StaffModule/StaffModuleStudentPerformance/StaffModuleStudentPerformanceDetail';
import LibraryBookDetail from '../components/common/LibraryBookDetail';

export const screenRegistry = [
  ['Splash', Splash],
  ['Login', Login],
  ['Home', Home],
  ['Assignment', Assignment],
  ['SubjectScreen', SubjectScreen],
  ['Attendance', Attendance],
  ['Library', Library],
  ['LibraryBookDetail', LibraryBookDetail],
  ['Event', Event],
  ['News', News],
  ['NewsDetail', NewsDetail],
  ['EventDetail', EventDetail],
  ['ExamDetail', ExamDetail],
  ['SyllabusDetail', SyllabusDetail],
  ['Multimedia', Multimedia],
  ['Syllabus', Syllabus],
  ['Holiday', Holiday],
  ['Profile', Profile],
  ['HelpSupport', HelpSupport],
  ['Video', Video],
  ['LoginDevice', LoginDevice],
  ['RateUs', RateUs],
  ['ContactUs', ContactUs],
  ['Achievement', Achievement],
  ['FeeSummary', FeeSummary],
  ['FeeDetail', FeeDetail],
  ['Searchbar', Searchbar],
  ['FeeDueDetail', FeeDueDetail],
  ['Notification', Notification],
  ['Sibling', Sibling],
  ['ViewSupportSystem', ViewSupportSystem],
  ['ViewMoreSupportSystem', ViewMoreSupportSystem],
  ['StaffAddPlanner', StaffAddPlanner],
  ['StaffModuleAddSPR', StaffModuleAddSPR],
  ['StaffModuleStudentPerformanceDetail', StaffModuleStudentPerformanceDetail],
  ['StaffAddNotes', StaffAddNotes],
  ['ViewStaffFornightlyPlanner', ViewStaffFornightlyPlanner],
  ['StaffEditFornightlyPlanner', StaffEditFornightlyPlanner],
  ['StaffViewNotes', StaffViewNotes],
  ['StaffEditNotes', StaffEditNotes],
  ['StaffAddHomeWork', StaffAddHomeWork],
  ['StaffEditHomeWork', StaffEditHomeWork],
  ['StaffViewHomeWork', StaffViewHomeWork],
  ['StaffAddMultiMedia', StaffAddMultiMedia],
  ['StaffEditMultiMedia', StaffEditMultiMedia],
  ['StaffViewMultiMedia', StaffViewMultiMedia],
  ['StaffMediaWebView', StaffMediaWebView],
  ['TeachingInfo', TeachingInfo],
  ['EditStaffProfile', EditStaffProfile],
  ['StaffChangePassword', StaffChangePassword],
  ['Transport', Transport],
  ['FortnightlyPlanner', FortnightlyPlanner],
  ['ProficiencyScreen', ProficiencyScreen],
  ['StudentPerformace', StudentPerformace],
  ['Dashboard', Dashboard],
  ['StaffModuleBottomTabs', StaffModuleBottomTabs],
  ['SideBar', SideBar],
  ['Header', Header],
  ['Drawer', DrawerNavigation],
  ['RoleSelectionScreen', RoleSelectionScreen],
  ['StaffLibrary', StaffLibrary],
  ['StudentComplaint', StudentComplaint],
  ['StaffModuleHomeWork', StaffModuleHomeWork],
  ['StaffModuleStudentPerformance', StaffModuleStudentPerformance],
  ['StaffModuleMultiMedia', StaffModuleMultiMedia],
  ['StaffModuleResultAndGrades', StaffModuleResultAndGrades],
  ['StaffModuleFornightlyPlanner', StaffModuleFornightlyPlanner],
  ['StaffModuleNotes', StaffModuleNotes],
  ['StaffLogin', StaffLogin],
  ['StaffProfile', StaffProfile],
  ['StaffHome', StaffHome],
  ['StaffViewLeave', StaffViewLeave],
  ['StaffAddLeave', StaffAddLeave],
  ['StaffAddItem', StaffAddItem],
  ['StaffIssueSubmission', StaffIssueSubmission],
  ['StaffAttendance', StaffAttendance],
  ['StaffSupportSystem', StaffSupportSystem],
  ['StaffViewRequest', StaffViewRequest],
  ['StaffAddAttendance', StaffAddAttendance],
  ['StaffViewStudentAttendance', StaffViewStudentAttendance],
  ['StaffViewItemQuery', StaffViewItemQuery],
  ['StaffViewItemQueryDetails', StaffViewItemQueryDetails],
  ['StaffLeaveDetail', StaffLeaveDetail],
  ['StaffSupportSolvedDetails', StaffSupportSolvedDetails],
  ['StaffSupportAssignedDetails', StaffSupportAssignedDetails],
  ['StaffSupportUnSolvedDetails', StaffSupportUnSolvedDetails],
  ['EditProfile', EditProfile],
  ['GuardianEditProfile', GuardianEditProfile],
  ['ParentsEditProfile', ParentsEditProfile],
  ['HomeScreen', HomeScreen],
  ['Notes', Notes],
  ['NotesList', NotesList],
  ['FortnightlyPlannerList', FortnightlyPlannerList],
  ['AddComplaint', AddComplaint],
  ['Grade', Grade],
];

export default screenRegistry;
