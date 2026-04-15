import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookOpen } from "lucide-react-native";

import BottomBar from "../../common/BottomBar";
import { bottomBarItemColors } from "../../../constants/bottomBarTheme";
import * as constant from "../../../Utils/Constant";
import StaffHome from "../StaffHome/StaffHome";
import StaffLibrary from "../StaffLibrary/StaffLibrary";
import StaffProfile from "../StaffProfile/StaffProfile";
import StaffSupportSystem from "../StaffSupportSystem/StaffSupportSystem";
import StaffViewLeave from "../StaffViewLeave/StaffViewLeave";

const Tab = createBottomTabNavigator();

const TAB_ITEMS = [
  {
    iconSource: constant.Icons.libraryIcon,
    label: "Library",
    routeName: "Achievement",
    ...bottomBarItemColors,
  },
  {
    iconSource: constant.Icons.leaveIcon,
    label: "Leave",
    routeName: "Grade",
    ...bottomBarItemColors,
  },
  {
    Icon: BookOpen,
    isCenter: true,
    routeName: "StaffHome",
  },
  {
    iconSource: constant.Icons.SupportIcon,
    label: "Support",
    routeName: "Support",
    ...bottomBarItemColors,
  },
  {
    iconSource: constant.Icons.profileIcon,
    label: "Profile",
    routeName: "StaffProfile",
    ...bottomBarItemColors,
  },
];

const StaffModuleBottomTabs = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="StaffHome"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) =>
        isKeyboardVisible ? null : <BottomBar {...props} items={TAB_ITEMS} />
      }
    >
      <Tab.Screen component={StaffLibrary} name="Achievement" />
      <Tab.Screen component={StaffViewLeave} name="Grade" />
      <Tab.Screen
        component={StaffHome}
        name="StaffHome"
        options={{ unmountOnBlur: false }}
      />
      <Tab.Screen component={StaffSupportSystem} name="Support" />
      <Tab.Screen component={StaffProfile} name="StaffProfile" />
    </Tab.Navigator>
  );
};

export default StaffModuleBottomTabs;
