import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Helper function to check if Firestore is available
const checkFirestore = async () => {
  try {
    // Try a simple operation to check if Firestore is working
    await getDocs(collection(db, '_temp_check'));
    return true;
  } catch (error) {
    console.error('Firestore not available:', error.message);
    return false;
  }
};

// Organ donation service with error handling
export const organService = {
  // Add new organ donation
  async addOrganDonation(donationData) {
    try {
      const isAvailable = await checkFirestore();
      if (!isAvailable) {
        console.warn('Firestore not available, using local storage');
        // Fallback to local storage
        const donations = JSON.parse(localStorage.getItem('organDonations') || '[]');
        const newDonation = {
          ...donationData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        donations.push(newDonation);
        localStorage.setItem('organDonations', JSON.stringify(donations));
        return { success: true, id: newDonation.id };
      }

      const docRef = await addDoc(collection(db, 'organDonations'), {
        ...donationData,
        createdAt: serverTimestamp(),
        status: 'available'
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding organ donation:', error);
      return { success: false, error: error.message };
    }
  },

  // Get available organs with fallback
  async getAvailableOrgans(filters = {}) {
    try {
      const isAvailable = await checkFirestore();
      if (!isAvailable) {
        // Return data from local storage
        const donations = JSON.parse(localStorage.getItem('organDonations') || '[]');
        return { success: true, data: donations };
      }

      let q = query(collection(db, 'organDonations'), where('status', '==', 'available'));
      
      const querySnapshot = await getDocs(q);
      const organs = [];
      querySnapshot.forEach((doc) => {
        organs.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: organs };
    } catch (error) {
      console.error('Error fetching organs:', error);
      // Return empty array on error
      return { success: true, data: [] };
    }
  }
};

// Donor service with error handling
export const donorService = {
  // Register living donor
  async registerLivingDonor(donorData) {
    try {
      const isAvailable = await checkFirestore();
      if (!isAvailable) {
        // Fallback to local storage
        const donors = JSON.parse(localStorage.getItem('donors') || '[]');
        const newDonor = {
          ...donorData,
          id: Date.now().toString(),
          registeredAt: new Date().toISOString()
        };
        donors.push(newDonor);
        localStorage.setItem('donors', JSON.stringify(donors));
        return { success: true, id: newDonor.id };
      }

      const docRef = await addDoc(collection(db, 'donors'), {
        ...donorData,
        type: 'living',
        registeredAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error registering donor:', error);
      return { success: false, error: error.message };
    }
  },

  // Register deceased donor
  async registerDeceasedDonor(donorData) {
    try {
      const isAvailable = await checkFirestore();
      if (!isAvailable) {
        // Fallback to local storage
        const donors = JSON.parse(localStorage.getItem('donors') || '[]');
        const newDonor = {
          ...donorData,
          id: Date.now().toString(),
          type: 'deceased',
          registeredAt: new Date().toISOString()
        };
        donors.push(newDonor);
        localStorage.setItem('donors', JSON.stringify(donors));
        return { success: true, id: newDonor.id };
      }

      const docRef = await addDoc(collection(db, 'donors'), {
        ...donorData,
        type: 'deceased',
        registeredAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error registering donor:', error);
      return { success: false, error: error.message };
    }
  }
};
