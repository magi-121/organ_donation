import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const HospitalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate login process
    setTimeout(() => {
      login(email, 'hospital');
      navigate('/hospital-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full animate-slide-up">
        <div className="card">
          <div className="text-center mb-8">
            <Hospital className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">Hospital Login</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Access your hospital portal</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Hospital Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="hospital@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" className="w-full btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <LoadingSpinner size="sm" message="" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
