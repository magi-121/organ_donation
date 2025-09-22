import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock, Mail, Heart, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const DonorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [donorStatus, setDonorStatus] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !donorStatus) {
      setError('Please fill all fields');
      return;
    }
    
    setIsLoggingIn(true);
    setError('');
    
    try {
      if (isSignup) {
        const result = await signup(email, password, 'donor', { donorStatus });
        if (result.success) {
          navigate(`/donor-${donorStatus}`);
        } else {
          setError(result.error);
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          navigate(`/donor-${donorStatus}`);
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
    
    setIsLoggingIn(false);
  };

  const toggleSignup = (e) => {
    e.preventDefault();
    setIsSignup(!isSignup);
    setError('');
    // Clear form when toggling
    setEmail('');
    setPassword('');
    setDonorStatus('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-md w-full relative z-10 animate-slide-up">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-lg mb-4 animate-bounce-slow">
              <UserCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">
              {isSignup ? 'Create Donor Account' : 'Donor Portal'}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isSignup ? 'Register to save lives' : 'Welcome back, life saver'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3 animate-slide-down">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {isSignup ? 'Registration Failed' : 'Login Failed'}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
              </div>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="donor@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder={isSignup ? "Create a password (min 6 chars)" : "Enter your password"}
                  minLength={6}
                  required
                />
              </div>
              {isSignup && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            
            {/* Donor Status Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Select Your Status
              </label>
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
                  <div className={`card text-center py-4 transition-all duration-300 hover:shadow-lg ${
                    donorStatus === 'alive' 
                      ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                    <Heart className={`h-8 w-8 mx-auto mb-2 ${
                      donorStatus === 'alive' ? 'text-primary-500' : 'text-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      donorStatus === 'alive' 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
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
                  <div className={`card text-center py-4 transition-all duration-300 hover:shadow-lg ${
                    donorStatus === 'deceased' 
                      ? 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                    <Users className={`h-8 w-8 mx-auto mb-2 ${
                      donorStatus === 'deceased' ? 'text-violet-500' : 'text-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      donorStatus === 'deceased' 
                        ? 'text-violet-600 dark:text-violet-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      Pledge Donor
                    </span>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full btn-primary py-3 flex items-center justify-center"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <LoadingSpinner size="sm" message="" variant="dots" />
              ) : (
                <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>
          </form>
          
          {/* Toggle Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isSignup ? 'Already have an account?' : 'New here?'}{' '}
              <button
                type="button"
                onClick={toggleSignup}
                className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 transition-colors underline relative z-20"
              >
                {isSignup ? 'Sign in' : 'Create an account'}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          {!isSignup && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">Demo Account:</p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Click "Create an account" to register first
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
