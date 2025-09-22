import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const AuthTest = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setResult('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setResult(`Signup Success! User ID: ${userCredential.user.uid}`);
    } catch (error) {
      setResult(`Signup Error: ${error.code} - ${error.message}`);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setResult('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setResult(`Login Success! User: ${userCredential.user.email}`);
    } catch (error) {
      setResult(`Login Error: ${error.code} - ${error.message}`);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    setResult('');
    try {
      await signOut(auth);
      setResult('Logout successful!');
    } catch (error) {
      setResult(`Logout Error: ${error.message}`);
    }
    setLoading(false);
  };

  const checkCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      setResult(`Current User: ${user.email} (${user.uid})`);
    } else {
      setResult('No user is currently logged in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Firebase Auth Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="test@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="password123"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleSignup}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Test Signup
              </button>
              
              <button
                onClick={handleLogin}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Test Login
              </button>
              
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Test Logout
              </button>
              
              <button
                onClick={checkCurrentUser}
                disabled={loading}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Check User
              </button>
            </div>
            
            {loading && (
              <div className="text-center py-2">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {result && (
              <div className={`p-4 rounded-lg text-sm break-all ${
                result.includes('Success') || result.includes('successful') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : result.includes('Error') 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {result}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Use this page to test Firebase Authentication</p>
          <p>Check the browser console for additional logs</p>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
