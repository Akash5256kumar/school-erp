import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommonHeader from '../../CommonHeader';
import CommonButton from '../../Button/CommonButton';
import {
  blackColor,
  whiteColor,
  font16,
  font14,
  SilverColor,
  resH,
  resW,
} from '../../../Utils/Constant';

const StaffViewNotes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params; // ✅ Receive passed note item

  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <CommonHeader
        title={'View Notes'}
        onLeftClick={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Table-like structure --- */}
        <View style={styles.tableContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Publish:</Text>
            <Text style={styles.value}>{note.Date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Subject:</Text>
            <Text style={styles.value}>{note.subject}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Topic:</Text>
            <Text style={styles.value}>{note.Topic}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.value}>{note.class}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Section:</Text>
            <Text style={styles.value}>{note.section}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>From Date:</Text>
            <Text style={styles.value}>{note.fromDate}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>To Date:</Text>
            <Text style={styles.value}>{note.toDate}</Text>
          </View>
        </View>

        {/* --- Edit Button --- */}
        <CommonButton
          title={'Edit'}
          buttonClick={() => 
            navigation.navigate('StaffEditNotes')
          }
        />
      </ScrollView>
    </View>
  );
};

export default StaffViewNotes;

const styles = StyleSheet.create({
  container: {
    padding: resW(4),
    paddingBottom: resH(6),
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: SilverColor,
    borderRadius: resW(2),
    backgroundColor: SilverColor,
    padding: resW(3),
    marginVertical: resH(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  
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
