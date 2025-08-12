import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: 
  {
    loading: false,
    token:null,
    userData:null,
    updatingProfile:false,
    playerId:null,
    isPlayerIdUpdated : false,
  },
  reducers: 
  {
    saveUserData: (state,action) => 
    {
      state.token = action.payload?.token
      state.userData = action.payload?.data
    },
    updateProfileRequest:(state,action)=>
    {       
       state.updatingProfile = true
    },

    updateProfileRequestSuccess:(state,action)=>
    {
       state.updatingProfile = false
       state.userData = action.payload?action.payload:state.userData
    },

    setPlayerId: (state,action) => 
    {
      state.playerId = action.payload===""?null:action.payload==="null"?null:action.payload===undefined?null:action.payload
    },

    updatePlayerID:(state,action)=>
    {
      
    },

    updatePlayerIDSuccess:(state)=>
    {
      state.isPlayerIdUpdated = true
    },
 
  },
});

export const 
{
    saveUserData,
    updateProfileRequest,
    updateProfileRequestSuccess,
    setPlayerId,
    updatePlayerID,
    updatePlayerIDSuccess,
} = userSlice.actions;

export default userSlice.reducer;
