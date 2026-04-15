import { Dimensions, StyleSheet } from "react-native";

import { componentSizes, spacing, typography } from "../../constants";

const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

const authLayoutStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backButton: {
    alignSelf: "flex-start",
    height: componentSizes.appBarHeight - spacing.md,
    justifyContent: "center",
    marginTop: spacing.xs,
    width: componentSizes.iconLg * 2,
  },
  backIcon: {
    height: componentSizes.iconLg,
    width: componentSizes.iconLg,
  },
  heroSection: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
  loginImage: {
    height: deviceHeight * 0.28,
    width: deviceWidth * 0.8,
  },
  loginForm: {
    marginTop: spacing.xxl,
  },
  loginText: {
    color: "#635d83",
    fontSize: typography.fontXL,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xxl,
    textAlign: "center",
  },
  field: {
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.xxl,
    width: "100%",
  },
});

export default authLayoutStyles;
