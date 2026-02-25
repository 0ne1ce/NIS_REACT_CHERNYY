import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LoginForm } from '../features/auth';
import { ROUTES } from '../shared/config/routes';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.loginTitle')}</h1>
        <LoginForm />
        <p className="auth-link">
          {t('auth.noAccount')}{' '}
          <Link to={ROUTES.REGISTER}>{t('auth.register')}</Link>
        </p>
      </div>
    </div>
  );
}
