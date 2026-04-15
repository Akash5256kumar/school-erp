import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MessageCircleMore, ChevronRight } from "lucide-react-native";

import { createSupportSystemTheme } from "../../constants/supportSystemTheme";
import { SUPPORT_SYSTEM_COPY } from "../../constants/supportSystemCopy";
import { ModuleHeader } from "./LibraryLeavePrimitives";

const textStyle = (theme, overrides = {}) => ({
  color: theme.palette.textStrong,
  fontFamily: theme.fonts.regular,
  ...overrides,
});

const SurfaceCard = ({ theme, children, style }) => (
  <View
    style={[
      {
        backgroundColor: theme.palette.surfaceRaised,
        borderRadius: theme.radii.card,
        borderWidth: 1,
        borderColor: theme.palette.cardBorder,
      },
      theme.shadows.card,
      style,
    ]}
  >
    {children}
  </View>
);

const TabBar = ({ theme, activeKey, tabs, onChange }) => (
  <View
    style={{
      flexDirection: "row",
      columnGap: theme.spacing.tabGap,
      paddingHorizontal: theme.spacing.screenHorizontal,
      paddingTop: theme.spacing.sectionTop,
    }}
  >
    {tabs.map((tab) => {
      const isActive = tab.key === activeKey;

      return (
        <Pressable
          accessibilityRole="button"
          key={tab.key}
          onPress={() => onChange(tab.key)}
          style={[
            {
              alignItems: "center",
              backgroundColor: isActive
                ? theme.palette.tabActive
                : theme.palette.tabInactive,
              borderColor: isActive
                ? theme.palette.tabActive
                : theme.palette.cardBorder,
              borderRadius: theme.radii.button,
              borderWidth: 1,
              flex: 1,
              height: theme.sizes.tabHeight,
              justifyContent: "center",
              paddingHorizontal: theme.spacing.cardPaddingTight,
            },
            theme.shadows.pill,
          ]}
        >
          <Text
            style={textStyle(theme, {
              color: isActive
                ? theme.palette.headerText
                : theme.palette.tabInactiveText,
              fontFamily: isActive ? theme.fonts.semiBold : theme.fonts.medium,
              fontSize: theme.typography.tab,
              textAlign: "center",
            })}
          >
            {tab.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const EmptyState = ({ theme, title, description }) => (
  <View
    style={{
      alignItems: "center",
      paddingHorizontal: theme.spacing.screenHorizontal,
      paddingTop: theme.spacing.emptyTopOffset,
    }}
  >
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.palette.emptyIconBg,
        borderRadius: theme.sizes.emptyIconWrap / 2,
        height: theme.sizes.emptyIconWrap,
        justifyContent: "center",
        width: theme.sizes.emptyIconWrap,
      }}
    >
      <MessageCircleMore
        color={theme.palette.emptyIconStroke}
        size={theme.sizes.emptyIcon}
        strokeWidth={1.9}
      />
    </View>

    <Text
      style={textStyle(theme, {
        fontFamily: theme.fonts.bold,
        fontSize: theme.typography.emptyTitle,
        marginTop: theme.spacing.emptyTitleGap,
      })}
    >
      {title}
    </Text>

    <Text
      style={textStyle(theme, {
        color: theme.palette.textBody,
        fontFamily: theme.fonts.medium,
        fontSize: theme.typography.emptyDescription,
        lineHeight: theme.typography.emptyDescription * 1.45,
        marginTop: theme.spacing.emptyDescriptionGap,
        textAlign: "center",
        width: theme.spacing.emptyDescriptionWidth,
      })}
    >
      {description}
    </Text>
  </View>
);

const TicketDetailRow = ({ theme, label, value }) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
      marginTop: theme.spacing.rowGap,
    }}
  >
    <Text
      style={textStyle(theme, {
        color: theme.palette.accent,
        fontFamily: theme.fonts.bold,
        fontSize: theme.typography.cardLabel,
        width: theme.metrics.scale(74),
      })}
    >
      {label}
    </Text>
    <Text
      numberOfLines={2}
      style={textStyle(theme, {
        color: theme.palette.textBody,
        flex: 1,
        fontFamily: theme.fonts.medium,
        fontSize: theme.typography.cardValue,
      })}
    >
      {value}
    </Text>
  </View>
);

const TicketCard = ({ theme, item, labels, onPress }) => (
  <Pressable accessibilityRole="button" onPress={onPress}>
    <SurfaceCard
      style={{
        padding: theme.spacing.cardPaddingTight,
      }}
      theme={theme}
    >
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, paddingRight: theme.spacing.iconGap }}>
          <Text
            style={textStyle(theme, {
              color: theme.palette.accent,
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.cardLabel,
            })}
          >
            {labels.ticketNumber}
          </Text>
          <Text
            style={textStyle(theme, {
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.cardIssue,
              marginTop: theme.spacing.emptyDescriptionGap,
            })}
          >
            {item.ticketno}
          </Text>
        </View>
        <ChevronRight
          color={theme.palette.chevron}
          size={theme.sizes.chevron}
          strokeWidth={2.4}
        />
      </View>

      <TicketDetailRow
        label={labels.date}
        theme={theme}
        value={item.created_at}
      />
      <TicketDetailRow label={labels.name} theme={theme} value={item.name} />
      <TicketDetailRow
        label={labels.class}
        theme={theme}
        value={item.std_class}
      />
      <TicketDetailRow
        label={labels.section}
        theme={theme}
        value={item.std_section}
      />
      <TicketDetailRow label={labels.issue} theme={theme} value={item.issue} />
    </SurfaceCard>
  </Pressable>
);

const tabs = [
  { key: "assigned", label: SUPPORT_SYSTEM_COPY.tabs.assigned },
  { key: "unsolved", label: SUPPORT_SYSTEM_COPY.tabs.unsolved },
  { key: "solved", label: SUPPORT_SYSTEM_COPY.tabs.solved },
];

const SupportSystemScreenView = ({
  activeTab,
  tickets,
  onBackPress,
  onRefresh,
  onTabChange,
  onOpenTicket,
  refreshing = false,
}) => {
  const { width, height } = useWindowDimensions();
  const theme = createSupportSystemTheme({ width, height });
  const emptyState = SUPPORT_SYSTEM_COPY.emptyStates[activeTab];

  return (
    <View style={{ backgroundColor: theme.palette.pageBase, flex: 1 }}>
      <ModuleHeader
        onBackPress={onBackPress}
        theme={{
          ...theme,
          palette: {
            ...theme.palette,
            primaryBlue: theme.palette.tabActive,
          },
        }}
        title={SUPPORT_SYSTEM_COPY.title}
      />

      <LinearGradient colors={theme.palette.pageGradient} style={{ flex: 1 }}>
        <TabBar
          activeKey={activeTab}
          onChange={onTabChange}
          tabs={tabs}
          theme={theme}
        />

        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: theme.spacing.listBottom,
            paddingHorizontal: theme.spacing.screenHorizontal,
            paddingTop: theme.spacing.sectionGap,
          }}
          data={tickets}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.spacing.cardGap }} />
          )}
          keyExtractor={(item, index) =>
            String(item?.id || item?.ticketno || index)
          }
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={
            <EmptyState
              description={emptyState.description}
              theme={theme}
              title={emptyState.title}
            />
          }
          renderItem={({ item }) => (
            <TicketCard
              item={item}
              labels={SUPPORT_SYSTEM_COPY.labels}
              onPress={() => onOpenTicket(item)}
              theme={theme}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </View>
  );
};

export default React.memo(SupportSystemScreenView);
