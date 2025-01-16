// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;