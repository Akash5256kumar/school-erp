import React, { useMemo } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CalendarDays, ExternalLink, Newspaper, AlignLeft } from "lucide-react-native";

import * as constant from "../../../Utils/Constant";
import { formatNewsDate, normalizeNewsItem } from "./newsUtils";

// ─── Tokens ────────────────────────────────────────────────────────
const PURPLE = "#C100FF";
const PURPLE_DARK = "#5B39F6";
const ACCENT = "#f59e0b"; // News accent color
const WHITE = "#FFFFFF";
const SURFACE = "#FFFFFF";
const PAGE_BG = "#F5F4FF";
const TEXT_STRONG = "#1E1B4B";
const TEXT_BODY = "#595975";
const TEXT_MUTED = "#9CA3AF";
const DIVIDER = "#F1F5F9";
const SHADOW_COLOR = "rgba(94,59,249,0.12)";

const NewsDetail = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const newsItem = useMemo(
    () => normalizeNewsItem(route?.params?.newsItem || {}),
    [route?.params?.newsItem]
  );
  const hasLink = Boolean(newsItem?.link);

  const openLink = async () => {
    if (!hasLink) {
      return;
    }

    try {
      await Linking.openURL(newsItem.link);
    } catch (error) {
      constant.showAlert("Unable to open the link right now.");
    }
  };

  return (
    <View style={s.root}>
      {/* 1. Header Background (Deep gradient behind everything) */}
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.headerBg, { paddingTop: insets.top + 16 }]}
      />

      {/* 2. Header UI (Floating buttons + Title on top of everything) */}
      <View style={[s.headerUI, { paddingTop: insets.top + 16 }]} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={s.backBtn}
        >
          <Image
            source={constant.Icons.backArrowIcon}
            style={s.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={s.headerTitle} numberOfLines={1}>
          News Details
        </Text>
        <View style={s.headerRightPlaceholder} />
      </View>

      {/* 3. Main Content (Scrolls over the background) */}
      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.card}>
          {/* Article Header */}
          <View style={s.cardHeader}>
            <View style={s.iconWrap}>
              <Newspaper color={ACCENT} size={28} strokeWidth={1.5} />
            </View>
            <View style={s.dateBadge}>
              <CalendarDays color={ACCENT} size={14} strokeWidth={2.5} style={{ marginRight: 6 }} />
              <Text style={s.dateTxt}>{formatNewsDate(newsItem.date)}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={s.title}>{newsItem.title}</Text>
          
          <View style={s.divider} />

          {/* Description */}
          <View style={s.sectionHeader}>
            <AlignLeft color={PURPLE_DARK} size={18} strokeWidth={2} />
            <Text style={s.sectionTitle}>Details</Text>
          </View>
          
          <Text style={s.description}>
            {newsItem.description || "No additional description available."}
          </Text>

          {/* External Link Action */}
          {hasLink && (
            <View style={s.actionWrap}>
              <Pressable
                accessibilityRole="button"
                onPress={openLink}
                style={s.linkBtn}
              >
                <LinearGradient
                  colors={[PURPLE, PURPLE_DARK]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.linkBtnBg}
                >
                  <ExternalLink color={WHITE} size={18} strokeWidth={2.4} />
                  <Text style={s.linkBtnTxt}>Open Related Link</Text>
                </LinearGradient>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: PAGE_BG },
  
  // Header Layers
  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerUI: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    height: 18,
    width: 18,
    tintColor: WHITE,
  },
  headerTitle: {
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
    textAlign: "center",
  },
  headerRightPlaceholder: {
    width: 38,
  },

  // Content & Card
  content: {
    paddingHorizontal: 16,
    paddingTop: 110, // Restored the perfect overlap offset
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    padding: 24,
    minHeight: 400,
    elevation: 6,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${ACCENT}12`,
    alignItems: "center",
    justifyContent: "center",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${ACCENT}12`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
    color: ACCENT,
  },
  title: {
    fontFamily: constant.typeBold,
    fontSize: constant.font22,
    color: TEXT_STRONG,
    lineHeight: 32,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
  },
  description: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font15,
    color: TEXT_BODY,
    lineHeight: 26,
    marginBottom: 32,
  },
  
  // Action Button
  actionWrap: {
    marginTop: "auto",
    paddingTop: 16,
  },
  linkBtn: {
    overflow: "hidden",
    borderRadius: 16,
  },
  linkBtnBg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  linkBtnTxt: {
    fontFamily: constant.typeBold,
    fontSize: constant.font16,
    color: WHITE,
  },
});

export default NewsDetail;
