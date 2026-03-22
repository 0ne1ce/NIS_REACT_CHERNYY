import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { useLoginMutation, useLazyGetMeQuery } from '../api/authApi';
import { setCredentials, setToken } from '../model/authSlice';
import { ROUTES } from '../../../shared/config/routes';
import './LoginForm.css';

export const LoginForm = memo(function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [triggerGetMe] = useLazyGetMeQuery();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [serverError, setServerError] = useState('');

  const validate = useCallback(() => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = t('auth.usernameRequired');
    if (!password.trim()) newErrors.password = t('auth.passwordRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [username, password, t]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setServerError('');

      if (!validate()) return;

      try {
        const loginResult = await login({ username, password }).unwrap();
        // Store token first so getMe can use it in Authorization header
        dispatch(setToken(loginResult.accessToken));
        const meResult = await triggerGetMe(undefined, false).unwrap();

        dispatch(
          setCredentials({
            user: meResult,
            token: loginResult.accessToken,
          })
        );

        navigate(ROUTES.DASHBOARD);
      } catch {
        setServerError(t('auth.loginError'));
      }
    },
    [username, password, validate, login, triggerGetMe, dispatch, navigate, t]
  );

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {serverError && <div className="form-alert">{serverError}</div>}

      <div className="form-group">
        <label htmlFor="username">{t('auth.username')}</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        {errors.username && <p className="form-error">{errors.username}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">{t('auth.password')}</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {errors.password && <p className="form-error">{errors.password}</p>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? t('common.loading') : t('auth.loginButton')}
      </button>
    </form>
  );
});
