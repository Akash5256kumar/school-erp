import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BookOpen, Hash, IndianRupee, Layers } from "lucide-react-native";

import { LIBRARY_COPY } from "../../constants/libraryLeaveCopy";
import { createLibraryLeaveTheme } from "../../constants/libraryLeaveTheme";
import { ModuleHeader } from "./LibraryLeavePrimitives";
import { buildAdditionalBookDetailRows } from "./libraryDetailUtils";

const BADGE_LABELS = new Set(["type", "class", "subject"]);
const STAT_LABELS = new Set(["price", "quantity"]);

const findRow = (rows, label) =>
  rows.find((r) => r.label.toLowerCase() === label.toLowerCase());

const HeroSection = ({ theme, rows, onBackPress, title }) => {
  const t = theme.typography;
  const sp = theme.spacing;

  const titleRow = findRow(rows, "title");
  const authorRow = findRow(rows, "author");
  const badgeRows = rows.filter((r) => BADGE_LABELS.has(r.label.toLowerCase()));

  return (
    <LinearGradient
      colors={["#C100FF", "#5B39F6"]}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={{
        borderBottomLeftRadius: theme.metrics.scale(32),
        borderBottomRightRadius: theme.metrics.scale(32),
        overflow: "hidden",
        paddingBottom: theme.metrics.vertical(48),
        position: "relative",
      }}
    >
      {/* Decorative background elements */}
      <View
        pointerEvents="none"
        style={{
          opacity: 0.08,
          position: "absolute",
          right: theme.metrics.scale(-20),
          top: theme.metrics.vertical(-30),
        }}
      >
        <BookOpen
          color="#fff"
          size={theme.metrics.scale(220)}
          strokeWidth={0.8}
        />
      </View>

      <ModuleHeader
        onBackPress={onBackPress}
        theme={theme}
        title={title}
      />

      {/* Main content overlay */}
      <View
        style={{
          paddingHorizontal: sp.screenHorizontal,
          paddingTop: theme.metrics.vertical(8),
        }}
      >
        {/* Book Icon & Title */}
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: theme.metrics.scale(18),
              height: theme.metrics.scale(64),
              justifyContent: "center",
              marginRight: theme.metrics.scale(16),
              width: theme.metrics.scale(64),
            }}
          >
            <BookOpen
              color="#fff"
              size={theme.metrics.scale(32)}
              strokeWidth={1.6}
            />
          </View>

          <View style={{ flex: 1, paddingTop: theme.metrics.vertical(2) }}>
            <Text
              numberOfLines={3}
              style={{
                color: "#fff",
                fontFamily: theme.fonts.bold,
                fontSize: t.sectionTitle * 1.1,
                lineHeight: t.sectionTitle * 1.35,
              }}
            >
              {titleRow?.value || "Untitled Book"}
            </Text>

            {authorRow ? (
              <Text
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: theme.fonts.medium,
                  fontSize: t.body,
                  marginTop: theme.metrics.vertical(8),
                }}
              >
                by {authorRow.value}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Modern badge pills */}
        {badgeRows.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: theme.metrics.vertical(20),
            }}
          >
            {badgeRows.map((row) => (
              <View
                key={row.label}
                style={{
                  backgroundColor: "rgba(255,255,255,0.22)",
                  borderRadius: theme.metrics.scale(24),
                  marginRight: theme.metrics.scale(10),
                  marginBottom: theme.metrics.vertical(8),
                  paddingHorizontal: theme.metrics.scale(14),
                  paddingVertical: theme.metrics.vertical(8),
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: theme.fonts.semiBold,
                    fontSize: t.caption,
                  }}
                >
                  {row.label === "Class" ? `Class ${row.value}` : row.value}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const StatCard = ({ theme, icon, label, value, gradientColors }) => {
  const t = theme.typography;
  const sp = theme.spacing;

  return (
    <View
      style={[
        {
          backgroundColor: theme.palette.surfaceRaised,
          borderRadius: theme.radii.card,
          flex: 1,
          overflow: "hidden",
        },
        theme.shadows.card,
      ]}
    >
      {/* Top accent bar */}
      <LinearGradient
        colors={gradientColors}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={{ height: theme.metrics.vertical(4) }}
      />
      <View
        style={{
          alignItems: "center",
          paddingBottom: theme.metrics.vertical(14),
          paddingHorizontal: sp.cardPaddingTight,
          paddingTop: theme.metrics.vertical(12),
        }}
      >
        {/* Icon circle */}
        <View
          style={{
            alignItems: "center",
            backgroundColor: gradientColors[0] + "1A",
            borderRadius: theme.metrics.scale(22),
            height: theme.metrics.scale(40),
            justifyContent: "center",
            marginBottom: theme.metrics.vertical(8),
            width: theme.metrics.scale(40),
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            color: theme.palette.textMuted,
            fontFamily: theme.fonts.medium,
            fontSize: t.caption,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            color: theme.palette.textStrong,
            fontFamily: theme.fonts.bold,
            fontSize: t.statValue * 0.78,
            marginTop: theme.metrics.vertical(2),
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const DetailCard = ({ theme, label, value, isMultiline }) => {
  const t = theme.typography;
  const sp = theme.spacing;
  const p = theme.palette;

  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: p.divider,
        paddingHorizontal: sp.cardPadding,
        paddingVertical: theme.metrics.vertical(18),
      }}
    >
      <Text
        style={{
          color: p.textMuted,
          fontFamily: theme.fonts.semiBold,
          fontSize: t.caption,
          letterSpacing: 0.5,
          marginBottom: theme.metrics.vertical(6),
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: p.textStrong,
          fontFamily: theme.fonts.bold,
          fontSize: isMultiline ? t.body : t.cardTitle,
          lineHeight: isMultiline ? t.body * 1.6 : undefined,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const DetailSection = ({ theme, rows }) => {
  const sp = theme.spacing;
  const p = theme.palette;
  const t = theme.typography;

  if (!rows.length) {
    return (
      <View style={{ marginTop: sp.sectionGap, paddingHorizontal: sp.screenHorizontal }}>
        <Text style={{ color: p.textMuted, fontFamily: theme.fonts.medium }}>
          {LIBRARY_COPY.emptyDetails}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: theme.metrics.vertical(32), paddingHorizontal: sp.screenHorizontal }}>
      {/* Section Header */}
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginBottom: theme.metrics.vertical(16),
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: p.surfaceMutedPurple,
            borderRadius: theme.metrics.scale(20),
            height: theme.metrics.scale(40),
            justifyContent: "center",
            marginRight: theme.metrics.scale(12),
            width: theme.metrics.scale(40),
          }}
        >
          <Hash color={theme.palette.primaryPurple} size={18} strokeWidth={2.2} />
        </View>
        <Text
          style={{
            color: p.textMuted,
            fontFamily: theme.fonts.bold,
            fontSize: t.caption,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          Book Information
        </Text>
      </View>

      {/* Details Card */}
      <View
        style={[
          {
            backgroundColor: p.surfaceRaised,
            borderRadius: theme.radii.card,
            overflow: "hidden",
          },
          theme.shadows.card,
        ]}
      >
        {rows.map((row, index) => (
          <View
            key={`${row.label}-${index}`}
            style={{
              borderBottomWidth:
                index !== rows.length - 1 ? StyleSheet.hairlineWidth : 0,
              borderColor: p.divider,
            }}
          >
            <DetailCard
              theme={theme}
              label={row.label}
              value={row.value}
              isMultiline={row.multiline}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const LibraryBookDetail = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();
  const theme = createLibraryLeaveTheme({ width, height });
  const params = route?.params || {};
  const detailRows = Array.isArray(params?.detailRows) ? params.detailRows : [];
  const additionalRows = buildAdditionalBookDetailRows(
    params?.rawData,
    params?.consumedPaths
  );
  const allRows = [...detailRows, ...additionalRows].filter(
    (row) => row?.label && row?.value
  );

  const priceRow = findRow(allRows, "price");
  const quantityRow = findRow(allRows, "quantity");

  // Filter out stat rows from main detail rows
  const rows = allRows.filter((r) => {
    const lbl = r.label.toLowerCase();
    return !STAT_LABELS.has(lbl);
  });

  const sp = theme.spacing;
  const iconSize = theme.metrics.scale(18);
  const iconStroke = 2.2;

  return (
    <View style={{ backgroundColor: theme.palette.pageBase, flex: 1 }}>
      <HeroSection
        onBackPress={() => navigation.goBack()}
        rows={allRows}
        theme={theme}
        title={params?.detailTitle || LIBRARY_COPY.detailsTitle}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: sp.listBottom,
          paddingTop: 0,
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: theme.metrics.vertical(-32) }}
      >
        {allRows.length === 0 ? (
          <View style={{ marginTop: theme.metrics.vertical(48), alignItems: "center" }}>
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.palette.surfaceMutedPurple,
                borderRadius: theme.metrics.scale(50),
                height: theme.metrics.scale(80),
                justifyContent: "center",
                marginBottom: theme.metrics.vertical(16),
                width: theme.metrics.scale(80),
              }}
            >
              <BookOpen
                color={theme.palette.primaryPurple}
                size={theme.metrics.scale(40)}
                strokeWidth={1.5}
              />
            </View>
            <Text
              style={{
                color: theme.palette.textMuted,
                fontFamily: theme.fonts.medium,
                fontSize: theme.typography.body,
                paddingHorizontal: sp.screenHorizontal,
              }}
            >
              {LIBRARY_COPY.emptyDetails}
            </Text>
          </View>
        ) : (
          <>
            {/* Stat cards overlapping the gradient bottom */}
            {priceRow || quantityRow ? (
              <View
                style={{
                  flexDirection: "row",
                  gap: theme.metrics.scale(16),
                  justifyContent: "space-between",
                  marginBottom: theme.metrics.vertical(4),
                  paddingHorizontal: sp.screenHorizontal,
                }}
              >
                {priceRow ? (
                  <StatCard
                    gradientColors={["#C100FF", "#8B5CF6"]}
                    icon={
                      <IndianRupee
                        color="#C100FF"
                        size={iconSize}
                        strokeWidth={iconStroke}
                      />
                    }
                    label="Price"
                    theme={theme}
                    value={priceRow.value}
                  />
                ) : null}
                {quantityRow ? (
                  <StatCard
                    gradientColors={["#5B39F6", "#818CF8"]}
                    icon={
                      <Layers
                        color="#5B39F6"
                        size={iconSize}
                        strokeWidth={iconStroke}
                      />
                    }
                    label="Quantity"
                    theme={theme}
                    value={quantityRow.value}
                  />
                ) : null}
              </View>
            ) : null}

            {/* Main detail rows */}
            <DetailSection rows={rows} theme={theme} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default LibraryBookDetail;
