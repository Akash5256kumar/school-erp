import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { typography } from "../constants";
import { blackColor } from "../Utils/Constant";

const LabelHeader = ({ label, textstyle }) => {
  return (
    <View>
      <Text style={[styles.label, textstyle]}>{label}</Text>
    </View>
  );
};

export default LabelHeader;

const styles = StyleSheet.create({
  label: {
    fontSize: typography.fontRegular,
    color: blackColor,
    fontWeight: typography.weights.regular,
  },
});
