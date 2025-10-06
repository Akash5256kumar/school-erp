import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommonHeader from '../../CommonHeader';
import {
  blackColor,
  whiteColor,
  SilverColor,
  font16,
  font14,
  resH,
  resW,
} from '../../../Utils/Constant';
import CommonButton from '../../Button/CommonButton';

const StaffViewHomeWork = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { homeWork } = route.params; // ✅ Received from previous screen

  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <CommonHeader
        title={'View Homework'}
        onLeftClick={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Homework Info Table --- */}
        <View style={styles.tableContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Publish:</Text>
            <Text style={styles.value}>{homeWork.Date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Subject:</Text>
            <Text style={styles.value}>{homeWork.subject}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Topic:</Text>
            <Text style={styles.value}>{homeWork.Topic}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.value}>{homeWork.class}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Section:</Text>
            <Text style={styles.value}>{homeWork.section}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>From Date:</Text>
            <Text style={styles.value}>{homeWork.fromDate}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>To Date:</Text>
            <Text style={styles.value}>{homeWork.toDate}</Text>
          </View>
        </View>

        {/* --- Button --- */}
        <CommonButton
          title="Edit"
          buttonClick={() => navigation.navigate('StaffEditHomeWork')}
        />
      </ScrollView>
    </View>
  );
};

export default StaffViewHomeWork;

const styles = StyleSheet.create({
  container: {
    padding: resW(4),
    paddingBottom: resH(6),
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: SilverColor,
    borderRadius: resW(3),
    backgroundColor: SilverColor,
    padding: resW(4),
    marginVertical: resH(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#ccc',
    paddingVertical: resH(1),
  },
  label: {
    fontSize: font16,
    fontWeight: '700',
    color: blackColor,
    width: '45%',
  },
  value: {
    fontSize: font14,
    color: blackColor,
    textAlign: 'right',
    width: '50%',
  },
});
