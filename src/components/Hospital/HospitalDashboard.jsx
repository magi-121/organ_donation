import React, { useState, useEffect } from 'react';
import { hospitalOrgans, organs, bloodGroups } from '../../data/sampleData';
import { Filter, MapPin, Clock, Droplet, Package, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const HospitalDashboard = () => {
  const [filterOrgan, setFilterOrgan] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [activeTab, setActiveTab] = useState('available');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredOrgans = hospitalOrgans.filter(organ => {
    const matchesOrgan = !filterOrgan || organ.organName === filterOrgan;
    const matchesBloodGroup = !filterBloodGroup || organ.bloodGroup === filterBloodGroup;
    return matchesOrgan && matchesBloodGroup;
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" variant="heart" message="Loading available organs..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Hospital Dashboard</h1>

      {/* Filters */}
      <div className="card mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold dark:text-white">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Organ Type</label>
            <select
              value={filterOrgan}
              onChange={(e) => setFilterOrgan(e.target.value)}
              className="input-field"
            >
              <option value="">All Organs</option>
              {organs.map(organ => (
                <option key={organ.id} value={organ.name}>{organ.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Blood Group</label>
            <select
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
              className="input-field"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Location</label>
            <select className="input-field">
              <option>Within 10 km</option>
              <option>Within 50 km</option>
              <option>Within 100 km</option>
              <option>All Locations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'available'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Available Organs
        </button>
        <button
          onClick={() => setActiveTab('nearby')}
          className={`px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'nearby'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Nearby Hospitals
        </button>
      </div>

      {/* Organs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrgans.map(organ => (
          <div key={organ.id} className="card hover:shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold dark:text-white">{organ.organName}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(organ.urgency)}`}>
                {organ.urgency}
              </span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Droplet className="h-4 w-4 text-red-500" />
                <span className="dark:text-gray-300">Blood Group: {organ.bloodGroup}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="dark:text-gray-300">{organ.hospital} - {organ.distance}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-green-500" />
                <span className="dark:text-gray-300">Quantity: {organ.quantity}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="dark:text-gray-300">Expires in: {organ.expiryTime}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button className="w-full btn-primary">
                Request Organ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrgans.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No organs found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or check back later.</p>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-blue-600">15</h4>
          <p className="text-gray-600 dark:text-gray-400">Available Organs</p>
        </div>
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-green-600">8</h4>
          <p className="text-gray-600 dark:text-gray-400">Successful Matches</p>
        </div>
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-orange-600">3</h4>
          <p className="text-gray-600 dark:text-gray-400">Critical Requests</p>
        </div>
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-purple-600">12</h4>
          <p className="text-gray-600 dark:text-gray-400">Partner Hospitals</p>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
