import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation ,useRoute} from '@react-navigation/native';
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
import LabelHeader from '../../labelHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomDropdown } from '../../CommonDropDown/CommonDropDownList';
import CustomInputField from '../../CommonInputField/CommonTextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../Button/CommonButton';
const classOptions = [
    { label: 'Class 9', value: 'class9' },
    { label: 'Class 10', value: 'class10' },
];
const sectionOptions = [
    { label: 'Section A', value: 'A' },
    { label: 'Section B', value: 'B' },
];
const DatePickerField = ({ date, setDate }) => {
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formattedDate = date ? date.toLocaleDateString() : 'Select Date';

    return (
        <View style={{ marginBottom: resH(1) }}>
            <View style={styles.dateInputContainer}>
                <Text style={[styles.dateText, !date && { color: blackColor }]}>{formattedDate}</Text>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={styles.dateButtonText}>▼</Text>
                </TouchableOpacity>
            </View>
            {showPicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};
const CommonRadioGroup = ({ label, options, selected, onSelect }) => {
    return (
        <View style={{ marginTop: resH(1) }}>
            <View style={styles.radioGroupContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.radioOption}
                        onPress={() => {
                            // Toggle selection: if already selected, deselect it
                            if (selected === option.value) {
                                onSelect(null); // or onSelect('') depending on your state
                            } else {
                                onSelect(option.value);
                            }
                        }}
                        activeOpacity={0.8}
                    >
                        <View style={styles.radioOuter}>
                            {selected === option.value && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.radioText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const StaffModuleAddSPR = () => {
    const [publishDate, setPublishDate] = useState(null);
    const [classVal, setClassVal] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [section, setSection] = useState(null);
    const [punctuality, setPunctuality] = useState('');
    const [uniform, setuniform] = useState('')
    const navigation = useNavigation();

    // Additional state for all fields
    const [homework, setHomework] = useState('');
    const [classwork, setClasswork] = useState('');
    const [classInteraction, setClassInteraction] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [performance, setPerformance] = useState('');
    const [performanceOverall, setPerformanceOverall] = useState('');
    const [strength, setStrength] = useState('');
    const [sports, setSports] = useState('');
    const [cultural, setCultural] = useState('');


    // Options for all fields
    const homeworkOptions = [
        { label: 'Always Complete', value: 'always_complete' },
        { label: 'Partially Complete', value: 'partially_complete' },
        { label: 'Complete', value: 'complete' },
        { label: 'Not Complete', value: 'not_complete' },
        { label: 'No Response', value: 'no_response' },
    ];

    const classworkOptions = [
        { label: 'Always Complete', value: 'always_complete' },
        { label: 'Average', value: 'average' },
        { label: 'Not Regular', value: 'not_regular' },
        { label: 'Non Attentive', value: 'non_attentive' },
    ];

    const classInteractionOptions = [
        { label: 'Regular, Attentive & Sincere', value: 'regular_attentive' },
        { label: 'Average', value: 'average' },
        { label: 'No Interaction', value: 'no_interaction' },
    ];

    const disciplineOptions = [
        { label: 'Disciplined & Obedient', value: 'disciplined_obedient' },
        { label: 'Good', value: 'good' },
        { label: 'Average', value: 'average' },
        { label: 'Needs to Improve', value: 'needs_to_improve' },
    ];

    const performanceOptions = [
        { label: 'Overall Good/Academically', value: 'good_academic' },
        { label: 'Average', value: 'average' },
        { label: 'Needs to Work Hard', value: 'needs_work_hard' },
    ];

    const performanceOverallOptions = [
        { label: 'Overall Good Academically/Otherwise', value: 'good_academic_otherwise' },
        { label: 'Average', value: 'average' },
        { label: 'Needs to Work Hard', value: 'needs_work_hard' },
    ];

    const strengthOptions = [
        { label: 'Intellectually Balanced & Socialized', value: 'balanced_socialized' },
        { label: 'Regular and Punctual', value: 'regular_punctual' },
        { label: 'Attentive in Class', value: 'attentive_class' },
        { label: 'Follows Instructions', value: 'follows_instructions' },
    ];
    const subjectsInitial = [
        { subject: 'English', status: '', remarks: '' },
        { subject: 'Hindi', status: '', remarks: '' },
        { subject: 'Science', status: '', remarks: '' },
        { subject: 'Social Science', status: '', remarks: '' },
        { subject: 'Computer', status: '', remarks: '' },
        { subject: 'Sanskrit', status: '', remarks: '' },
        { subject: 'French', status: '', remarks: '' },
        { subject: 'Maths', status: '', remarks: '' },
    ];

    const [subjects, setSubjects] = useState(subjectsInitial);

    const handleSubjectChange = (index, field, value) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index][field] = value;
        setSubjects(updatedSubjects);
    };

    const toggleDropdown = (key) => {
        setOpenDropdown((prev) => (prev === key ? null : key));
    };
        const route = useRoute();
    const isEdit = route.params?.isEdit || false;
    return (
        <View style={{ flex: 1, backgroundColor: whiteColor }}>
            <CommonHeader
                  title={isEdit ? "Edit SPR" : "Add SPR"}  
                backgroundColor={Blue}
                textColor={whiteColor}
                IconColor={whiteColor}
                onLeftClick={() => {
                    navigation.goBack();
                }} />
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: resH(5) }}
                enableOnAndroid={true}
                keyboardOpeningTime={0}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.Container}>
                    <LabelHeader label={"Select Date"} textstyle={{ marginTop: resW(2) }} />

                    <View style={{ marginTop: resW(2) }}>
                        <DatePickerField
                            date={publishDate}
                            setDate={setPublishDate}
                        />
                    </View>
                    <LabelHeader label={"Class"} textstyle={{ marginTop: resW(2) }} />
                    <CustomDropdown
                        data={classOptions}
                        selected={classVal}
                        onSelect={setClassVal}
                        placeholder="Select Class"
                        isOpen={openDropdown === 'class'}
                        toggleOpen={() => toggleDropdown('class')}
                    />
                    <LabelHeader label={"Section"} textstyle={{ marginTop: resW(4) }} />
                    <CustomDropdown
                        data={sectionOptions}
                        selected={section}
                        onSelect={setSection}
                        placeholder="Select Section"
                        isOpen={openDropdown === 'section'}
                        toggleOpen={() => toggleDropdown('section')}
                    />
                    <LabelHeader label={"Admission No"} textstyle={{ marginTop: resW(4) }} />
                    <CustomInputField inputStyle={styles.inputStyle} />
                    <LabelHeader label={"Class Teacher"} textstyle={{ marginTop: resW(2) }} />
                    <CustomInputField inputStyle={styles.inputStyle} />
                    <LabelHeader label={"Contact No"} textstyle={{ marginTop: resW(2) }} />
                    <CustomInputField inputStyle={styles.inputStyle} />
                    <LabelHeader label={"Student Name"} textstyle={{ marginTop: resW(2) }} />
                    <CustomInputField inputStyle={styles.inputStyle} />
                    <LabelHeader label={"Punctuality And Regularity"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup

                        options={[
                            { label: 'Very Regular and Punctual', value: 'very_regular' },
                            { label: 'Good', value: 'good' },
                            { label: 'Average', value: 'average' },
                            { label: 'Below Average', value: 'below_average' },
                        ]}
                        selected={punctuality}
                        onSelect={setPunctuality}
                    />
                    <LabelHeader label={"Uniform"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup

                        options={[
                            { label: 'Well Dressed', value: 'Well Dressed' },
                            { label: 'Good', value: 'good' },
                            { label: 'Untidy', value: 'Untidy' },
                            { label: 'Not Wearing Uniform ', value: 'below_average' },
                        ]}
                        selected={uniform}
                        onSelect={setuniform}
                    />
                    <LabelHeader label={"Homework"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup
                        options={homeworkOptions}
                        selected={homework}
                        onSelect={setHomework}
                    />

                    <LabelHeader label={"Classwork"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup
                        options={classworkOptions}
                        selected={classwork}
                        onSelect={setClasswork}
                    />

                    <LabelHeader label={"Class Interaction"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup
                        options={classInteractionOptions}
                        selected={classInteraction}
                        onSelect={setClassInteraction}
                    />

                    <LabelHeader label={"Discipline"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup
                        options={disciplineOptions}
                        selected={discipline}
                        onSelect={setDiscipline}
                    />

                    <LabelHeader label={"Performance"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <LabelHeader label={"Academics"} textstyle={{ marginTop: resW(2), color: constant.grayColor }} />
                    <CommonRadioGroup
                        options={performanceOptions}
                        selected={performance}
                        onSelect={setPerformance}
                    />
                    <LabelHeader label={"Sports"} textstyle={{ marginTop: resW(2), color: constant.grayColor }} />
                    <CommonRadioGroup
                        options={performanceOptions}
                        selected={sports}
                        onSelect={setSports}
                    />
                    <LabelHeader label={"Cultural"} textstyle={{ marginTop: resW(2), color: constant.grayColor }} />

                    <CommonRadioGroup
                        options={performanceOptions}
                        selected={cultural}
                        onSelect={setCultural}
                    />

                    {/* <LabelHeader label={"Overall Performance"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup
                        options={performanceOverallOptions}
                        selected={performanceOverall}
                        onSelect={setPerformanceOverall}
                    /> */}

                    <LabelHeader label={"Strength"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <CommonRadioGroup
                        options={strengthOptions}
                        selected={strength}
                        onSelect={setStrength}
                    />

                    <LabelHeader label={"Subjects"} textstyle={{ marginTop: resW(2), fontSize: constant.font18 }} />
                    <View style={{ marginTop: resW(2), backgroundColor: whiteColor, borderRadius: 7, borderWidth: 1, borderColor: SilverColor }}>
                        {/* Table Header */}
                        <View style={{ flexDirection: 'row', backgroundColor: Blue, paddingVertical: resH(1), }}>
                            <Text style={[styles.tableHeader, { flex: 1, color: whiteColor, textAlign: 'center' }]}>Sr. No</Text>
                            <Text style={[styles.tableHeader, { flex: 2, color: whiteColor, textAlign: 'center' }]}>Subject</Text>
                            <Text style={[styles.tableHeader, { flex: 2, color: whiteColor, textAlign: 'center' }]}>Status</Text>
                            <Text style={[styles.tableHeader, { flex: 2, color: whiteColor, textAlign: 'center' }]}>Remarks</Text>
                        </View>
                        {/* Table Rows */}
                        {subjects.map((row, i) => (
                            <View key={i} style={{
                                flexDirection: 'row',
                                //   borderBottomWidth: 1,
                                //   borderColor: SilverColor,
                                minHeight: resH(5),
                                alignItems: 'center',
                                backgroundColor: i % 2 === 0 ? whiteColor : '#F8F8F8',
                            }}>
                                {/* Serial Number */}
                                <Text style={{ flex: 1, color: blackColor, fontSize: font14, textAlign: 'center', paddingVertical: resH(1) }}>{i + 1}</Text>
                                {/* Subject Name */}
                                <Text style={{ flex: 2, color: blackColor, fontSize: font14, textAlign: 'center', paddingVertical: resH(1) }}>{row.subject}</Text>
                                {/* Status Input */}
                                <View style={{ flex: 2, paddingHorizontal: resW(1) }}>
                                    <CustomInputField
                                        inputStyle={[styles.tableInput, {}]}
                                        value={row.status}
                                        onChangeText={text => handleSubjectChange(i, 'status', text)}
                                        placeholder="Enter text"
                                    />
                                </View>
                                {/* Remarks Input */}
                                <View style={{ flex: 2, paddingHorizontal: resW(1) }}>
                                    <CustomInputField
                                        inputStyle={[styles.tableInput, {}]}
                                        value={row.remarks}
                                        onChangeText={text => handleSubjectChange(i, 'remarks', text)}
                                        placeholder="Enter remarks"
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: resH(2), marginBottom: resH(2) }}>
                        <View style={{ flex: 1, marginRight: resW(2) }}>
                            <LabelHeader label={"Areas of Concern"} />
                            <CustomInputField
                                inputStyle={[styles.inputStyle, { height: resH(12), textAlignVertical: 'top', }]}
                                multiline
                                placeholder="Enter areas of concern"
                            // value, onChangeText as needed
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <LabelHeader label={"Wardens Comment"} />
                            <CustomInputField
                                inputStyle={[styles.inputStyle, { height: resH(12), textAlignVertical: 'top' }]}
                                multiline
                                placeholder="Enter comment"
                            // value, onChangeText as needed
                            />
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", gap: resW(3) }}>
                        <Pressable onPress={() => console.log("hii")} style={styles.button}>
                            <Text style={[styles.buttonText]}>
                                Save
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => console.log("hii")} style={[styles.button, { backgroundColor: Blue }]}>
                            <Text style={styles.buttonText}>
                                Reset
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default StaffModuleAddSPR

const styles = StyleSheet.create({
    Container: {
        marginHorizontal: resW(5),
        marginTop: resH(1)
    },
    //     tableHeader: {
    //   color: Blue,
    //   fontWeight: 'bold',
    //   fontSize: font14,
    //   textAlign: 'left',
    // },
    tableInput: {
        height: resH(5.5),
        fontSize: constant.font12,
        // paddingHorizontal: resW(1),
    },
    tableHeader: {
        color: Blue,
        fontWeight: 'bold',
        fontSize: font14,
        textAlign: 'left',
    },
    button: {
        width: resW(35),
        height: resH(6),
        backgroundColor: "#FFC30B",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: resW(2)
    },
    buttonText: {
        fontSize: font14,
        color: whiteColor,
        fontFamily: constant.typeExtraBold
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.1,
        borderColor: blackColor,
        borderRadius: resH(0.3),
        overflow: 'hidden',
        height: resH(5.5),
    },
    inputStyle: {
        height: resH(5.5),
        color: blackColor,
    },
    dateText: {
        flex: 1,
        paddingHorizontal: resW(2),
        color: blackColor,
        fontSize: constant.font15
    },
    dateButton: {
        paddingHorizontal: resW(3),
        justifyContent: 'center',
        alignItems: 'center',
        height: resH(5.5),
    },
    dateButtonText: {
        color: blackColor,
        fontSize: constant.font15,
    },
    radioLabel: {
        fontSize: font15_5,
        color: blackColor,
        fontWeight: '600',
        marginBottom: resH(0.8),
    },
    radioGroupContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '42%',
        marginBottom: resH(1),
    },
    radioOuter: {
        width: resW(5),
        height: resW(5),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: blackColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: resW(2),
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Blue,
    },
    radioText: {
        color: blackColor,
        fontSize: font14,
    },

})