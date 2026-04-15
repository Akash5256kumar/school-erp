import { StyleSheet } from "react-native";
import { componentSizes, spacing, typography } from "../constants";

const styles = StyleSheet.create({
  //Empty List view
  emptyListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: componentSizes.buttonHeight * 3,
  },
  noDataText: {
    color: "#666",
    fontSize: typography.fontLarge,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
});

export default styles;
