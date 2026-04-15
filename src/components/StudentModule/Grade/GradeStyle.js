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
    borderRadius: resW(3),
    padding: resW(4),
    marginTop: resH(2),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: resW(4),
    fontWeight: '700',
    color: '#1C1F2A',
    marginBottom: resH(1.5),
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: resH(3),
  },
  selectButton: {
    backgroundColor: '#7B61FF',
    borderRadius: resW(2),
    minWidth: resW(32),
    height: resH(5.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: resW(3.2),
    fontWeight: '600',
    marginRight: resW(1),
  },
  actionButton: {
    backgroundColor: '#4C24FF',
    borderRadius: resW(2),
    paddingVertical: resH(1.2),
    paddingHorizontal: resW(5),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: resH(5.2),
    marginLeft: resW(2),
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: resW(3.2),
    fontWeight: '700',
  },
  studentInfoContainer: {
    backgroundColor: '#FFFFFF',
    padding: resW(4),
    borderRadius: resW(3),
    marginBottom: resH(2),
    borderWidth: 1,
    borderColor: '#F0F1F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  studentName: {
    fontSize: resW(4.8),
    fontWeight: '800',
    textAlign: 'center',
    color: '#1C1F2A',
    marginBottom: resH(1.2),
  },
  studentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentDetail: {
    fontSize: resW(3.2),
    color: '#6F7287',
  },
  gradeSection: {
    width: '100%',
  },
  gradeList: {
    paddingVertical: resH(1),
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(1.4),
    paddingHorizontal: resW(2),
    backgroundColor: '#FBFBFF',
    borderRadius: resW(2),
  },
  subjectText: {
    flex: 1,
    color: '#1C1F2A',
    fontSize: resW(3.4),
    fontWeight: '600',
  },
  gradeText: {
    width: resW(18),
    textAlign: 'right',
    color: '#4A4B57',
    fontSize: resW(3.4),
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: resH(1),
    backgroundColor: '#E8E9F3',
  },
  noDataText: {
    textAlign: 'center',
    paddingVertical: resH(4),
    color: '#6F7287',
    fontStyle: 'italic',
    fontSize: resW(3.4),
  },
  loadingContainer: {
    paddingVertical: resH(2),
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: resH(1.2),
  },
  skeletonBox: {
    height: resH(4),
    borderRadius: resW(2),
    backgroundColor: '#E8E9F3',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(1.5),
    paddingHorizontal: resW(2),
    flex: 1,
    flexWrap: 'wrap',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: resW(3.5),
    fontWeight: 'bold',
    color: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(1.5),
    paddingHorizontal: resW(2),
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
});