import React from "react";
import { StyleSheet, View } from "react-native";

import { colors, componentSizes, radii, spacing } from "../constants";
import AppInput from "./common/AppInput";
import * as constant from "../Utils/Constant";

const Searchbar = ({ onChangeSearch }) => (
  <View style={styles.container}>
    <AppInput
      containerStyle={styles.field}
      inputStyle={styles.inputStyle}
      leftIcon={constant.Icons.Search}
      onChangeText={(text) => onChangeSearch(text.toLowerCase())}
      placeholder="Search here..."
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  field: {
    width: "100%",
  },
  inputStyle: {
    minHeight: componentSizes.searchHeight,
  },
});

export default Searchbar;
