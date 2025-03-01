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
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup  from './pages/Signup';

import DoctorDashboard from './pages/Doctordashboard';
import PatientDashboard from './pages/PatientDashboard';
import Record from './pages/Record';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <Dashboard/>,
  },
  {
    path: '/doctor',
    element: <DoctorDashboard/>,
  },
  {
    path:'/patient',
    element:<PatientDashboard/>
  },
  {
    path:'/chatbot',
    element:<SymptomChecker/>
  }
  ,
  {
    path:'/virtualclinic',
    element:<VirtualClinic/>
  },
  {
    path:'/record',
    element:<Record/>
  },
  {
    path:'/health',
    element:<HealthDashboard/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </AuthProvider>
);
