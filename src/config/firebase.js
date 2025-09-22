import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // Comment out for now

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbDTzxgSJocrS1qx9A2Xe-GqPFmV4T3LQ",
  authDomain: "organdonation121.firebaseapp.com",
  projectId: "organdonation121",
  storageBucket: "organdonation121.firebasestorage.app",
  messagingSenderId: "122567062734",
  appId: "1:122567062734:web:6f8e5ff4691698da278c9f",
  measurementId: "G-E9ED2FRGP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // Comment out for now

// Export the app as default
export default app;
