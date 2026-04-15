import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import CommonHeader from "../../CommonHeader";
import { STRINGS } from "../../../constants";
import { fetchStaffProfileTeachingInfo } from "../../../Utils/teachingInfo";
import TeachingAssignmentCard from "./TeachingAssignmentCard";
import createStaffProfileTheme from "./profileTheme";

const TeachingInfo = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const userData = useSelector((state) => state.userSlice.userData);
  const { height, width } = useWindowDimensions();
  const theme = useMemo(
    () => createStaffProfileTheme({ height, width }),
    [height, width]
  );
  const screenStrings = STRINGS.staffProfile.teachingInformation;
  const [teachingInfo, setTeachingInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTeachingInfo = async () => {
      try {
        setLoading(true);
        const info = await fetchStaffProfileTeachingInfo(userData?.staff_info_id);
        setTeachingInfo(info);
      } catch (error) {
        console.log("TeachingInfo API Error", error);
        setTeachingInfo([]);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.staff_info_id) {
      getTeachingInfo();
    } else {
      setTeachingInfo([]);
    }
  }, [userData?.staff_info_id]);

  const cards = useMemo(() => {
    const gradients = [
      {
        end: theme.colors.teachingInfoBlueEnd,
        start: theme.colors.teachingInfoBlueStart,
      },
      {
        end: theme.colors.teachingInfoPurpleEnd,
        start: theme.colors.teachingInfoPurpleStart,
      },
      {
        end: theme.colors.teachingInfoGreenEnd,
        start: theme.colors.teachingInfoGreenStart,
      },
    ];
    const teacherName =
      userData?.name ||
      userData?.staff_name ||
      userData?.full_name ||
      userData?.teacher ||
      "-";

    return (teachingInfo || [])
      .filter(
        (item) => item?.class || item?.section || item?.subject || teacherName
      )
      .map((item, index) => ({
        class: item?.class || "-",
        gradient: gradients[index % gradients.length],
        id:
          item?.id ||
          `${item?.class || "class"}-${item?.section || "section"}-${
            item?.subject || "subject"
          }-${index}`,
        section: item?.section || "-",
        subject: item?.subject || "-",
        teacher:
          item?.teacher ||
          item?.teacher_name ||
          item?.staff_name ||
          teacherName,
      }));
  }, [
    theme.colors.teachingInfoBlueEnd,
    theme.colors.teachingInfoBlueStart,
    theme.colors.teachingInfoGreenEnd,
    theme.colors.teachingInfoGreenStart,
    theme.colors.teachingInfoPurpleEnd,
    theme.colors.teachingInfoPurpleStart,
    teachingInfo,
    userData?.full_name,
    userData?.name,
    userData?.staff_name,
    userData?.teacher,
  ]);

  const renderItem = ({ item }) => (
    <TeachingAssignmentCard
      item={item}
      theme={{
        cardTheme: theme,
        iconGradient: [item.gradient.start, item.gradient.end],
        labels: screenStrings.labels,
      }}
    />
  );

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
          onLeftClick={() => navigation.goBack()}
          textColor={theme.colors.headerText}
          title={screenStrings.title}
          titleStyle={theme.typography.headerTitle}
        />

        <FlatList
          contentContainerStyle={[
            styles.listContent,
            {
              minHeight: theme.sizing.scrollMinHeight + insets.bottom,
              paddingBottom: theme.spacing.formBottom + insets.bottom,
              paddingHorizontal: theme.spacing.contentHorizontal,
              paddingTop: theme.spacing.formTop + theme.spacing.labelGap,
            },
          ]}
          data={cards}
          keyExtractor={(item, index) =>
            `${String(item?.id ?? item?.key ?? "teaching")}-${index}`
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: theme.colors.profileCardBackground,
                  borderRadius: theme.radii.profileCard,
                  paddingHorizontal: theme.spacing.teachingCardHorizontal,
                  paddingVertical: theme.spacing.teachingCardHorizontal,
                },
                theme.shadows.profileCard,
              ]}
            >
              <Text style={theme.typography.profileName}>
                {loading ? STRINGS.common.loading : STRINGS.common.noDataTitle}
              </Text>
              <Text
                style={[
                  theme.typography.profileSubtitle,
                  {
                    marginTop: theme.spacing.labelGap,
                  },
                ]}
              >
                {loading
                  ? "Fetching teaching assignments..."
                  : STRINGS.common.noDataDescription}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.spacing.teachingCardGap }} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    width: "100%",
  },
  emptyState: {
    width: "100%",
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});

export default TeachingInfo;
