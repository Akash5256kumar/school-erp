import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import attendanceTheme from "./attendanceTheme";

const AttendanceScreen = ({ children, onBackPress, title }) => {
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const contentMaxWidth = isLandscape
    ? attendanceTheme.layout.contentMaxWidthLandscape
    : attendanceTheme.layout.contentMaxWidthPortrait;

  return (
    <LinearGradient
      colors={attendanceTheme.gradients.screen}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={styles.screen}
    >
      <StatusBar
        backgroundColor={attendanceTheme.colors.headerStart}
        barStyle="light-content"
      />

      <LinearGradient
        colors={attendanceTheme.gradients.header}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={[
          styles.header,
          {
            minHeight: attendanceTheme.layout.headerMinHeight,
            paddingTop: Math.max(
              insets.top,
              attendanceTheme.layout.headerTopInset
            ),
            paddingHorizontal: attendanceTheme.spacing.screenHorizontal,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <Pressable
            accessibilityRole="button"
            onPress={onBackPress}
            style={styles.backButton}
          >
            <ArrowLeft
              color={attendanceTheme.colors.headerText}
              size={attendanceTheme.iconSize.header}
              strokeWidth={2.4}
            />
          </Pressable>

          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      <View
        style={[
          styles.content,
          {
            maxWidth: contentMaxWidth,
            paddingHorizontal: attendanceTheme.spacing.screenHorizontal,
            paddingTop: attendanceTheme.spacing.contentTop,
          },
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

export const AttendanceSurfaceCard = ({ children, style }) => (
  <View style={[styles.surfaceCard, style]}>{children}</View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    justifyContent: "flex-end",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: attendanceTheme.spacing.headerBottom,
  },
  backButton: {
    alignItems: "center",
    height:
      attendanceTheme.iconSize.header + attendanceTheme.spacing.fieldLabelGap,
    justifyContent: "center",
    width:
      attendanceTheme.iconSize.header + attendanceTheme.spacing.fieldLabelGap,
  },
  headerSpacer: {
    width:
      attendanceTheme.iconSize.header + attendanceTheme.spacing.fieldLabelGap,
  },
  title: {
    color: attendanceTheme.colors.headerText,
    flex: 1,
    fontFamily: attendanceTheme.fontFamily.title,
    fontSize: attendanceTheme.typography.header,
    textAlign: "left",
  },
  content: {
    alignSelf: "center",
    flex: 1,
    width: "100%",
  },
  surfaceCard: {
    backgroundColor: attendanceTheme.colors.surface,
    borderRadius: attendanceTheme.radius.surface,
    padding: attendanceTheme.spacing.cardPadding,
  },
});

export default AttendanceScreen;
