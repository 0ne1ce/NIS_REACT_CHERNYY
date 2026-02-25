import { useTranslation } from 'react-i18next';
import { SettingsForm } from '../features/settings';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <h1 className="page__title">{t('settings.title')}</h1>
      <SettingsForm />
    </div>
  );
}
