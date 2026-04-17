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
          backgroundColor: 'var(--bg-secondary)',
          backgroundImage: `url(${heroImg})`,
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
              color: '#000000',
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
          </div>
        </motion.div>
      </section>
    </div>
  );
}