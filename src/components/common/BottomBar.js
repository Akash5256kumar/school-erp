import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as constant from "../../Utils/Constant";
import bottomBarTheme from "../../constants/bottomBarTheme";

const BottomBar = ({ state, descriptors, navigation, items }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, constant.compactSpacing.sm),
          },
        ]}
      >
        {items.map((item) => {
          const routeIndex = state.routes.findIndex(
            (route) => route.name === item.routeName
          );
          const focused = state.index === routeIndex;
          const route = state.routes[routeIndex];
          const descriptor = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              canPreventDefault: true,
              target: route.key,
              type: "tabPress",
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              target: route.key,
              type: "tabLongPress",
            });
          };

          if (item.isCenter) {
            const CenterIcon = item.Icon;

            return (
              <Pressable
                android_ripple={{
                  color: bottomBarTheme.palette.centerRipple,
                  borderless: true,
                }}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                accessibilityLabel={descriptor.options.tabBarAccessibilityLabel}
                key={item.routeName}
                onLongPress={onLongPress}
                onPress={onPress}
                style={({ pressed }) => [
                  styles.centerItem,
                  pressed && styles.centerItemPressed,
                ]}
              >
                <View style={styles.centerHalo}>
                  <LinearGradient
                    colors={bottomBarTheme.palette.centerGradient}
                    end={{ x: 1, y: 1 }}
                    start={{ x: 0, y: 0 }}
                    style={styles.centerButton}
                  >
                    <CenterIcon
                      color={bottomBarTheme.palette.surface}
                      size={bottomBarTheme.sizes.centerIcon}
                      strokeWidth={2.1}
                    />
                  </LinearGradient>
                </View>
              </Pressable>
            );
          }

          const SideIcon = item.Icon;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={descriptor.options.tabBarAccessibilityLabel}
              key={item.routeName}
              onLongPress={onLongPress}
              onPress={onPress}
              style={styles.sideItem}
            >
              <View style={styles.sideContent}>
                <View style={styles.sideIconSlot}>
                  {item.iconSource ? (
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      source={item.iconSource}
                      style={[
                        styles.sideIconImage,
                        {
                          tintColor: focused
                            ? item.activeTintColor || bottomBarTheme.palette.active
                            : item.inactiveTintColor || bottomBarTheme.palette.iconInactive,
                        },
                      ]}
                    />
                  ) : (
                    <SideIcon
                      color={
                        focused
                          ? item.activeTintColor || bottomBarTheme.palette.active
                          : item.inactiveTintColor || bottomBarTheme.palette.iconInactive
                      }
                      size={bottomBarTheme.sizes.sideIcon}
                      strokeWidth={2}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.sideLabel,
                    {
                      color: focused
                        ? item.activeLabelColor || bottomBarTheme.palette.active
                        : item.inactiveLabelColor ||
                          bottomBarTheme.palette.labelInactive,
                      fontFamily: focused
                        ? constant.typeSemiBold
                        : constant.typeMedium,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    bottom: 0,
    elevation: 999,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 999,
  },
  container: {
    alignItems: "flex-end",
    backgroundColor: bottomBarTheme.palette.surface,
    borderTopColor: bottomBarTheme.palette.border,
    borderTopLeftRadius: bottomBarTheme.sizes.containerRadius,
    borderTopRightRadius: bottomBarTheme.sizes.containerRadius,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: bottomBarTheme.sizes.containerMinHeight,
    overflow: "visible",
    paddingHorizontal: bottomBarTheme.spacing.containerHorizontal,
    paddingTop: bottomBarTheme.spacing.containerTop,
    ...bottomBarTheme.shadows.container,
  },
  sideItem: {
    alignItems: "center",
    borderRadius: constant.compactRadii.pill,
    flex: 1,
    justifyContent: "center",
    minHeight: bottomBarTheme.sizes.sideItemMinHeight,
    paddingBottom: bottomBarTheme.spacing.itemBottom,
    paddingTop: bottomBarTheme.spacing.itemTop,
  },
  sideContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: bottomBarTheme.spacing.itemHorizontal,
  },
  sideIconSlot: {
    alignItems: "center",
    height: bottomBarTheme.sizes.sideIconSlot,
    justifyContent: "center",
  },
  sideIconImage: {
    height: bottomBarTheme.sizes.sideIcon,
    width: bottomBarTheme.sizes.sideIcon,
  },
  sideLabel: {
    fontSize: bottomBarTheme.sizes.sideLabel,
    marginTop: bottomBarTheme.spacing.labelTop,
    textTransform: "none",
  },
  centerItem: {
    alignItems: "center",
    flex: 1,
    position: "relative",
    top: -bottomBarTheme.sizes.centerOffset,
  },
  centerItemPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.97 }],
  },
  centerHalo: {
    alignItems: "center",
    backgroundColor: bottomBarTheme.palette.surface,
    borderColor: bottomBarTheme.palette.surface,
    borderRadius: bottomBarTheme.sizes.centerHalo / 2,
    borderWidth: constant.compactSpacing.xs,
    height: bottomBarTheme.sizes.centerHalo,
    justifyContent: "center",
    width: bottomBarTheme.sizes.centerHalo,
    ...bottomBarTheme.shadows.centerHalo,
  },
  centerButton: {
    alignItems: "center",
    borderRadius: bottomBarTheme.sizes.centerButton / 2,
    height: bottomBarTheme.sizes.centerButton,
    justifyContent: "center",
    width: bottomBarTheme.sizes.centerButton,
  },
});

export default BottomBar;
