import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

import {
  colors, SPLASH_MIN_DURATION_MS, STORAGE_KEYS, STRINGS,
} from "../constants";
import { activateStaffSession } from "../auth/staffSessionController";
import { AUTH_ROLES } from "../auth/roles";
import { storage } from "../auth/sessionStorage";
import {
  activateStudentSession,
  getPersistedStudentSession,
} from "../auth/studentSessionController";
import { getPersistedStaffSession } from "../auth/staffSessionController";
import { resH, resW } from "../Utils/Constant";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;

    const bootstrapApp = async () => {
      try {
        const [activeRole, storedStudentSession, storedStaffSession] = await Promise.all([
          storage.getString(STORAGE_KEYS.activeAuthRole),
          getPersistedStudentSession(),
          getPersistedStaffSession(),
        ]);

        await new Promise((resolve) =>
          setTimeout(resolve, SPLASH_MIN_DURATION_MS)
        );

        if (!mounted) {
          return;
        }

        const hasStudentSession = Boolean(
          storedStudentSession?.token && storedStudentSession?.userData
        );
        const hasStaffSession = Boolean(
          storedStaffSession?.token && storedStaffSession?.userData
        );

        if (
          activeRole === AUTH_ROLES.student &&
          hasStudentSession
        ) {
          await activateStudentSession();
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
          return;
        }

        if (
          activeRole === AUTH_ROLES.staff &&
          hasStaffSession
        ) {
          await activateStaffSession();
          navigation.reset({
            index: 0,
            routes: [{ name: "StaffModuleBottomTabs" }],
          });
          return;
        }

        if (hasStudentSession && !hasStaffSession) {
          await activateStudentSession();
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
          return;
        }

        if (hasStaffSession && !hasStudentSession) {
          await activateStaffSession();
          navigation.reset({
            index: 0,
            routes: [{ name: "StaffModuleBottomTabs" }],
          });
          return;
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "RoleSelectionScreen" }],
        });
      } catch (error) {
        if (!mounted) {
          return;
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "RoleSelectionScreen" }],
        });
      }
    };

    bootstrapApp();

    return () => {
      mounted = false;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={styles.iconWrapper}>
          <FastImage
            source={require("../assests/images/app_icon.png")}
            style={styles.logoImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.welcomeText}>{STRINGS.splash.welcome}</Text>
        <Text style={styles.text}>{STRINGS.splash.schoolName}</Text>
        <Text style={styles.text}>{STRINGS.splash.app}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.subtext}>{STRINGS.splash.poweredBy}</Text>
        <Image
          source={require("../assests/Icons/spalshImg.png")}
          style={styles.gif}
        />
        <ActivityIndicator color={colors.border} size="small" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: resH(6),
    paddingTop: resH(6),
    width: "100%",
  },
  innercontainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoImage: {
    height: resW(55),
    width: resW(55),
  },
  footer: {
    alignItems: "center",
    width: "60%",
  },
  gif: {
    height: resH(30),
    resizeMode: "cover",
    width: "100%",
  },
  subtext: {
    color: "#475560",
    fontSize: resW(4.5),
    marginBottom: -resW(7),
    marginTop: resH(3),
  },
  welcomeText: {
    color: "#475560",
    fontSize: resW(7.2),
    fontWeight: "500",
    textAlign: "center",
  },
  text: {
    color: "#475560",
    fontSize: resW(7.5),
    fontWeight: "500",
    lineHeight: resW(11),
    textAlign: "center",
  },
});

export default Splash;
