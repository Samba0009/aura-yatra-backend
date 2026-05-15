import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your actual Firebase Configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCgHHWZkx3TFX8FTXLqueWpSC6lTyiePw",
  authDomain: "aurayatra-1.firebaseapp.com",
  projectId: "aurayatra-1",
  storageBucket: "aurayatra-1.firebasestorage.app",
  messagingSenderId: "207215788492",
  appId: "1:207215788492:web:c8b8da2bef3b551ec19d69",
  measurementId: "G-LSL63M1DSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
