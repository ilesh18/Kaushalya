// Job-related Firestore operations
import { 
  collection, 
  doc, 
  addDoc,
  getDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION = 'jobs';

// Create new job posting
export const createJob = async (jobData, employerId) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...jobData,
      employerId,
      status: 'active',
      applicants: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all active jobs
export const getAllJobs = async () => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const jobs = [];
    
    querySnapshot.forEach((doc) => {
      jobs.push({ ...doc.data(), id: doc.id });
    });
    
    return { success: true, data: jobs };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get job by ID
export const getJobById = async (jobId) => {
  try {
    const docRef = doc(db, COLLECTION, jobId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { ...docSnap.data(), id: docSnap.id } };
    }
    return { success: false, error: 'Job not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get jobs by employer ID
export const getJobsByEmployer = async (employerId) => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('employerId', '==', employerId)
    );
    const querySnapshot = await getDocs(q);
    const jobs = [];
    
    querySnapshot.forEach((doc) => {
      jobs.push({ ...doc.data(), id: doc.id });
    });
    
    return { success: true, data: jobs };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Apply to job
export const applyToJob = async (jobId, candidateId, candidateData) => {
  try {
    const jobRef = doc(db, COLLECTION, jobId);
    const jobSnap = await getDoc(jobRef);
    
    if (!jobSnap.exists()) {
      return { success: false, error: 'Job not found' };
    }
    
    const jobData = jobSnap.data();
    const applicants = jobData.applicants || [];
    
    // Check if already applied
    if (applicants.some(a => a.candidateId === candidateId)) {
      return { success: false, error: 'Already applied' };
    }
    
    // Add applicant
    applicants.push({
      candidateId,
      candidateName: candidateData.name,
      candidateSkills: candidateData.skills,
      appliedAt: new Date().toISOString(),
      status: 'pending' // pending, reviewed, shortlisted, rejected
    });
    
    await updateDoc(jobRef, { applicants });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update job
export const updateJob = async (jobId, updateData) => {
  try {
    const jobRef = doc(db, COLLECTION, jobId);
    await updateDoc(jobRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete job
export const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, COLLECTION, jobId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Job Schema Example:
/*
{
  id: "auto-generated-id",
  title: "Frontend Developer",
  company: "Tech Corp",
  description: "We are looking for...",
  skillsRequired: ["React", "JavaScript", "CSS"],
  jobType: "remote", // remote, onsite, hybrid
  accessibilityFeatures: [
    "wheelchair_accessible",
    "screen_reader_compatible",
    "flexible_hours",
    "sign_language_support"
  ],
  salary: "₹8-12 LPA",
  location: "Bangalore",
  employerId: "employer-uid",
  status: "active", // active, closed, draft
  applicants: [
    {
      candidateId: "candidate-uid",
      candidateName: "John Doe",
      candidateSkills: ["React", "Node.js"],
      appliedAt: "2026-03-31T10:00:00.000Z",
      status: "pending"
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
*/
