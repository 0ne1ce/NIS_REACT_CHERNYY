import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../../shared/lib/i18n/i18n';

type Language = 'ru' | 'en';
type Theme = 'light' | 'dark';

interface SettingsState {
  language: Language;
  theme: Theme;
  pageSize: number;
}

function loadSettings(): SettingsState {
  try {
    const saved = localStorage.getItem('settings');
    if (saved) {
      return JSON.parse(saved) as SettingsState;
    }
  } catch {
    // ignore
  }
  return { language: 'en', theme: 'light', pageSize: 10 };
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

export const { setLanguage, setTheme, setPageSize } = settingsSlice.actions;
export default settingsSlice.reducer;
