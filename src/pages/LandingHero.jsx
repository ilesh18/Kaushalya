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
              <Link to="/jobs" style={{ textDecoration: 'none' }} tabIndex="-1">
                <AccessibleButton
                  style={{ minHeight: '56px', borderRadius: '14px', fontSize: '1.125rem', padding: '0 32px' }}
                >
                  Browse Jobs
                </AccessibleButton>
              </Link>
              <Link to="/employer" style={{ textDecoration: 'none' }} tabIndex="-1">
                <AccessibleButton
                  variant="outline"
                  style={{ minHeight: '56px', borderRadius: '14px', fontSize: '1.125rem', padding: '0 32px', background: 'var(--card-bg)' }}
                >
                  I'm an Employer
                </AccessibleButton>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {["2,400+ PwD Hired", "380+ Inclusive Employers", "WCAG AA Certified"].map((stat, i) => (
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

          {/* Right Side (40%) - Floating Card */}
          <motion.div
            variants={itemVariants}
            style={{ flex: '1 1 35%', minWidth: '320px', display: 'flex', justifyContent: 'center', position: 'relative' }}
            aria-hidden="true"
          >
            {/* Glowing orb behind card */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '300px', height: '300px', background: 'var(--accent-purple)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%'
            }} />

            <motion.div
              className="glass"
              animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{
                borderRadius: '24px',
                padding: '32px',
                width: '100%',
                maxWidth: '420px',
                position: 'relative',
                boxShadow: '0 30px 60px -15px var(--accent-purple-glow), 0 0 0 1px var(--glass-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #FCE7F3, #F43F5E)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.5rem',
                    boxShadow: '0 8px 16px rgba(244, 63, 94, 0.3)'
                  }}>M</div>
                  <div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '4px' }}>TechCorp India</div>
                    <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '1.25rem' }}>Frontend Developer</div>
                  </div>
                </div>
                <div style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--accent-purple)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '800',
                  boxShadow: '0 4px 10px var(--accent-purple-glow)'
                }}>95% Match</div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
                {["Screen Reader ✓", "Remote ✓", "Flexible Hours ✓"].map((badge, i) => (
                  <span key={i} style={{
                    background: 'rgba(5, 150, 105, 0.1)',
                    border: '1px solid rgba(5, 150, 105, 0.2)',
                    color: 'var(--success)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700'
                  }}>{badge}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 10 }} aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Platform Features</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          <motion.div variants={itemVariants} className="card" style={{ padding: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Zap size={32} color="var(--accent-purple)" aria-hidden="true" strokeWidth={2.5} />
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '1.5rem' }}>Built for Your Tech</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>Full compatibility with common assistive technologies including JAWS, NVDA, VoiceOver, and Switch Access systems.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card" style={{ padding: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ShieldCheck size={32} color="var(--success)" aria-hidden="true" strokeWidth={2.5} />
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '1.5rem' }}>Accessibility First Jobs</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>Every listing is verified for real accommodations. We go beyond checkboxes to ensure truly inclusive work environments.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card" style={{ padding: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(217, 119, 6, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ color: 'var(--accent-amber)', fontWeight: '800', fontSize: '1.5rem' }} aria-hidden="true">AI</div>
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '1.5rem' }}>AI-Powered Matching</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>Smart matching system that connects your specific disability type, required accommodations, and professional skills to the perfect role.</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
