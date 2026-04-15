import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userData: null,
};

const studentAuthSlice = createSlice({
  name: "studentAuth",
  initialState,
  reducers: {
    clearStudentAuth: () => initialState,
    setStudentAuth: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.userData = action.payload?.userData ?? null;
    },
  },
});

export const { clearStudentAuth, setStudentAuth } = studentAuthSlice.actions;

export default studentAuthSlice.reducer;
