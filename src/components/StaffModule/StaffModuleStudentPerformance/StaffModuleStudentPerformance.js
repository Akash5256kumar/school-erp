import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../CommonHeader';
import { whiteColor, Blue, blackColor, resH, resW, font14, font18, font16 } from '../../../Utils/Constant';
import * as constant from '../../../Utils/Constant';

const StaffModuleStudentPerformance = () => {
  const navigation = useNavigation();

  // State to manage modal visibility
  const [isModalVisible, setModalVisible] = useState(false);

  // Student data with published/unpublished state
  const StudentData = [
    { id: 1, name: 'Aayat', Class: '10', Section: 'A', TeacherName: 'Riya Sharma', Date: '2/2/25', status: 'published' },
    { id: 2, name: 'Samar', Class: '9', Section: 'B', TeacherName: 'Vikas Singh', Date: '3/2/25', status: 'published' },
    { id: 3, name: 'Diya', Class: '8', Section: 'C', TeacherName: 'Neha Verma', Date: '1/2/25', status: 'published' },
    { id: 4, name: 'Rohit', Class: '7', Section: 'A', TeacherName: 'Amit Kumar', Date: '5/2/25', status: 'unpublished' },
    { id: 5, name: 'Meera', Class: '6', Section: 'B', TeacherName: 'Pooja Singh', Date: '6/2/25', status: 'unpublished' },
    { id: 6, name: 'Karan', Class: '5', Section: 'C', TeacherName: 'Anil Mehta', Date: '7/2/25', status: 'unpublished' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.studentName}>Student Name: {item.name}</Text>
          <Text style={styles.detailText}>
            Class: {item.Class}, Section: {item.Section}
          </Text>
          <Text style={[styles.detailText, { marginTop: resH(0.5) }]}>
            Class Teacher: {item.TeacherName}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.latestSpr}>{item.Date}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: resW(2) }}>
        {item.status === 'unpublished' ? (
          <>
            <TouchableOpacity
              style={[styles.button, {  }]}
              onPress={() => navigation.navigate('StaffModuleAddSPR',{ isEdit: true })}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, ]}
            >
              <Text style={styles.buttonText}>Unpublished</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, ]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, ]}
            >
              <Text style={styles.buttonText}>Published</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={[whiteColor, whiteColor]} style={{ flex: 1 }}>
      <CommonHeader
        title={'Student Performance'}
        backgroundColor={Blue}
        textColor={whiteColor}
        IconColor={whiteColor}
        onLeftClick={() => navigation.goBack()}
        imageSource={constant.Icons.Filter}
        onPressData={() => setModalVisible(true)}
      />

      <FlatList
        data={StudentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: resW(4), paddingBottom: resH(2) }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('StaffModuleAddSPR')}>
        <Image source={constant.Icons.AddIcon} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Right side Filter Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.filterOption} onPress={() => setModalVisible(false)}>
              <Text style={styles.filterText}>Class</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption} onPress={() => setModalVisible(false)}>
              <Text style={styles.filterText}>Section</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: constant.SilverColor,
    borderRadius: resH(1),
    padding: resW(3.5),
    marginBottom: resH(1.3),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    borderWidth: 0.4,
    borderColor: '#ddd',
  },
  studentName: {
    fontSize: font16,
    color: constant.blackColor,
    fontFamily: constant.typeMedium
  },
  detailText: {
    fontSize: font16,
    color: constant.blackColor,
    fontFamily: constant.typeMedium
  },
  latestSpr: {
    fontSize: font16,
    fontFamily: constant.typeBold,
    color: blackColor,
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: resH(1.5),
    paddingVertical: resH(1),
    paddingHorizontal: resW(5),
    borderRadius: resH(0.8),
    backgroundColor:constant.BattleshipGrey
  },
  buttonText: {
    color: blackColor,
    fontWeight: '600',
    fontSize: font14
  },
  fabButton: {
    position: 'absolute',
    bottom: resH(8),
    right: resW(4),
    backgroundColor: Blue,
    width: resW(15),
    height: resW(15),
    borderRadius: resW(7.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    width: resW(7),
    height: resW(7),
    tintColor: whiteColor,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: whiteColor,
    padding: resW(2.5),
    borderRadius: resH(1),
    width: '40%',
    marginRight: resW(14),
    marginTop: resH(3),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  filterOption: {
    paddingVertical: resH(1),
  },
  filterText: {
    fontSize: font16,
    color: blackColor,
    fontFamily: constant.typeMedium
  },
});

export default StaffModuleStudentPerformance;
