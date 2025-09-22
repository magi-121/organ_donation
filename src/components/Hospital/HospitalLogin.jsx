import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital, Lock, Mail, Building2, MapPin, Phone, AlertCircle, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const HospitalLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalPhone, setHospitalPhone] = useState('');
  const [hospitalRegistration, setHospitalRegistration] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    
    try {
      if (isLogin) {
        // Hospital Login
        const result = await login(email, password);
        if (result.success) {
          // Check if user is actually a hospital
          if (result.userType === 'hospital') {
            navigate('/hospital-dashboard');
          } else {
            setError('This account is registered as a donor. Please use the donor portal.');
            await logout();
          }
        } else {
          setError(result.error || 'Invalid email or password');
        }
      } else {
        // Hospital Registration
        if (!hospitalName || !hospitalAddress || !hospitalPhone || !hospitalRegistration) {
          setError('Please fill all hospital details');
          setIsLoggingIn(false);
          return;
        }

        const hospitalData = {
          hospitalName,
          hospitalAddress,
          hospitalPhone,
          registrationNumber: hospitalRegistration,
          isVerified: false
        };

        const result = await signup(email, password, 'hospital', hospitalData);
        if (result.success) {
          navigate('/hospital-dashboard');
        } else {
          setError(result.error || 'Failed to register hospital');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
    
    setIsLoggingIn(false);
  };

  const toggleLogin = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setError('');
    // Reset form
    setEmail('');
    setPassword('');
    setHospitalName('');
    setHospitalAddress('');
    setHospitalPhone('');
    setHospitalRegistration('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className={`${isLogin ? 'max-w-md' : 'max-w-2xl'} w-full relative z-10 animate-slide-up`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4 animate-bounce-slow">
              <Hospital className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">
              {isLogin ? 'Hospital Portal' : 'Hospital Registration'}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isLogin ? 'Access your hospital dashboard' : 'Register your hospital on our network'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3 animate-slide-down">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Registration Fields */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hospital Name */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Hospital Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                      <input
                        type="text"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all relative z-0"
                        placeholder="City General Hospital"
                        required={!isLogin}
                        style={{ position: 'relative', zIndex: 1 }}
                      />
                    </div>
                  </div>

                  {/* Registration Number */}
                  <div className="relative">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Registration Number
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                      <input
                        type="text"
                        value={hospitalRegistration}
                        onChange={(e) => setHospitalRegistration(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all relative z-0"
                        placeholder="REG12345"
                        required={!isLogin}
                        style={{ position: 'relative', zIndex: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Hospital Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                    <input
                      type="text"
                      value={hospitalAddress}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all relative z-0"
                      placeholder="123 Medical District, City, State"
                      required={!isLogin}
                      style={{ position: 'relative', zIndex: 1 }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                    <input
                      type="tel"
                      value={hospitalPhone}
                      onChange={(e) => setHospitalPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all relative z-0"
                      placeholder="+91 1234567890"
                      required={!isLogin}
                      style={{ position: 'relative', zIndex: 1 }}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Admin Account Details</h3>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {isLogin ? 'Email Address' : 'Admin Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all relative z-0"
                  placeholder={isLogin ? "admin@hospital.com" : "admin@yourhospital.com"}
                  required
                  style={{ position: 'relative', zIndex: 1 }}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all relative z-0"
                  placeholder={isLogin ? "Enter password" : "Create strong password (min 6 chars)"}
                  minLength={6}
                  required
                  style={{ position: 'relative', zIndex: 1 }}
                />
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full btn-primary py-3 flex items-center justify-center relative z-10"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <LoadingSpinner size="sm" message="" />
              ) : (
                <span>{isLogin ? 'Sign In' : 'Register Hospital'}</span>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-6 text-center relative z-20">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Hospital not registered?" : "Already registered?"}{' '}
              <button 
                type="button"
                onClick={toggleLogin}
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors underline cursor-pointer"
                style={{ position: 'relative', zIndex: 30 }}
              >
                {isLogin ? 'Register here' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg relative z-10">
              <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">New Hospital?</p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Click "Register here" to create a hospital account
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
