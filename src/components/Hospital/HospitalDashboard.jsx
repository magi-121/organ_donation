import React, { useState, useEffect } from 'react';
import { hospitals, organs, bloodGroups } from '../../data/sampleData';
import { Filter, MapPin, Clock, Droplet, Package, AlertCircle, Search, Phone, Building2, TrendingUp, Activity, User } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

const HospitalDashboard = () => {
  const { userDetails, user } = useAuth(); // Get hospital details
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrgan, setFilterOrgan] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [myHospitalOrgans, setMyHospitalOrgans] = useState([]);
  const [allHospitalOrgans, setAllHospitalOrgans] = useState([]);

  useEffect(() => {
    // Fetch organs for this hospital
    const fetchHospitalOrgans = async () => {
      if (!userDetails?.hospitalName) {
        setIsLoading(false);
        return;
      }

      try {
        // In production, this would fetch from Firestore
        // For now, we'll simulate with sample data
        
        // Get organs registered at this hospital
        const myOrgans = [];
        
        // Simulate fetching from Firestore
        // const organsRef = collection(db, 'organDonations');
        // const q = query(organsRef, where('hospital', '==', userDetails.hospitalName));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   myOrgans.push({ id: doc.id, ...doc.data() });
        // });

        setMyHospitalOrgans(myOrgans);
        
        // For demo, use sample data for all hospitals
        const allOrgans = [];
        hospitals.forEach(hospital => {
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
        setAllHospitalOrgans(allOrgans);
        
      } catch (error) {
        console.error('Error fetching organs:', error);
      }
      
      setIsLoading(false);
    };

    fetchHospitalOrgans();
  }, [userDetails]);

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAllOrgansFromHospitals = () => {
    if (searchQuery) {
      // If searching, show organs from searched hospitals
      const searchedOrgans = [];
      filteredHospitals.forEach(hospital => {
        hospital.availableOrgans.forEach(organ => {
          searchedOrgans.push({
            ...organ,
            hospitalName: hospital.name,
            hospitalLocation: hospital.location,
            hospitalDistance: hospital.distance,
            hospitalContact: hospital.contact,
            hospitalId: hospital.id
          });
        });
      });
      return searchedOrgans;
    } else {
      // Show all organs when not searching
      return allHospitalOrgans;
    }
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
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Hospital Info Header */}
        <div className="mb-8 animate-slide-down">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Hospital Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {userDetails?.hospitalName || 'Hospital Portal'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as</p>
                  <p className="text-sm font-semibold dark:text-white">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Hospital Organs Section */}
        {userDetails?.hospitalName && myHospitalOrgans.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-8 animate-slide-up">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center">
              <Building2 className="h-6 w-6 mr-2 text-blue-600" />
              Organs at {userDetails.hospitalName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {myHospitalOrgans.map((organ, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                  <h3 className="font-semibold dark:text-white">{organ.organName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Blood Group: {organ.bloodGroup}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status: <span className="text-green-600">Available</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-slide-up relative">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white">Search Other Hospitals</h2>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search hospitals by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
              style={{ position: 'relative', zIndex: 10 }}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-slide-up relative" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white">Advanced Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Organ Type
              </label>
              <select
                value={filterOrgan}
                onChange={(e) => setFilterOrgan(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                style={{ position: 'relative', zIndex: 10 }}
              >
                <option value="">All Organs</option>
                {organs.map(organ => (
                  <option key={organ.id} value={organ.name}>{organ.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Blood Group
              </label>
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                style={{ position: 'relative', zIndex: 10 }}
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
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${
                    selectedHospital?.id === hospital.id ? 'ring-4 ring-primary-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedHospital(hospital)}
                  style={{ animationDelay: `${index * 0.1}s`, position: 'relative', zIndex: 5 }}
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
              {searchQuery ? `Organs in "${searchQuery}"` : 'All Available Organs in Network'}
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
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative group"
                  style={{ animationDelay: `${index * 0.05}s`, position: 'relative', zIndex: 5 }}
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
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium dark:text-gray-300">Qty: {organ.quantity}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
                        className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors relative z-10"
                        onClick={(e) => e.stopPropagation()}
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
        {filteredOrgans.length === 0 && !isLoading && (
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
                : myHospitalOrgans.length === 0 
                  ? 'No organ donations registered at your hospital yet.'
                  : 'Try adjusting your filters or search for specific hospitals.'}
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { 
              icon: Package, 
              color: 'from-blue-500 to-cyan-500', 
              value: myHospitalOrgans.length, 
              label: 'My Hospital Organs' 
            },
            { 
              icon: Building2, 
              color: 'from-green-500 to-emerald-500', 
              value: filteredOrgans.length, 
              label: 'Network Organs' 
            },
            { 
              icon: AlertCircle, 
              color: 'from-red-500 to-pink-500', 
              value: filteredOrgans.filter(o => o.urgency.toLowerCase() === 'critical').length, 
              label: 'Critical Cases' 
            },
            { 
              icon: Activity, 
              color: 'from-purple-500 to-pink-500', 
              value: hospitals.length, 
              label: 'Total Hospitals' 
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center group transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative">
              <div className={`w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className="h-full w-full text-white" />
              </div>
              <h4 className="text-3xl font-bold gradient-text">{stat.value}</h4>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
