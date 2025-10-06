import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CommonHeader from '../../CommonHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommonButton from '../../Button/CommonButton';
import { resH, resW, font14, font16, blackColor, SilverColor, whiteColor } from '../../../Utils/Constant';

const ViewStaffFornightlyPlanner = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { planner } = route.params; // receive passed item

    return (
        <>
            <View style={{backgroundColor:whiteColor}}>
                <CommonHeader
                    title={'View Planner'}
                    onLeftClick={() => navigation.goBack()} />
            </View>
            <View style={{ flex: 1, backgroundColor: whiteColor, padding: resW(4) }}>


                <View style={styles.tableContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Subject:</Text>
                        <Text style={styles.value}>{planner.subject}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Class:</Text>
                        <Text style={styles.value}>{planner.class}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Section:</Text>
                        <Text style={styles.value}>{planner.section}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>From Date:</Text>
                        <Text style={styles.value}>{planner.fromDate}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>To Date:</Text>
                        <Text style={styles.value}>{planner.toDate}</Text>
                    </View>
                </View>

              <CommonButton title="Edit" 
  buttonClick={()=>navigation.navigate('StaffEditFornightlyPlanner')}/>
            </View></>
    );
};

export default ViewStaffFornightlyPlanner;

const styles = StyleSheet.create({
    tableContainer: {
        marginVertical: resH(2),
        padding: resW(2),
        backgroundColor: SilverColor,
        borderRadius: resW(2),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: resH(1),
    },
    label: {
        fontSize: font16,
        fontWeight: '700',
        color: blackColor,
    },
    value: {
        fontSize: font14,
        color: blackColor,
    },
});
