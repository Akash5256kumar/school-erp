import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Eye, Plus } from "lucide-react-native";

import { STRINGS } from "../../../constants";
import AttendanceActionCard from "../AttendanceShared/AttendanceActionCard";
import AttendanceScreen from "../AttendanceShared/AttendanceScreen";
import attendanceTheme from "../AttendanceShared/attendanceTheme";

const HOME_ACTIONS = [
  {
    Icon: Plus,
    colors: attendanceTheme.gradients.addAction,
    description: STRINGS.attendance.actions.add.description,
    route: "StaffAddAttendance",
    title: STRINGS.attendance.actions.add.title,
  },
  {
    Icon: Eye,
    colors: attendanceTheme.gradients.viewAction,
    description: STRINGS.attendance.actions.view.description,
    route: "StaffViewStudentAttendance",
    title: STRINGS.attendance.actions.view.title,
  },
];

const StaffAttendance = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const showTwoColumns =
    width >= attendanceTheme.layout.contentMaxWidthPortrait;

  return (
    <AttendanceScreen
      onBackPress={() => navigation.goBack()}
      title={STRINGS.attendance.homeTitle}
    >
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.grid, showTwoColumns && styles.gridWide]}>
          {HOME_ACTIONS.map((action) => (
            <AttendanceActionCard
              colors={action.colors}
              description={action.description}
              Icon={action.Icon}
              key={action.route}
              onPress={() => navigation.navigate(action.route)}
              style={[
                styles.card,
                showTwoColumns && styles.cardWide,
                isLandscape && styles.cardLandscape,
              ]}
              title={action.title}
            />
          ))}
        </View>
      </ScrollView>
    </AttendanceScreen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: attendanceTheme.spacing.screenBottom,
  },
  grid: {
    gap: attendanceTheme.spacing.sectionGap,
  },
  gridWide: {
    flexDirection: "row",
  },
  card: {
    flex: 1,
  },
  cardWide: {
    minWidth: 0,
  },
  cardLandscape: {
    minHeight: attendanceTheme.layout.actionCardMinHeight,
  },
});

export default StaffAttendance;
