import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  variant = 'circle',
  color = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        {message && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'heart') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          <Heart className={`${sizeClasses[size]} text-primary-500 animate-pulse`} />
          <Heart className={`${sizeClasses[size]} text-primary-300 absolute inset-0 animate-ping`} />
        </div>
        {message && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium animate-pulse">{message}</p>
        )}
      </div>
    );
  }

  // Enhanced circle spinner
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-secondary-500 animate-spin"></div>
        </div>
        <div className={`${sizeClasses[size]} absolute inset-0`}>
          <div className="h-full w-full rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 animate-pulse"></div>
        </div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
