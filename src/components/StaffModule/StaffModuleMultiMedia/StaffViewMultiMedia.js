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
  Blue
} from '../../../Utils/Constant';
import CommonButton from '../../Button/CommonButton';

const StaffViewMultiMedia = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { MultiMediaView } = route.params; 

  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      {/* Header */}
      <CommonHeader
                     backgroundColor={Blue}
                textColor={whiteColor}
                IconColor={whiteColor}
        title={'Multimedia'}
        onLeftClick={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{MultiMediaView.Date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Subject:</Text>
            <Text style={styles.value}>{MultiMediaView.subject}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Topic:</Text>
            <Text style={styles.value}>{MultiMediaView.Topic}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.value}>{MultiMediaView.class}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Section:</Text>
            <Text style={styles.value}>{MultiMediaView.section}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}> From Date:</Text>
            <Text style={styles.value}>{MultiMediaView.fromDate}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>To Date:</Text>
            <Text style={styles.value}>{MultiMediaView.toDate}</Text>
          </View>
        </View>

        {/* --- Play or Edit Button --- */}
        <CommonButton
          title="Edit"
          buttonClick={() => navigation.navigate('StaffEditMultiMedia')}
        />
      </ScrollView>
    </View>
  );
};

export default StaffViewMultiMedia;

const styles = StyleSheet.create({
  container: {
    padding: resW(4),
    paddingBottom: resH(6),
  },
  card: {
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
