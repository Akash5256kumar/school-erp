import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { blackColor, resH, resW, whiteColor } from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import { useNavigation } from '@react-navigation/native';
import CustomInputField from '../../CommonInputField/CommonTextField';
import LabelHeader from '../../labelHeader';
import SelectDropList from '../../SelectDropList';
import { CustomDropdown } from '../../CommonDropDown/CommonDropDownList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../Button/CommonButton';
const AddComplaint = () => {
    const navigation = useNavigation();
    const [admissionNo, setAdmissionNo] = useState('');
    const [selected, setSelected] = useState(null);
   const complaintTypes = [
  { label: "Academic Issues", value: "academic_issues" },
  { label: "Hostel Facilities", value: "hostel_facilities" },
  { label: "Library Facilities", value: "library_facilities" },
  { label: "Transport", value: "transport" },
  { label: "Food Services", value: "food_services" },
  { label: "Teaching Quality", value: "teaching_quality" },
  { label: "Campus Safety", value: "campus_safety" },
  { label: "Other", value: "other" },
];

    return (
        <View style={{ flex: 1, backgroundColor: whiteColor }}>
            <CommonHeader
                title="Add Complaint"
                onLeftClick={() => navigation.goBack()}
            />

            <KeyboardAwareScrollView
                contentContainerStyle={styles.wrapper}
                enableOnAndroid={true}
                keyboardOpeningTime={0}
                extraScrollHeight={resH(3)} // adjusts scroll height, tweak as needed
                keyboardShouldPersistTaps="handled"
            >
                <LabelHeader label={"Admission no."} />
                <CustomInputField
                    label="Admission No"
                    placeholder="Enter Admission No"
                    value={admissionNo}
                    onChangeText={setAdmissionNo}
                    inputStyle={styles.inputStyle}
                />
                <LabelHeader label={"Student Name"} />
                <CustomInputField
                    label="Admission No"
                    placeholder="Enter Student Name"
                    //   value={admissionNo}
                    //   onChangeText={setAdmissionNo}
                    inputStyle={styles.inputStyle}
                />
                <LabelHeader label={"Class"} />
                <CustomInputField
                    label="Admission No"
                    placeholder="Enter Class Name"
                    //   value={admissionNo}
                    //   onChangeText={setAdmissionNo}
                    inputStyle={styles.inputStyle}
                />
                <LabelHeader label={"Section"} />
                <CustomInputField
                    label="Admission No"
                    placeholder="Enter Section"
                    //   value={admissionNo}
                    //   onChangeText={setAdmissionNo}
                    inputStyle={styles.inputStyle}
                />
                <LabelHeader label={"Complaint Type"} />
                <CustomDropdown
                    data={complaintTypes}
                    selected={selected}
                    onSelect={setSelected}
                    placeholder='Select Complaint type' />
                <View style={{ marginTop: resH(1) }} />
                <LabelHeader label={"Complaint"} />
                <CustomInputField
                    multiline
                    placeholder="Enter Complaint"
                    //   value={admissionNo}
                    //   onChangeText={setAdmissionNo}
                    inputStyle={[styles.inputStyle, { height: resH(20), textAlignVertical: "top" }]}
                />


            </KeyboardAwareScrollView>
            <View style={styles.fixedButton}>
                    <CommonButton title="Add"
                    buttonClick={()=>console.log("hhhhh")} />
                </View>
        </View>
    );
};

export default AddComplaint;

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: resW(4),
        marginTop: resH(2),
    },
    inputStyle: {
        height: resH(5.5),
        color: blackColor,
        // backgroundColor:"green"
    },
     fixedButton: {
        // bottom: resH(1.5),
        // left: resW(4),
        // right: resW(4),
    },
});





