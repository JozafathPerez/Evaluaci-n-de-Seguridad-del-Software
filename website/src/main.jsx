import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import MainLayout from './pages/MainLayout.jsx';
import Suppliers from './pages/Suppliers.jsx';
import Inventory from './pages/Inventory.jsx';
import Customers from './pages/Customers.jsx';
import Invoices from './pages/Invoices.jsx';
import Statistics from './pages/Statistics.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/customers',
        element: <Customers />
      },
      {
        path: '/suppliers',
        element: <Suppliers />
      },
      {
        path: '/inventory',
        element: <Inventory />
      },
      {
        path: '/orders',
        element: <Invoices />
      },
      {
        path: '/statistics',
        element: <Statistics />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);