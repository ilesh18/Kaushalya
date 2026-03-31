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
        </motion.div>
      </section>
    </div>
  );
}