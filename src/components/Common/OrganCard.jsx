import React from 'react';
import { Heart, Clock, Droplet, CheckCircle } from 'lucide-react';

const OrganCard = ({ organ, selected, onSelect, showDetails = false }) => {
  return (
    <div
      className={`card card-hover cursor-pointer group relative overflow-hidden transform transition-all duration-500 ${
        selected ? 'ring-4 ring-primary-500 ring-opacity-50 scale-105' : ''
      }`}
      onClick={() => onSelect && onSelect(organ)}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg animate-bounce-slow">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={organ.image}
          alt={organ.name}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:gradient-text transition-all duration-300">
        {organ.name}
      </h3>
      
      {showDetails && (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {organ.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <Clock className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">Urgency: {organ.urgency}</span>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Droplet className="h-5 w-5 text-blue-500" />
              <div className="text-sm">
                <span className="font-medium">Compatible: </span>
                <span className="text-gray-600 dark:text-gray-400">{organ.bloodGroups.join(', ')}</span>
              </div>
            </div>
          </div>
        </>
      )}
      
      {onSelect && (
        <div className={`mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center ${
          selected ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 -mx-6 -mb-6 px-6 pb-6 pt-4' : ''
        }`}>
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onSelect(organ)}
              className="sr-only"
              onClick={(e) => e.stopPropagation()}
            />
            <div className={`w-6 h-6 rounded-lg border-2 ${
              selected 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 border-transparent' 
                : 'border-gray-300 dark:border-gray-600'
            } transition-all duration-300 flex items-center justify-center`}>
              {selected && <CheckCircle className="h-4 w-4 text-white" />}
            </div>
            <span className={`ml-3 font-medium ${
              selected ? 'gradient-text' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {selected ? 'Selected' : 'Select for donation'}
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default OrganCard;
