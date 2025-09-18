import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock, Mail, Heart, Users } from 'lucide-react';
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
      
      setTimeout(() => {
        login(email, 'donor');
        navigate(`/donor-${donorStatus}`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-md w-full relative animate-slide-up">
        <div className="card glass-effect">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-lg mb-4 animate-bounce-slow">
              <UserCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">Donor Portal</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Join our community of life savers</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="donor@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Select Your Status</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative cursor-pointer ${donorStatus === 'alive' ? 'ring-2 ring-primary-500' : ''}`}>
                  <input
                    type="radio"
                    value="alive"
                    checked={donorStatus === 'alive'}
                    onChange={(e) => setDonorStatus(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div className={`card text-center py-4 transition-all duration-300 ${donorStatus === 'alive' ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20' : ''}`}>
                    <Heart className={`h-8 w-8 mx-auto mb-2 ${donorStatus === 'alive' ? 'text-primary-500' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${donorStatus === 'alive' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      Living Donor
                    </span>
                  </div>
                </label>
                
                <label className={`relative cursor-pointer ${donorStatus === 'deceased' ? 'ring-2 ring-primary-500' : ''}`}>
                  <input
                    type="radio"
                    value="deceased"
                    checked={donorStatus === 'deceased'}
                    onChange={(e) => setDonorStatus(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div className={`card text-center py-4 transition-all duration-300 ${donorStatus === 'deceased' ? 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20' : ''}`}>
                    <Users className={`h-8 w-8 mx-auto mb-2 ${donorStatus === 'deceased' ? 'text-violet-500' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${donorStatus === 'deceased' ? 'text-violet-600 dark:text-violet-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      Pledge Donor
                    </span>
                  </div>
                </label>
              </div>
            </div>
            
            <button type="submit" className="w-full btn-primary" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <LoadingSpinner size="sm" message="" variant="dots" />
              ) : (
                'Continue to Registration'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              New here?{' '}
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
