import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../CommonHeader';
import {
  blackColor,
  font12,
  font14,
  font15_5,
  font16,
  resH,
  resW,
  SilverColor,
  whiteColor,
  Blue
} from '../../../Utils/Constant';
import * as constant from '../../../Utils/Constant';

const dummyData = [
  {
    id: '1',
    Date: "2/09/2025",
    subject: 'Mathematics',
    class: '10',
    Topic: "Algebra Basics",
    section: 'A',
    fromDate: '01 Oct 2025',
    toDate: '15 Oct 2025',
  },
  {
    id: '2',
    Date: "2/09/2025",
    subject: 'Science',
    class: '9',
    Topic: "Motion",
    section: 'B',
    fromDate: '05 Oct 2025',
    toDate: '20 Oct 2025',
  },
  {
    id: '3',
    Date: "2/09/2025",
    subject: 'English',
    class: '8',
    Topic: "Poetry Analysis",
    section: 'C',
    fromDate: '10 Oct 2025',
    toDate: '25 Oct 2025',
  },
  {
    id: '4',
    Date: "2/09/2025",
    subject: 'History',
    class: '7',
    Topic: "Ancient Civilizations",
    section: 'A',
    fromDate: '02 Oct 2025',
    toDate: '17 Oct 2025',
  },
  {
    id: '5',
    Date: "2/09/2025",
    subject: 'Geography',
    class: '6',
    Topic: "World Maps",
    section: 'D',
    fromDate: '03 Oct 2025',
    toDate: '18 Oct 2025',
  },
];


const StaffModuleMultiMedia = () => {
  const navigation = useNavigation();

 const renderItem = ({ item }) => (
<TouchableOpacity
  style={styles.card}
  onPress={() =>navigation.navigate('StaffViewMultiMedia', { MultiMediaView: item })
}>
    <Text style={[styles.studentInfo,{textAlign:"right",fontSize:font12,color:constant.grayColor}]}>
      {item.Date}
    </Text>
    <Text style={styles.studentInfo}>
    Subject {item.subject},Topic {item.Topic}, Class {item.class}, Section {item.section}
    </Text>

    {/* Row for Date + Buttons */}
    <View style={styles.rowBetween}>
      <View>
        <Text style={styles.complaintLabel}>Date of Publish</Text>
        <Text style={styles.dateText}>
          {item.fromDate} 
        </Text>
      </View>

      <View style={styles.rightHeader}>
        {/* Published button */}
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: constant.BattleshipGrey }]}
        >
          <Text style={styles.statusText}>Play</Text>
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: constant.BattleshipGrey }]}
        >
          <Text style={styles.statusText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);


  return (
    <LinearGradient colors={[whiteColor, whiteColor]} style={{ flex: 1 }}>
      <CommonHeader
        title={'MultiMedia'}
                       backgroundColor={Blue}
                textColor={whiteColor}
                IconColor={whiteColor}
        onLeftClick={() => navigation.goBack()}
      />

      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: resH(18) ,marginTop:resH(1)}}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fabButton} onPress={()=>navigation.navigate("StaffAddMultiMedia")}>
        <Image source={constant.Icons.AddIcon} style={styles.fabIcon} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default StaffModuleMultiMedia;

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
    width: resH(55),
  },
  dateText: {
    fontSize: font12,
    color: constant.grayColor,
  },
  complaintLabel: {
    fontSize: font16,
    marginTop: resH(1),
    color: blackColor,
    fontWeight: '700',
  },
rowBetween: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: resH(1),
},
rightHeader: {
  flexDirection: 'row',
  alignItems: 'center',
},
statusButton: {
  borderRadius: resW(2),
  paddingVertical: resH(0.8),
  paddingHorizontal: resW(3),
  marginLeft: resW(2),
},

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // allows wrapping on smaller screens
  },

  studentInfo: {
    fontSize: font15_5,
    fontWeight: 'bold',
    color: blackColor,
    flex: 1, // allow flexible width
    flexWrap: 'wrap', // text wraps instead of forcing layout to break
    marginRight: resW(2),
  },

  statusButton: {
    borderRadius: resW(2),
    paddingVertical: resH(0.8),
    paddingHorizontal: resW(3),
    marginLeft: resW(2),    // 👈 space between buttons
  },

  statusText: {
    fontSize: font12,
    fontWeight: 'bold',
    color: blackColor,         // 👈 white text on colored button
    textAlign: 'center',
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
});
