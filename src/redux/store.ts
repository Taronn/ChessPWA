import { configureStore } from '@reduxjs/toolkit';
import appSettingsReducer from './slices/appSettingsSlice';
import userReducer from './slices/userSlice';


export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    user: userReducer,
  },
});
