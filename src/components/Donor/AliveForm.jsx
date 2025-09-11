import React, { useState } from 'react';
import { organs, bloodGroups, urgencyReasons } from '../../data/sampleData';
import OrganCard from '../Common/OrganCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import { CheckCircle } from 'lucide-react';

const AliveForm = () => {
  const [selectedDonateOrgans, setSelectedDonateOrgans] = useState([]);
  const [selectedNeedOrgans, setSelectedNeedOrgans] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [needReason, setNeedReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDonateOrganSelect = (organ) => {
    setSelectedDonateOrgans(prev => {
      const exists = prev.find(o => o.id === organ.id);
      if (exists) {
        return prev.filter(o => o.id !== organ.id);
      }
      return [...prev, organ];
    });
  };

  const handleNeedOrganSelect = (organ) => {
    setSelectedNeedOrgans(prev => {
      const exists = prev.find(o => o.id === organ.id);
      if (exists) {
        return prev.filter(o => o.id !== organ.id);
      }
      return [...prev, organ];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Living Donor Registration</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Blood Group Selection */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Blood Group</h2>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="input-field max-w-xs"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Organs to Donate */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Organs You Can Donate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organs.filter(o => ['Kidney', 'Liver', 'Blood'].includes(o.name)).map(organ => (
              <OrganCard
                key={organ.id}
                organ={organ}
                selected={selectedDonateOrgans.some(o => o.id === organ.id)}
                onSelect={handleDonateOrganSelect}
                showDetails={true}
              />
            ))}
          </div>
        </div>

        {/* Organs Needed */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Organs You Need</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Reason for Need</label>
            <select
              value={needReason}
              onChange={(e) => setNeedReason(e.target.value)}
              className="input-field max-w-md"
            >
              <option value="">Select Reason</option>
              {urgencyReasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organs.map(organ => (
              <OrganCard
                key={organ.id}
                organ={organ}
                selected={selectedNeedOrgans.some(o => o.id === organ.id)}
                onSelect={handleNeedOrganSelect}
                showDetails={true}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-primary px-8 py-3 text-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" message="" />
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Registration'
            )}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg flex items-center space-x-2 animate-slide-up">
          <CheckCircle className="h-5 w-5" />
          <span>Registration submitted successfully!</span>
        </div>
      )}
    </div>
  );
};

export default AliveForm;
