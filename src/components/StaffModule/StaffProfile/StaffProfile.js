import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BackHandler,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Info, Lock, LogOut, SquarePen } from "lucide-react-native";

import CommonHeader from "../../CommonHeader";
import { STRINGS } from "../../../constants";
import { clearStaffSession } from "../../../auth/staffSessionController";
import ProfileActionCard from "./ProfileActionCard";
import createStaffProfileTheme from "./profileTheme";

const CONTACT_KEYS = ["mobile", "phone", "phone_no", "contact_no", "phoneno"];

const resolveContactValue = (parsedUserData, teacherEmail, fallback) => {
  if (parsedUserData && typeof parsedUserData === "object") {
    const matchedKey = CONTACT_KEYS.find((key) => parsedUserData?.[key]);

    if (matchedKey) {
      return String(parsedUserData[matchedKey]);
    }
  }

  return teacherEmail || fallback;
};

const StaffProfile = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const theme = useMemo(
    () => createStaffProfileTheme({ height, width }),
    [height, width]
  );
  const profileStrings = STRINGS.staffProfile;

  const [teacherEmail, setTeacherEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [contactValue, setContactValue] = useState(
    profileStrings.contactFallback
  );
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [name, email, rawUserData] = await Promise.all([
        AsyncStorage.getItem("@name"),
        AsyncStorage.getItem("@email"),
        AsyncStorage.getItem("userData"),
      ]);

      const parsedUserData = rawUserData ? JSON.parse(rawUserData) : null;
      const nextName = (name || "").trim().toUpperCase();

      setDisplayName(nextName);
      setTeacherEmail(email || "");
      setContactValue(
        resolveContactValue(
          parsedUserData,
          email || "",
          profileStrings.contactFallback
        )
      );
    } catch (error) {
      console.error("Error loading staff profile data:", error);
      setDisplayName("");
      setTeacherEmail("");
      setContactValue(profileStrings.contactFallback);
    }
  }, [profileStrings.contactFallback]);

  const handleBackPress = useCallback(() => {
    navigation.navigate("StaffHome");
    return true;
  }, [navigation]);

  useEffect(() => {
    loadData();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [handleBackPress, loadData]);

  const confirmLogout = useCallback(async () => {
    try {
      await clearStaffSession();
      setLogoutModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "RoleSelectionScreen" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [navigation]);

  const actions = useMemo(
    () => [
      {
        gradient: [
          theme.colors.primaryActionGradientStart,
          theme.colors.primaryActionGradientEnd,
        ],
        Icon: SquarePen,
        key: "editProfile",
        label: profileStrings.actions.editProfile,
        onPress: () => navigation.navigate("EditStaffProfile"),
      },
      {
        gradient: [
          theme.colors.teachingGradientStart,
          theme.colors.teachingGradientEnd,
        ],
        Icon: Info,
        key: "teachingInformation",
        label: profileStrings.actions.teachingInformation,
        onPress: () => navigation.navigate("TeachingInfo"),
      },
      {
        gradient: [
          theme.colors.passwordGradientStart,
          theme.colors.passwordGradientEnd,
        ],
        Icon: Lock,
        key: "changePassword",
        label: profileStrings.actions.changePassword,
        onPress: () => navigation.navigate("StaffChangePassword"),
      },
      {
        gradient: [
          theme.colors.logoutGradientStart,
          theme.colors.logoutGradientEnd,
        ],
        Icon: LogOut,
        key: "logout",
        label: profileStrings.actions.logout,
        onPress: () => setLogoutModalVisible(true),
      },
    ],
    [
      navigation,
      profileStrings.actions.changePassword,
      profileStrings.actions.editProfile,
      profileStrings.actions.logout,
      profileStrings.actions.teachingInformation,
      theme.colors.logoutGradientEnd,
      theme.colors.logoutGradientStart,
      theme.colors.passwordGradientEnd,
      theme.colors.passwordGradientStart,
      theme.colors.primaryActionGradientEnd,
      theme.colors.primaryActionGradientStart,
      theme.colors.teachingGradientEnd,
      theme.colors.teachingGradientStart,
    ]
  );

  const resolvedDisplayName =
    displayName || teacherEmail || profileStrings.title;

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
            height: theme.sizing.headerHeight,
            marginTop: 0,
          }}
          onLeftClick={handleBackPress}
          textColor={theme.colors.headerText}
          title={profileStrings.title}
          titleStyle={theme.typography.headerTitle}
        />

        <ScrollView
          alwaysBounceVertical={false}
          contentInsetAdjustmentBehavior="never"
          nestedScrollEnabled
          bounces={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              alignItems: "center",
              minHeight: theme.sizing.scrollMinHeight + insets.bottom,
              paddingBottom: theme.spacing.contentBottom + insets.bottom,
              paddingHorizontal: theme.spacing.contentHorizontal,
              paddingTop: theme.spacing.contentTop,
            },
          ]}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.profileCard,
              {
                backgroundColor: theme.colors.profileCardBackground,
                borderRadius: theme.radii.profileCard,
                maxWidth: theme.sizing.maxWidth,
                paddingBottom: theme.sizing.topCardPaddingBottom,
                paddingHorizontal: theme.sizing.topCardPaddingHorizontal,
                paddingTop: theme.sizing.topCardPaddingTop,
              },
              theme.shadows.profileCard,
            ]}
          >
            <LinearGradient
              colors={[
                theme.colors.headerGradientStart,
                theme.colors.headerGradientEnd,
              ]}
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={[
                styles.banner,
                {
                  borderTopLeftRadius: theme.radii.profileCard,
                  borderTopRightRadius: theme.radii.profileCard,
                  height: theme.sizing.bannerHeight,
                },
              ]}
            />

            <View
              style={[
                styles.avatarShell,
                {
                  backgroundColor: theme.colors.avatarBorderSurface,
                  borderRadius: theme.radii.avatar + theme.radii.avatarBorder,
                  height:
                    theme.sizing.avatarSize + theme.radii.avatarBorder * 2,
                  marginTop: -(theme.sizing.avatarSize * 0.46),
                  width: theme.sizing.avatarSize + theme.radii.avatarBorder * 2,
                },
              ]}
            >
              <LinearGradient
                colors={[
                  theme.colors.avatarGradientStart,
                  theme.colors.avatarGradientEnd,
                ]}
                end={{ x: 1, y: 1 }}
                start={{ x: 0, y: 0 }}
                style={[
                  styles.avatarCore,
                  {
                    borderRadius: theme.radii.avatar,
                    height: theme.sizing.avatarSize,
                    width: theme.sizing.avatarSize,
                  },
                ]}
              />
            </View>

            <View
              style={[
                styles.profileMeta,
                {
                  marginTop: theme.spacing.topCardGap,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[styles.profileName, theme.typography.profileName]}
              >
                {resolvedDisplayName}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.profileSubtitle,
                  theme.typography.profileSubtitle,
                  {
                    marginTop: theme.spacing.profileMetaGap,
                  },
                ]}
              >
                {contactValue}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.actionList,
              {
                gap: theme.spacing.listGap,
                marginTop: theme.spacing.sectionGap,
                width: "100%",
              },
            ]}
          >
            {actions.map((action) => (
              <ProfileActionCard
                action={action}
                key={action.key}
                onPress={action.onPress}
                theme={theme}
              />
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          onRequestClose={() => setLogoutModalVisible(false)}
          transparent
          visible={logoutModalVisible}
        >
          <View
            style={[
              styles.modalOverlay,
              {
                backgroundColor: theme.colors.modalOverlay,
                paddingHorizontal: theme.spacing.modalOverlayHorizontal,
              },
            ]}
          >
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.colors.modalSurface,
                  borderRadius: theme.radii.modal,
                  maxWidth: theme.sizing.modalMaxWidth,
                  padding: theme.spacing.modalCardPadding,
                },
                theme.shadows.actionCard,
              ]}
            >
              <Text style={[styles.modalTitle, theme.typography.modalTitle]}>
                {profileStrings.confirmLogoutTitle}
              </Text>
              <Text
                style={[
                  styles.modalDescription,
                  theme.typography.modalDescription,
                  {
                    marginTop: theme.spacing.modalDescriptionGap,
                  },
                ]}
              >
                {profileStrings.confirmLogoutDescription}
              </Text>

              <View
                style={[
                  styles.modalActions,
                  {
                    gap: theme.spacing.modalButtonGap,
                    marginTop: theme.spacing.modalTitleGap,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => setLogoutModalVisible(false)}
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: theme.colors.modalCancelBackground,
                      borderRadius: theme.radii.modalButton,
                      minHeight: theme.sizing.modalButtonHeight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      theme.typography.modalAction,
                      {
                        color: theme.colors.modalCancelText,
                      },
                    ]}
                  >
                    {STRINGS.common.cancel}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={confirmLogout}
                  style={[
                    styles.modalButton,
                    {
                      borderRadius: theme.radii.modalButton,
                      minHeight: theme.sizing.modalButtonHeight,
                      overflow: "hidden",
                    },
                    theme.shadows.modalPrimaryButton,
                  ]}
                >
                  <LinearGradient
                    colors={[
                      theme.colors.modalConfirmGradientStart,
                      theme.colors.modalConfirmGradientEnd,
                    ]}
                    end={{ x: 1, y: 0 }}
                    start={{ x: 0, y: 0 }}
                    style={[
                      styles.modalGradientButton,
                      {
                        minHeight: theme.sizing.modalButtonHeight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        theme.typography.modalAction,
                        {
                          color: theme.colors.headerText,
                        },
                      ]}
                    >
                      {profileStrings.confirmLogoutAction}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionList: {
    alignItems: "center",
  },
  avatarCore: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarShell: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  banner: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  modalActions: {
    flexDirection: "row",
  },
  modalButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  modalCard: {
    width: "100%",
  },
  modalDescription: {
    textAlign: "center",
  },
  modalGradientButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  modalOverlay: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalTitle: {
    textAlign: "center",
  },
  profileCard: {
    overflow: "hidden",
    width: "100%",
  },
  profileMeta: {
    alignItems: "center",
  },
  profileName: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  profileSubtitle: {
    textAlign: "center",
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
});

export default StaffProfile;
