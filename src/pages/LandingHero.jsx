import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import { AccessibleButton } from '../App';
import heroImg from '../assets/HeroImage.png';

export default function LandingHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          padding: '100px 24px 60px',
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: `linear-gradient(to right, rgba(251, 250, 253, 0.2)  30%, rgba(245, 243, 251, 0.2) 30%), linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08)), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        aria-labelledby="hero-heading"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}
        >
          {/* Left Side (60%) */}
          <div style={{ flex: '1 1 55%', minWidth: '320px', position: 'relative', zIndex: 10 }}>

            <motion.h1 variants={itemVariants} id="hero-heading" style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: '800',
              marginBottom: '24px',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em'
            }}>
              Find <span className="text-gradient">Work</span> That <br /> <span className="text-gradient">Works For You</span>
            </motion.h1>

            <motion.p variants={itemVariants} style={{
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              marginBottom: '40px',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Connecting highly talented professionals with disabilities to employers who value true inclusion. 500+ accessible roles. Zero barriers.
            </motion.p>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link to="/jobs" style={{ textDecoration: 'none' }}>
                <AccessibleButton
                  style={{ minHeight: '56px', borderRadius: '14px', fontSize: '1.125rem', padding: '0 32px' }}
                  aria-label="Browse all accessible job listings"
                >
                  Browse Jobs
                </AccessibleButton>
              </Link>
              <Link to="/employer" style={{ textDecoration: 'none' }}>
                <AccessibleButton
                  variant="outline"
                  style={{ minHeight: '56px', borderRadius: '14px', fontSize: '1.125rem', padding: '0 32px', background: 'var(--card-bg)' }}
                  aria-label="View employer dashboard and post jobs"
                >
                  I'm an Employer
                </AccessibleButton>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {["2,400+ PwD Hired", "380+ Inclusive Employers", "WCAG AA Certified", "Deaf/HoH Friendly 🤟"].map((stat, i) => (
                <div key={i} className="glass" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  <div style={{ background: 'rgba(5,150,105,0.1)', borderRadius: '50%', padding: '4px' }}>
                    <Check size={14} color="var(--success)" aria-hidden="true" strokeWidth={3} />
                  </div>
                  {stat}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Deaf/HoH Welcome Section */}
      <section 
        style={{ 
          padding: '60px 24px', 
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
        }}
        aria-labelledby="deaf-welcome"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <h2 id="deaf-welcome" style={{ fontSize: '2.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <span role="img" aria-hidden="true">🤟</span>
              Deaf & Hard of Hearing Welcome
              <span role="img" aria-hidden="true">🤟</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              We're committed to full accessibility. No phone calls required. BSL/ASL/ISL support available.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '📝', title: 'Live Captioning', desc: 'CART and auto-captions in all video meetings with employers' },
              { icon: '🤟', title: 'Sign Language', desc: 'BSL, ASL, and ISL interpreters available for interviews' },
              { icon: '💬', title: 'Text-Based', desc: 'Chat, email, and SMS - no voice calls required' },
              { icon: '🔔', title: 'Visual Alerts', desc: 'Filter jobs by workplaces with visual fire alarms' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
                style={{ padding: '32px', textAlign: 'center' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }} role="img" aria-hidden="true">{feature.icon}</div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{feature.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ 
              marginTop: '48px', 
              padding: '24px', 
              background: 'var(--card-bg)', 
              borderRadius: '16px',
              textAlign: 'center',
              border: '1px solid var(--border)'
            }}
          >
            <p style={{ margin: 0, fontSize: '1.1rem' }}>
              <strong>Contact us your way:</strong>{' '}
              <span style={{ color: 'var(--text-muted)' }}>
                Email • SMS • Live Chat • Text Relay (18001) • WhatsApp
              </span>
              <span style={{ display: 'block', marginTop: '8px', color: 'var(--accent-purple)', fontWeight: '600' }}>
                📵 No phone-only requirements
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}