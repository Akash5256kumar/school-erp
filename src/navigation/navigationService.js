import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

const fallbackNavigationRef = {
  dispatch: () => {},
  isReady: () => false,
};

export const navigationRef =
  typeof createNavigationContainerRef === "function"
    ? createNavigationContainerRef()
    : fallbackNavigationRef;

export const resetToRoleSelection = () => {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "RoleSelectionScreen" }],
    })
  );
};

export const resetToStudentLogin = () => {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  );
};

export const resetToStaffLogin = () => {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "StaffLogin" }],
    })
  );
};
