import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import HomePage from './components/Home/HomePage';
import DonorLogin from './components/Donor/DonorLogin';
import AliveForm from './components/Donor/AliveForm';
import DeceasedForm from './components/Donor/DeceasedForm';
import HospitalLogin from './components/Hospital/HospitalLogin';
import HospitalDashboard from './components/Hospital/HospitalDashboard';
import LoadingSpinner from './components/Common/LoadingSpinner';
import AuthTest from './components/Test/AuthTest.jsx'
// Layout component
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <Navbar />
    {children}
  </div>
);

// Create router with future flags
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><HomePage /></Layout>
  },
  {
    path: "/donor-login",
    element: <Layout><DonorLogin /></Layout>
  },
  {
    path: "/donor-alive",
    element: <Layout><AliveForm /></Layout>
  },
  {
    path: "/donor-deceased",
    element: <Layout><DeceasedForm /></Layout>
  },
  {
    path: "/hospital-login",
    element: <Layout><HospitalLogin /></Layout>
  },
  {
    path: "/hospital-dashboard",
    element: <Layout><HospitalDashboard /></Layout>
  },
  {
    path: "/test-auth",
    element: <Layout><AuthTest /></Layout>
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" message="Loading page..." />
          </div>
        }>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
