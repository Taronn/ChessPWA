import { configureStore } from '@reduxjs/toolkit';
import appSettingsReducer from './slices/appSettingsSlice';

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
  },
});
