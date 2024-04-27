import { createSlice } from '@reduxjs/toolkit';
import { f7ready } from 'framework7-react';

const initialState = {
  darkMode: false,
  theme: 'auto',
  colorTheme: { hex: '#000000' },
};

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const darkMode = !state.darkMode;
      localStorage.setItem('darkMode', darkMode.toString());
      f7ready((f7) => f7.setDarkMode(darkMode));
      state.darkMode = darkMode;
    },
    setDarkMode: (state, { payload }) => {
      f7ready((f7) => f7.setDarkMode(payload));
      localStorage.setItem('darkMode', payload.toString());
      state.darkMode = payload;
    },
    setTheme: (state, { payload }) => {
      localStorage.setItem('theme', payload);
      state.theme = payload;
    },
    setColorTheme: (state, { payload }) => {
      f7ready((f7) => f7.setColorTheme(payload));
      localStorage.setItem('colorTheme', payload);
      state.colorTheme = { hex: payload };
    },
  },
});

export const selectDarkMode = (state) => state.appSettings.darkMode;
export const selectTheme = (state) => state.appSettings.theme;
export const selectColorTheme = (state) => state.appSettings.colorTheme;

export const { toggleDarkMode, setDarkMode, setTheme, setColorTheme } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
