import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { apiRequest } from "../../../Utils";
import { LIBRARY_COPY } from "../../../constants/libraryLeaveCopy";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import LibraryScreenView from "../../common/LibraryScreenView";
import {
  buildIssuedBookDetailPayload,
  buildLibraryBookDetailPayload,
} from "../../common/libraryDetailUtils";

const StaffLibrary = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("issued");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [originalLibraryBooks, setOriginalLibraryBooks] = useState([]);
  const staffId = 1645;

  const getLibraryBooks = useCallback(async () => {
    try {
      const response = await apiRequest("getLibraryBooks", "GET");
      const nextBooks = response?.status ? response?.books || [] : [];
      setLibraryBooks(nextBooks);
      setOriginalLibraryBooks(nextBooks);
    } catch (error) {
      console.log("Library Books API Error", error);
    }
  }, []);

  const getIssuedBooks = useCallback(async () => {
    try {
      const response = await apiRequest(
        `getTeacherIssuedBooks?staff_id=${staffId}`,
        "GET"
      );
      const nextBooks = response?.status ? response?.books || [] : [];
      setIssuedBooks(nextBooks);
    } catch (error) {
      console.log("Issued Books API Error", error);
    }
  }, [staffId]);

  const loadLibrary = useCallback(async () => {
    await Promise.all([getLibraryBooks(), getIssuedBooks()]);
  }, [getIssuedBooks, getLibraryBooks]);

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
    id: item?.id || `issued-${index}`,
    detailPayload: buildIssuedBookDetailPayload(item),
    title: item?.book_title || LIBRARY_COPY.tabs.issued,
    dateRange: `${item?.issue_date || ""} — ${item?.return_date || ""}`.trim(),
    fineText: "",
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
      onBackPress={() => navigation.navigate("StaffHome")}
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

export default StaffLibrary;
