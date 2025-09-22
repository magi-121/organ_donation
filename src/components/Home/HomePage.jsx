import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Hospital, Users, ChevronRight, Gift, Shield, Clock, Award } from 'lucide-react';

const HomePage = () => {
  const stats = [
    { icon: Heart, value: '10,000+', label: 'Lives Saved', color: 'from-red-500 to-pink-500' },
    { icon: Hospital, value: '500+', label: 'Partner Hospitals', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, value: '50,000+', label: 'Registered Donors', color: 'from-purple-500 to-pink-500' },
    { icon: Gift, value: '25,000+', label: 'Organs Donated', color: 'from-green-500 to-teal-500' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your data is protected with enterprise-grade security',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access our platform anytime, anywhere',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'Certified Network',
      description: 'All hospitals are verified and certified',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full mb-6 animate-bounce-slow">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">🎉 Join 50,000+ Life Savers</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold mb-6">
              <span className="gradient-text">Give Life</span>
              <br />
              <span className="text-gray-900 dark:text-white">Through Donation</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Connect with a nationwide network of donors and hospitals. Every organ donation can save up to 8 lives. Be a hero today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donor-login" className="group btn-primary inline-flex items-center">
                <Gift className="mr-2 h-5 w-5 group-hover:animate-wiggle" />
                Become a Donor
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/hospital-login" className="btn-outline inline-flex items-center">
                <Hospital className="mr-2 h-5 w-5" />
                Hospital Portal
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Temporary Auth Test Section */}




      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Impact</h2>
            <p className="text-gray-600 dark:text-gray-400">Making a difference, one life at a time</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="card card-hover text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 p-3 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                  <stat.icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 gradient-text">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Why Choose LifeLink?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Experience the best organ donation platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card card-hover group animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`w-16 h-16 mb-6 p-3 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Save Lives?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of donors making a difference. Your decision today can bring hope to families tomorrow.
          </p>
          <Link to="/donor-login" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Get Started Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
