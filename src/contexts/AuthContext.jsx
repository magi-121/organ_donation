import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up new user
  const signup = async (email, password, type, additionalData = {}) => {
    try {
      // Check if email already exists in users collection
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return { success: false, error: 'This email is already registered' };
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user data in Firestore
      const userData = {
        email: user.email,
        userType: type,
        createdAt: new Date().toISOString(),
        uid: user.uid
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // Store additional data based on user type
      if (type === 'hospital') {
        await setDoc(doc(db, 'hospitals', user.uid), {
          ...additionalData,
          email: user.email,
          uid: user.uid,
          createdAt: new Date().toISOString()
        });
      }

      setUserType(type);
      setUserDetails(additionalData);
      
      return { success: true, user, userType: type };
    } catch (error) {
      console.error('Signup error:', error);
      
      let errorMessage = 'Failed to create account';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Sign in existing user
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user type from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserType(userData.userType);

        // Get additional details based on user type
        if (userData.userType === 'hospital') {
          const hospitalDoc = await getDoc(doc(db, 'hospitals', user.uid));
          if (hospitalDoc.exists()) {
            setUserDetails(hospitalDoc.data());
          }
        }
        
        return { success: true, user, userType: userData.userType };
      } else {
        // User document doesn't exist
        await signOut(auth);
        return { success: false, error: 'User profile not found' };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Failed to sign in';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserType(null);
      setUserDetails(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserType(userData.userType);

            // Get additional details
            if (userData.userType === 'hospital') {
              const hospitalDoc = await getDoc(doc(db, 'hospitals', user.uid));
              if (hospitalDoc.exists()) {
                setUserDetails(hospitalDoc.data());
              }
            }
          }
        } catch (error) {
          console.warn('Could not fetch user data:', error.message);
        }
      } else {
        setUser(null);
        setUserType(null);
        setUserDetails(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userType,
    userDetails,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
