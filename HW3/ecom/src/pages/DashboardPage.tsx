import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../shared/lib/hooks';
import { selectUser } from '../features/auth/model/selectors';
import { ROUTES } from '../shared/config/routes';

export default function DashboardPage() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  return (
    <div className="page">
      <h1 className="page__title">{t('dashboard.title')}</h1>
      <p className="page__subtitle">
        {t('dashboard.welcome', { name: user?.firstName ?? '' })}
      </p>

      <div className="dashboard-cards">
        <Link to={ROUTES.PRODUCTS} className="dashboard-card">
          <span className="dashboard-card__label">{t('dashboard.viewProducts')}</span>
        </Link>
        <Link to={ROUTES.PROFILE} className="dashboard-card">
          <span className="dashboard-card__label">{t('dashboard.viewProfile')}</span>
        </Link>
        <Link to={ROUTES.SETTINGS} className="dashboard-card">
          <span className="dashboard-card__label">{t('dashboard.openSettings')}</span>
        </Link>
      </div>
    </div>
  );
}
