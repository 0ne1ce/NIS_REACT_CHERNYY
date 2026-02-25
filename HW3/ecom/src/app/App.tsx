import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRouter } from './router/AppRouter';
import { ErrorBoundary } from '../shared/ui';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks';
import { selectToken, selectIsInitialized } from '../features/auth/model/selectors';
import { setUser, setInitialized } from '../features/auth/model/authSlice';
import { selectTheme } from '../features/settings/model/selectors';
import { useLazyGetMeQuery } from '../features/auth/api/authApi';
import '../shared/lib/i18n/i18n';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const isInitialized = useAppSelector(selectIsInitialized);
  const theme = useAppSelector(selectTheme);
  const [triggerGetMe] = useLazyGetMeQuery();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isInitialized) return;

    if (!token) {
      dispatch(setInitialized());
      return;
    }

    triggerGetMe()
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(setInitialized());
      });
  }, [token, isInitialized, dispatch, triggerGetMe]);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthInitializer>
            <AppRouter />
          </AuthInitializer>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}
