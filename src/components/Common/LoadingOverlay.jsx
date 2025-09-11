import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = ({ isLoading, message = 'Processing...' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">
        <LoadingSpinner size="lg" variant="heart" message={message} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
