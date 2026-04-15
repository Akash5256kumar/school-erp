import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BookOpen, CalendarDays, ChevronRight } from "lucide-react-native";

import { LIBRARY_COPY } from "../../constants/libraryLeaveCopy";
import { createLibraryLeaveTheme } from "../../constants/libraryLeaveTheme";
import {
  EmptyMessage,
  FloatingActionButton,
  ModuleHeader,
  SearchFieldCard,
} from "./LibraryLeavePrimitives";

const tabs = [
  { key: "issued", label: LIBRARY_COPY.tabs.issued },
  { key: "library", label: LIBRARY_COPY.tabs.library },
];

/* ─── Tabs rendered inside the gradient header ─────────────────────────────── */
const GradientTabs = ({ theme, activeKey, onChange, counts }) => {
  const sp = theme.spacing;
  const t = theme.typography;

  return (
    <View
      style={{
        columnGap: sp.statGap,
        flexDirection: "row",
        paddingBottom: theme.metrics.vertical(20),
        paddingHorizontal: sp.screenHorizontal,
        paddingTop: theme.metrics.vertical(6),
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        const count = counts?.[tab.key];

        return (
          <Pressable
            accessibilityRole="button"
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[
              {
                alignItems: "center",
                backgroundColor: isActive
                  ? "#fff"
                  : "rgba(255,255,255,0.15)",
                borderRadius: theme.radii.pill,
                flex: 1,
                flexDirection: "row",
                height: theme.sizes.tabHeight,
                justifyContent: "center",
                columnGap: theme.metrics.scale(6),
              },
              isActive ? theme.shadows.pill : null,
            ]}
          >
            <Text
              style={{
                color: isActive
                  ? theme.palette.primaryBlue
                  : "rgba(255,255,255,0.9)",
                fontFamily: isActive
                  ? theme.fonts.bold
                  : theme.fonts.medium,
                fontSize: t.tabLabel,
              }}
            >
              {tab.label}
            </Text>
            {count != null && count > 0 ? (
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: isActive
                    ? theme.palette.primaryBlue
                    : "rgba(255,255,255,0.25)",
                  borderRadius: 10,
                  height: theme.metrics.scale(20),
                  justifyContent: "center",
                  minWidth: theme.metrics.scale(20),
                  paddingHorizontal: theme.metrics.scale(5),
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: theme.fonts.bold,
                    fontSize: theme.metrics.scale(10),
                  }}
                >
                  {count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
};

/* ─── Issued Book Card ──────────────────────────────────────────────────────── */
const IssuedCard = ({ theme, title, dateRange, fineText, onPress }) => {
  const sp = theme.spacing;
  const t = theme.typography;
  const p = theme.palette;

  const [issueDate, returnDate] = (dateRange || "").split("—").map((s) =>
    s.trim()
  );

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: p.surfaceRaised,
            borderRadius: theme.radii.card,
            flexDirection: "row",
            overflow: "hidden",
          },
          theme.shadows.card,
        ]}
      >
        {/* Left gradient accent bar */}
        <LinearGradient
          colors={["#C100FF", "#5B39F6"]}
          end={{ x: 0, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={{ width: theme.metrics.scale(4) }}
        />

        {/* Content */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: sp.cardPaddingTight,
            paddingVertical: theme.metrics.vertical(14),
          }}
        >
          {/* Title */}
          <Text
            numberOfLines={2}
            style={{
              color: p.textStrong,
              fontFamily: theme.fonts.bold,
              fontSize: t.cardTitle,
              lineHeight: t.cardTitle * 1.35,
            }}
          >
            {title}
          </Text>

          {/* Date chips */}
          {(issueDate || returnDate) ? (
            <View
              style={{
                alignItems: "center",
                columnGap: theme.metrics.scale(6),
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: theme.metrics.vertical(10),
                rowGap: theme.metrics.vertical(6),
              }}
            >
              {issueDate ? (
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: theme.palette.surfaceMutedPurple,
                    borderRadius: theme.radii.button,
                    columnGap: theme.metrics.scale(4),
                    flexDirection: "row",
                    paddingHorizontal: theme.metrics.scale(8),
                    paddingVertical: theme.metrics.vertical(4),
                  }}
                >
                  <CalendarDays
                    color={p.primaryBlue}
                    size={theme.metrics.scale(12)}
                    strokeWidth={2.2}
                  />
                  <Text
                    style={{
                      color: p.primaryBlue,
                      fontFamily: theme.fonts.semiBold,
                      fontSize: t.caption,
                    }}
                  >
                    {issueDate}
                  </Text>
                </View>
              ) : null}

              {issueDate && returnDate ? (
                <ChevronRight
                  color={p.textMuted}
                  size={theme.metrics.scale(12)}
                  strokeWidth={2.5}
                />
              ) : null}

              {returnDate ? (
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#FEF3C7",
                    borderRadius: theme.radii.button,
                    columnGap: theme.metrics.scale(4),
                    flexDirection: "row",
                    paddingHorizontal: theme.metrics.scale(8),
                    paddingVertical: theme.metrics.vertical(4),
                  }}
                >
                  <CalendarDays
                    color="#B45309"
                    size={theme.metrics.scale(12)}
                    strokeWidth={2.2}
                  />
                  <Text
                    style={{
                      color: "#B45309",
                      fontFamily: theme.fonts.semiBold,
                      fontSize: t.caption,
                    }}
                  >
                    {returnDate}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* Fine badge */}
          {fineText ? (
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: theme.palette.badgeDangerBg,
                borderRadius: theme.radii.pill,
                marginTop: theme.metrics.vertical(8),
                paddingHorizontal: theme.metrics.scale(8),
                paddingVertical: theme.metrics.vertical(3),
              }}
            >
              <Text
                style={{
                  color: theme.palette.badgeDangerText,
                  fontFamily: theme.fonts.semiBold,
                  fontSize: t.caption,
                }}
              >
                {fineText}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Chevron */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingRight: sp.cardPaddingTight,
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.palette.surfaceMutedPurple,
              borderRadius: theme.metrics.scale(20),
              height: theme.metrics.scale(32),
              justifyContent: "center",
              width: theme.metrics.scale(32),
            }}
          >
            <ChevronRight
              color={p.primaryBlue}
              size={theme.sizes.arrowIcon * 0.85}
              strokeWidth={2.5}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

/* ─── Library Book Card ─────────────────────────────────────────────────────── */
const LibraryCard = ({ theme, title, authorText, onPress }) => {
  const sp = theme.spacing;
  const t = theme.typography;
  const p = theme.palette;

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View
        style={[
          {
            alignItems: "center",
            backgroundColor: p.surfaceRaised,
            borderRadius: theme.radii.card,
            columnGap: sp.iconGap,
            flexDirection: "row",
            padding: sp.cardPaddingTight,
          },
          theme.shadows.card,
        ]}
      >
        {/* Book glyph */}
        <LinearGradient
          colors={["#EDE9FF", "#F5F3FF"]}
          style={{
            alignItems: "center",
            borderRadius: theme.radii.iconWrap,
            height: theme.sizes.listGlyphWrap,
            justifyContent: "center",
            width: theme.sizes.listGlyphWrap,
          }}
        >
          <BookOpen
            color={p.primaryBlue}
            size={theme.sizes.iconBadge * 0.85}
            strokeWidth={1.85}
          />
        </LinearGradient>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              color: p.textStrong,
              fontFamily: theme.fonts.bold,
              fontSize: t.cardTitle,
              lineHeight: t.cardTitle * 1.35,
            }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: p.textBody,
              fontFamily: theme.fonts.medium,
              fontSize: t.body,
              marginTop: sp.textGap,
            }}
          >
            {authorText}
          </Text>
        </View>

        {/* Chevron pill */}
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.palette.surfaceMutedPurple,
            borderRadius: theme.metrics.scale(20),
            height: theme.metrics.scale(32),
            justifyContent: "center",
            width: theme.metrics.scale(32),
          }}
        >
          <ChevronRight
            color={p.primaryBlue}
            size={theme.sizes.arrowIcon * 0.85}
            strokeWidth={2.5}
          />
        </View>
      </View>
    </Pressable>
  );
};

/* ─── Main screen ───────────────────────────────────────────────────────────── */
const LibraryScreenView = ({
  title = LIBRARY_COPY.title,
  activeTab,
  onTabChange,
  onBackPress,
  issuedItems,
  libraryItems,
  searchVisible,
  searchValue,
  onSearchChange,
  onToggleSearch,
  refreshing,
  onRefresh,
  onPressIssuedItem,
  onPressLibraryItem,
}) => {
  const { width, height } = useWindowDimensions();
  const theme = createLibraryLeaveTheme({ width, height });
  const isLibraryTab = activeTab === "library";
  const data = isLibraryTab ? libraryItems : issuedItems;

  const counts = {
    issued: issuedItems?.length ?? 0,
    library: libraryItems?.length ?? 0,
  };

  return (
    <View style={{ backgroundColor: theme.palette.pageBase, flex: 1 }}>
      {/* Gradient header + tabs unified */}
      <LinearGradient
        colors={theme.palette.headerGradient}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={{
          borderBottomLeftRadius: theme.metrics.scale(28),
          borderBottomRightRadius: theme.metrics.scale(28),
          overflow: "hidden",
        }}
      >
        <ModuleHeader
          onBackPress={onBackPress}
          theme={theme}
          title={title}
        />
        <GradientTabs
          activeKey={activeTab}
          counts={counts}
          onChange={onTabChange}
          theme={theme}
        />
      </LinearGradient>

      {/* Body */}
      <LinearGradient colors={theme.palette.pageGradient} style={{ flex: 1 }}>
        {isLibraryTab && searchVisible ? (
          <SearchFieldCard
            onChangeText={onSearchChange}
            placeholder={LIBRARY_COPY.searchPlaceholder}
            theme={theme}
            value={searchValue}
          />
        ) : null}

        <FlatList
          contentContainerStyle={{
            paddingBottom:
              theme.spacing.listBottom +
              (isLibraryTab ? theme.sizes.floatingButton : 0),
            paddingHorizontal: theme.spacing.screenHorizontal,
            paddingTop: theme.spacing.sectionGap,
          }}
          data={data}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.spacing.cardGap }} />
          )}
          keyExtractor={(item, index) => String(item.id ?? item.key ?? index)}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={() => (
            <EmptyMessage
              message={
                isLibraryTab
                  ? LIBRARY_COPY.emptyLibrary
                  : LIBRARY_COPY.emptyIssued
              }
              theme={theme}
            />
          )}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) =>
            isLibraryTab ? (
              <LibraryCard
                authorText={item.authorText}
                onPress={() => onPressLibraryItem?.(item)}
                theme={theme}
                title={item.title}
              />
            ) : (
              <IssuedCard
                dateRange={item.dateRange}
                fineText={item.fineText}
                onPress={() => onPressIssuedItem?.(item)}
                theme={theme}
                title={item.title}
              />
            )
          }
          showsVerticalScrollIndicator={false}
        />

        {isLibraryTab ? (
          <FloatingActionButton
            onPress={onToggleSearch}
            sizeVariant="compact"
            theme={theme}
          />
        ) : null}
      </LinearGradient>
    </View>
  );
};

export default React.memo(LibraryScreenView);
