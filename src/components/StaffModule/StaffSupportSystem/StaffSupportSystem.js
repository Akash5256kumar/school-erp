import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from "react-native-snackbar";

import staffApiClient from "../../../api/staffClient";
import { colors } from "../../../constants";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import SupportSystemScreenView from "../../common/SupportSystemScreenView";

const StaffSupportSystem = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("assigned");
  const [assignedData, setAssignedData] = useState([]);
  const [solvedData, setSolvedData] = useState([]);
  const [unsolvedData, setUnsolvedData] = useState([]);

  const handleBackPress = useCallback(() => {
    navigation.navigate("StaffHome");
    return true;
  }, [navigation]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => subscription.remove();
  }, [handleBackPress]);

  const showMessage = (message) => {
    Snackbar.show({
      backgroundColor: colors.danger,
      duration: Snackbar.LENGTH_SHORT,
      text: message,
    });
  };

  const supportSystemApi = useCallback(async (staffId, options = {}) => {
    const { resetActiveTab = false } = options;

    try {
      const responseJson = await staffApiClient.post("supportsystem", { staff_id: staffId });

      if (responseJson.status === true) {
        setAssignedData(responseJson.assigned || []);
        setUnsolvedData(responseJson.unSolved || []);
        setSolvedData(responseJson.solved || []);
        if (resetActiveTab) {
          setActiveTab("assigned");
        }
        return;
      }

      showMessage(responseJson.message);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadSupportData = useCallback(
    async (options = {}) => {
      const value = await AsyncStorage.getItem("@id");

      if (!value) {
        setAssignedData([]);
        setUnsolvedData([]);
        setSolvedData([]);
        return;
      }

      await supportSystemApi(value, options);
    },
    [supportSystemApi]
  );

  useEffect(() => {
    loadSupportData({ resetActiveTab: true });
  }, [loadSupportData]);

  const { onRefresh, refreshing } = usePullToRefresh(loadSupportData);

  const tickets = useMemo(() => {
    if (activeTab === "solved") {
      return solvedData;
    }

    if (activeTab === "unsolved") {
      return unsolvedData;
    }

    return assignedData;
  }, [activeTab, assignedData, solvedData, unsolvedData]);

  const openTicket = async (item) => {
    await AsyncStorage.setItem("@MyItem:key", JSON.stringify(item));

    if (activeTab === "assigned") {
      navigation.navigate("StaffSupportAssignedDetails");
      return;
    }

    if (activeTab === "solved") {
      navigation.navigate("StaffSupportSolvedDetails");
      return;
    }

    navigation.navigate("StaffSupportUnSolvedDetails");
  };

  return (
    <SupportSystemScreenView
      activeTab={activeTab}
      onBackPress={() => navigation.navigate("StaffHome")}
      onOpenTicket={openTicket}
      onRefresh={onRefresh}
      onTabChange={setActiveTab}
      refreshing={refreshing}
      tickets={tickets}
    />
  );
};

export default StaffSupportSystem;
