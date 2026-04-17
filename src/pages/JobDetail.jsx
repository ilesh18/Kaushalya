import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, ShieldAlert, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { AccessibleButton } from '../App';

export default function JobDetail() {
  const { id } = useParams();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('applied'); // 'applied' or 'saved'
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleApply = () => {
    setNotificationType('applied');
    setShowNotification(true);
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    setNotificationType('saved');
    setShowNotification(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <nav aria-label="Breadcrumb">
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px', color: 'var(--text-muted)', fontWeight: '500' }}>
          <li><Link to="/">Home</Link> <span aria-hidden="true">&gt;</span></li>
          <li><Link to="/jobs">Jobs</Link> <span aria-hidden="true">&gt;</span></li>
          <li><span aria-current="page" style={{ color: 'var(--text-primary)' }}>Senior Frontend Engineer</span></li>
        </ol>
      </nav>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Left Column (Main Info) */}
        <motion.div variants={itemVariants} style={{ flex: '1 1 65%', minWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-secondary)', color: 'var(--accent-purple)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '2rem', border: '1px solid var(--border)'
            }}>T</div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>TechCorp India <span style={{ color: 'var(--success)' }}>✔ Verified</span></div>
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Senior Frontend Engineer</h1>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '32px 0', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-muted)' }}><MapPin /> Bangalore</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-muted)' }}><Briefcase /> Remote</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-muted)' }}><DollarSign /> ₹18L - ₹24L</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-muted)' }}><Clock /> Posted 2 days ago</div>
          </div>

          <section aria-labelledby="acc-features" style={{ marginBottom: '40px' }}>
            <h2 id="acc-features" style={{ marginBottom: '24px' }}>Accessibility Features Verified</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              
              <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                   Screen Reader Compatible
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>All internal tools (Jira, Confluence, IDEs) are tested and verified usable via JAWS, NVDA, and VoiceOver.</p>
              </div>

              <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                   Fully Remote
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>100% remote work permitted indefinitely. Zero required office days.</p>
              </div>

            </div>
          </section>

          {/* NEW: Deaf/HoH Accessibility Section */}
          <section aria-labelledby="deaf-hoh-features" style={{ marginBottom: '40px' }}>
            <h2 id="deaf-hoh-features" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span role="img" aria-hidden="true">🤟</span> Deaf/HoH Accessibility
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              
              <div className="glass" style={{ padding: '24px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span role="img" aria-hidden="true">📝</span> Live Captioning
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>All meetings use automatic live captions. CART (real-time captioning) available for important meetings upon request.</p>
              </div>

              <div className="glass" style={{ padding: '24px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span role="img" aria-hidden="true">🤟</span> Sign Language Support
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>BSL/ASL/ISL interpreters provided for interviews and onboarding. Video relay service (VRS) available for calls.</p>
              </div>

              <div className="glass" style={{ padding: '24px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span role="img" aria-hidden="true">💬</span> Text-Based Communication
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>Slack/Teams text chat is primary. No phone calls required. Email updates for all announcements.</p>
              </div>

              <div className="glass" style={{ padding: '24px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span role="img" aria-hidden="true">🔔</span> Visual Alerts
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>Visual fire alarms in office. Desktop notifications for all important alerts. No audio-only announcements.</p>
              </div>

            </div>

            {/* Interview Options */}
            <div style={{ marginTop: '24px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '1rem' }}>Interview Accommodations Available:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="sign-language-badge">Sign Language Interpreter</span>
                <span className="cart-badge">CART Captioning</span>
                <span className="text-interview-badge">Text-Based Interview</span>
                <span style={{ padding: '6px 14px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--success)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                  Written Questions in Advance
                </span>
                <span style={{ padding: '6px 14px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--success)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                  Extra Time
                </span>
              </div>
            </div>
          </section>

          <section aria-labelledby="job-desc">
            <h2 id="job-desc" style={{ marginBottom: '24px' }}>About the Role</h2>
            <p>We are seeking a highly skilled Senior Frontend Engineer to join our passionate team. At TechCorp India, we believe in building web experiences that are not only performant but inherently accessible to all users.</p>
            <p>You will be leading the UI development for our core enterprise dashboard, mentoring junior developers, and championing accessibility standards (WCAG 2.1 AA) across all new feature designs.</p>

            <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Responsibilities</h3>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>Develop robust, responsive, and highly accessible user interfaces using React and modern CSS.</li>
              <li>Collaborate closely with design and product teams to translate Figma prototypes into polished code.</li>
              <li>Conduct internal accessibility audits and remediate existing issues using automated and manual testing (screen readers, keyboard nav).</li>
              <li>Optimize web applications for maximum speed and scalability.</li>
            </ul>
          </section>
        </motion.div>

        {/* Right Column (Sticky Apply Card) */}
        <motion.div variants={itemVariants} style={{ flex: '1 1 30%', minWidth: '320px', position: 'sticky', top: '100px', alignSelf: 'start' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: '24px', boxShadow: 'var(--card-shadow)' }}>
            
            {/* AI Match Gauge */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="160" height="160" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                  <circle cx="80" cy="80" r="70" stroke="var(--border)" strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="70" stroke="var(--accent-purple)" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="22" strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                </svg>
                <div style={{ 
                  fontSize: '2.5rem', fontWeight: '800', 
                  color: 'var(--accent-purple)'
                }}>95%</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '16px' }}>AI Match Score</div>
            </div>

            <table style={{ width: '100%', marginBottom: '32px', borderCollapse: 'collapse', fontWeight: '500' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0' }}>Skills Match</td>
                  <td style={{ textAlign: 'right', color: 'var(--success)' }}>98%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0' }}>Accommodation</td>
                  <td style={{ textAlign: 'right', color: 'var(--success)' }}>100%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0' }}>Experience</td>
                  <td style={{ textAlign: 'right', color: 'var(--accent-amber)' }}>85%</td>
                </tr>
              </tbody>
            </table>

            <AccessibleButton
              onClick={handleApply}
              style={{ width: '100%', marginBottom: '16px', minHeight: '56px', fontSize: '1.1rem' }}
              aria-label="Apply for Senior Frontend Engineer at TechCorp India"
            >
              Apply Now
            </AccessibleButton>
            <AccessibleButton
              variant={isSaved ? "primary" : "outline"}
              onClick={handleSaveJob}
              style={{ width: '100%', marginBottom: '24px', minHeight: '56px', fontSize: '1.1rem' }}
              aria-label={`${isSaved ? 'Remove from' : 'Add to'} saved jobs`}
              aria-pressed={isSaved}
            >
              {isSaved ? '✓ Job Saved' : 'Save Job'}
            </AccessibleButton>

            <div style={{ textAlign: 'center' }}>
              <button aria-label="Report accessibility issue with this job listing" style={{
                background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500', minHeight: '44px', padding: '8px 16px'
              }}>
                <ShieldAlert size={16} aria-hidden="true" /> Report Accessibility Issue
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              zIndex: 1000,
              maxWidth: '400px',
            }}
          >
            <div
              style={{
                background: notificationType === 'applied'
                  ? 'var(--success)'
                  : 'var(--accent-purple)',
                backdropFilter: 'blur(10px)',
                border: notificationType === 'applied'
                  ? '1px solid rgba(5, 150, 105, 0.5)'
                  : '1px solid rgba(139, 92, 246, 0.5)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: notificationType === 'applied'
                  ? '0 20px 60px rgba(5, 150, 105, 0.3), 0 0 1px rgba(5, 150, 105, 0.5)'
                  : '0 20px 60px rgba(139, 92, 246, 0.3), 0 0 1px rgba(139, 92, 246, 0.5)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ flexShrink: 0, marginTop: '4px' }}
              >
                <CheckCircle size={32} color="white" strokeWidth={1.5} />
              </motion.div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: 'white',
                  margin: '0 0 8px 0',
                  fontSize: '1.1rem',
                  fontWeight: '700'
                }}>
                  {notificationType === 'applied' ? 'Applied Successfully! 🎉' : 'Job Saved! 💼'}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 12px 0',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {notificationType === 'applied'
                    ? 'Your application has been submitted for Senior Frontend Engineer position.'
                    : 'This job is now saved to your profile. You can view it anytime from your saved jobs.'}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {notificationType === 'applied' ? (
                    <>
                      <Mail size={16} aria-hidden="true" />
                      <span>You will receive a confirmation mail on your registered email ID</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} aria-hidden="true" />
                      <span>Added to your saved jobs collection</span>
                    </>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotification(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: 0
                }}
                aria-label="Close notification"
              >
                ×
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
