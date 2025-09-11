import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Home, Hospital, UserCircle, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="font-bold text-xl dark:text-white">OrganDonate</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="nav-link flex items-center space-x-1">
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            {!user ? (
              <>
                <Link to="/donor-login" className="nav-link flex items-center space-x-1">
                  <UserCircle size={20} />
                  <span>Donor</span>
                </Link>
                
                <Link to="/hospital-login" className="nav-link flex items-center space-x-1">
                  <Hospital size={20} />
                  <span>Hospital</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="nav-link flex items-center space-x-1 text-red-500 hover:text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
