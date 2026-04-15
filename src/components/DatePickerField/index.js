import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import {
  colors,
  componentSizes,
  radii,
  spacing,
  typography,
} from "../../constants";
import { blackColor } from "../../Utils/Constant";
import LabelHeader from "../labelHeader";

const DatePickerField = ({ label, date, setDate, containerStyle }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = date ? date.toLocaleDateString() : "Select Date";

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <LabelHeader label={label} />}
      <Pressable
        style={styles.dateInputContainer}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.dateText, !date && { color: blackColor }]}>
          {formattedDate}
        </Text>
        <View style={styles.dateButton}>
          <Text style={styles.dateButtonText}>▼</Text>
        </View>
      </Pressable>

      <DatePicker
        modal
        open={showPicker}
        date={date || new Date()}
        mode="date"
        title="Select Date"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={onChange}
        onCancel={() => {
          setShowPicker(false);
        }}
      />
    </View>
  );
};

export default DatePickerField;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: componentSizes.controlHorizontalPadding,
    minHeight: componentSizes.inputHeight,
    backgroundColor: colors.surface,
  },
  dateText: {
    flex: 1,
    color: blackColor,
    fontSize: typography.fontRegular,
  },
  dateButton: {
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    alignItems: "center",
    minHeight: componentSizes.inputHeight,
  },
  dateButtonText: {
    color: blackColor,
    fontSize: typography.fontRegular,
  },
});
