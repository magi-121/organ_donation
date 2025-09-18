import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Home, Hospital, UserCircle, LogOut, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-effect shadow-lg transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl gradient-text">LifeLink</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">Organ Donation Network</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
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
                  className={`nav-link flex items-center space-x-2 ${isActive('/donor-login') ? 'text-primary-500' : ''}`}
                >
                  <UserCircle size={20} />
                  <span>Donor Portal</span>
                </Link>
                
                <Link 
                  to="/hospital-login" 
                  className={`nav-link flex items-center space-x-2 ${isActive('/hospital-login') ? 'text-primary-500' : ''}`}
                >
                  <Hospital size={20} />
                  <span>Hospital Portal</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="nav-link flex items-center space-x-2 text-red-500 hover:text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-effect shadow-lg animate-slide-down">
          <div className="p-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {!user ? (
              <>
                <Link 
                  to="/donor-login" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Donor Portal
                </Link>
                <Link 
                  to="/hospital-login" 
                  className="block py-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hospital Portal
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-lg font-medium text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
