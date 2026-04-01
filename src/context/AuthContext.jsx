// Authentication Context - Provides auth state across the app
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getCurrentUserProfile, logoutUser } from '../firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'candidate' or 'employer'

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Try to fetch profile (check both candidate and employer)
        let profile = await getCurrentUserProfile('candidate');
        let type = 'candidate';
        
        if (!profile) {
          profile = await getCurrentUserProfile('employer');
          type = 'employer';
        }
        
        setUserProfile(profile);
        setUserType(profile ? type : null);
      } else {
        setUserProfile(null);
        setUserType(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setUserProfile(null);
    setUserType(null);
  };

  const refreshProfile = async () => {
    if (user && userType) {
      const profile = await getCurrentUserProfile(userType);
      setUserProfile(profile);
    }
  };

  const value = {
    user,
    userProfile,
    userType,
    loading,
    logout,
    refreshProfile,
    isAuthenticated: !!user,
    isCandidate: userType === 'candidate',
    isEmployer: userType === 'employer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
