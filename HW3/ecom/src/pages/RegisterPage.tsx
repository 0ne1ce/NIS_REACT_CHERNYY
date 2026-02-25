import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/config/routes';

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.registerTitle')}</h1>
        <div className="form-alert" style={{ background: 'var(--color-hover)', color: 'var(--color-text)' }}>
          {t('auth.registerStub')}
        </div>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="reg-firstName">{t('auth.firstName')}</label>
            <input id="reg-firstName" type="text" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="reg-lastName">{t('auth.lastName')}</label>
            <input id="reg-lastName" type="text" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">{t('auth.email')}</label>
            <input id="reg-email" type="email" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="reg-username">{t('auth.username')}</label>
            <input id="reg-username" type="text" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">{t('auth.password')}</label>
            <input id="reg-password" type="password" disabled />
          </div>
          <button type="submit" className="btn btn-primary" disabled>
            {t('auth.registerButton')}
          </button>
        </form>
        <p className="auth-link">
          {t('auth.haveAccount')}{' '}
          <Link to={ROUTES.LOGIN}>{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
