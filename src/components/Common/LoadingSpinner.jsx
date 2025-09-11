import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  variant = 'circle',
  color = 'blue' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    purple: 'border-purple-500'
  };

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 bg-${color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
          <div className={`w-3 h-3 bg-${color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-3 h-3 bg-${color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
        </div>
        {message && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'heart') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Heart className={`${sizeClasses[size]} text-red-500 animate-pulse`} />
        {message && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{message}</p>
        )}
      </div>
    );
  }

  // Default circle spinner
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className={`h-full w-full border-4 border-t-${color}-500 border-r-${color}-500 border-b-gray-200 dark:border-b-gray-700 border-l-gray-200 dark:border-l-gray-700 rounded-full`}></div>
        </div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
