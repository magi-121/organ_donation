import React from 'react';
import { Heart, Clock, Droplet } from 'lucide-react';

const OrganCard = ({ organ, selected, onSelect, showDetails = false }) => {
  return (
    <div
      className={`card cursor-pointer transform transition-all duration-300 ${
        selected ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
      onClick={() => onSelect && onSelect(organ)}
    >
      <img
        src={organ.image}
        alt={organ.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2 dark:text-white">{organ.name}</h3>
      
      {showDetails && (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-3">{organ.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-red-500" />
              <span className="text-sm">Urgency: {organ.urgency}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Compatible: {organ.bloodGroups.join(', ')}</span>
            </div>
          </div>
        </>
      )}
      
      {onSelect && (
        <div className="mt-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(organ)}
            className="form-checkbox h-5 w-5 text-blue-600"
            onClick={(e) => e.stopPropagation()}
          />
          <label className="ml-2 text-sm">Select for donation</label>
        </div>
      )}
    </div>
  );
};

export default OrganCard;
