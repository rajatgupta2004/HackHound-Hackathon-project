import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SymptomChecker } from './pages/SymptomChecker';
import { HealthDashboard } from './pages/HealthDashboard';
import { VirtualClinic } from './pages/VirtualClinic';
import './index.css';
import { PreventiveCare } from './pages/PreventiveCare';
import { ProviderPortal } from './pages/ProviderPortal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SymptomChecker />,
      },
      {
        path: '/dashboard',
        element: <HealthDashboard />,
      },
      {
        path: '/clinic',
        element: <VirtualClinic />,
      },
      {
        path: '/preventive',
        element: <PreventiveCare/>,
      },
      {
        path: '/provider',
        element: <ProviderPortal></ProviderPortal>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);