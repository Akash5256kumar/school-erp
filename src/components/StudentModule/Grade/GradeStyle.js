// GradeStyle.js
import { StyleSheet } from 'react-native';
import { resW, resH } from '../../../Utils/Constant';

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: resW(4),
    backgroundColor: 'transparent',
  },
  title: {
    color: '#000',
    textAlign: 'left',
    fontSize: resW(3),
  },
  dropdownRowText: {
    fontSize: resW(2.5),
    color: '#000',
  },
  downIcon: {
    height: resW(5),
    width: resW(5),
  },
  upIcon: {
    height: resW(3.5),
    width: resW(3.5),
    marginRight: resW(1)
  },
  card: {
    borderWidth: 1,
    borderColor: '#7B61FF',
    borderRadius: resW(2),
    padding: resW(4),
    marginTop: resH(2),
    backgroundColor: '#fff',
  },
  gradesTitle: {
    marginTop: resW(2),
    fontSize: resW(7),
    textAlign: 'center',
    marginBottom: resH(2),
    color: '#000',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(1.5),
    paddingHorizontal: resW(2),
    flex:1,
    flexWrap:"wrap"
    // borderBottomWidth: 1,
    // borderBottomColor: '#7B61FF',
    // backgroundColor: '#F5F5F5',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: resW(3.5),
    fontWeight: 'bold',
    color: '#000',
    // textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(1.5),
    paddingHorizontal: resW(2),
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#E0E0E0',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: resW(3.2),
    color: '#000',
  },
  dropcontainer: {
    marginBottom: resH(1),
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: resH(2),
  },
  selectButton1: {
    backgroundColor: '#7B61FF',
    borderRadius: resW(1),
    width: resW(30),
    height: resH(4),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: resW(1),
  },
  selectButtonText: {
    color: "#fff",
    fontSize: resW(3.2),
    fontWeight: '600',
    marginRight: resW(1),
  },
  // New styles for student info
  studentInfoContainer: {
    backgroundColor: '#fff',
    padding: resW(3),
    borderRadius: resW(2),
    marginBottom: resH(2),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  studentName: {
    fontSize: resW(4.2),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: resH(1),
  },
  studentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: resW(3),
  },
  studentDetail: {
    fontSize: resW(3.2),
    color: '#666',
  },
  noDataText: {
    textAlign: 'center',
    padding: resH(3),
    color: '#666',
    fontStyle: 'italic',
    fontSize: resW(3.5),
  },
  loadingContainer: {
    padding: resH(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Additional responsive styles
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: resH(2),
  },
  subjectCell: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: resW(2),
    fontSize: resW(3.2),
    color: '#000',
  },
  markCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: resW(3.2),
    color: '#000',
  },
  percentageCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: resW(3.2),
    color: '#000',
    fontWeight: '500',
  },
});