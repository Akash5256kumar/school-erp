import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render} from '@testing-library/react-native';

import staffAuthReducer from '../src/store/slices/staffAuthSlice';
import studentAuthReducer from '../src/store/slices/studentAuthSlice';
import userReducer from '../src/store/slices/userSlice';

export const createTestStore = preloadedState =>
  configureStore({
    preloadedState,
    reducer: {
      staffAuth: staffAuthReducer,
      studentAuth: studentAuthReducer,
      userSlice: userReducer,
    },
  });

export const renderWithProviders = (
  ui,
  {preloadedState, store = createTestStore(preloadedState), ...options} = {},
) => ({
  store,
  ...render(<Provider store={store}>{ui}</Provider>, options),
});
