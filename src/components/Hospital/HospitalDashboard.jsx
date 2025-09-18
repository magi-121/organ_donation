import React, { useState, useEffect } from 'react';
import { hospitals, organs, bloodGroups } from '../../data/sampleData';
import { Filter, MapPin, Clock, Droplet, Package, AlertCircle, Search, Phone, Building2, TrendingUp, Activity } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const HospitalDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrgan, setFilterOrgan] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAllOrgansFromHospitals = () => {
    const allOrgans = [];
    filteredHospitals.forEach(hospital => {
      hospital.availableOrgans.forEach(organ => {
        allOrgans.push({
          ...organ,
          hospitalName: hospital.name,
          hospitalLocation: hospital.location,
          hospitalDistance: hospital.distance,
          hospitalContact: hospital.contact,
          hospitalId: hospital.id
        });
      });
    });
    return allOrgans;
  };

  const filteredOrgans = getAllOrgansFromHospitals().filter(organ => {
    const matchesOrgan = !filterOrgan || organ.organName === filterOrgan;
    const matchesBloodGroup = !filterBloodGroup || organ.bloodGroup === filterBloodGroup;
    return matchesOrgan && matchesBloodGroup;
  });

  const getUrgencyStyle = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-pink-500',
          text: 'text-white',
          pulse: 'animate-pulse'
        };
            case 'high':
        return {
          bg: 'bg-gradient-to-r from-orange-500 to-amber-500',
          text: 'text-white',
          pulse: ''
        };
      case 'medium':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
          text: 'text-white',
          pulse: ''
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          text: 'text-white',
          pulse: ''
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <LoadingSpinner size="lg" variant="heart" message="Loading hospital data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-down">
          <h1 className="text-4xl font-bold gradient-text mb-2">Hospital Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track organ availability across the network</p>
        </div>

        {/* Search Bar */}
        <div className="card glass-effect mb-8 animate-slide-up">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white">Search Hospitals</h2>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search hospitals by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 pr-4"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Filters */}
        <div className="card glass-effect mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white">Advanced Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Organ Type</label>
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
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Blood Group</label>
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
          </div>
        </div>

        {/* Hospital List */}
        {searchQuery && filteredHospitals.length > 0 && (
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Hospitals Found ({filteredHospitals.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital, index) => (
                <div 
                  key={hospital.id} 
                  className={`card card-hover cursor-pointer ${selectedHospital?.id === hospital.id ? 'ring-4 ring-primary-500 ring-opacity-50' : ''}`}
                  onClick={() => setSelectedHospital(hospital)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold dark:text-white">{hospital.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {hospital.location}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-sm rounded-full font-semibold">
                      {hospital.distance}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      {hospital.contact}
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary-500" />
                      <span className="text-sm font-semibold gradient-text">{hospital.availableOrgans.length} organs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Organs */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold dark:text-white">
              Available Organs {searchQuery && `in "${searchQuery}"`}
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full">
              <TrendingUp className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                {filteredOrgans.length} Available
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrgans.map((organ, index) => {
              const urgencyStyle = getUrgencyStyle(organ.urgency);
              return (
                <div 
                  key={`${organ.hospitalId}-${index}`} 
                  className="card card-hover group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold dark:text-white group-hover:gradient-text transition-all duration-300">
                      {organ.organName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${urgencyStyle.bg} ${urgencyStyle.text} ${urgencyStyle.pulse}`}>
                      {organ.urgency}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                      <Droplet className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Blood Group: {organ.bloodGroup}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {organ.hospitalName}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium dark:text-gray-300">Qty: {organ.quantity}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-xs font-medium dark:text-gray-300">{organ.expiryTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {organ.hospitalDistance}
                      </div>
                      <a 
                        href={`tel:${organ.hospitalContact}`}
                        className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Phone className="h-4 w-4" />
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredOrgans.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full mb-4">
              <AlertCircle className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No organs found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? `No organs available in hospitals matching "${searchQuery}"`
                : 'Try adjusting your filters or search for specific hospitals.'}
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="card text-center group">
            <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Package className="h-full w-full text-white" />
            </div>
            <h4 className="text-3xl font-bold gradient-text">{filteredOrgans.length}</h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Available Organs</p>
          </div>
          
          <div className="card text-center group">
            <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Building2 className="h-full w-full text-white" />
            </div>
            <h4 className="text-3xl font-bold gradient-text">{filteredHospitals.length}</h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Hospitals Found</p>
          </div>
          
          <div className="card text-center group">
            <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <AlertCircle className="h-full w-full text-white" />
            </div>
            <h4 className="text-3xl font-bold gradient-text">
              {filteredOrgans.filter(o => o.urgency.toLowerCase() === 'critical').length}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Critical Cases</p>
          </div>
          
          <div className="card text-center group">
            <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Activity className="h-full w-full text-white" />
            </div>
            <h4 className="text-3xl font-bold gradient-text">{hospitals.length}</h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Network</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
