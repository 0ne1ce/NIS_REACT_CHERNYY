import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../../shared/lib/i18n/i18n';

enum Language {
  RU = 'ru',
  EN = 'en',
}

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface SettingsState {
  language: Language;
  theme: Theme;
  pageSize: number;
}

function loadSettings(): SettingsState {
  try {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      return JSON.parse(savedSettings) as SettingsState;
    }
  } catch {
    // ignore
  }
  return { language: Language.EN, theme: Theme.LIGHT, pageSize: 10 };
}

const initialState: SettingsState = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem('settings', JSON.stringify(state));
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      document.documentElement.setAttribute('data-theme', action.payload);
      localStorage.setItem('settings', JSON.stringify(state));
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
    },
  },
});

export { Language, Theme };
export const { setLanguage, setTheme, setPageSize } = settingsSlice.actions;
export default settingsSlice.reducer;
