// Candidate-related Firestore operations
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION = 'candidates';

// Create/Update candidate profile
export const saveCandidateProfile = async (uid, profileData) => {
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

// Get candidate profile by ID
export const getCandidateProfile = async (uid) => {
  try {
    const docRef = doc(db, COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { ...docSnap.data(), id: docSnap.id } };
    }
    return { success: false, error: 'Profile not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all candidates (for employers)
export const getAllCandidates = async () => {
  try {
    const q = query(collection(db, COLLECTION));
    const querySnapshot = await getDocs(q);
    const candidates = [];
    
    querySnapshot.forEach((doc) => {
      candidates.push({ ...doc.data(), id: doc.id });
    });
    
    return { success: true, data: candidates };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Search candidates by skills
export const searchCandidatesBySkills = async (skills) => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('skills', 'array-contains-any', skills)
    );
    const querySnapshot = await getDocs(q);
    const candidates = [];
    
    querySnapshot.forEach((doc) => {
      candidates.push({ ...doc.data(), id: doc.id });
    });
    
    return { success: true, data: candidates };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Candidate Profile Schema Example:
/*
{
  uid: "firebase-user-id",
  name: "John Doe",
  email: "john@example.com",
  skills: ["JavaScript", "React", "Node.js"],
  disabilityType: "visual", // visual, hearing, mobility, cognitive
  assistiveTech: ["screen reader", "voice input"],
  workPreference: "remote", // remote, onsite, hybrid
  accommodations: "Flexible hours, screen reader compatible tools",
  experience: "3 years in web development",
  createdAt: "2026-03-31T10:00:00.000Z",
  updatedAt: "2026-03-31T10:00:00.000Z"
}
*/
