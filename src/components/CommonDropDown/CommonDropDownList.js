import React, { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  componentSizes,
  radii,
  shadows,
  spacing,
  typography,
} from "../../constants";
import { blackColor, whiteColor } from "../../Utils/Constant";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const CustomDropdown = ({
  data = [],
  selected,
  onSelect,
  placeholder = "",
  dropWidth,
  inputWidth,
  isOpen: controlledIsOpen,
  toggleOpen: controlledToggleOpen,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [anchorFrame, setAnchorFrame] = useState(null);
  const triggerRef = useRef(null);

  const isDisabled = !data || data.length === 0;

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const shouldShowDropdown = !isDisabled && isOpen && Boolean(anchorFrame);

  const setOpenState = (nextOpen) => {
    if (controlledToggleOpen !== undefined) {
      if (Boolean(isOpen) !== nextOpen) {
        controlledToggleOpen();
      }
      return;
    }

    setInternalOpen(nextOpen);
  };

  const closeDropdown = () => {
    setOpenState(false);
  };

  const openDropdown = () => {
    if (isDisabled || !triggerRef.current?.measureInWindow) {
      return;
    }

    triggerRef.current.measureInWindow((x, y, width, height) => {
      const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
      const horizontalInset = spacing.md;
      const dropdownWidth = clamp(width, 160, windowWidth - horizontalInset * 2);
      const estimatedHeight = componentSizes.inputHeight * 4.5;
      const belowTop = y + height + spacing.xs;
      const openAbove = belowTop + estimatedHeight > windowHeight - horizontalInset;
      const top = openAbove
        ? Math.max(horizontalInset, y - estimatedHeight - spacing.xs)
        : belowTop;
      const left = clamp(
        x,
        horizontalInset,
        windowWidth - horizontalInset - dropdownWidth
      );

      setAnchorFrame({
        height,
        maxHeight: Math.max(componentSizes.inputHeight * 2, windowHeight - horizontalInset * 2),
        top,
        width: dropdownWidth,
        x: left,
        y,
      });
      setOpenState(true);
    });
  };

  const toggleOpen = () => {
    if (isOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  };

  return (
    <View style={styles.wrapper}>
      <View collapsable={false} ref={triggerRef}>
        <TouchableOpacity
          activeOpacity={isDisabled ? 1 : 0.7}
          onPress={toggleOpen}
          style={[
            styles.inputStyle,
            inputWidth,
            isOpen && { borderColor: blackColor },
            isDisabled && styles.disabledInput,
          ]}
        >
          <Text
            style={[
              styles.selectedText,
              !selected && styles.placeholderText,
              isDisabled && styles.disabledText,
            ]}
            numberOfLines={1}
          >
            {selected ? selected : placeholder}
          </Text>

          <Text style={[styles.arrow, isDisabled && styles.disabledText]}>▼</Text>
        </TouchableOpacity>
      </View>

      {shouldShowDropdown ? (
        <Modal animationType="fade" transparent visible>
          <View style={styles.modalRoot}>
            <Pressable onPress={closeDropdown} style={styles.backdrop} />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={[
                styles.dropdown,
                dropWidth,
                {
                  left: anchorFrame.x,
                  maxHeight: anchorFrame.maxHeight,
                  top: anchorFrame.top,
                  width: anchorFrame.width,
                },
              ]}
            >
              {data.map((item, index) => (
                <TouchableOpacity
                  key={`${String(item)}-${index}`}
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    closeDropdown();
                  }}
                >
                  <Text numberOfLines={2} style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  disabledInput: {
    backgroundColor: "#f2f2f2",
    borderColor: colors.border,
  },

  disabledText: {
    color: "#999",
  },

  wrapper: {
    marginTop: spacing.sm,
  },
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  inputStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: componentSizes.inputHeight,
    backgroundColor: whiteColor,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: componentSizes.controlHorizontalPadding,
  },
  selectedText: {
    color: "black",
    fontSize: typography.fontRegular,
    flex: 1,
    minWidth: 0,
    textAlign: "left",
  },
  placeholderText: {
    color: blackColor,
    fontSize: typography.fontRegular,
  },
  arrow: {
    color: blackColor,
    marginLeft: spacing.sm,
    fontSize: typography.fontMedium,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: whiteColor,
    borderRadius: radii.md,
    borderColor: colors.border,
    borderWidth: 1,
    maxHeight: componentSizes.inputHeight * 4.5,
    zIndex: 100,
    ...shadows.light,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: componentSizes.controlHorizontalPadding,
  },
  optionText: {
    color: "black",
    flexShrink: 1,
    fontSize: typography.fontRegular,
  },
});
