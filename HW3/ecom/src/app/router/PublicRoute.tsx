import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../shared/lib/hooks';
import { selectIsAuthenticated, selectIsInitialized } from '../../features/auth/model/selectors';
import { ROUTES } from '../../shared/config/routes';
import { Spinner } from '../../shared/ui';

export function PublicRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);

  if (!isInitialized) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
