import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Paperclip,
  PencilLine,
  Plus,
  Search,
} from "lucide-react-native";

import AppButton from "./AppButton";
import CommonHeader from "../CommonHeader";
import AppFloatingButton from "./AppFloatingButton";
import { getLeaveStatusAppearance } from "../../constants/libraryLeaveTheme";

const makeTextStyle = (theme, overrides = {}) => ({
  color: theme.palette.textStrong,
  fontFamily: theme.fonts.regular,
  ...overrides,
});

const getStatusBadgeStyle = (theme, status) => {
  const appearance = getLeaveStatusAppearance(theme, status);

  return {
    backgroundColor: appearance.backgroundColor,
    color: appearance.color,
  };
};

export const ModuleHeader = ({ theme, title, onBackPress, rightSlot }) => {
  return (
    <LinearGradient
      colors={theme.palette.headerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <CommonHeader
        backgroundColor="transparent"
        IconColor={theme.palette.headerText}
        onLeftClick={onBackPress}
        textColor={theme.palette.headerText}
        title={title}
      />
    </LinearGradient>
  );
};

export const SurfaceCard = ({ theme, children, style }) => (
  <View
    style={[
      {
        backgroundColor: theme.palette.surfaceRaised,
        borderRadius: theme.radii.card,
      },
      theme.shadows.card,
      style,
    ]}
  >
    {children}
  </View>
);

export const SegmentedTabs = ({ theme, tabs, activeKey, onChange }) => (
  <View
    style={{
      columnGap: theme.spacing.statGap,
      flexDirection: "row",
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
              backgroundColor: theme.palette.surfaceRaised,
              borderColor: isActive
                ? theme.palette.primaryBlue
                : theme.palette.divider,
              borderRadius: theme.radii.button,
              borderWidth: StyleSheet.hairlineWidth + 1,
              flex: 1,
              height: theme.sizes.tabHeight,
              justifyContent: "center",
              paddingHorizontal: theme.spacing.cardPaddingTight,
            },
            theme.shadows.pill,
            isActive && {
              backgroundColor: theme.palette.primaryBlue,
              borderColor: theme.palette.primaryBlue,
            },
          ]}
        >
          <Text
            style={makeTextStyle(theme, {
              color: isActive
                ? theme.palette.headerText
                : theme.palette.textBody,
              fontFamily: isActive ? theme.fonts.semiBold : theme.fonts.medium,
              fontSize: theme.typography.tabLabel,
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

const BookGlyph = ({ theme, mode }) => {
  const isLibrary = mode === "library";

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: isLibrary
          ? theme.palette.surfaceMutedPurple
          : theme.palette.surfaceMutedBlue,
        borderRadius: theme.sizes.listGlyphWrap / 2,
        height: theme.sizes.listGlyphWrap,
        justifyContent: "center",
        width: theme.sizes.listGlyphWrap,
      }}
    >
      <BookOpen
        color={
          isLibrary ? theme.palette.primaryPurple : theme.palette.primaryBlue
        }
        size={theme.sizes.iconBadge}
        strokeWidth={1.85}
      />
    </View>
  );
};

export const IssuedBookCard = ({
  theme,
  title,
  dateRange,
  fineText,
  onPress,
}) => (
  <Pressable
    accessibilityRole={onPress ? "button" : undefined}
    disabled={!onPress}
    onPress={onPress}
  >
    <SurfaceCard
      style={{
        padding: theme.spacing.cardPaddingTight,
      }}
      theme={theme}
    >
      <View
        style={{
          alignItems: "center",
          columnGap: theme.spacing.iconGap,
          flexDirection: "row",
        }}
      >
        <BookGlyph mode="issued" theme={theme} />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={makeTextStyle(theme, {
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.cardTitle,
            })}
          >
            {title}
          </Text>
          <Text
            style={makeTextStyle(theme, {
              color: theme.palette.textBody,
              fontFamily: theme.fonts.medium,
              fontSize: theme.typography.body,
              marginTop: theme.spacing.textGap,
            })}
          >
            {dateRange}
          </Text>
          {fineText ? (
            <Text
              style={makeTextStyle(theme, {
                color: theme.palette.primaryRed,
                fontFamily: theme.fonts.medium,
                fontSize: theme.typography.caption,
                marginTop: theme.spacing.textGap,
              })}
            >
              {fineText}
            </Text>
          ) : null}
        </View>
        {onPress ? (
          <ChevronRight
            color={theme.palette.primaryBlue}
            size={theme.sizes.arrowIcon}
            strokeWidth={2.5}
          />
        ) : null}
      </View>
    </SurfaceCard>
  </Pressable>
);

export const LibraryBookCard = ({ theme, title, authorText, onPress }) => (
  <Pressable
    accessibilityRole={onPress ? "button" : undefined}
    disabled={!onPress}
    onPress={onPress}
  >
    <SurfaceCard
      style={{
        padding: theme.spacing.cardPaddingTight,
      }}
      theme={theme}
    >
      <View
        style={{
          alignItems: "center",
          columnGap: theme.spacing.iconGap,
          flexDirection: "row",
        }}
      >
        <BookGlyph mode="library" theme={theme} />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={makeTextStyle(theme, {
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.cardTitle,
            })}
          >
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={makeTextStyle(theme, {
              color: theme.palette.textBody,
              fontFamily: theme.fonts.medium,
              fontSize: theme.typography.body,
              marginTop: theme.spacing.textGap,
            })}
          >
            {authorText}
          </Text>
        </View>
        {onPress ? (
          <ChevronRight
            color={theme.palette.primaryBlue}
            size={theme.sizes.arrowIcon}
            strokeWidth={2.5}
          />
        ) : null}
      </View>
    </SurfaceCard>
  </Pressable>
);

export const SearchFieldCard = ({
  theme,
  value,
  onChangeText,
  placeholder,
}) => (
  <SurfaceCard
    style={{
      marginHorizontal: theme.spacing.screenHorizontal,
      marginTop: theme.spacing.sectionGap,
      paddingHorizontal: theme.spacing.cardPaddingTight,
      paddingVertical: theme.spacing.cardPaddingTight,
    }}
    theme={theme}
  >
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <Search
        color={theme.palette.textMuted}
        size={theme.sizes.floatingIcon}
        strokeWidth={2.1}
      />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.palette.textMuted}
        style={[
          makeTextStyle(theme, {
            color: theme.palette.textBody,
            flex: 1,
            fontFamily: theme.fonts.medium,
            fontSize: theme.typography.formValue,
            marginLeft: theme.spacing.iconGap,
            paddingVertical: 0,
          }),
        ]}
        value={value}
      />
    </View>
  </SurfaceCard>
);

export const FloatingActionButton = ({
  theme,
  onPress,
  icon = "search",
  sizeVariant = "regular",
}) => (
  <FloatingButtonContent
    icon={icon}
    onPress={onPress}
    sizeVariant={sizeVariant}
    theme={theme}
  />
);

const FloatingButtonContent = ({ theme, onPress, icon, sizeVariant }) => {
  return (
    <AppFloatingButton
      accessibilityLabel={icon === "search" ? "Search" : "Add"}
      backgroundColor={theme.palette.primaryBlue}
      bottomOffset={theme.spacing.floatingBottomOffset}
      icon={icon}
      iconColor={theme.palette.headerText}
      onPress={onPress}
      rightOffset={theme.spacing.floatingInset}
      sizeVariant={sizeVariant}
      style={theme.shadows.floating}
    />
  );
};

export const EmptyMessage = ({ theme, message }) => (
  <Text
    style={makeTextStyle(theme, {
      color: theme.palette.textMuted,
      fontFamily: theme.fonts.medium,
      fontSize: theme.typography.body,
      paddingHorizontal: theme.spacing.screenHorizontal,
      paddingTop: theme.spacing.sectionGap,
      textAlign: "center",
    })}
  >
    {message}
  </Text>
);

export const LeaveBalanceCard = ({
  theme,
  accentColor,
  remaining,
  label,
  style,
}) => (
  <SurfaceCard
    style={[
      {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        minHeight: theme.sizes.statCardHeight,
        paddingHorizontal: theme.spacing.cardPaddingTight,
        paddingVertical: theme.spacing.leaveSummaryPaddingVertical,
      },
      style,
    ]}
    theme={theme}
  >
    <Text
      style={makeTextStyle(theme, {
        color: accentColor,
        fontFamily: theme.fonts.bold,
        fontSize: theme.typography.statValue,
        lineHeight: theme.typography.statValue * 1.15,
      })}
    >
      {remaining}
    </Text>
    <Text
      numberOfLines={2}
      style={makeTextStyle(theme, {
        color: theme.palette.textBody,
        fontFamily: theme.fonts.medium,
        fontSize: theme.typography.statLabel,
        lineHeight: theme.typography.statLabel * 1.35,
        marginTop: theme.spacing.leaveSummaryLabelTop,
        textAlign: "center",
      })}
    >
      {label}
    </Text>
  </SurfaceCard>
);

export const LeaveRequestCard = ({
  theme,
  title,
  startDate,
  endDate,
  leaveType,
  status,
  onPress,
}) => {
  const badgeStyle = getStatusBadgeStyle(theme, status);

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <SurfaceCard
        style={{
          padding: theme.spacing.cardPaddingTight,
        }}
        theme={theme}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={2}
            style={makeTextStyle(theme, {
              flex: 1,
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.cardTitle,
              paddingRight: theme.spacing.textGap,
            })}
          >
            {title}
          </Text>
          <View
            style={{
              alignItems: "center",
              backgroundColor: badgeStyle.backgroundColor,
              borderRadius: theme.radii.pill,
              justifyContent: "center",
              minHeight: theme.sizes.statusBadgeHeight,
              minWidth: theme.sizes.statusBadgeMinWidth,
              paddingHorizontal: theme.spacing.leaveBadgeHorizontal,
            }}
          >
            <Text
              style={makeTextStyle(theme, {
                color: badgeStyle.color,
                fontFamily: theme.fonts.bold,
                fontSize: theme.typography.status,
              })}
            >
              {status}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: theme.spacing.leaveHeaderGap }}>
          <Text
            style={makeTextStyle(theme, {
              color: theme.palette.primaryBlue,
              fontFamily: theme.fonts.semiBold,
              fontSize: theme.typography.body,
            })}
          >
            Start Date -{" "}
            <Text
              style={makeTextStyle(theme, {
                color: theme.palette.textBody,
                fontFamily: theme.fonts.medium,
                fontSize: theme.typography.body,
              })}
            >
              {startDate}
            </Text>
          </Text>
          <Text
            style={makeTextStyle(theme, {
              color: theme.palette.primaryBlue,
              fontFamily: theme.fonts.semiBold,
              fontSize: theme.typography.body,
              marginTop: theme.spacing.leaveMetaGap,
            })}
          >
            End Date -{" "}
            <Text
              style={makeTextStyle(theme, {
                color: theme.palette.textBody,
                fontFamily: theme.fonts.medium,
                fontSize: theme.typography.body,
              })}
            >
              {endDate}
            </Text>
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing.leaveFooterGap,
          }}
        >
          <Text
            style={makeTextStyle(theme, {
              color: theme.palette.textBody,
              flex: 1,
              fontFamily: theme.fonts.medium,
              fontSize: theme.typography.body,
              paddingRight: theme.spacing.textGap,
            })}
          >
            {leaveType}
          </Text>
          <ChevronRight
            color={theme.palette.primaryBlue}
            size={theme.sizes.arrowIcon}
            strokeWidth={2.5}
          />
        </View>
      </SurfaceCard>
    </Pressable>
  );
};

export const DetailRow = ({
  theme,
  label,
  value,
  isLink = false,
  multiline = false,
  showDivider = true,
  onPress,
}) => (
  <View>
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.cardPadding,
        paddingVertical: theme.spacing.formRowVertical * 1.1,
      }}
    >
      <Text
        style={makeTextStyle(theme, {
          color: theme.palette.textMuted,
          flex: 1,
          fontFamily: theme.fonts.medium,
          fontSize: theme.typography.detailLabel * 0.9,
          marginRight: theme.spacing.iconGap,
        })}
      >
        {label}
      </Text>
      <Text
        onPress={onPress}
        style={makeTextStyle(theme, {
          color: isLink ? theme.palette.link : theme.palette.textStrong,
          flex: 1.25,
          fontFamily: theme.fonts.semiBold,
          fontSize: theme.typography.detailValue * 0.95,
          lineHeight: multiline
            ? theme.typography.detailValue * 1.4
            : undefined,
          textAlign: "right",
          textDecorationLine: isLink ? "underline" : "none",
        })}
      >
        {value}
      </Text>
    </View>
    {showDivider ? (
      <View
        style={{
          backgroundColor: theme.palette.divider,
          height: StyleSheet.hairlineWidth,
          marginLeft: theme.spacing.cardPadding,
        }}
      />
    ) : null}
  </View>
);

export const RemarkBox = ({ theme, value }) => (
  <View
    style={{
      backgroundColor: theme.palette.pageBase,
      borderRadius: theme.radii.input,
      minHeight: theme.sizes.detailRemarkHeight,
      padding: theme.spacing.cardPaddingTight,
    }}
  >
    <Text
      style={makeTextStyle(theme, {
        color: value ? theme.palette.textBody : theme.palette.textMuted,
        fontFamily: theme.fonts.medium,
        fontSize: theme.typography.body,
      })}
    >
      {value || " "}
    </Text>
  </View>
);

const FormRowIcon = ({ theme, icon }) => {
  const iconColor = theme.palette.headerText;
  const commonProps = {
    color: iconColor,
    size: theme.sizes.arrowIcon,
    strokeWidth: 2.1,
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.palette.primaryBlue,
        borderRadius: theme.radii.iconWrap,
        height: theme.sizes.formIconWrap,
        justifyContent: "center",
        width: theme.sizes.formIconWrap,
      }}
    >
      {icon === "calendar" ? <CalendarDays {...commonProps} /> : null}
      {icon === "subject" ? <PencilLine {...commonProps} /> : null}
      {icon === "arrow" ? <ArrowRight {...commonProps} /> : null}
      {icon === "description" ? <FileText {...commonProps} /> : null}
      {icon === "attachment" ? <Paperclip {...commonProps} /> : null}
    </View>
  );
};

export const FormRow = ({
  theme,
  icon,
  label,
  value,
  placeholder,
  onPress,
  children,
  showDivider = true,
}) => (
  <View>
    <Pressable
      accessibilityRole={onPress ? "button" : undefined}
      onPress={onPress}
      style={{
        alignItems: children ? "flex-start" : "center",
        columnGap: theme.spacing.iconGap,
        flexDirection: "row",
        paddingHorizontal: theme.spacing.cardPadding,
        paddingVertical: theme.spacing.leaveFormRowVertical,
      }}
    >
      <FormRowIcon icon={icon} theme={theme} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={makeTextStyle(theme, {
            color: theme.palette.textBody,
            fontFamily: theme.fonts.medium,
            fontSize: theme.typography.formLabel,
          })}
        >
          {label}
        </Text>
        {children ? (
          children
        ) : (
          <Text
            style={makeTextStyle(theme, {
              color: value ? theme.palette.textStrong : theme.palette.textMuted,
              fontFamily: theme.fonts.medium,
              fontSize: theme.typography.formValue,
              marginTop: theme.spacing.leaveFormTextGap,
            })}
          >
            {value || placeholder}
          </Text>
        )}
      </View>
    </Pressable>
    {showDivider ? (
      <View
        style={{
          backgroundColor: theme.palette.divider,
          height: StyleSheet.hairlineWidth,
          marginLeft: theme.spacing.dividerInset,
        }}
      />
    ) : null}
  </View>
);

export const ValueWithChevron = ({ theme, value, placeholder }) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.leaveFormTextGap,
    }}
  >
    <Text
      style={makeTextStyle(theme, {
        color: value ? theme.palette.textStrong : theme.palette.textMuted,
        flex: 1,
        fontFamily: theme.fonts.medium,
        fontSize: theme.typography.formValue,
        paddingRight: theme.spacing.textGap,
      })}
    >
      {value || placeholder}
    </Text>
    <ChevronDown
      color={theme.palette.textBody}
      size={theme.sizes.arrowIcon}
      strokeWidth={2.3}
    />
  </View>
);

export const FormTextInput = ({
  theme,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}) => (
  <TextInput
    multiline={multiline}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={theme.palette.textMuted}
    style={[
      makeTextStyle(theme, {
        color: theme.palette.textStrong,
        fontFamily: theme.fonts.medium,
        fontSize: theme.typography.formValue,
        marginTop: theme.spacing.leaveFormTextGap,
        minHeight: multiline ? theme.metrics.vertical(82) : undefined,
        paddingVertical: 0,
        textAlignVertical: multiline ? "top" : "center",
      }),
    ]}
    value={value}
  />
);

export const AttachmentPreview = ({ theme, uri, onPress }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={{
      alignItems: "flex-start",
      marginTop: theme.spacing.leaveFormTextGap,
    }}
  >
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.palette.attachmentBg,
        borderRadius: theme.radii.attachment,
        height: theme.sizes.attachmentPreview,
        justifyContent: "center",
        overflow: "hidden",
        width: theme.sizes.attachmentPreview,
      }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      ) : (
        <ImageIcon
          color={theme.palette.headerText}
          size={theme.metrics.scale(34)}
          strokeWidth={2.2}
        />
      )}
      <View
        style={[
          {
            alignItems: "center",
            backgroundColor: theme.palette.attachmentBadgeBg,
            borderRadius: theme.sizes.attachmentAddBadge / 2,
            bottom: theme.metrics.scale(2),
            height: theme.sizes.attachmentAddBadge,
            justifyContent: "center",
            position: "absolute",
            right: theme.metrics.scale(2),
            width: theme.sizes.attachmentAddBadge,
          },
          theme.shadows.pill,
        ]}
      >
        <Plus
          color={theme.palette.primaryGreen}
          size={theme.metrics.scale(18)}
          strokeWidth={2.5}
        />
      </View>
    </View>
  </Pressable>
);

export const OptionSheet = ({
  theme,
  visible,
  title,
  options,
  onClose,
  onSelect,
}) => (
  <Modal animationType="fade" transparent visible={visible}>
    <Pressable
      onPress={onClose}
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.26)",
        flex: 1,
        justifyContent: "flex-end",
        padding: theme.spacing.screenHorizontal,
      }}
    >
      <Pressable
        style={{
          backgroundColor: theme.palette.surfaceRaised,
          borderRadius: theme.radii.sheet,
          padding: theme.spacing.cardPadding,
        }}
      >
        {title ? (
          <Text
            style={makeTextStyle(theme, {
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.cardTitle,
              marginBottom: theme.spacing.textGap,
            })}
          >
            {title}
          </Text>
        ) : null}
        {options.map((option, index) => (
          <Pressable
            accessibilityRole="button"
            key={option.value || option.label || `${index}`}
            onPress={() => onSelect(option.value ?? option.label)}
            style={{
              paddingVertical: theme.spacing.formRowVertical,
            }}
          >
            <Text
              style={makeTextStyle(theme, {
                color: theme.palette.textBody,
                fontFamily: theme.fonts.medium,
                fontSize: theme.typography.body,
              })}
            >
              {option.label || option}
            </Text>
          </Pressable>
        ))}
      </Pressable>
    </Pressable>
  </Modal>
);

export const PrimaryActionButton = ({
  theme,
  title,
  onPress,
  loading,
  disabled,
}) => (
  <AppButton
    colors={theme.palette.headerGradient}
    disabled={disabled}
    loading={loading}
    onPress={onPress}
    style={{
      minHeight: theme.sizes.primaryButtonHeight,
    }}
    textStyle={{
      fontFamily: theme.fonts.bold,
      fontSize: theme.typography.button,
    }}
    title={title}
  />
);

export default {
  AttachmentPreview,
  DetailRow,
  EmptyMessage,
  FloatingActionButton,
  FormRow,
  FormTextInput,
  IssuedBookCard,
  LeaveBalanceCard,
  LeaveRequestCard,
  LibraryBookCard,
  ModuleHeader,
  OptionSheet,
  PrimaryActionButton,
  RemarkBox,
  SearchFieldCard,
  SegmentedTabs,
  SurfaceCard,
  ValueWithChevron,
};
