import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/config/routes';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>{t('common.notFound')}</h2>
      <p>{t('common.notFoundMessage')}</p>
      <Link to={ROUTES.DASHBOARD} className="btn btn-primary">
        {t('common.goHome')}
      </Link>
    </div>
  );
}
