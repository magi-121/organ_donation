import React, { useState } from 'react';
import { organs } from '../../data/sampleData';
import OrganCard from '../Common/OrganCard';
import Modal from '../Common/Modal';
import LoadingSpinner from '../Common/LoadingSpinner';
import { CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { donorService, organService } from '../../services/organService';
import { useAuth } from '../../contexts/AuthContext';

const DeceasedForm = () => {
  const [selectedOrgans, setSelectedOrgans] = useState([]);
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleOrganSelect = (organ) => {
    setSelectedOrgans(prev => {
      const exists = prev.find(o => o.id === organ.id);
      if (exists) {
        return prev.filter(o => o.id !== organ.id);
      }
      return [...prev, organ];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    if (selectedOrgans.length === 0) {
      setError('Please select at least one organ to donate');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Register donor
      const donorData = {
        userId: user.uid,
        email: user.email,
        organsToDonat: selectedOrgans,
        type: 'deceased',
        agreedToTerms: true,
        registeredAt: new Date().toISOString()
      };
      
      const result = await donorService.registerDeceasedDonor(donorData);
      
      if (result.success) {
        // Add organs to pledge registry
        for (const organ of selectedOrgans) {
          await organService.addOrganDonation({
            donorId: result.id,
            donorUserId: user.uid,
            organType: organ.name,
            organId: organ.id,
            urgency: organ.urgency,
            description: organ.description,
            donorType: 'deceased',
            status: 'pledged',
            bloodGroups: organ.bloodGroups
          });
        }
        
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Reset form
          setSelectedOrgans([]);
          setAgreedToTerms(false);
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to register pledge');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit pledge. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const termsContent = (
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <p>By registering as a deceased organ donor, you agree to the following terms:</p>
      <ol className="list-decimal ml-6 space-y-2">
        <li>Your organs will be donated only after medical certification of death.</li>
        <li>The donation will be conducted with utmost respect and dignity.</li>
        <li>Your family will be consulted and kept informed throughout the process.</li>
        <li>The organs will be allocated based on medical urgency and compatibility.</li>
        <li>No commercial transaction will be involved in the donation process.</li>
        <li>Your personal information will be kept confidential.</li>
        <li>You may revoke this consent at any time while you are alive.</li>
      </ol>
      <p className="font-semibold">This consent form is legally binding and will be honored after your passing.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-slide-down relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold gradient-text">Deceased Donor Consent Form</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for considering organ donation. Your decision can save multiple lives.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3 animate-slide-down relative z-10">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">Error</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-20">
          {/* Organ Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-up">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Select Organs for Donation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose which organs you consent to donate after your passing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {organs.map(organ => (
                <OrganCard
                  key={organ.id}
                  organ={organ}
                  selected={selectedOrgans.some(o => o.id === organ.id)}
                  onSelect={handleOrganSelect}
                  showDetails={true}
                />
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> You can also choose to donate all suitable organs by selecting multiple options.
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-up relative" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Terms and Conditions</h2>
            
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-blue-600 hover:text-blue-700 underline font-semibold transition-colors cursor-pointer relative z-50"
                style={{ position: 'relative', zIndex: 100 }}
              >
                Read Terms and Conditions
              </button>
              
              <label className="flex items-start space-x-3 cursor-pointer relative z-50">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 border-2 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  style={{ position: 'relative', zIndex: 100 }}
                  required
                />
                <span className="text-sm dark:text-gray-300">
                  I have read and agree to the terms and conditions. I understand that this consent 
                  can be revoked at any time during my lifetime.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              type="submit"
              disabled={selectedOrgans.length === 0 || !agreedToTerms || isSubmitting}
              className={`px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 relative z-50 ${
                selectedOrgans.length > 0 && agreedToTerms && !isSubmitting
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-xl cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ position: 'relative', zIndex: 100 }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" message="" />
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Consent Form'
              )}
            </button>
          </div>
        </form>

        {/* Terms Modal */}
        <Modal
          isOpen={showTerms}
          onClose={() => setShowTerms(false)}
          title="Terms and Conditions"
        >
          {termsContent}
        </Modal>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-up z-50">
            <div className="bg-white/20 p-2 rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">Pledge Registered Successfully!</p>
              <p className="text-sm opacity-90">Thank you for your organ donation pledge</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeceasedForm;
