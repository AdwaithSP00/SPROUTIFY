// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADbyRWgsVATe-WvS5fhJCur_3q4TB1sSA",
  authDomain: "sproutify-3a23c.firebaseapp.com",
  databaseURL: "https://sproutify-3a23c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sproutify-3a23c",
  storageBucket: "sproutify-3a23c.firebasestorage.app",
  messagingSenderId: "119698860647",
  appId: "1:119698860647:web:068ccb2dcfb2f8acbb82c2",
  measurementId: "G-MHF5VXDTJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore Database
export const analytics = getAnalytics(app); // Firebase Analytics (optional)

// Export the Firebase app instance
export default app;
