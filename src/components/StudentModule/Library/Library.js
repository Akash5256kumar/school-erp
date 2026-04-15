import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import moment from "moment";

import * as myConst from "../../Baseurl";
import { LIBRARY_COPY } from "../../../constants/libraryLeaveCopy";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import LibraryScreenView from "../../common/LibraryScreenView";
import {
  buildIssuedBookDetailPayload,
  buildLibraryBookDetailPayload,
} from "../../common/libraryDetailUtils";

const Library = ({ navigation }) => {
  const {token: usertoken} = useStudentAuth();
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [originalLibraryBooks, setOriginalLibraryBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("issued");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleBackPress = useCallback(() => {
    navigation.navigate("Dashboard");
    return true;
  }, [navigation]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => subscription.remove();
  }, [handleBackPress]);

  const libraryBookIssueApi = useCallback(
    async (stdRoll) => {
      const formData = new FormData();
      formData.append("std_roll", stdRoll);

      const response = await fetch(myConst.BASEURL + "issueBook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: usertoken,
        },
        body: formData,
      });

      const responseJson = await response.json();
      const nextBooks = responseJson?.data || [];
      setIssuedBooks(nextBooks);
    },
    [usertoken]
  );

  const libraryApi = useCallback(
    async (stdRoll) => {
      const formData = new FormData();
      formData.append("std_roll", stdRoll);

      const response = await fetch(myConst.BASEURL + "viewlibrary", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: usertoken,
        },
        body: formData,
      });

      const responseJson = await response.json();
      const nextBooks = responseJson?.data || [];
      setLibraryBooks(nextBooks);
      setOriginalLibraryBooks(nextBooks);
    },
    [usertoken]
  );

  const loadLibrary = useCallback(async () => {
    try {
      const storedRoll = await AsyncStorage.getItem("@std_roll");
      const resolvedRoll = storedRoll || "";

      if (!resolvedRoll) {
        setIssuedBooks([]);
        setLibraryBooks([]);
        setOriginalLibraryBooks([]);
        return;
      }

      await Promise.all([
        libraryApi(resolvedRoll),
        libraryBookIssueApi(resolvedRoll),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, [libraryApi, libraryBookIssueApi]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const { onRefresh, refreshing } = usePullToRefresh(loadLibrary);

  const handleSearchChange = (text) => {
    setSearchValue(text);

    const normalizedQuery = text.trim().toLowerCase();

    if (!normalizedQuery) {
      setLibraryBooks(originalLibraryBooks);
      return;
    }

    const filteredBooks = originalLibraryBooks.filter((item) =>
      `${item?.title || ""} ${item?.author_name || ""}`
        .toLowerCase()
        .includes(normalizedQuery)
    );

    setLibraryBooks(filteredBooks);
  };

  const handleTabChange = (nextTab) => {
    setActiveTab(nextTab);

    if (nextTab === "issued") {
      setSearchVisible(false);
      setSearchValue("");
      setLibraryBooks(originalLibraryBooks);
    }
  };

  const handleIssuedPress = useCallback(
    (item) => {
      if (item?.detailPayload) {
        navigation.navigate("LibraryBookDetail", item.detailPayload);
      }
    },
    [navigation]
  );

  const handleLibraryPress = useCallback(
    (item) => {
      if (item?.detailPayload) {
        navigation.navigate("LibraryBookDetail", item.detailPayload);
      }
    },
    [navigation]
  );

  const issuedItems = issuedBooks.map((item, index) => ({
    id: item?.issue?.id || item?.book?.id || `issued-${index}`,
    detailPayload: buildIssuedBookDetailPayload(item),
    title: item?.book?.title || LIBRARY_COPY.tabs.issued,
    dateRange: `${moment(item?.issue?.issue_date).format(
      "DD-MM-YYYY"
    )} — ${moment(item?.issue?.return_date).format("DD-MM-YYYY")}`,
    fineText: Number(item?.issue?.fine) > 0 ? `Fine: ${item?.issue?.fine}` : "",
  }));

  const libraryItems = libraryBooks.map((item, index) => ({
    id: item?.id || `library-${index}`,
    detailPayload: buildLibraryBookDetailPayload(item),
    title: item?.title || "",
    authorText: `${LIBRARY_COPY.writtenByPrefix} ${
      item?.author_name || ""
    }`.trim(),
  }));

  return (
    <LibraryScreenView
      activeTab={activeTab}
      issuedItems={issuedItems}
      libraryItems={libraryItems}
      onBackPress={() => navigation.goBack()}
      onRefresh={onRefresh}
      onSearchChange={handleSearchChange}
      onPressIssuedItem={handleIssuedPress}
      onPressLibraryItem={handleLibraryPress}
      onTabChange={handleTabChange}
      onToggleSearch={() => setSearchVisible((previous) => !previous)}
      refreshing={refreshing}
      searchValue={searchValue}
      searchVisible={searchVisible}
    />
  );
};

export default Library;
