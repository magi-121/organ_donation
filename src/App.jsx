import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" message="Loading page..." />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/donor-login" element={<DonorLogin />} />
                <Route path="/donor-alive" element={<AliveForm />} />
                <Route path="/donor-deceased" element={<DeceasedForm />} />
                <Route path="/hospital-login" element={<HospitalLogin />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
