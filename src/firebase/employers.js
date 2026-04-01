// Employer-related Firestore operations
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION = 'employers';

// Create/Update employer profile
export const saveEmployerProfile = async (uid, profileData) => {
  try {
    const docRef = doc(db, COLLECTION, uid);
    await setDoc(docRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get employer profile by ID
export const getEmployerProfile = async (uid) => {
  try {
    const docRef = doc(db, COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { ...docSnap.data(), id: docSnap.id } };
    }
    return { success: false, error: 'Employer not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all employers
export const getAllEmployers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION));
    const employers = [];
    
    querySnapshot.forEach((doc) => {
      employers.push({ ...doc.data(), id: doc.id });
    });
    
    return { success: true, data: employers };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Employer Schema Example:
/*
{
  uid: "firebase-user-id",
  companyName: "Tech Corp",
  email: "hr@techcorp.com",
  industry: "Technology",
  companySize: "100-500",
  location: "Bangalore",
  website: "https://techcorp.com",
  accessibilityCommitment: "We are committed to providing...",
  accessibilityFeatures: [
    "wheelchair_accessible",
    "screen_reader_compatible",
    "flexible_hours"
  ],
  contactPerson: "Jane HR",
  phone: "+91 9876543210",
  createdAt: "2026-03-31T10:00:00.000Z",
  updatedAt: "2026-03-31T10:00:00.000Z"
}
*/
