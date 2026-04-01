// Firebase Configuration
// Replace these values with your actual Firebase project credentials
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBADlfQrWzHth_eVTdHS7Dbrxqt6u1TvMo",
  authDomain: "kaushalya-pwd-portal.firebaseapp.com",
  projectId: "kaushalya-pwd-portal",
  storageBucket: "kaushalya-pwd-portal.firebasestorage.app",
  messagingSenderId: "241475429160",
  appId: "1:241475429160:web:462031358359ea15fda61d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
