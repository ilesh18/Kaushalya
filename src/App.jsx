import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingHero from './pages/LandingHero';
import ProfileBuilder from './pages/ProfileBuilder';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import EmployerDashboard from './pages/EmployerDashboard';
import ChatbotPage from './pages/ChatbotPage';
import AuthPage from './pages/AuthPage';
import ScreenReader from './ScreenReader';
import MotorAccessibilityToolbar from './MotorAccessibilityToolbar';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import { useAuth } from './context/AuthContext';
import faviconImg from './public/favicon.png';
import './App.css';

/**
 * Visual Alert System for Deaf/HoH Users
 * Provides visual feedback for events that would normally only have audio alerts
 */
export const announceToScreenReader = (message) => {
  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = '';
    // Small delay to ensure the change is detected
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }
};

export const triggerVisualAlert = (element) => {
  if (element) {
    element.classList.add('visual-alert');
    setTimeout(() => {
      element.classList.remove('visual-alert');
    }, 3000);
  }
};

// Base accessible button component used throughout
export const AccessibleButton = ({ children, onClick, className = '', variant = 'primary', style, ...props }) => {
  const baseStyle = {
    minHeight: '44px',
    borderRadius: '12px',
    fontWeight: '600',
    padding: '0 20px',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: "'Inter', sans-serif"
  };

  const variants = {
    primary: {
      background: 'var(--primary-gradient)',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 15px var(--accent-purple-glow)'
    },
    outline: {
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(4px)',
      border: '2px solid var(--accent-purple)',
      color: 'var(--accent-purple)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)'
    }
  };

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant], ...style }}
      className={`accessible-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const { user, userProfile, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trapping and Escape key handling for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (!mobileMenuOpen) return;

      // Close on Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      // Trap focus inside menu
      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Return focus to menu button when closed
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header className={scrolled ? 'header-glass' : ''} style={{
      height: 'var(--header-height)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: scrolled ? undefined : 'transparent',
      transition: 'all 0.3s ease'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <img 
          src={faviconImg} 
          alt="ApnaRozgaar logo"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            boxShadow: '0 4px 10px var(--accent-purple-glow)'
          }}
        />
        <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}>
          ApnaRozgaar
        </span>
      </Link>

      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Chat with Asha button - navigates to full page */}
        <div className="tooltip-wrapper">
          <button
            onClick={() => navigate('/chat')}
            aria-label="Chat with Asha - AI Assistant"
            title="Chat with Asha"
            style={{
              background: 'var(--primary-gradient)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              minWidth: '44px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 10px var(--accent-purple-glow)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MessageCircle size={20} color="white" aria-hidden="true" />
          </button>
          <span className="tooltip-text">Chat with Asha</span>
        </div>
        {isAuthenticated ? (
          <>
            <span className="desktop-only" style={{ 
              color: 'var(--text-primary)', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Hi, {userProfile?.name || user?.displayName || 'User'}
            </span>
            <AccessibleButton 
              variant="ghost" 
              className="desktop-only" 
              onClick={async () => { await logout(); navigate('/'); }}
              aria-label="Sign out of your account"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <LogOut size={18} />
              Sign Out
            </AccessibleButton>
          </>
        ) : (
          <AccessibleButton 
            variant="ghost" 
            className="desktop-only" 
            onClick={() => navigate('/auth')}
            aria-label="Sign in to your account"
          >
            Sign In
          </AccessibleButton>
        )}
        <AccessibleButton className="desktop-only" onClick={() => navigate('/employer')} aria-label="Post a new job listing">Post a Job</AccessibleButton>
        <button
          ref={menuButtonRef}
          className="mobile-only"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', padding: '8px', cursor: 'pointer', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {mobileMenuOpen ? <X size={28} color="var(--text-primary)" aria-hidden="true" /> : <Menu size={28} color="var(--text-primary)" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              bottom: 0,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              zIndex: 100,
              overflowY: 'auto'
            }}
          >
            <button
              ref={firstFocusableRef}
              onClick={closeMobileMenu}
              style={{
                alignSelf: 'flex-end',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              aria-label="Close navigation menu"
            >
              <X size={20} aria-hidden="true" />
              <span>Close</span>
            </button>
            
            <Link 
              onClick={closeMobileMenu} 
              to="/employer" 
              style={{ 
                fontSize: '1.2rem',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              For Employers
            </Link>
            <Link 
              onClick={closeMobileMenu} 
              to="/profile/create" 
              style={{ 
                fontSize: '1.2rem',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              My Profile
            </Link>
            <Link 
              onClick={closeMobileMenu} 
              to="/jobs" 
              style={{ 
                fontSize: '1.2rem',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Browse Jobs
            </Link>
            <Link 
              onClick={closeMobileMenu} 
              to="/chat" 
              style={{ 
                fontSize: '1.2rem',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Chat with Asha
            </Link>
            
            <hr style={{ borderTop: '1px solid var(--border)', opacity: 0.5, margin: '8px 0' }} aria-hidden="true" />
            
            {isAuthenticated ? (
              <>
                <div style={{ 
                  padding: '16px 20px',
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Hi, {userProfile?.name || user?.displayName || 'User'}
                </div>
                <AccessibleButton 
                  variant="ghost" 
                  onClick={async () => { await logout(); closeMobileMenu(); navigate('/'); }}
                  style={{ 
                    justifyContent: 'flex-start', 
                    padding: '16px 20px', 
                    fontSize: '1.2rem',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  aria-label="Sign out of your account"
                >
                  <LogOut size={20} />
                  Sign Out
                </AccessibleButton>
              </>
            ) : (
              <AccessibleButton 
                variant="ghost" 
                onClick={() => { closeMobileMenu(); navigate('/auth'); }}
                style={{ 
                  justifyContent: 'flex-start', 
                  padding: '16px 20px', 
                  fontSize: '1.2rem',
                  minHeight: '56px'
                }}
                aria-label="Sign in to your account"
              >
                Sign In
              </AccessibleButton>
            )}
            <AccessibleButton 
              onClick={() => { closeMobileMenu(); navigate('/employer'); }}
              style={{ 
                width: '100%', 
                minHeight: '56px',
                fontSize: '1.1rem'
              }}
              aria-label="Post a new job listing"
            >
              Post a Job
            </AccessibleButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="glass" style={{
    marginTop: 'auto',
    borderTop: '1px solid var(--border)',
    padding: '60px 24px 40px',
    position: 'relative',
    overflow: 'hidden'
  }} role="contentinfo">
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '400px' }}>
        <strong style={{ fontSize: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>AbilityConnect</strong>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.1rem' }}>We are an inclusive platform dedicated to removing barriers and matching talent to truly accessible roles.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: 'rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.2)',
            color: 'var(--success)',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <span aria-hidden="true">✓</span> Accessibility: WCAG 2.1 AA
          </div>
          <div className="deaf-friendly-badge" style={{ fontSize: '0.875rem' }}>
            <span role="img" aria-hidden="true">🤟</span> Deaf/HoH Friendly
          </div>
        </div>
      </div>
      <div>
        <nav aria-label="Platform links" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <strong style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>Platform</strong>
          <Link to="/about" aria-label="About AbilityConnect">About Us</Link>
          <Link to="/contact" aria-label="Contact AbilityConnect support">Contact</Link>
          <Link to="/accessibility" aria-label="Read our accessibility statement">Accessibility Statement</Link>
        </nav>
      </div>
      
      {/* NEW: Contact Options for Deaf/HoH Users */}
      <div>
        <nav aria-label="Contact Options" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <strong style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>Contact Us</strong>
          <a href="mailto:support@apnarozgaar.in" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span role="img" aria-label="Email">✉️</span> support@apnarozgaar.in
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span role="img" aria-label="Text/SMS">💬</span> SMS: +91 98765 43210
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <span role="img" aria-label="Text Relay">📞</span> Text Relay: 18001
          </div>
          <div style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)', 
            padding: '8px 12px', 
            background: 'rgba(124, 58, 237, 0.05)', 
            borderRadius: '8px',
            marginTop: '4px'
          }}>
            <span style={{ display: 'block', fontWeight: '600', color: 'var(--accent-purple)' }}>📵 No phone-only support</span>
            All inquiries can be handled via email, chat, or text relay
          </div>
        </nav>
      </div>

      <div>
        <nav aria-label="Social media links" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <strong style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>Connect</strong>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow AbilityConnect on LinkedIn (opens in new tab)">
            LinkedIn <span className="sr-only">(opens in new tab)</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow AbilityConnect on Twitter (opens in new tab)">
            Twitter <span className="sr-only">(opens in new tab)</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow AbilityConnect on Instagram (opens in new tab)">
            Instagram <span className="sr-only">(opens in new tab)</span>
          </a>
        </nav>
      </div>
    </div>
    
    {/* Deaf/HoH Resources Section */}
    <div style={{ 
      maxWidth: '1200px', 
      margin: '40px auto 0', 
      padding: '24px', 
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))', 
      borderRadius: '16px',
      border: '1px solid rgba(59, 130, 246, 0.1)'
    }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontSize: '1.1rem' }}>
        <span role="img" aria-hidden="true">🤟</span> Deaf/HoH Communication Options
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Sign Language Support</strong>
          <p style={{ margin: '4px 0 0' }}>BSL, ASL, and ISL interpreters available for video calls upon request.</p>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Live Chat</strong>
          <p style={{ margin: '4px 0 0' }}>Our chat feature works with any text-based communication tool.</p>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Text Relay (UK/India)</strong>
          <p style={{ margin: '4px 0 0' }}>We accept calls via Relay UK (18001) and Indian Relay Service.</p>
        </div>
      </div>
    </div>
    
    {/* Copyright and Keyboard Hint */}
    <div style={{ 
      maxWidth: '1200px', 
      margin: '40px auto 0', 
      paddingTop: '24px', 
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <p style={{ margin: 0, fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} AbilityConnect. All rights reserved.
      </p>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Press <kbd className="keyboard-key" style={{ fontSize: '0.8rem', padding: '2px 6px' }}>?</kbd> for keyboard shortcuts
      </p>
    </div>
  </footer>
);

// Animated Router Wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <LandingHero />
          </motion.div>
        } />
        <Route path="/profile/create" element={
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <ProfileBuilder />
          </motion.div>
        } />
        <Route path="/jobs" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <JobListings />
          </motion.div>
        } />
        <Route path="/jobs/:id" element={
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <JobDetail />
          </motion.div>
        } />
        <Route path="/employer" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <EmployerDashboard />
          </motion.div>
        } />
        <Route path="/chat" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <ChatbotPage />
          </motion.div>
        } />
        <Route path="/auth" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <AuthPage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <>
      {/* 1. Skip to main content link must be first in body/app */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main id="main-content" tabIndex="-1" style={{ flex: 1 }} role="main">
          <AnimatedRoutes />
        </main>

        {!isChatPage && <Footer />}
      </div>

      {/* Screen Reader - Text-to-Speech Feature */}
      <ScreenReader />
      
      {/* Motor Accessibility Toolbar - Section 7 */}
      <MotorAccessibilityToolbar />
      
      {/* Keyboard Shortcuts Help - Section 1.6 */}
      <KeyboardShortcutsHelp />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
