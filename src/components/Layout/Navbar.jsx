import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Home, Hospital, UserCircle, LogOut, Menu, X, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import NotificationBell from '../Common/NotificationBell';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, userType, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Get user dashboard link based on user type
  const getDashboardLink = () => {
    if (!user || !userType) return '/';
    
    if (userType === 'donor') {
      // Check if user is on a donor form page
      if (location.pathname.includes('/donor-')) {
        return location.pathname;
      }
      return '/donor-login';
    }
    
    if (userType === 'hospital') {
      return '/hospital-dashboard';
    }
    
    return '/';
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-effect shadow-xl backdrop-blur-lg' 
        : 'bg-white/80 dark:bg-gray-900/80 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Heart className="h-8 w-8 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="font-bold text-2xl gradient-text">LifeLink</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">Organ Donation Network</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className={`nav-link flex items-center space-x-2 ${isActive('/') ? 'text-primary-500' : ''}`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            {!user ? (
              <>
                <Link 
                  to="/donor-login" 
                  className={`nav-link flex items-center space-x-2 ${
                    isActive('/donor-login') || location.pathname.includes('/donor-') 
                      ? 'text-primary-500' 
                      : ''
                  }`}
                >
                  <UserCircle size={20} />
                  <span>Donor Portal</span>
                </Link>
                
                <Link 
                  to="/hospital-login" 
                  className={`nav-link flex items-center space-x-2 ${
                    isActive('/hospital-login') || isActive('/hospital-dashboard') 
                      ? 'text-primary-500' 
                      : ''
                  }`}
                >
                  <Hospital size={20} />
                  <span>Hospital Portal</span>
                </Link>
              </>
            ) : (
              <>
                {/* User Dashboard Link */}
                {userType && (
                  <Link
                    to={getDashboardLink()}
                    className={`nav-link flex items-center space-x-2 ${
                      location.pathname.includes(userType) ? 'text-primary-500' : ''
                    }`}
                  >
                    {userType === 'donor' ? (
                      <>
                        <UserCircle size={20} />
                        <span>My Dashboard</span>
                      </>
                    ) : (
                      <>
                        <Hospital size={20} />
                        <span>Hospital Dashboard</span>
                      </>
                    )}
                  </Link>
                )}

                {/* Notification Bell for logged-in users */}
                <NotificationBell />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="nav-link flex items-center space-x-2 text-red-500 hover:text-red-600"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && <NotificationBell />}
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-effect shadow-lg animate-slide-down">
          <div className="p-4 space-y-3">
            <Link 
              to="/" 
              className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <Home size={20} />
                <span>Home</span>
              </div>
            </Link>
            
            {!user ? (
              <>
                <Link 
                  to="/donor-login" 
                  className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                    isActive('/donor-login') || location.pathname.includes('/donor-')
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <UserCircle size={20} />
                    <span>Donor Portal</span>
                  </div>
                </Link>
                <Link 
                  to="/hospital-login" 
                  className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                    isActive('/hospital-login') || isActive('/hospital-dashboard')
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Hospital size={20} />
                    <span>Hospital Portal</span>
                  </div>
                </Link>
              </>
            ) : (
              <>
                {userType && (
                  <Link
                    to={getDashboardLink()}
                    className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                      location.pathname.includes(userType)
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      {userType === 'donor' ? <UserCircle size={20} /> : <Hospital size={20} />}
                      <span>My Dashboard</span>
                    </div>
                  </Link>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 text-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut size={20} />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
