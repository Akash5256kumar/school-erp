import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userData: null,
};

const staffAuthSlice = createSlice({
  name: "staffAuth",
  initialState,
  reducers: {
    clearStaffAuth: () => initialState,
    setStaffAuth: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.userData = action.payload?.userData ?? null;
    },
  },
});

export const { clearStaffAuth, setStaffAuth } = staffAuthSlice.actions;

export default staffAuthSlice.reducer;
