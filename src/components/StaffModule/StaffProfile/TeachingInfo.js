import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import CommonHeader from '../../CommonHeader';
import { Blue, whiteColor, SilverColor, resH, resW, BattleshipGrey, font16, blackColor, font15, font14 } from '../../../Utils/Constant';
import { useNavigation } from '@react-navigation/native';

const TeachingInfo = () => {
  const navigation = useNavigation();
  const teachingData = [
    { id: '1', class: '10', section: 'A', subject: 'Mathematics', teacher: 'Riya Sharma' },
    { id: '2', class: '9', section: 'B', subject: 'Science', teacher: 'Ankit Kumar' },
    { id: '3', class: '8', section: 'C', subject: 'English', teacher: 'Neha Singh' },
  ];
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Class</Text>
        <Text style={styles.value}>{item.class}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Section</Text>
        <Text style={styles.value}>{item.section}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Subject</Text>
        <Text style={styles.value}>{item.subject}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Teacher Name</Text>
        <Text style={styles.value}>{item.teacher}</Text>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <CommonHeader
        title="Teaching Information"
        backgroundColor={Blue}
        textColor={whiteColor}
        IconColor={whiteColor}
        onLeftClick={() => navigation.goBack()}
      />

      <FlatList
        data={teachingData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingHorizontal: resW(5), paddingVertical: resH(2), marginTop: resH(2) }}
        ItemSeparatorComponent={() => <View style={{ height: resH(1.3) }} />}
      />
    </View>
  );
};

export default TeachingInfo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: SilverColor,
    borderRadius: 8,
    paddingHorizontal: resW(3),
    paddingVertical:resW(1),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(0.4),
    // borderBottomWidth: 0.5,
    // borderBottomColor: BattleshipGrey,
  },
  label: {
    fontSize: font14,
    color: blackColor,
    fontWeight: '600',
  },
  value: {
    fontSize: font14,
    color: blackColor,
  },
});
