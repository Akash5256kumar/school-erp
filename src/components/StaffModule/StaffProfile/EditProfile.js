import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Camera, Image as ImageIcon } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CommonHeader from "../../CommonHeader";
import { useAppToast } from "../../common/AppToast";
import {
  REMOTE_FILE_BASE_URL,
  STORAGE_KEYS,
  STRINGS,
} from "../../../constants";
import { uploadFile } from "../../../Utils";
import * as constant from "../../../Utils/Constant";
import { updateProfileRequestSuccess } from "../../../store/slices/userSlice";
import ProfileFormField from "./ProfileFormField";
import ProfileHeroCircle from "./ProfileHeroCircle";
import ProfileOptionModal from "./ProfileOptionModal";
import ProfilePrimaryButton from "./ProfilePrimaryButton";
import createStaffProfileTheme from "./profileTheme";

const CONTACT_KEYS = ["mobile", "phone", "phone_no", "contact_no", "phoneno"];
const IMAGE_KEYS = ["image", "staff_image", "staffimage", "profile_image"];

const sanitizeMobileNumber = (value) =>
  String(value || "")
    .replace(/\D/g, "")
    .slice(0, 10);

const resolveFirstAvailableValue = (source, keys = []) => {
  if (!source || typeof source !== "object") {
    return "";
  }

  const matchedKey = keys.find((key) => source?.[key]);
  return matchedKey ? source[matchedKey] : "";
};

const resolveRemoteImageUri = (value) => {
  const normalized = String(value || "").trim();

  if (!normalized) {
    return null;
  }

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("file://") ||
    normalized.startsWith("content://")
  ) {
    return normalized;
  }

  return `${REMOTE_FILE_BASE_URL}${normalized.replace(/^\/+/, "")}`;
};

const buildUpdatedUserData = ({ currentUserData, image, mobile, name }) => ({
  ...(currentUserData || {}),
  contact_no: mobile,
  image: image || currentUserData?.image || currentUserData?.staff_image || "",
  mobile,
  name: name || currentUserData?.name || "",
  phone: mobile,
  phone_no: mobile,
  phoneno: mobile,
  staff_image:
    image || currentUserData?.staff_image || currentUserData?.image || "",
  staffimage:
    image || currentUserData?.staffimage || currentUserData?.image || "",
});

const EditStaffProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const userData = useSelector((state) => state.userSlice.userData);
  const { showSuccessToast } = useAppToast();
  const { height, width } = useWindowDimensions();
  const theme = useMemo(
    () => createStaffProfileTheme({ height, width }),
    [height, width]
  );
  const screenTheme = theme.screens.editProfile;
  const screenStrings = STRINGS.staffProfile.editProfile;

  const [teacherEmail, setTeacherEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [initialMobileNumber, setInitialMobileNumber] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageAsset, setSelectedImageAsset] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const openCamera = useCallback(async () => {
    setVisible(false);

    try {
      const result = await launchCamera({
        includeBase64: false,
        mediaType: "photo",
        saveToPhotos: true,
      });

      if (result.didCancel || result.errorCode) {
        return;
      }

      if (result?.assets?.length) {
        setSelectedImage(result.assets[0].uri);
        setSelectedImageAsset(result.assets[0]);
      }
    } catch (error) {
      console.log("Camera launch error:", error);
    }
  }, []);

  const openGallery = useCallback(async () => {
    setVisible(false);

    try {
      const result = await launchImageLibrary({
        includeBase64: false,
        mediaType: "photo",
      });

      if (result.didCancel || result.errorCode) {
        return;
      }

      if (result?.assets?.length) {
        setSelectedImage(result.assets[0].uri);
        setSelectedImageAsset(result.assets[0]);
      }
    } catch (error) {
      console.log("Gallery launch error:", error);
    }
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [storedName, storedEmail, rawUserData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.name),
        AsyncStorage.getItem(STORAGE_KEYS.email),
        AsyncStorage.getItem(STORAGE_KEYS.userData),
      ]);
      const persistedUserData = rawUserData ? JSON.parse(rawUserData) : {};
      const source =
        userData && typeof userData === "object" ? userData : persistedUserData;
      const resolvedName =
        source?.name ||
        source?.staff_name ||
        source?.full_name ||
        storedName ||
        "";
      const resolvedEmail = source?.email || storedEmail || "";
      const resolvedMobile = sanitizeMobileNumber(
        resolveFirstAvailableValue(source, CONTACT_KEYS)
      );
      const resolvedImage = resolveRemoteImageUri(
        resolveFirstAvailableValue(source, IMAGE_KEYS)
      );

      setTeacherName(resolvedName);
      setTeacherEmail(resolvedEmail);
      setMobileNumber(resolvedMobile);
      setInitialMobileNumber(resolvedMobile);
      setSelectedImage(resolvedImage);
      setSelectedImageAsset(null);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  }, [userData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const imageOptions = useMemo(
    () => [
      {
        backgroundColor: theme.colors.cameraOptionBackground,
        Icon: Camera,
        iconGradient: [
          theme.colors.cameraOptionIconStart,
          theme.colors.cameraOptionIconEnd,
        ],
        key: "camera",
        label: screenStrings.imagePicker.camera,
        onPress: openCamera,
      },
      {
        backgroundColor: theme.colors.galleryOptionBackground,
        Icon: ImageIcon,
        iconGradient: [
          theme.colors.galleryOptionIconStart,
          theme.colors.galleryOptionIconEnd,
        ],
        key: "gallery",
        label: screenStrings.imagePicker.gallery,
        onPress: openGallery,
      },
    ],
    [
      openCamera,
      openGallery,
      screenStrings.imagePicker.camera,
      screenStrings.imagePicker.gallery,
      theme.colors.cameraOptionBackground,
      theme.colors.cameraOptionIconEnd,
      theme.colors.cameraOptionIconStart,
      theme.colors.galleryOptionBackground,
      theme.colors.galleryOptionIconEnd,
      theme.colors.galleryOptionIconStart,
    ]
  );

  const handleMobileChange = useCallback((value) => {
    setMobileNumber(sanitizeMobileNumber(value));
  }, []);

  const handleUpdate = useCallback(async () => {
    const normalizedMobile = sanitizeMobileNumber(mobileNumber);
    const hasImageChanged = Boolean(selectedImageAsset?.uri);
    const hasMobileChanged = normalizedMobile !== initialMobileNumber;

    if (!normalizedMobile) {
      constant.showAlert(screenStrings.validation.missingMobile);
      return;
    }

    if (normalizedMobile.length !== 10) {
      constant.showAlert(screenStrings.validation.invalidMobile);
      return;
    }

    if (!userData?.staff_info_id) {
      constant.showAlert(
        "Staff profile details are missing. Please log in again."
      );
      return;
    }

    if (!hasImageChanged && !hasMobileChanged) {
      constant.showAlert(screenStrings.validation.noChanges);
      return;
    }

    try {
      setSubmitting(true);

      const response = await uploadFile(
        "updateStaffProfile",
        selectedImageAsset?.uri
          ? {
              uri: selectedImageAsset.uri,
              name: selectedImageAsset.fileName || "staff-profile.jpg",
              type: selectedImageAsset.type || "image/jpeg",
            }
          : null,
        {
          id: String(userData?.staff_info_id),
          mobile: normalizedMobile,
        },
        "image"
      );

      if (!response?.status) {
        constant.showAlert(response?.message || "Profile update failed");
        return;
      }

      const responseData = response?.data || {};
      const nextUserData = buildUpdatedUserData({
        currentUserData: userData,
        image: responseData?.image,
        mobile: responseData?.mobile || normalizedMobile,
        name: responseData?.name || teacherName,
      });

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.name, nextUserData?.name || teacherName || ""],
        [STORAGE_KEYS.email, nextUserData?.email || teacherEmail || ""],
        [STORAGE_KEYS.userData, JSON.stringify(nextUserData)],
      ]);

      dispatch(updateProfileRequestSuccess(nextUserData));

      setMobileNumber(responseData?.mobile || normalizedMobile);
      setInitialMobileNumber(responseData?.mobile || normalizedMobile);
      setSelectedImage(
        resolveRemoteImageUri(responseData?.image) || selectedImage
      );
      setSelectedImageAsset(null);

      showSuccessToast({
        message: response?.message || screenStrings.validation.successMessage,
        title: screenStrings.validation.successTitle,
      });
      navigation.goBack();
    } catch (error) {
      console.log("Update staff profile error:", error);
      constant.showAlert(error?.message || "Profile update failed");
    } finally {
      setSubmitting(false);
    }
  }, [
    dispatch,
    initialMobileNumber,
    mobileNumber,
    navigation,
    screenStrings.validation.invalidMobile,
    screenStrings.validation.missingMobile,
    screenStrings.validation.noChanges,
    screenStrings.validation.successMessage,
    screenStrings.validation.successTitle,
    selectedImage,
    selectedImageAsset,
    showSuccessToast,
    teacherEmail,
    teacherName,
    userData,
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
        backgroundColor={theme.colors.headerGradientEnd}
        barStyle="light-content"
      />

      <View
        style={[
          styles.screen,
          {
            backgroundColor: theme.colors.screenBackground,
          },
        ]}
      >
        <CommonHeader
          IconColor={theme.colors.headerText}
          backgroundColor={theme.colors.headerGradientEnd}
          compact
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
              minHeight: theme.sizing.scrollMinHeight + insets.bottom,
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
                imageUri={selectedImage}
                onOverlayPress={() => setVisible(true)}
                overlayColors={[
                  theme.colors.headerGradientStart,
                  theme.colors.headerGradientEnd,
                ]}
                overlayIconSize={theme.sizing.avatarHeroActionIconSize}
                OverlayIcon={Camera}
                size={theme.sizing.avatarHeroSize}
                theme={theme}
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
                editable={false}
                inputShellStyle={{
                  borderRadius: screenTheme.fieldRadius,
                  height: screenTheme.fieldHeight,
                }}
                inputTopGap={screenTheme.inputTopGap}
                inputStyle={{
                  fontSize: screenTheme.fieldValueFontSize,
                }}
                label={screenStrings.fields.name}
                labelStyle={{
                  fontSize: screenTheme.fieldLabelFontSize,
                }}
                placeholder={screenStrings.placeholders.name}
                theme={theme}
                value={teacherName}
              />

              <ProfileFormField
                editable={false}
                inputShellStyle={{
                  borderRadius: screenTheme.fieldRadius,
                  height: screenTheme.fieldHeight,
                }}
                inputTopGap={screenTheme.inputTopGap}
                inputStyle={{
                  fontSize: screenTheme.fieldValueFontSize,
                }}
                keyboardType="email-address"
                label={screenStrings.fields.email}
                labelStyle={{
                  fontSize: screenTheme.fieldLabelFontSize,
                }}
                placeholder={screenStrings.placeholders.email}
                theme={theme}
                value={teacherEmail}
              />

              <ProfileFormField
                inputShellStyle={{
                  borderRadius: screenTheme.fieldRadius,
                  height: screenTheme.fieldHeight,
                }}
                inputTopGap={screenTheme.inputTopGap}
                inputStyle={{
                  fontSize: screenTheme.fieldValueFontSize,
                }}
                keyboardType="phone-pad"
                label={screenStrings.fields.contact}
                labelStyle={{
                  fontSize: screenTheme.fieldLabelFontSize,
                }}
                onChangeText={handleMobileChange}
                placeholder={screenStrings.placeholders.contact}
                theme={theme}
                value={mobileNumber}
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
                onPress={isSubmitting ? undefined : handleUpdate}
                theme={{
                  ...theme,
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
                title={screenStrings.updateAction}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <ProfileOptionModal
          closeLabel={screenStrings.imagePicker.close}
          modalTheme={screenTheme.imagePicker}
          onClose={() => setVisible(false)}
          options={imageOptions}
          theme={theme}
          title={screenStrings.imagePicker.title}
          visible={isVisible}
        />
      </View>
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

export default EditStaffProfile;
