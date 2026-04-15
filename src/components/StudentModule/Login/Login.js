import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import DeviceInfo from "react-native-device-info";
import { ChevronLeft } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import Snackbar from "react-native-snackbar";
import { useDispatch } from "react-redux";

import { loginStudent } from "../../../api";
import AppInput from "../../../components/common/AppInput";
import { colors, STRINGS } from "../../../constants";
import { saveUserData } from "../../../store/slices/userSlice";
import { persistStudentSession, storage } from "../../../Utils/storage";
import getErrorMessage from "../../../Utils/errorMessages";
import CommonButton from "../../../components/Button/CommonButton";
import authLayoutStyles from "../../../components/common/authLayoutStyles";
import * as constant from "../../../Utils/Constant";

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

const showMessage = (message) => {
  Snackbar.show({
    backgroundColor: colors.danger,
    duration: Snackbar.LENGTH_SHORT,
    text: message,
  });
};

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDob] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [admissionNo, setAdmissionNo] = useState("");
  const [hideAdmissionNo, setHideAdmissionNo] = useState(false);
  const submissionLockedRef = useRef(false);
  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: "",
    deviceType: "",
    deviceVersion: "",
    token: "",
  });

  useEffect(() => {
    const backSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );

    return () => backSubscription.remove();
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchDeviceInfo = async () => {
      try {
        const [token, deviceName, deviceType, deviceVersion] =
          await Promise.all([
            storage.getString("PLAYER_ID"),
            Promise.resolve(DeviceInfo.getSystemName()),
            Promise.resolve(DeviceInfo.getModel()),
            Promise.resolve(DeviceInfo.getSystemVersion()),
          ]);

        if (!mounted) {
          return;
        }

        setDeviceInfo({
          deviceName: deviceName || "",
          deviceType: deviceType || "",
          deviceVersion: deviceVersion || "",
          token: token || "",
        });
      } catch (error) {
        if (!mounted) {
          return;
        }

        setDeviceInfo({
          deviceName: "",
          deviceType: "",
          deviceVersion: "",
          token: "",
        });
      }
    };

    fetchDeviceInfo();

    return () => {
      mounted = false;
    };
  }, []);

  const formattedDob = useMemo(
    () => (dob ? moment(dob).format("DD-MM-YYYY") : ""),
    [dob]
  );

  const onDateConfirm = useCallback((selectedDate) => {
    setIsDatePickerOpen(false);
    setDob(selectedDate);
  }, []);

  const handleLogin = useCallback(async () => {
    if (submissionLockedRef.current) {
      return;
    }

    if (!admissionNo.trim()) {
      showMessage(STRINGS.auth.missingAdmissionNumber);
      return;
    }

    if (!dob) {
      showMessage(STRINGS.auth.missingDob);
      return;
    }

    submissionLockedRef.current = true;
    setIsLoading(true);

    try {
      const response = await loginStudent({
        std_roll: admissionNo.trim(),
        password: moment(dob).format("YYYY-MM-DD"),
        deviceName: deviceInfo.deviceName,
        deviceToken: deviceInfo.token,
        deviceType: deviceInfo.deviceType,
        deviceVersion: deviceInfo.deviceVersion,
      });

      if (!response?.token || !response?.data) {
        throw new Error(STRINGS.auth.loginFailed);
      }

      const currentDate = new Date();
      const sessionPayload = {
        token: response?.token,
        userData: response?.data,
        date: `${currentDate.getDate()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getFullYear()}`,
        time: formatAMPM(currentDate),
      };

      await persistStudentSession(sessionPayload);
      dispatch(
        saveUserData({
          token: response?.token?.startsWith?.("Bearer ")
            ? response.token
            : `Bearer ${response?.token}`,
          data: response?.data,
        })
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } catch (error) {
      showMessage(getErrorMessage(error) || STRINGS.auth.loginFailed);
    } finally {
      submissionLockedRef.current = false;
      setIsLoading(false);
    }
  }, [admissionNo, deviceInfo, dispatch, dob, navigation]);

  return (
    <LinearGradient
      colors={["#DFE6FF", colors.white]}
      style={authLayoutStyles.screen}
    >
      <DatePicker
        cancelText="Cancel"
        confirmText="Confirm"
        date={dob || new Date()}
        modal
        mode="date"
        onCancel={() => setIsDatePickerOpen(false)}
        onConfirm={onDateConfirm}
        open={isDatePickerOpen}
        title="Select Date of Birth"
      />

      <SafeAreaView style={authLayoutStyles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={authLayoutStyles.screen}
        >
          <ScrollView
            contentContainerStyle={authLayoutStyles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={authLayoutStyles.container}>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={authLayoutStyles.backButton}
              >
                <ChevronLeft
                  color={colors.textSecondary}
                  size={
                    constant.compactComponentSizes.iconLg +
                    constant.compactSpacing.xs
                  }
                  strokeWidth={2.4}
                />
              </Pressable>

              <View style={authLayoutStyles.heroSection}>
                <Image
                  source={require("../../../assests/images/login_image.png")}
                  style={authLayoutStyles.loginImage}
                  resizeMode="contain"
                />
              </View>

              <View style={authLayoutStyles.loginForm}>
                <Text style={authLayoutStyles.loginText}>Login</Text>

                <AppInput
                  autoCorrect={false}
                  containerStyle={authLayoutStyles.field}
                  keyboardType="numeric"
                  onChangeText={setAdmissionNo}
                  onRightIconPress={() =>
                    setHideAdmissionNo((previous) => !previous)
                  }
                  placeholder={STRINGS.auth.admissionNumberPlaceholder}
                  returnKeyType="done"
                  rightIcon={
                    hideAdmissionNo
                      ? constant.Icons.eyeCloseIcon
                      : constant.Icons.newsEyeIcon
                  }
                  secureTextEntry={hideAdmissionNo}
                  value={admissionNo}
                />

                <AppInput
                  containerStyle={authLayoutStyles.field}
                  onPress={() => setIsDatePickerOpen(true)}
                  placeholder={STRINGS.auth.dobPlaceholder}
                  readOnly
                  value={formattedDob}
                  valueTextStyle={
                    !formattedDob ? { color: colors.textMuted } : undefined
                  }
                />

                <CommonButton
                  buttonClick={handleLogin}
                  extStyle={authLayoutStyles.button}
                  isLoading={isLoading}
                  title={STRINGS.auth.loginButton}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
