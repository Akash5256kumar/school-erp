import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from "../../../constants";
import * as constant from "../../../Utils/Constant";
import { formatNewsDate } from "../News/newsUtils";

const AUTO_SCROLL_MS = 3000;
const COLLAPSED_DESCRIPTION_LINES = 4;

const HomeNewsSection = ({
  items,
  loading,
  onPressItem,
  onPressViewAll,
  showHeader = true,
}) => {
  const listRef = useRef(null);
  const timerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isUserInteractingRef = useRef(false);
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = useMemo(() => Math.round(width * 0.8), [width]);
  const cardGap = spacing.md;
  const snapInterval = cardWidth + cardGap;
  const snapOffsets = useMemo(
    () => (items || []).map((_, index) => index * snapInterval),
    [items, snapInterval]
  );

  const stopAutoScroll = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();

    if (!items?.length || items.length <= 1) {
      return;
    }

    timerRef.current = setTimeout(() => {
      const nextIndex = (currentIndexRef.current + 1) % items.length;
      listRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
        viewPosition: 0,
      });
      currentIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      startAutoScroll();
    }, AUTO_SCROLL_MS);
  }, [items, stopAutoScroll]);

  useEffect(() => {
    currentIndexRef.current = 0;
    setActiveIndex(0);
    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, [items, startAutoScroll, stopAutoScroll]);

  const handleMomentumEnd = useCallback(
    (event) => {
      const offsetX = event?.nativeEvent?.contentOffset?.x || 0;
      const nextIndex = snapInterval
        ? Math.round(offsetX / snapInterval)
        : 0;

      currentIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      if (isUserInteractingRef.current) {
        isUserInteractingRef.current = false;
        startAutoScroll();
      }
    },
    [snapInterval, startAutoScroll]
  );

  const renderNewsCard = useCallback(({ item }) => {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => onPressItem?.(item)}
        style={[styles.card, { marginRight: cardGap, width: cardWidth }]}
      >
        <View style={styles.content}>
          <Text numberOfLines={3} style={styles.title}>
            {item?.title}
          </Text>
          <Text style={styles.date}>{formatNewsDate(item?.date)}</Text>

          <View style={styles.descriptionBlock}>
            <Text
              numberOfLines={COLLAPSED_DESCRIPTION_LINES}
              style={styles.description}
            >
              {item?.description || "Tap to view the full news update."}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }, [cardGap, cardWidth, onPressItem]);

  return (
    <View style={[styles.section, !showHeader ? styles.sectionCompact : null]}>
      {showHeader ? (
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <Pressable accessibilityRole="button" onPress={onPressViewAll}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Loading latest news...</Text>
        </View>
      ) : items?.length ? (
        <>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={items}
            decelerationRate="normal"
            disableIntervalMomentum
            getItemLayout={(_, index) => ({
              index,
              length: snapInterval,
              offset: snapInterval * index,
            })}
            horizontal
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={handleMomentumEnd}
            onScrollBeginDrag={() => {
              isUserInteractingRef.current = true;
              stopAutoScroll();
            }}
            onScrollToIndexFailed={({ index }) => {
              listRef.current?.scrollToOffset({
                animated: true,
                offset: index * snapInterval,
              });
            }}
            ref={listRef}
            renderItem={renderNewsCard}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToOffsets={snapOffsets}
          />

          {items.length > 1 ? (
            <View style={styles.indicatorRow}>
              {items.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.indicator,
                    index === activeIndex ? styles.indicatorActive : null,
                  ]}
                />
              ))}
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No news available right now.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xxl,
    marginTop: spacing.md,
  },
  sectionCompact: {
    marginBottom: 0,
    marginTop: 0,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  sectionTitle: {
    color: colors.primaryDark,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontXL,
  },
  viewAllText: {
    color: colors.info,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontRegular,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xs,
    paddingRight: spacing.sm,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    minHeight: 214,
    overflow: "hidden",
    ...shadows.light,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontMedium,
    lineHeight: typography.fontMedium * 1.3,
  },
  date: {
    color: colors.info,
    fontFamily: constant.typeMedium,
    fontSize: typography.fontSmall,
    marginTop: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: constant.typeRegular,
    fontSize: typography.fontRegular,
    lineHeight: typography.fontRegular * 1.45,
    marginTop: spacing.sm,
  },
  descriptionBlock: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: spacing.xs,
  },
  indicatorRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  indicator: {
    backgroundColor: "#C9D5F4",
    borderRadius: radii.round,
    height: 8,
    marginHorizontal: 3,
    width: 8,
  },
  indicatorActive: {
    backgroundColor: colors.primaryDark,
    width: 20,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    marginHorizontal: spacing.sm,
    minHeight: 120,
    justifyContent: "center",
    padding: spacing.xl,
    ...shadows.light,
  },
  emptyText: {
    color: colors.textSecondary,
    fontFamily: constant.typeMedium,
    fontSize: typography.fontRegular,
    textAlign: "center",
  },
});

export default React.memo(HomeNewsSection);
