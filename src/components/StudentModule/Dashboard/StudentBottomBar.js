import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as constant from '../../../Utils/Constant';

const TAB_ITEMS = [
  {
    icon: constant.Icons.achivement,
    label: 'Achieve',
    routeName: 'Achievement',
  },
  {
    icon: constant.Icons.grade,
    label: 'Grades',
    routeName: 'Grade',
  },
  {
    icon: constant.Icons.house,
    isCenter: true,
    label: 'Home',
    routeName: 'Home',
  },
  {
    icon: constant.Icons.planner,
    label: 'Planner',
    routeName: 'Help & Supports',
  },
  {
    icon: constant.Icons.proficiency,
    label: 'Progress',
    routeName: 'StudentPerformace',
  },
];

const StudentBottomBar = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {paddingBottom: Math.max(insets.bottom, constant.resW(2.5))},
        ]}
      >
        {TAB_ITEMS.map(item => {
          const routeIndex = state.routes.findIndex(
            route => route.name === item.routeName,
          );
          const route = state.routes[routeIndex];
          const descriptor = descriptors[route.key];
          const focused = state.index === routeIndex;

          const onPress = () => {
            const event = navigation.emit({
              canPreventDefault: true,
              target: route.key,
              type: 'tabPress',
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              target: route.key,
              type: 'tabLongPress',
            });
          };

          if (item.isCenter) {
            return (
              <Pressable
                accessibilityLabel={descriptor.options.tabBarAccessibilityLabel}
                accessibilityRole="button"
                accessibilityState={focused ? {selected: true} : {}}
                key={item.routeName}
                onLongPress={onLongPress}
                onPress={onPress}
                style={({pressed}) => [
                  styles.centerItem,
                  pressed && styles.centerItemPressed,
                ]}
              >
                <View style={styles.centerHalo}>
                  <LinearGradient
                    colors={['#C100FF', '#5B39F6']}
                    end={{x: 1, y: 1}}
                    start={{x: 0, y: 0}}
                    style={styles.centerButton}
                  >
                    <FastImage
                      resizeMode="contain"
                      source={item.icon}
                      style={styles.centerIcon}
                    />
                  </LinearGradient>
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              accessibilityLabel={descriptor.options.tabBarAccessibilityLabel}
              accessibilityRole="button"
              accessibilityState={focused ? {selected: true} : {}}
              key={item.routeName}
              onLongPress={onLongPress}
              onPress={onPress}
              style={styles.sideItem}
            >
              <View style={[styles.sideInner, focused && styles.sideInnerActive]}>
                <View style={[styles.iconChip, focused && styles.iconChipActive]}>
                  <FastImage
                    resizeMode="contain"
                    source={item.icon}
                    style={[
                      styles.sideIcon,
                      !focused && styles.sideIconInactive,
                    ]}
                  />
                </View>
                <Text style={[styles.sideLabel, focused && styles.sideLabelActive]}>
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
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  container: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EEF2FF',
    borderTopLeftRadius: constant.resW(7),
    borderTopRightRadius: constant.resW(7),
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: constant.resW(20),
    paddingHorizontal: constant.resW(3),
    paddingTop: constant.resW(2.5),
    shadowColor: '#1F1B3D',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 16,
  },
  sideItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  sideInner: {
    alignItems: 'center',
    borderRadius: constant.resW(4),
    justifyContent: 'center',
    minWidth: constant.resW(16),
    paddingHorizontal: constant.resW(1),
    paddingVertical: constant.resW(1.2),
  },
  sideInnerActive: {
    backgroundColor: '#F5F3FF',
  },
  iconChip: {
    alignItems: 'center',
    borderRadius: constant.resW(3),
    height: constant.resW(10.5),
    justifyContent: 'center',
    width: constant.resW(10.5),
  },
  iconChipActive: {
    backgroundColor: '#FFFFFF',
  },
  sideIcon: {
    height: constant.resW(7.4),
    width: constant.resW(7.4),
  },
  sideIconInactive: {
    opacity: 0.92,
  },
  sideLabel: {
    color: '#8A94A6',
    fontFamily: constant.typeMedium,
    fontSize: constant.font10,
    marginTop: constant.resW(0.9),
  },
  sideLabelActive: {
    color: '#5B39F6',
    fontFamily: constant.typeSemiBold,
  },
  centerItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    top: -constant.resW(7.5),
  },
  centerItemPressed: {
    opacity: 0.96,
    transform: [{scale: 0.98}],
  },
  centerHalo: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: constant.resW(10),
    height: constant.resW(16.5),
    justifyContent: 'center',
    width: constant.resW(16.5),
    shadowColor: '#5B39F6',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  centerButton: {
    alignItems: 'center',
    borderRadius: constant.resW(8.5),
    height: constant.resW(13.5),
    justifyContent: 'center',
    width: constant.resW(13.5),
  },
  centerIcon: {
    height: constant.resW(8.2),
    width: constant.resW(8.2),
  },
});

export default React.memo(StudentBottomBar);
