import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../shared/lib/hooks';
import { logout } from '../features/auth';
import { baseApi } from '../shared/api/baseApi';
import { ROUTES } from '../shared/config/routes';
import { Spinner } from '../shared/ui';

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate(ROUTES.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  return <Spinner />;
}
