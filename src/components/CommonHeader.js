import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  appBarTheme,
  colors,
  componentSizes,
  spacing,
  typography,
} from "../constants";
import * as constant from "../Utils/Constant";

const CommonHeader = ({
  title = "",
  extStyle = {},
  onLeftClick = () => {},
  backgroundColor = "",
  IconColor = "",
  textColor = "",
  imageSource,
  onPressData,
  compact = false,
  iconStyle = {},
  titleStyle = {},
  gradientColors = null,
}) => {
  const headerBackgroundStyle = backgroundColor
    ? { backgroundColor }
    : styles.defaultBackground;
  const iconTintStyle = IconColor ? { tintColor: IconColor } : null;
  const titleColorStyle = textColor ? { color: textColor } : null;

  const content = (
    <>
      <Pressable
        accessibilityRole="button"
        style={styles.leftMainView}
        onPress={() => onLeftClick()}
      >
        <Image
          resizeMode="contain"
          source={constant.Icons.backArrowIcon}
          style={[
            styles.backIcon,
            compact ? styles.compactBackIcon : null,
            iconStyle,
            iconTintStyle,
          ]}
        />
      </Pressable>
      <View style={styles.midMainView}>
        <Text
          style={[
            styles.titleStyle,
            compact ? styles.compactTitleStyle : null,
            titleStyle,
            titleColorStyle,
            styles.enforcedTitleMetrics,
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightMainView}>
        {imageSource ? (
          <Pressable accessibilityRole="button" onPress={onPressData}>
            <Image source={imageSource} style={styles.actionIcon} />
          </Pressable>
        ) : null}
      </View>
    </>
  );

  if (gradientColors?.length) {
    return (
      <LinearGradient
        colors={gradientColors}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={[
          styles.mainView,
          compact ? styles.compactMainView : null,
          extStyle,
        ]}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.mainView,
        compact ? styles.compactMainView : null,
        extStyle,
        headerBackgroundStyle,
      ]}
    >
      {content}
    </View>
  );
};

export default CommonHeader;
const styles = StyleSheet.create({
  defaultBackground: {
    backgroundColor: colors.primaryDark,
  },
  mainView: {
    height: appBarTheme.layout.height,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop:
      Platform.OS === "ios" ? componentSizes.appBarCompactTopInset : spacing.sm,
  },
  compactMainView: {
    height: appBarTheme.layout.height,
  },
  leftMainView: {
    width: componentSizes.iconLg * 2,
    height: "100%",
    justifyContent: "center",
  },
  backIcon: {
    height: appBarTheme.iconSize.back,
    width: appBarTheme.iconSize.back,
    marginTop: 0,
  },
  compactBackIcon: {
    height: appBarTheme.iconSize.back,
    width: appBarTheme.iconSize.back,
    marginTop: 0,
  },
  midMainView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  rightMainView: {
    width: componentSizes.iconLg * 2,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  titleStyle: {
    fontSize: appBarTheme.typography.title,
    color: constant.baseTextColor,
    fontFamily: appBarTheme.fontFamily.title,
    fontWeight: typography.weights.bold,
  },
  compactTitleStyle: {
    fontSize: appBarTheme.typography.title,
  },
  enforcedTitleMetrics: {
    fontFamily: appBarTheme.fontFamily.title,
    fontSize: appBarTheme.typography.title,
  },
  actionIcon: {
    width: componentSizes.iconLg,
    height: componentSizes.iconLg,
    tintColor: constant.whiteColor,
  },
});
