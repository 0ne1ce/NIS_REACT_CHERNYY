import type { RootState } from '../../../app/store';

export const selectLanguage = (state: RootState) => state.settings.language;
export const selectTheme = (state: RootState) => state.settings.theme;
export const selectPageSize = (state: RootState) => state.settings.pageSize;
