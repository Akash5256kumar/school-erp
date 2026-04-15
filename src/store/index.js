import {configureStore} from '@reduxjs/toolkit';

import staffAuthReducer from './slices/staffAuthSlice';
import studentAuthReducer from './slices/studentAuthSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    staffAuth: staffAuthReducer,
    studentAuth: studentAuthReducer,
    userSlice: userReducer,
  },
});

export default store;
