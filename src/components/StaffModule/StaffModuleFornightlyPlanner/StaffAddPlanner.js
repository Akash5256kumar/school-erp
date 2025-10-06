import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import CommonHeader from '../../CommonHeader';
import { useNavigation } from '@react-navigation/native';
import LabelHeader from '../../labelHeader';
import { blackColor, resH, resW, whiteColor, font15 } from '../../../Utils/Constant';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInputField from '../../CommonInputField/CommonTextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../Button/CommonButton';

// --- Custom Date Picker Field ---
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
        <View style={{ marginBottom: resH(2) }}>
            <View style={styles.dateInputContainer}>
                <Text style={[styles.dateText, !date && { color: blackColor }]}>{formattedDate}</Text>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={styles.dateButtonText}>Date Picker</Text>
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

// --- Main Component ---
const StaffAddPlanner = () => {
    const navigation = useNavigation();
    const [publishDate, setPublishDate] = useState(null);

    return (
        <View style={{ flex: 1, backgroundColor: whiteColor }}>
            <CommonHeader
                title={"Add Planner"}
                onLeftClick={() => navigation.goBack()}
            />

            {/* Keyboard Avoiding View */}
          
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingHorizontal: resW(4), paddingBottom: resH(5) }}
                    enableOnAndroid={true}
                    keyboardOpeningTime={0}
                    keyboardShouldPersistTaps="handled"
                >
                    <LabelHeader label={"Date of Publish"} />
                    <View style={{ marginTop: resH(1) }} />
                    <DatePickerField
                        date={publishDate}
                        setDate={setPublishDate}
                    />

                    <LabelHeader label={"Class"} />
                    <CustomInputField inputStyle={styles.inputStyle} />

                    <LabelHeader label={"Section"} />
                    <CustomInputField inputStyle={styles.inputStyle} />

                    <LabelHeader label={"Subject"} />
                    <CustomInputField inputStyle={styles.inputStyle} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: resH(1) }}>
                        <View style={{ flex: 1, marginRight: resW(2) }}>
                            <LabelHeader label={"To Date"} />
                            <CustomInputField inputStyle={[styles.inputStyle, { width: resW(40) }]} />
                        </View>

                        <View style={{ flex: 1, marginLeft: resW(2) }}>
                            <LabelHeader label={"From Date"} />
                            <CustomInputField inputStyle={[styles.inputStyle, { width: resW(40) }]} />
                        </View>
                    </View>
                    <View style={{marginTop:resH(5)}}/>
                    <LabelHeader label={"Add file +"} />
                </KeyboardAwareScrollView>

                {/* Fixed button at bottom or above keyboard */}
                <View style={styles.fixedButton}>
                    <CommonButton title="Add" />
                </View>
         
        </View>
    );
};

export default StaffAddPlanner;

const styles = StyleSheet.create({
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
        color:blackColor,
    },
    dateText: {
        flex: 1,
        paddingHorizontal: resW(2),
        color: blackColor,
        fontSize: font15
    },
    dateButton: {
        paddingHorizontal: resW(3),
        justifyContent: 'center',
        alignItems: 'center',
        height: resH(5.5),
    },
    dateButtonText: {
        color: blackColor,
        fontSize: font15,
    },
    fixedButton: {
        // bottom: resH(1.5),
        // left: resW(4),
        // right: resW(4),
    },
});
