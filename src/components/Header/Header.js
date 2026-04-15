import React from "react";

import CommonHeader from "../CommonHeader";
import { colors } from "../../constants";
import * as constant from "../../Utils/Constant";

const Header = ({ goBack, title }) => (
  <CommonHeader
    IconColor={constant.whiteColor}
    backgroundColor={colors.primaryDark}
    onLeftClick={goBack}
    textColor={constant.whiteColor}
    title={title}
  />
);

export default Header;
