import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Play, Plus } from "lucide-react-native";

import AppButton from "../../common/AppButton";
import { StaffAcademicSelectField } from "./StaffAcademicFields";
import { getAcademicActionPalette } from "./staffAcademicTheme";

export const AcademicSurfaceCard = ({ children, style, theme }) => (
  <View
    style={[
      styles.surfaceCard,
      {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.card,
        overflow: 'hidden',
        paddingHorizontal: theme.spacing.cardHorizontal,
        paddingVertical: theme.spacing.cardVertical,
      },
      theme.shadows.card,
      style,
    ]}
  >
    {/* Top accent line */}
    <View
      style={[
        styles.surfaceCardAccent,
        {backgroundColor: theme.colors.accent},
      ]}
    />
    {children}
  </View>
);

export const AcademicGradientButton = ({
  colors,
  onPress,
  style,
  theme,
  title,
}) => (
  <AppButton
    colors={colors || theme.gradients.primaryAction}
    onPress={onPress}
    style={[
      {
        borderRadius: theme.radius.button,
        minHeight: theme.layout.buttonHeight,
      },
      theme.shadows.button,
      style,
    ]}
    textStyle={theme.typography.buttonLabel}
    title={title}
  />
);

export const AcademicActionButton = ({
  icon,
  onPress,
  style,
  theme,
  title,
  tone = "published",
}) => {
  const palette = getAcademicActionPalette(theme, tone);
  const content = (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.actionPressable}
    >
      {icon === "play" ? (
        <Play
          color={palette.textColor}
          size={theme.layout.actionHeight * 0.38}
          strokeWidth={2.2}
          style={{ marginRight: theme.spacing.labelGap * 0.6 }}
        />
      ) : null}
      <Text
        numberOfLines={1}
        style={[theme.typography.smallAction, { color: palette.textColor }]}
      >
        {title}
      </Text>
    </Pressable>
  );

  if (palette.gradientColors?.length) {
    return (
      <LinearGradient
        colors={palette.gradientColors}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={[
          styles.actionButton,
          {
            borderRadius: 999,
            minHeight: theme.layout.actionHeight,
            minWidth: theme.layout.contentMaxWidth * 0.22,
            paddingHorizontal: theme.spacing.cardHorizontal,
          },
          theme.shadows.button,
          style,
        ]}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.actionButton,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor || palette.backgroundColor,
          borderRadius: 999,
          borderWidth: palette.borderColor ? theme.borderWidth.regular : 0,
          minHeight: theme.layout.actionHeight,
          minWidth: theme.layout.contentMaxWidth * 0.22,
          paddingHorizontal: theme.spacing.cardHorizontal,
        },
        tone === "outline" ? null : theme.shadows.button,
        style,
      ]}
    >
      {content}
    </View>
  );
};

export const AcademicSegmentedTabs = ({ activeTab, onChange, tabs, theme }) => (
  <View
    style={[
      styles.tabsRow,
      {
        columnGap: theme.spacing.tabGap,
        marginBottom: theme.spacing.cardGap,
      },
    ]}
  >
    {tabs.map((tab) => {
      const active = tab.key === activeTab;
      return (
        <Pressable
          accessibilityRole="button"
          key={tab.key}
          onPress={() => onChange(tab.key)}
          style={({ pressed }) => [
            styles.tabOuter,
            {
              opacity: pressed ? 0.94 : 1,
            },
          ]}
        >
          {active ? (
            <LinearGradient
              colors={theme.gradients.tabActive}
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={[
                styles.tabInner,
                {
                  borderRadius: theme.radius.field,
                  minHeight: theme.layout.fieldHeight,
                  paddingHorizontal: theme.spacing.cardHorizontal * 0.8,
                },
                theme.shadows.button,
              ]}
            >
              <Text
                style={[
                  theme.typography.tabLabel,
                  {
                    color: theme.colors.white,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.tabInner,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radius.field,
                  borderColor: theme.colors.border,
                  borderWidth: theme.borderWidth.regular,
                  minHeight: theme.layout.fieldHeight,
                  paddingHorizontal: theme.spacing.cardHorizontal * 0.8,
                },
                theme.shadows.card,
              ]}
            >
              <Text style={theme.typography.tabLabel}>{tab.label}</Text>
            </View>
          )}
        </Pressable>
      );
    })}
  </View>
);

export const AcademicFloatingButton = ({ onPress, style, theme }) => (
  <LinearGradient
    colors={theme.gradients.fab}
    end={{ x: 1, y: 1 }}
    start={{ x: 0, y: 0 }}
    style={[
      styles.fabOuter,
      {
        borderColor: theme.colors.white,
        borderRadius: theme.radius.fab,
        bottom: theme.spacing.footerBottom * 1.8,
        borderWidth: theme.layout.fabRingWidth,
        height: theme.layout.fabSize,
        right: theme.spacing.screenHorizontal,
        width: theme.layout.fabSize,
      },
      theme.shadows.button,
      style,
    ]}
  >
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.fabInner}
    >
      <Plus color={theme.colors.white} size={theme.layout.fabSize * 0.34} />
    </Pressable>
  </LinearGradient>
);

export const AcademicChoiceGrid = ({ onSelect, options, selected, theme }) => (
  <View
    style={[
      styles.choiceGrid,
      {
        columnGap: theme.spacing.columnGap,
        rowGap: theme.spacing.rowGap,
      },
    ]}
  >
    {options.map((option, index) => {
      const active = selected === option;
      return (
        <Pressable
          accessibilityRole="button"
          key={`${option}-${index}`}
          onPress={() => onSelect(active ? "" : option)}
          style={[
            styles.choiceItem,
            {
              backgroundColor: active
                ? theme.colors.accentSoft
                : theme.colors.surface,
              borderRadius: theme.radius.action,
              minHeight: theme.layout.optionMinHeight,
              paddingHorizontal: theme.layout.choicePaddingHorizontal,
              width:
                (theme.layout.contentMaxWidth -
                  theme.spacing.columnGap -
                  theme.spacing.cardHorizontal * 2) /
                2,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.body,
              {
                color: active ? theme.colors.accent : theme.colors.primaryText,
                fontFamily: active
                  ? theme.typography.sectionTitle.fontFamily
                  : theme.typography.body.fontFamily,
                fontSize: theme.typography.body.fontSize,
              },
            ]}
          >
            {option}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export const AcademicFilterModal = ({
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  fields,
  onApply,
  onCancel,
  theme,
  title,
  visible,
}) => (
  <Modal
    animationType="fade"
    onRequestClose={onCancel}
    transparent
    visible={visible}
  >
    <Pressable
      onPress={onCancel}
      style={[
        styles.modalOverlay,
        {
          backgroundColor: theme.colors.overlay,
          padding: theme.spacing.modalPadding,
        },
      ]}
    >
      <Pressable
        onPress={() => {}}
        style={[
          styles.filterCard,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.modal,
            maxWidth: theme.layout.modalMaxWidth,
            padding: theme.spacing.cardHorizontal,
          },
        ]}
      >
        <Text
          style={[
            theme.typography.cardTitle,
            {
              marginBottom: theme.spacing.cardGap,
            },
          ]}
        >
          {title}
        </Text>

        {fields.map((field) => (
          <View
            key={field.key}
            style={{
              marginBottom: theme.spacing.fieldGap,
            }}
          >
            <StaffAcademicSelectField
              onSelect={field.onSelect}
              openAbove={field.openAbove ?? false}
              options={field.options}
              placeholder={field.placeholder}
              selected={field.selected}
              showChevron={false}
              theme={theme}
            />
          </View>
        ))}

        <View
          style={[
            styles.filterActionsRow,
            {
              columnGap: theme.spacing.columnGap,
              marginTop: theme.spacing.labelGap,
            },
          ]}
        >
          <AcademicActionButton
            onPress={onCancel}
            style={styles.filterAction}
            theme={theme}
            title={cancelLabel}
            tone="outline"
          />
          <AcademicActionButton
            onPress={onApply}
            style={styles.filterAction}
            theme={theme}
            title={applyLabel}
            tone="apply"
          />
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: "center",
  },
  actionPressable: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  surfaceCard: {
    width: "100%",
  },
  surfaceCardAccent: {
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  choiceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  choiceItem: {
    justifyContent: "center",
  },
  fabInner: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  fabOuter: {
    borderWidth: 5,
    overflow: "hidden",
    position: "absolute",
  },
  filterAction: {
    flex: 1,
  },
  filterActionsRow: {
    flexDirection: "row",
  },
  filterCard: {
    width: "100%",
  },
  modalOverlay: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  tabOuter: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: "row",
  },
});

export default {
  AcademicActionButton,
  AcademicChoiceGrid,
  AcademicFilterModal,
  AcademicFloatingButton,
  AcademicGradientButton,
  AcademicSegmentedTabs,
  AcademicSurfaceCard,
};
