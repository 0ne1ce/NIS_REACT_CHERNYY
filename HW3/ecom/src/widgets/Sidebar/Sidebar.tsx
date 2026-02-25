import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../shared/config/routes';
import './Sidebar.css';

export const Sidebar = memo(function Sidebar() {
  const { t } = useTranslation();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`;

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">Ecom Helper</div>
      <nav className="sidebar__nav">
        <NavLink to={ROUTES.DASHBOARD} end className={linkClass}>
          {t('nav.dashboard')}
        </NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={linkClass}>
          {t('nav.products')}
        </NavLink>
        <NavLink to={ROUTES.PROFILE} className={linkClass}>
          {t('nav.profile')}
        </NavLink>
        <NavLink to={ROUTES.SETTINGS} className={linkClass}>
          {t('nav.settings')}
        </NavLink>
        <NavLink to={ROUTES.LOGOUT} className="sidebar__link sidebar__link--logout">
          {t('nav.logout')}
        </NavLink>
      </nav>
    </aside>
  );
});
