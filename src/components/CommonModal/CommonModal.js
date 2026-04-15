import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
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

const CommonModal = ({
  visible,
  onClose,
  title,
  options = [], // Array of { label, onPress }
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}

          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalButton}
              onPress={option.onPress}
            >
              <Text style={styles.modalButtonText}>{option.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: whiteColor,
    borderRadius: componentSizes.modalRadius,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    width: "80%",
    alignItems: "center",
    ...shadows.light,
  },
  modalTitle: {
    fontSize: typography.fontMedium,
    fontWeight: typography.weights.bold,
    color: blackColor,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#E9F2FF",
    borderRadius: radii.pill,
    minHeight: componentSizes.buttonHeight,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xs,
    width: "100%",
  },
  modalButtonText: {
    color: blackColor,
    fontSize: typography.fontRegular,
    fontWeight: typography.weights.medium,
  },
  cancelButton: {
    backgroundColor: colors.danger,
    marginTop: spacing.sm,
  },
  cancelButtonText: {
    color: whiteColor,
    fontSize: typography.fontRegular,
    fontWeight: typography.weights.medium,
  },
});
