import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  doc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export class RealtimeService {
  constructor() {
    this.subscriptions = new Map();
  }

  // Subscribe to organ updates
  subscribeToOrgans(callback, filters = {}) {
    let q = query(
      collection(db, 'organDonations'),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc')
    );

    // Apply filters
    if (filters.organType) {
      q = query(q, where('organType', '==', filters.organType));
    }
    if (filters.bloodGroup) {
      q = query(q, where('bloodGroup', '==', filters.bloodGroup));
    }
    if (filters.urgency) {
      q = query(q, where('urgency', '==', filters.urgency));
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const organs = [];
        snapshot.forEach((doc) => {
          organs.push({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          });
        });
        callback({ success: true, data: organs });
      },
      (error) => {
        console.error('Error in organ subscription:', error);
        callback({ success: false, error: error.message });
      }
    );

    this.subscriptions.set('organs', unsubscribe);
    return unsubscribe;
  }

  // Subscribe to hospital updates
  subscribeToHospitals(callback, searchTerm = '') {
    const q = query(
      collection(db, 'hospitals'),
      orderBy('name')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        let hospitals = [];
        snapshot.forEach((doc) => {
          hospitals.push({ 
            id: doc.id, 
            ...doc.data() 
          });
        });

        // Filter by search term if provided
        if (searchTerm) {
          hospitals = hospitals.filter(hospital => 
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        callback({ success: true, data: hospitals });
      },
      (error) => {
        console.error('Error in hospital subscription:', error);
        callback({ success: false, error: error.message });
      }
    );

    this.subscriptions.set('hospitals', unsubscribe);
    return unsubscribe;
  }

  // Subscribe to donor statistics
  subscribeToStats(callback) {
    const queries = {
      donors: query(collection(db, 'donors')),
      organs: query(collection(db, 'organDonations')),
      hospitals: query(collection(db, 'hospitals'))
    };

    const stats = {
      totalDonors: 0,
      totalOrgans: 0,
      totalHospitals: 0,
      criticalCases: 0
    };

    // Subscribe to donors count
    const donorUnsubscribe = onSnapshot(queries.donors, (snapshot) => {
      stats.totalDonors = snapshot.size;
      callback({ success: true, data: { ...stats } });
    });

    // Subscribe to organs count
    const organUnsubscribe = onSnapshot(queries.organs, (snapshot) => {
      stats.totalOrgans = snapshot.size;
      stats.criticalCases = 0;
      
      snapshot.forEach((doc) => {
        if (doc.data().urgency === 'Critical') {
          stats.criticalCases++;
        }
      });
      
      callback({ success: true, data: { ...stats } });
    });

    // Subscribe to hospitals count
    const hospitalUnsubscribe = onSnapshot(queries.hospitals, (snapshot) => {
      stats.totalHospitals = snapshot.size;
      callback({ success: true, data: { ...stats } });
    });

    this.subscriptions.set('stats', () => {
      donorUnsubscribe();
      organUnsubscribe();
      hospitalUnsubscribe();
    });

    return () => {
      donorUnsubscribe();
      organUnsubscribe();
      hospitalUnsubscribe();
    };
  }

  // Subscribe to user-specific donations
  subscribeToUserDonations(userId, callback) {
    const q = query(
      collection(db, 'organDonations'),
      where('donorId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const donations = [];
        snapshot.forEach((doc) => {
          donations.push({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          });
        });
        callback({ success: true, data: donations });
      },
      (error) => {
        callback({ success: false, error: error.message });
      }
    );

    this.subscriptions.set(`user-${userId}`, unsubscribe);
    return unsubscribe;
  }

  // Subscribe to urgent organs (critical status)
  subscribeToUrgentOrgans(callback) {
    const q = query(
      collection(db, 'organDonations'),
      where('urgency', '==', 'Critical'),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const urgentOrgans = [];
        snapshot.forEach((doc) => {
          urgentOrgans.push({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          });
        });
        callback({ success: true, data: urgentOrgans });
      },
      (error) => {
        callback({ success: false, error: error.message });
      }
    );

    this.subscriptions.set('urgent', unsubscribe);
    return unsubscribe;
  }

  // Unsubscribe from specific subscription
  unsubscribe(key) {
    const unsubscribe = this.subscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.subscriptions.delete(key);
    }
  }

  // Unsubscribe from all subscriptions
  unsubscribeAll() {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions.clear();
  }
}

// Export singleton instance
export const realtimeService = new RealtimeService();
