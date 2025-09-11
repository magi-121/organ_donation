import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Hospital, Users, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const stats = [
    { icon: Heart, value: '10,000+', label: 'Lives Saved' },
    { icon: Hospital, value: '500+', label: 'Partner Hospitals' },
    { icon: Users, value: '50,000+', label: 'Registered Donors' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">Save Lives, Donate Organs</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our mission to connect donors with those in need. Every organ donation can save up to 8 lives.
            </p>
            <div className="space-x-4">
              <Link to="/donor-login" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Become a Donor
              </Link>
              <Link to="/hospital-login" className="btn-primary bg-transparent border-2 border-white">
                Hospital Portal
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold dark:text-white">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Register</h3>
              <p className="text-gray-600 dark:text-gray-400">Sign up as a donor or hospital to join our network</p>
            </div>
            
            <div className="card">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Match</h3>
              <p className="text-gray-600 dark:text-gray-400">Our system matches donors with recipients based on compatibility</p>
            </div>
            
            <div className="card">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Save Lives</h3>
              <p className="text-gray-600 dark:text-gray-400">Complete the donation process and help save lives</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
