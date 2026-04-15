import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: null,
  userData: null,
  updatingProfile: false,
  playerId: null,
  isPlayerIdUpdated: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.userData = action.payload?.data ?? null;
    },
    clearUserData: (state) => {
      state.token = null;
      state.userData = null;
      state.playerId = null;
      state.isPlayerIdUpdated = false;
      state.updatingProfile = false;
    },
    updateProfileRequest: (state) => {
      state.updatingProfile = true;
    },
    updateProfileRequestSuccess: (state, action) => {
      state.updatingProfile = false;
      state.userData = action.payload || state.userData;
    },
    setPlayerId: (state, action) => {
      const value = action.payload;
      state.playerId =
        value === "" || value === "null" || value === undefined ? null : value;
    },
    updatePlayerID: () => {},
    updatePlayerIDSuccess: (state) => {
      state.isPlayerIdUpdated = true;
    },
  },
});

export const {
  saveUserData,
  clearUserData,
  updateProfileRequest,
  updateProfileRequestSuccess,
  setPlayerId,
  updatePlayerID,
  updatePlayerIDSuccess,
} = userSlice.actions;

export default userSlice.reducer;
