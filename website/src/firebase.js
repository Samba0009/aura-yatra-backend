import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration updated with provided google-services.json values
const firebaseConfig = {
  apiKey: "AIzaSyB4-tGegt0_OosvFGcGqYxcwfY2Sj98qzk",
  authDomain: "aurayatra-1.firebaseapp.com",
  projectId: "aurayatra-1",
  storageBucket: "aurayatra-1.firebasestorage.app",
  messagingSenderId: "207215788492",
  appId: "1:207215788492:android:db611f939a2ee816c19d69"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
