import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowLeft } from 'lucide-react';
import { registerUser, loginUser } from '../firebase/auth';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('candidate');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect if already logged in
  if (user) {
    navigate(userType === 'employer' ? '/employer' : '/profile/create');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await loginUser(formData.email, formData.password);
        if (result.success) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => navigate('/'), 1500);
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        const userData = {
          name: formData.name,
          email: formData.email
        };
        const result = await registerUser(formData.email, formData.password, userData, userType);
        if (result.success) {
          setSuccess('Account created! Redirecting...');
          setTimeout(() => {
            navigate(userType === 'employer' ? '/employer' : '/profile/create');
          }, 1500);
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '1rem',
    border: '2px solid var(--border)',
    borderRadius: '12px',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'all 0.2s',
    minHeight: '52px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    fontSize: '0.95rem'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--bg-primary)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            marginBottom: '24px',
            fontSize: '0.95rem'
          }}
          aria-label="Go back to home"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '8px',
          color: 'var(--accent-purple)'
        }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          {isLogin 
            ? 'Sign in to access your account' 
            : 'Join our inclusive employment platform'}
        </p>

        {!isLogin && (
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>I am a:</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setUserType('candidate')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: `2px solid ${userType === 'candidate' ? 'var(--accent-purple)' : 'var(--border)'}`,
                  background: userType === 'candidate' ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-secondary)',
                  color: userType === 'candidate' ? 'var(--accent-purple)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                aria-pressed={userType === 'candidate'}
              >
                <User size={20} />
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setUserType('employer')}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '12px',
                  border: `2px solid ${userType === 'employer' ? 'var(--accent-teal)' : 'var(--border)'}`,
                  background: userType === 'employer' ? 'rgba(20, 184, 166, 0.1)' : 'var(--bg-secondary)',
                  color: userType === 'employer' ? 'var(--accent-teal)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                aria-pressed={userType === 'employer'}
              >
                <Building2 size={20} />
                Employer
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={labelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={iconStyle} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required={!isLogin}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-purple)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={iconStyle} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-purple)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={iconStyle} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{ ...inputStyle, paddingRight: '48px' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-purple)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '8px'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={iconStyle} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required={!isLogin}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-purple)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>
          )}

          {error && (
            <div 
              role="alert"
              style={{
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#ef4444',
                marginBottom: '20px',
                fontSize: '0.95rem'
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div 
              role="status"
              style={{
                padding: '12px 16px',
                background: 'rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                borderRadius: '8px',
                color: 'var(--success)',
                marginBottom: '20px',
                fontSize: '0.95rem'
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: 'var(--accent-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s',
              minHeight: '52px'
            }}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-purple)',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
