import * as constant from "../Utils/Constant";
import { componentSizes, typography } from "./designSystem";

export const appBarTheme = {
  fontFamily: {
    title: constant.typeBold,
  },
  iconSize: {
    back: componentSizes.iconLg,
  },
  layout: {
    height: componentSizes.appBarHeight,
  },
  typography: {
    title: typography.fontLarge,
  },
};

export default appBarTheme;
