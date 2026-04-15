import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, View, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import staffApiClient from "../../../api/staffClient";
import { LEAVE_COPY } from "../../../constants/libraryLeaveCopy";
import { createLibraryLeaveTheme } from "../../../constants/libraryLeaveTheme";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import {
  EmptyMessage,
  FloatingActionButton,
  LeaveBalanceCard,
  LeaveRequestCard,
  ModuleHeader,
} from "../../common/LibraryLeavePrimitives";

const getStatusLabel = (status) => {
  if (status === 1) {
    return LEAVE_COPY.status.approved;
  }

  if (status === 2) {
    return LEAVE_COPY.status.cancelled;
  }

  return LEAVE_COPY.status.pending;
};

const StaffViewLeave = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const theme = createLibraryLeaveTheme({ width, height });
  const [dataSource, setDataSource] = useState([]);
  const [leaveSummary, setLeaveSummary] = useState({
    casualLeave: 0,
    sickLeave: 0,
    earnLeave: 0,
    remCasualLeave: 0,
    remSickLeave: 0,
    remEarnLeave: 0,
  });

  const navigateToHomeTab = useCallback(() => {
    navigation.navigate("StaffModuleBottomTabs", {
      screen: "StaffHome",
    });
  }, [navigation]);

  const handleBackPress = useCallback(() => {
    navigateToHomeTab();
    return true;
  }, [navigateToHomeTab]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => subscription.remove();
  }, [handleBackPress]);

  const viewLeavesApi = useCallback(async (userId) => {
    const responseJson = await staffApiClient.post("viewleaves", { user_id: userId });
    setDataSource(responseJson?.data || []);
  }, []);

  const leaveGettingApi = useCallback(async (userId) => {
    const responseJson = await staffApiClient.post("leavegetting", { id: userId });
    const summary = responseJson?.data || {};
    const casualLeave = Number(summary?.casual_leave || 0);
    const earnLeave = Number(summary?.annual_leave || 0);
    const sickLeave = Number(summary?.sick_leave || 0);

    setLeaveSummary({
      casualLeave,
      earnLeave,
      sickLeave,
      remCasualLeave: casualLeave - Number(summary?.cousume_casual_leave || 0),
      remEarnLeave: earnLeave - Number(summary?.cousume_annual_leave || 0),
      remSickLeave: sickLeave - Number(summary?.cousume_sick_leave || 0),
    });
  }, []);

  const loadLeaves = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem("@id");

      if (!userId) {
        setDataSource([]);
        return;
      }

      await Promise.all([viewLeavesApi(userId), leaveGettingApi(userId)]);
    } catch (error) {
      console.log(error);
    }
  }, [leaveGettingApi, viewLeavesApi]);

  useFocusEffect(
    useCallback(() => {
      loadLeaves();
    }, [loadLeaves])
  );

  const { onRefresh, refreshing } = usePullToRefresh(loadLeaves);

  const summaryCards = [
    {
      key: "casual",
      accentColor: theme.palette.primaryBlue,
      label: `${LEAVE_COPY.summaryLabels.casual} ${LEAVE_COPY.summaryLabels.suffix}`,
      remaining: leaveSummary.remCasualLeave,
    },
    {
      key: "earn",
      accentColor: theme.palette.primaryGreen,
      label: `${LEAVE_COPY.summaryLabels.earn} ${LEAVE_COPY.summaryLabels.suffix}`,
      remaining: leaveSummary.remEarnLeave,
    },
    {
      key: "sick",
      accentColor: theme.palette.primaryRed,
      label: `${LEAVE_COPY.summaryLabels.sick} ${LEAVE_COPY.summaryLabels.suffix}`,
      remaining: leaveSummary.remSickLeave,
    },
  ];

  return (
    <View style={{ backgroundColor: theme.palette.pageBase, flex: 1 }}>
      <ModuleHeader
        onBackPress={navigateToHomeTab}
        theme={theme}
        title={LEAVE_COPY.listTitle}
      />

      <LinearGradient colors={theme.palette.pageGradient} style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                columnGap: theme.spacing.statGap,
                flexDirection: "row",
                paddingBottom: theme.spacing.leaveListTop,
                paddingHorizontal: theme.spacing.screenHorizontal,
                paddingTop: theme.spacing.leaveSummaryTop,
              }}
            >
              {summaryCards.map((card) => (
                <LeaveBalanceCard
                  accentColor={card.accentColor}
                  key={card.key}
                  label={card.label}
                  remaining={card.remaining}
                  theme={theme}
                />
              ))}
            </View>
          }
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom:
              theme.spacing.listBottom +
              theme.spacing.floatingBottomOffset +
              theme.sizes.floatingButton,
          }}
          data={dataSource}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.spacing.cardGap }} />
          )}
          keyExtractor={(item, index) => String(item?.id || index)}
          ListEmptyComponent={() => (
            <EmptyMessage message={LEAVE_COPY.emptyList} theme={theme} />
          )}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: theme.spacing.screenHorizontal }}>
              <LeaveRequestCard
                endDate={item?.end_date || ""}
                leaveType={item?.leave_type || ""}
                onPress={async () => {
                  await AsyncStorage.setItem("@new_id", String(item?.id));
                  navigation.navigate("StaffLeaveDetail", {
                    leaveDetails: item,
                  });
                }}
                startDate={item?.start_date || ""}
                status={getStatusLabel(item?.status)}
                theme={theme}
                title={item?.subject || ""}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />

        <FloatingActionButton
          icon="plus"
          onPress={() => navigation.navigate("StaffAddLeave")}
          sizeVariant="compact"
          theme={theme}
        />
      </LinearGradient>
    </View>
  );
};

export default StaffViewLeave;
