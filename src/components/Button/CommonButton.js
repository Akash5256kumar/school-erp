import React from "react";

import AppButton from "../common/AppButton";

const CommonButton = ({
  title,
  extStyle = {},
  buttonClick = () => {},
  colors,
  isLoading,
  disabled,
}) => (
  <AppButton
    title={title}
    loading={isLoading}
    disabled={disabled}
    onPress={buttonClick}
    style={extStyle}
    colors={colors}
  />
);

export default React.memo(CommonButton);
