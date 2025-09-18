import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 shadow-lg transform hover:scale-110 transition-all duration-300"
    >
      <div className="relative">
        {isDark ? (
          <Sun className="h-5 w-5 text-white animate-spin-slow" />
        ) : (
          <Moon className="h-5 w-5 text-white" />
        )}
      </div>
      <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
};

export default ThemeToggle;
