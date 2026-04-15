import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import attendanceTheme from "./attendanceTheme";
import { AttendanceSurfaceCard } from "./AttendanceScreen";

const AttendanceActionCard = ({
  colors,
  description,
  Icon,
  onPress,
  title,
  style,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.pressable, style]}
    >
      <AttendanceSurfaceCard style={styles.card}>
        <LinearGradient
          colors={colors}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.iconCircle}
        >
          <Icon
            color={attendanceTheme.colors.headerText}
            size={attendanceTheme.iconSize.action}
            strokeWidth={2.3}
          />
        </LinearGradient>

        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </AttendanceSurfaceCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: attendanceTheme.layout.actionCardMinHeight,
  },
  iconCircle: {
    alignItems: "center",
    borderRadius: attendanceTheme.radius.actionIcon,
    height: attendanceTheme.radius.actionIcon * 2,
    justifyContent: "center",
    marginBottom: attendanceTheme.spacing.fieldGap,
    width: attendanceTheme.radius.actionIcon * 2,
  },
  textContent: {
    alignItems: "center",
  },
  title: {
    color: attendanceTheme.colors.textPrimary,
    fontFamily: attendanceTheme.fontFamily.title,
    fontSize: attendanceTheme.typography.cardTitle,
    textAlign: "center",
  },
  description: {
    color: attendanceTheme.colors.textSecondary,
    fontFamily: attendanceTheme.fontFamily.subtitle,
    fontSize: attendanceTheme.typography.cardDescription,
    lineHeight: attendanceTheme.typography.cardDescription * 1.45,
    marginTop: attendanceTheme.spacing.fieldLabelGap,
    textAlign: "center",
  },
});

export default AttendanceActionCard;
