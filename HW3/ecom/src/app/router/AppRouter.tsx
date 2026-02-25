import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Layout } from '../../widgets/Layout/Layout';
import { Spinner } from '../../shared/ui';

const LoginPage = lazy(() => import('../../pages/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../../pages/DashboardPage'));
const ProductsPage = lazy(() => import('../../pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../../pages/ProductDetailPage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../../pages/SettingsPage'));
const LogoutPage = lazy(() => import('../../pages/LogoutPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
