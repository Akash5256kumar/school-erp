import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StudentDocumentList from "../Shared/StudentDocumentList";
import {
  areNewsItemsEqual,
  fetchNewsItems,
  formatNewsDate,
  NEWS_REFRESH_INTERVAL_MS,
} from "./newsUtils";

const News = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsRequestIdRef = useRef(0);
  const hasLoadedNewsRef = useRef(false);

  const loadNews = useCallback(async ({ showLoader = false } = {}) => {
    const requestId = newsRequestIdRef.current + 1;
    newsRequestIdRef.current = requestId;

    if (showLoader) {
      setLoading(true);
    }

    try {
      const newsItems = await fetchNewsItems();

      if (requestId !== newsRequestIdRef.current) {
        return;
      }

      setItems((previousItems) =>
        areNewsItemsEqual(previousItems, newsItems) ? previousItems : newsItems
      );
    } catch (error) {
      console.log("News API Error", error);

      if (requestId !== newsRequestIdRef.current) {
        return;
      }

      setItems([]);
    } finally {
      if (requestId === newsRequestIdRef.current) {
        hasLoadedNewsRef.current = true;
        setLoading(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNews({ showLoader: !hasLoadedNewsRef.current });

      const intervalId = setInterval(() => {
        loadNews();
      }, NEWS_REFRESH_INTERVAL_MS);

      return () => {
        clearInterval(intervalId);
      };
    }, [loadNews])
  );

  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Dashboard");
      return true;
    });
    return () => handler.remove();
  }, [navigation]);

  const renderCard = useCallback((item) => ({
    title: item.title || "News Update",
    date: formatNewsDate(item.date),
    accentColor: "#f59e0b", // Custom orange/yellow accent for news
    emoji: "📰",
  }), []);

  const handleCardPress = useCallback((item) => {
    navigation.navigate("NewsDetail", { newsItem: item });
  }, [navigation]);

  return (
    <StudentDocumentList
      title="News"
      items={items}
      renderCard={renderCard}
      onCardPress={handleCardPress}
      onBack={() => navigation.goBack()}
      searchFields={["title"]}
      emptyMessage={loading ? "Loading news..." : "No news available at the moment."}
      accentColor="#f59e0b"
      headerEmoji="📰"
    />
  );
};

export default News;
