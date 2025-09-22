import React, { useState } from 'react';
import { bloodGroups, hospitals } from '../../data/sampleData';
import LoadingSpinner from '../Common/LoadingSpinner';
import { CheckCircle, AlertCircle, Info, Droplets } from 'lucide-react';
import { donorService, organService } from '../../services/organService';
import { useAuth } from '../../contexts/AuthContext';

const AliveForm = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [donateBlood, setDonateBlood] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!bloodGroup) {
      setError('Please select your blood group');
      return;
    }

    if (!selectedHospital) {
      setError('Please select a hospital for registration');
      return;
    }
    
    if (!donateBlood) {
      setError('Please confirm your willingness to donate blood');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const donorData = {
        userId: user.uid,
        email: user.email,
        bloodGroup,
        donateBlood,
        registeredHospital: selectedHospital,
        status: 'active',
        type: 'living'
      };
      
      const donorResult = await donorService.registerLivingDonor(donorData);
      
      if (donorResult.success) {
        // If donor is willing to donate blood, add it to available donations
        if (donateBlood) {
          await organService.addOrganDonation({
            donorId: donorResult.id,
            donorUserId: user.uid,
            organType: 'Blood',
            bloodGroup,
            urgency: 'Medium',
            description: 'Living donor blood donation',
            donorType: 'living',
            status: 'available',
            hospital: selectedHospital,
            quantity: '1 unit',
            expiryTime: 'On demand'
          });
        }
        
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Reset form
          setBloodGroup('');
          setDonateBlood(false);
          setSelectedHospital('');
        }, 3000);
      } else {
        throw new Error(donorResult.error || 'Failed to register donor');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit registration. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-8 animate-slide-down relative z-10">
          <h1 className="text-4xl font-bold gradient-text mb-2">Living Donor Registration</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Register as a blood donor and help save lives
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-slide-up relative z-10">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">
                  Blood Donation Information
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  As a living donor, you can donate blood every 3-4 months. One blood donation can save up to 3 lives.
                  Your blood will be made available to patients in need at your registered hospital.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3 animate-slide-down relative z-10">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                Registration Error
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error}
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-20">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold">1</span>
              </div>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Your Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-700 dark:text-white transition-all duration-300 cursor-pointer"
                  required
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hospital" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Registration Hospital <span className="text-red-500">*</span>
                </label>
                <select
                  id="hospital"
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-700 dark:text-white transition-all duration-300 cursor-pointer"
                  required
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map(hospital => (
                    <option key={hospital.id} value={hospital.name}>
                      {hospital.name} - {hospital.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blood Donation Consent */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold">2</span>
              </div>
              Blood Donation Consent
            </h2>
            
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <Droplets className="h-12 w-12 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg dark:text-white mb-2">Donate Blood Regularly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    By registering as a living donor, you commit to donate blood when needed at your registered hospital.
                    You will be notified when your blood type is required.
                  </p>
                  <label className="flex items-center space-x-3 cursor-pointer relative z-30">
                    <input
                      type="checkbox"
                      checked={donateBlood}
                      onChange={(e) => setDonateBlood(e.target.checked)}
                      className="w-5 h-5 text-red-600 border-2 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                      style={{ position: 'relative', zIndex: 50 }}
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      I agree to donate blood and help save lives
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Eligibility Criteria for Blood Donation:
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>Age between 18-65 years</li>
                <li>Weight above 45 kg</li>
                <li>Hemoglobin level above 12.5 g/dL</li>
                <li>No major health conditions</li>
                <li>Not donated blood in the last 3 months</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              type="submit" 
              className="btn-primary px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-30" 
              disabled={isSubmitting || !donateBlood}
              style={{ position: 'relative', zIndex: 50 }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-3">
                  <LoadingSpinner size="sm" message="" />
                  <span>Registering...</span>
                </div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Register as Blood Donor</span>
                  <CheckCircle className="h-5 w-5" />
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-up z-50">
            <div className="bg-white/20 p-2 rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">Registration Successful!</p>
              <p className="text-sm opacity-90">Thank you for becoming a blood donor</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AliveForm;
