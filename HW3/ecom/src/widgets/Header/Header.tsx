import { memo } from 'react';
import { useAppSelector } from '../../shared/lib/hooks';
import { selectUser } from '../../features/auth/model/selectors';
import './Header.css';

export const Header = memo(function Header() {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      {user && (
        <div className="header__user">
          <img className="header__avatar" src={user.image} alt={user.firstName} />
          <span className="header__name">
            {user.firstName} {user.lastName}
          </span>
        </div>
      )}
    </header>
  );
});
