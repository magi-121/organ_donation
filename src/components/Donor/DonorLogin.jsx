import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const DonorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [donorStatus, setDonorStatus] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password && donorStatus) {
      setIsLoggingIn(true);
      
      // Simulate login process
      setTimeout(() => {
        login(email, 'donor');
        navigate(`/donor-${donorStatus}`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full animate-slide-up">
        <div className="card">
          <div className="text-center mb-8">
            <UserCircle className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">Donor Login</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to manage your donations</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="donor@example.com"
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
            
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Donor Status</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="alive"
                    checked={donorStatus === 'alive'}
                    onChange={(e) => setDonorStatus(e.target.value)}
                    className="mr-2"
                    required
                  />
                  <span className="dark:text-gray-300">Living Donor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="deceased"
                    checked={donorStatus === 'deceased'}
                    onChange={(e) => setDonorStatus(e.target.value)}
                    className="mr-2"
                    required
                  />
                  <span className="dark:text-gray-300">Deceased Donor Registration</span>
                </label>
              </div>
            </div>
            
            <button type="submit" className="w-full btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <LoadingSpinner size="sm" message="" />
              ) : (
                'Continue'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
