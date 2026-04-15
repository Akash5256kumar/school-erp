import React from "react";
import { StyleSheet, View } from "react-native";

import { componentSizes, spacing } from "../../constants";
import * as constant from "../../Utils/Constant";
import AppInput from "../common/AppInput";

const CommonSearch = (props) => {
  const { extStyle, searchText, placeholder } = props;

  return (
    <View style={[styles.mainView, extStyle]}>
      <AppInput
        inputStyle={styles.input}
        leftIcon={constant.Icons.searchIcon}
        leftIconStyle={styles.searchIcon}
        onChangeText={(d) => searchText(d)}
        placeholder={placeholder || "Type Your Topic Subject"}
      />
    </View>
  );
};

CommonSearch.defaultProps = {
  searchText: function () {},
  extStyle: {},
};

export default CommonSearch;

const styles = StyleSheet.create({
  mainView: {
    marginBottom: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  input: {
    minHeight: componentSizes.searchHeight,
  },
  searchIcon: {
    tintColor: undefined,
  },
});
