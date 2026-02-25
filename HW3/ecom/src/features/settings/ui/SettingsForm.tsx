import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { setLanguage, setTheme, setPageSize } from '../model/settingsSlice';
import { selectLanguage, selectTheme, selectPageSize } from '../model/selectors';

export const SettingsForm = memo(function SettingsForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const pageSize = useAppSelector(selectPageSize);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLanguage(e.target.value as 'ru' | 'en'));
    },
    [dispatch]
  );

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setTheme(e.target.value as 'light' | 'dark'));
    },
    [dispatch]
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setPageSize(Number(e.target.value)));
    },
    [dispatch]
  );

  return (
    <div className="settings-form">
      <div className="settings-group">
        <label htmlFor="language">{t('settings.language')}</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">{t('settings.english')}</option>
          <option value="ru">{t('settings.russian')}</option>
        </select>
      </div>

      <div className="settings-group">
        <label htmlFor="theme">{t('settings.theme')}</label>
        <select id="theme" value={theme} onChange={handleThemeChange}>
          <option value="light">{t('settings.light')}</option>
          <option value="dark">{t('settings.dark')}</option>
        </select>
      </div>

      <div className="settings-group">
        <label htmlFor="pageSize">{t('settings.pageSize')}</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
});
