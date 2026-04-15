jest.mock("lucide-react-native", () => ({
  ChevronDown: () => null,
}));

jest.mock("react-native/Libraries/Modal/Modal", () => {
  const React = require("react");
  const { View } = require("react-native");

  return ({ children, visible }) => (visible ? <View>{children}</View> : null);
});

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import AttendanceSelectField from "../../src/components/StaffModule/AttendanceShared/AttendanceSelectField";

describe("AttendanceSelectField", () => {
  it("opens the dropdown and selects an option", () => {
    const onSelect = jest.fn();
    const screen = render(
      <AttendanceSelectField
        label="Select Class"
        onSelect={onSelect}
        options={["10", "11"]}
        placeholder="Select class"
        value=""
      />
    );

    fireEvent.press(screen.getByText("Select class"));
    fireEvent.press(screen.getByText("10"));

    expect(onSelect).toHaveBeenCalledWith("10");
  });
});
