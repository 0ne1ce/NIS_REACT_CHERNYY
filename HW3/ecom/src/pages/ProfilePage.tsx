import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../shared/lib/hooks';
import { selectUser, logout } from '../features/auth';
import { baseApi } from '../shared/api/baseApi';
import { ROUTES } from '../shared/config/routes';
import { useCallback } from 'react';

export default function ProfilePage() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  if (!user) return null;

  return (
    <div className="page">
      <h1 className="page__title">{t('profile.title')}</h1>

      <div className="profile-card">
        <img className="profile-card__avatar" src={user.image} alt={user.firstName} />
        <div className="profile-card__info">
          <div className="profile-card__row">
            <span className="profile-card__label">{t('profile.name')}:</span>
            <span>{user.firstName} {user.lastName}</span>
          </div>
          <div className="profile-card__row">
            <span className="profile-card__label">{t('profile.email')}:</span>
            <span>{user.email}</span>
          </div>
          <div className="profile-card__row">
            <span className="profile-card__label">{t('profile.username')}:</span>
            <span>{user.username}</span>
          </div>
          <div className="profile-card__row">
            <span className="profile-card__label">{t('profile.phone')}:</span>
            <span>{user.phone}</span>
          </div>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          {t('profile.logoutButton')}
        </button>
      </div>
    </div>
  );
}
