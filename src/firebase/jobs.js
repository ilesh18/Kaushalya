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

// Get all active jobs — simple query, no composite index required
export const getAllJobs = async () => {
  try {
    const snap = await getDocs(collection(db, COLLECTION));
    const jobs = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data.status === 'active') {
        jobs.push({ ...data, id: d.id });
      }
    });
    // Sort by createdAt descending client-side
    jobs.sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? new Date(a.createdAt || 0).getTime();
      const tb = b.createdAt?.toMillis?.() ?? new Date(b.createdAt || 0).getTime();
      return tb - ta;
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

// Get jobs by employer ID — no composite index needed
export const getJobsByEmployer = async (employerId) => {
  try {
    const snap = await getDocs(collection(db, COLLECTION));
    const jobs = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data.employerId === employerId) {
        jobs.push({ ...data, id: d.id });
      }
    });
    jobs.sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? new Date(a.createdAt || 0).getTime();
      const tb = b.createdAt?.toMillis?.() ?? new Date(b.createdAt || 0).getTime();
      return tb - ta;
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
    if (!jobSnap.exists()) return { success: false, error: 'Job not found' };

    const jobData = jobSnap.data();
    const applicants = jobData.applicants || [];

    if (applicants.some((a) => a.candidateId === candidateId)) {
      return { success: false, error: 'Already applied' };
    }

    applicants.push({
      candidateId,
      candidateName: candidateData.name,
      candidateSkills: candidateData.skills,
      appliedAt: new Date().toISOString(),
      status: 'pending'
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
    await updateDoc(doc(db, COLLECTION, jobId), {
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
