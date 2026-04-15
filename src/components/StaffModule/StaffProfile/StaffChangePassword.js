import React, { useCallback, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Lock } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import CommonHeader from "../../CommonHeader";
import { useAppToast } from "../../common/AppToast";
import { STRINGS } from "../../../constants";
import { STORAGE_KEYS } from "../../../constants";
import { uploadFile } from "../../../Utils";
import * as constant from "../../../Utils/Constant";
import ProfileFormField from "./ProfileFormField";
import ProfileHeroCircle from "./ProfileHeroCircle";
import ProfilePrimaryButton from "./ProfilePrimaryButton";
import createStaffProfileTheme from "./profileTheme";

const MIN_PASSWORD_LENGTH = 8;

const resolvePasswordErrorMessage = (error, validation) => {
  const passwordErrors = Array.isArray(error?.data?.errors?.password)
    ? error.data.errors.password
    : [];
  const oldPasswordErrors = Array.isArray(error?.data?.errors?.old_password)
    ? error.data.errors.old_password
    : [];
  const rawMessage = [
    ...oldPasswordErrors,
    ...passwordErrors,
    error?.data?.message,
    error?.message,
    error?.userMessage,
  ]
    .find(Boolean)
    ?.toString()
    .trim();

  const normalized = String(rawMessage || "").toLowerCase();

  if (
    normalized.includes("timeout") ||
    normalized.includes("timed out") ||
    normalized.includes("request timeout")
  ) {
    return validation.timeoutError;
  }

  if (
    normalized.includes("network") ||
    normalized.includes("internet") ||
    normalized.includes("failed to fetch")
  ) {
    return validation.networkError;
  }

  if (
    normalized.includes("old password") ||
    normalized.includes("current password") ||
    normalized.includes("incorrect old password") ||
    normalized.includes("invalid old password")
  ) {
    return validation.incorrectOldPassword;
  }

  if (
    normalized.includes("at least 8") ||
    normalized.includes("minimum 8") ||
    normalized.includes("min:8")
  ) {
    return validation.apiMinimumLength;
  }

  if (
    normalized.includes("do not match") ||
    normalized.includes("does not match") ||
    normalized.includes("must match")
  ) {
    return validation.apiMismatch;
  }

  return validation.genericError;
};

const StaffChangePassword = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const userData = useSelector((state) => state.userSlice.userData);
  const { showSuccessToast } = useAppToast();
  const { height, width } = useWindowDimensions();
  const theme = useMemo(
    () => createStaffProfileTheme({ height, width }),
    [height, width]
  );
  const screenTheme = theme.screens.changePassword;
  const screenStrings = STRINGS.staffProfile.changePassword;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdatePassword = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      constant.showAlert(screenStrings.validation.missingFields);
      return;
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      constant.showAlert(screenStrings.validation.minimumLength);
      return;
    }

    if (newPassword !== confirmPassword) {
      constant.showAlert(screenStrings.validation.mismatch);
      return;
    }

    const storedUserId = await AsyncStorage.getItem(STORAGE_KEYS.id);
    const userId = String(
      userData?.id || userData?.staff_info_id || storedUserId || ""
    ).trim();

    if (!userId) {
      constant.showAlert(screenStrings.validation.missingUser);
      return;
    }

    try {
      setSubmitting(true);

      const response = await uploadFile("update-password", null, {
        id: userId,
        old_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      if (response?.success === false || response?.status === false) {
        constant.showAlert(
          resolvePasswordErrorMessage(
            {
              data: response,
              message: response?.message,
            },
            screenStrings.validation
          )
        );
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      showSuccessToast({
        message: response?.message || screenStrings.validation.success,
        title: screenStrings.validation.successTitle,
      });
      navigation.goBack();
    } catch (error) {
      console.log("Update password error:", error);
      constant.showAlert(
        resolvePasswordErrorMessage(error, screenStrings.validation)
      );
    } finally {
      setSubmitting(false);
    }
  }, [
    confirmPassword,
    currentPassword,
    isSubmitting,
    navigation,
    newPassword,
    screenStrings.validation,
    showSuccessToast,
    userData?.id,
    userData?.staff_info_id,
  ]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.colors.headerGradientEnd,
        },
      ]}
    >
      <StatusBar
        backgroundColor={screenTheme.headerGradientEnd}
        barStyle="light-content"
      />

      <LinearGradient
        colors={[
          screenTheme.backgroundGradientStart,
          screenTheme.backgroundGradientMiddle,
          screenTheme.backgroundGradientEnd,
        ]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.screen}
      >
        <CommonHeader
          IconColor={theme.colors.headerText}
          compact
          gradientColors={[
            screenTheme.headerGradientStart,
            screenTheme.headerGradientEnd,
          ]}
          extStyle={{
            height: screenTheme.headerHeight,
            marginTop: 0,
          }}
          iconStyle={{
            height: screenTheme.headerIconSize,
            marginTop: 0,
            width: screenTheme.headerIconSize,
          }}
          onLeftClick={() => navigation.goBack()}
          textColor={theme.colors.headerText}
          title={screenStrings.title}
          titleStyle={[
            theme.typography.headerTitle,
            {
              fontSize: screenTheme.headerTitleFontSize,
            },
          ]}
        />

        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight:
                Math.max(height - screenTheme.headerHeight, 0) + insets.bottom,
              paddingBottom: theme.spacing.formBottom + insets.bottom,
              paddingHorizontal: theme.spacing.contentHorizontal,
              paddingTop: screenTheme.formTop,
            },
          ]}
          enableAutomaticScroll
          enableOnAndroid
          extraScrollHeight={theme.spacing.sectionGap}
          keyboardOpeningTime={0}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View
            style={[
              styles.content,
              {
                maxWidth: theme.sizing.formMaxWidth,
              },
            ]}
          >
            <View
              style={[
                styles.heroSection,
                {
                  marginBottom: screenTheme.heroGap,
                },
              ]}
            >
              <ProfileHeroCircle
                Icon={Lock}
                iconSize={screenTheme.heroIconSize}
                size={screenTheme.heroSize}
                theme={{
                  ...theme,
                  colors: {
                    ...theme.colors,
                    avatarGradientEnd: theme.colors.lockHeroEnd,
                    avatarGradientStart: theme.colors.lockHeroStart,
                  },
                  sizing: {
                    ...theme.sizing,
                    heroBorderWidth: 0,
                  },
                }}
              />
            </View>

            <View
              style={[
                styles.formFields,
                {
                  gap: screenTheme.fieldGap,
                },
              ]}
            >
              <ProfileFormField
                autoCapitalize="none"
                eyeIconSize={screenTheme.eyeIconSize}
                inputShellStyle={{
                  borderRadius: screenTheme.fieldRadius,
                  height: screenTheme.fieldHeight,
                }}
                inputTopGap={screenTheme.inputTopGap}
                inputStyle={{
                  fontSize: screenTheme.fieldValueFontSize,
                }}
                label={screenStrings.fields.currentPassword}
                labelStyle={{
                  fontSize: screenTheme.fieldLabelFontSize,
                }}
                onChangeText={setCurrentPassword}
                placeholder={screenStrings.placeholders.currentPassword}
                secureTextEntry
                textContentType="password"
                theme={theme}
                value={currentPassword}
              />

              <ProfileFormField
                autoCapitalize="none"
                eyeIconSize={screenTheme.eyeIconSize}
                inputShellStyle={{
                  borderRadius: screenTheme.fieldRadius,
                  height: screenTheme.fieldHeight,
                }}
                inputTopGap={screenTheme.inputTopGap}
                inputStyle={{
                  fontSize: screenTheme.fieldValueFontSize,
                }}
                label={screenStrings.fields.newPassword}
                labelStyle={{
                  fontSize: screenTheme.fieldLabelFontSize,
                }}
                onChangeText={setNewPassword}
                placeholder={screenStrings.placeholders.newPassword}
                secureTextEntry
                textContentType="newPassword"
                theme={theme}
                value={newPassword}
              />

              <ProfileFormField
                autoCapitalize="none"
                eyeIconSize={screenTheme.eyeIconSize}
                inputShellStyle={{
                  borderRadius: screenTheme.fieldRadius,
                  height: screenTheme.fieldHeight,
                }}
                inputTopGap={screenTheme.inputTopGap}
                inputStyle={{
                  fontSize: screenTheme.fieldValueFontSize,
                }}
                label={screenStrings.fields.confirmPassword}
                labelStyle={{
                  fontSize: screenTheme.fieldLabelFontSize,
                }}
                onChangeText={setConfirmPassword}
                placeholder={screenStrings.placeholders.confirmPassword}
                secureTextEntry
                textContentType="newPassword"
                theme={theme}
                value={confirmPassword}
              />
            </View>

            <View
              style={[
                styles.buttonWrapper,
                {
                  marginTop: screenTheme.buttonTop,
                },
              ]}
            >
              <ProfilePrimaryButton
                disabled={isSubmitting}
                onPress={handleUpdatePassword}
                theme={{
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primaryButtonEnd: screenTheme.buttonGradientEnd,
                    primaryButtonStart: screenTheme.buttonGradientStart,
                  },
                  radii: {
                    ...theme.radii,
                    primaryButton: screenTheme.buttonRadius,
                  },
                  sizing: {
                    ...theme.sizing,
                    primaryButtonHeight: screenTheme.buttonHeight,
                  },
                  typography: {
                    ...theme.typography,
                    buttonLabel: {
                      ...theme.typography.buttonLabel,
                      fontSize: screenTheme.buttonLabelFontSize,
                    },
                  },
                }}
                title={
                  isSubmitting
                    ? STRINGS.common.loading
                    : screenStrings.updateAction
                }
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
  },
  content: {
    alignSelf: "center",
    width: "100%",
  },
  formFields: {
    width: "100%",
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
});

export default StaffChangePassword;
