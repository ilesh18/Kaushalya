// Authentication functions
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Register new user (candidate or employer)
export const registerUser = async (email, password, userData, userType = 'candidate') => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: userData.name });

    // Create user document in Firestore
    const userDocRef = doc(db, userType === 'candidate' ? 'candidates' : 'employers', user.uid);
    await setDoc(userDocRef, {
      ...userData,
      email,
      userType,
      createdAt: new Date().toISOString(),
      uid: user.uid
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign in existing user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign out user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user profile data
export const getCurrentUserProfile = async (userType = 'candidate') => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const docRef = doc(db, userType === 'candidate' ? 'candidates' : 'employers', user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Auth state listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
