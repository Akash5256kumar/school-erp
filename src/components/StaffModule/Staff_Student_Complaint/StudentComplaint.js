import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ScrollView ,Image,TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import { BattleshipGrey, blackColor, font12, font14, font15_5, font16, resH, resW, SilverColor, } from '../../../Utils/Constant';
import CommonButton from '../../Button/CommonButton';
import * as constant from '../../../Utils/Constant'
const complaintsData = [
  {
    id: '1',
    student: 'Preeti',
    class: 'MCA',
    Section: "A",
    createdAt: '02 Oct 2025',
    complaintType: 'Library facilities issue',
    complaintText:
      'The study area is often crowded and needs more seating arrangements. There are not enough tables for students during exam periods and many have to stand. Some chairs are broken and should be replaced with comfortable seating. The air conditioning system needs maintenance as the area gets quite hot in the afternoon. There is also a need for more power outlets for students’ devices. The lighting should be improved for evening study hours. Library staff are helpful but sometimes there is a delay in getting reserved books. Cleanliness needs attention especially in corners where dust accumulates. It would be great to extend the library hours before exams. Group study rooms are frequently unavailable, so more should be added. Wi-Fi connection is sometimes unstable. A water dispenser would be helpful for students. The notice board should be kept updated with new arrivals of books. More computer terminals are needed so students don’t have to wait. Overall, the library can become a better study environment with these improvements.',

    status: 'Pending',
  },
  {
    id: '2',
    student: 'Preeti',
    class: 'MCA',
    Section: "A",
    createdAt: '01 Oct 2025',
    complaintType: 'Hostel food issue',
    complaintText: 'The food served in hostel is repetitive and needs better variety.',
    status: 'Approved',
  },
  {
    id: '3',
    student: 'Preeti',
    class: 'MCA',
    Section: "A",
    createdAt: '30 Sep 2025',
    complaintType: 'Transport delay',
    complaintText: 'Buses often arrive late, causing delay in reaching classes.',
    status: 'Approved',
  },
  //   {
  //   id: '1',
  //   student: 'Preeti',
  //   class: 'MCA',
  //   Section: "A",
  //   createdAt: '02 Oct 2025',
  //   complaintType: 'Library facilities issue',
  //   complaintText:
  //     'The study area is often crowded and needs more seating arrangements. There are not enough tables for students during exam periods and many have to stand. Some chairs are broken and should be replaced with comfortable seating. The air conditioning system needs maintenance as the area gets quite hot in the afternoon. There is also a need for more power outlets for students’ devices. The lighting should be improved for evening study hours. Library staff are helpful but sometimes there is a delay in getting reserved books. Cleanliness needs attention especially in corners where dust accumulates. It would be great to extend the library hours before exams. Group study rooms are frequently unavailable, so more should be added. Wi-Fi connection is sometimes unstable. A water dispenser would be helpful for students. The notice board should be kept updated with new arrivals of books. More computer terminals are needed so students don’t have to wait. Overall, the library can become a better study environment with these improvements.',

  //   status: 'Pending',
  // },
  // {
  //   id: '2',
  //   student: 'Preeti',
  //   class: 'MCA',
  //   Section: "A",
  //   createdAt: '01 Oct 2025',
  //   complaintType: 'Hostel food issue',
  //   complaintText: 'The food served in hostel is repetitive and needs better variety.',
  //   status: 'Approved',
  // },
  // {
  //   id: '3',
  //   student: 'Preeti',
  //   class: 'MCA',
  //   Section: "A",
  //   createdAt: '30 Sep 2025',
  //   complaintType: 'Transport delay',
  //   complaintText: 'Buses often arrive late, causing delay in reaching classes.',
  //   status: 'Approved',
  // },
  
];

const StudentComplaint = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const getStatusStyle = (status) => ({
    backgroundColor: BattleshipGrey,
    color: blackColor,
  });

  const handleCardPress = (item) => {
    setSelectedComplaint(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)} activeOpacity={0.9}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.studentInfo}>
            Name: {item.student}  Class: {item.class}  Section: {item.Section}
          </Text>
          <View style={styles.rightHeader}>
            <Text style={styles.dateText}>{item.createdAt}</Text>
            <View style={styles.statusWrapper}>
              <Text style={[styles.status, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.complaintLabel}>Complaint Type</Text>
        <Text style={styles.complaintText}>{item.complaintType}</Text>
        <Text style={styles.complaintLabel}>Description</Text>
        <Text
          style={styles.complaintText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.complaintText}
        </Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <LinearGradient colors={['white', 'white']} style={{ flex: 1 }}>
      <CommonHeader
        title={'Student Complaint'}
                       backgroundColor={constant.Blue}
                        textColor={constant.whiteColor}
                        IconColor={constant.whiteColor}
        onLeftClick={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={complaintsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: resH(2) ,marginTop:resH(1)}}
      />
      <TouchableOpacity
    style={styles.fabButton}
    activeOpacity={0.7}
    onPress={() => navigation.navigate("AddComplaint")}
  >
    <Image source={constant.Icons.AddIcon} style={styles.fabIcon} />
  </TouchableOpacity>
<Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    <View style={styles.modalBackground}>
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Scrollable content */}
         <ScrollView 
  showsVerticalScrollIndicator={true}
  nestedScrollEnabled={true}   // ✅ important for smooth scroll inside modal
>
  {selectedComplaint && (
    <>
      <View style={styles.headerRow}>
        <Text style={[styles.studentInfo, { width: resW(50) }]}>
          Name: {selectedComplaint.student}  
          Class: {selectedComplaint.class}  
          Section: {selectedComplaint.Section}
        </Text>
        <View style={styles.rightHeader}>
          <Text style={styles.dateText}>{selectedComplaint.createdAt}</Text>
          <View style={styles.statusWrapper}>
            <Text style={[styles.status, getStatusStyle(selectedComplaint.status)]}>
              {selectedComplaint.status}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.complaintLabel}>Complaint Type</Text>
      <Text style={styles.complaintText}>{selectedComplaint.complaintType}</Text>

      <Text style={styles.complaintLabel}>Description</Text>
      <Text style={styles.complaintText}>{selectedComplaint.complaintText}</Text>
    </>
  )}
</ScrollView>

        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>



    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: resW(4),
    marginVertical: resH(0.5),
    padding: resW(4),
    borderRadius: resW(2),
    backgroundColor: SilverColor,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  studentInfo: {
    fontSize: font15_5,
    fontWeight: 'bold',
    color: blackColor,
    width: resW(55),
  },
  dateText: {
    fontSize: font12,
    color: '#777',
  },
  complaintLabel: {
    fontSize: font16,
    marginTop: resH(1),
    color: blackColor,
    fontWeight: '700',
  },
  complaintText: {
    fontSize: constant.font13,
    color: blackColor,
    marginTop: resH(0.5),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightHeader: {
    alignItems: 'flex-end',
  },
  statusWrapper: {
    marginTop: resH(0.8),
    padding: resW(1),
  },
  status: {
    fontSize: font14,
    fontWeight: 'bold',
    paddingVertical: resH(0.8),
    paddingHorizontal: resW(3.5),
    borderRadius: resW(2),
    overflow: 'hidden',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
  width: '90%',
  maxHeight: '60%', // 👈 restrict modal height
  backgroundColor: 'white',
  borderRadius: resW(2),
  padding: resW(4),
  elevation: 5,
},
  closeButton: {
    marginTop: resH(2),
    backgroundColor: BattleshipGrey,
    paddingVertical: resH(1),
    alignItems: 'center',
    borderRadius: resW(2),
  },
  fabButton: {
  position: 'absolute',
  bottom: resH(8),   // distance from bottom
  right: resW(4),    // distance from right
  backgroundColor: SilverColor,
  width: resW(15),
  height: resW(15),
  borderRadius: resW(7.5), // make it circular
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:constant.Blue,
  // elevation: 5, // shadow for Android
  // shadowColor: '#000', // shadow for iOS
  // shadowOpacity: 0.3,
  // shadowOffset: { width: 0, height: 2 },
  // shadowRadius: 3,
  // borderColor:blackColor,
  // borderWidth:2
},
fabIcon: {
  width: resW(7),
  height: resW(7),
  tintColor: constant.whiteColor,
  resizeMode: 'contain',
},

});

export default StudentComplaint;
