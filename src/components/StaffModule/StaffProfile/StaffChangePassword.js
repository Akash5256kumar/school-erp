import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import CommonHeader from '../../CommonHeader';
import { Blue, whiteColor } from '../../../Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as constant from '../../../Utils/Constant';
import CustomInputField from '../../CommonInputField/CommonTextField';
import LabelHeader from '../../labelHeader';
import CommonButton from '../../Button/CommonButton';

const StaffChangePassword = () => {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('Please fill all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
        // TODO: call API to update password
        alert('Password updated successfully');
    };

    return (
        <View style={{ flex: 1, backgroundColor: whiteColor }}>
            <CommonHeader
                title="Change Password"
                backgroundColor={Blue}
                textColor={whiteColor}
                IconColor={whiteColor}
                onLeftClick={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingBottom: constant.resH(5),
                    paddingTop: constant.resH(2),
                    paddingHorizontal: constant.resW(5),
                }}
                enableOnAndroid={true}
                keyboardOpeningTime={0}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={constant.resH(10)}
            >
                <LabelHeader label="Old Password" textstyle={{ marginTop: constant.resH(2) }} />
                <CustomInputField
                    // value={currentPassword}
                    // onChangeText={setCurrentPassword}
                    secureTextEntry={true}
                    inputStyle={{ height: constant.resH(6) }}
                />

                <LabelHeader label="New Password" textstyle={{ marginTop: constant.resH(2) }} />
                <CustomInputField
                    // value={newPassword}
                    // onChangeText={setNewPassword}
                    secureTextEntry={true}
                    inputStyle={{ height: constant.resH(6) }}
                />

                <LabelHeader label="Confirm Password" textstyle={{ marginTop: constant.resH(2) }} />
                <CustomInputField
                    // value={confirmPassword}
                    // onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                    inputStyle={{ height: constant.resH(6) }}
                />

                <View style={{ marginTop: constant.resH(4) }}>
                    <CommonButton title="Update Password" buttonClick={handleUpdatePassword} />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default StaffChangePassword;

const styles = StyleSheet.create({});
