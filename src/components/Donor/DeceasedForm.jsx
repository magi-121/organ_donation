import React, { useState } from 'react';
import { organs } from '../../data/sampleData';
import OrganCard from '../Common/OrganCard';
import Modal from '../Common/Modal';
import LoadingSpinner from '../Common/LoadingSpinner';
import { CheckCircle, FileText } from 'lucide-react';

const DeceasedForm = () => {
  const [selectedOrgans, setSelectedOrgans] = useState([]);
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold dark:text-white">Deceased Donor Consent Form</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for considering organ donation. Your decision can save multiple lives.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Organ Selection */}
        <div className="card">
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
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Terms and Conditions</h2>
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Read Terms and Conditions
            </button>
            
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
                required
              />
              <span className="text-sm dark:text-gray-300">
                I have read and agree to the terms and conditions. I understand that this consent 
                can be revoked at any time during my lifetime.
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={selectedOrgans.length === 0 || !agreedToTerms || isSubmitting}
            className={`px-8 py-3 text-lg rounded-lg transition-all ${
              selectedOrgans.length > 0 && agreedToTerms && !isSubmitting
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
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
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg flex items-center space-x-2 animate-slide-up">
          <CheckCircle className="h-5 w-5" />
          <span>Consent form submitted successfully!</span>
        </div>
      )}
    </div>
  );
};

export default DeceasedForm;
