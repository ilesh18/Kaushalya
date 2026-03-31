import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bookmark, Search, Filter, Briefcase, MapPin } from 'lucide-react';
import { AccessibleButton } from '../App';

const MOCK_JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'TechCorp India', logo: 'T', color: '#6B46C1', location: 'Bangalore', mode: 'Remote', salary: '₹18L - ₹24L', match: 96, tags: ['Screen Reader ✓', 'Remote ✓', 'Flexible Hours ✓'] },
  { id: 2, title: 'Accessibility Consultant', company: 'Global Solutions', logo: 'G', color: '#0D9488', location: 'Pune', mode: 'Hybrid', salary: '₹12L - ₹18L', match: 92, tags: ['Wheelchair Access ✓', 'Sign Language ✓'] },
  { id: 3, title: 'Data Analyst (Entry Level)', company: 'Finserve Tech', logo: 'F', color: '#D97706', location: 'Mumbai', mode: 'Remote', salary: '₹6L - ₹9L', match: 88, tags: ['Remote ✓', 'Screen Reader ✓', 'Quiet Workspace ✓'] },
  { id: 4, title: 'Product Manager', company: 'InnovateX', logo: 'I', color: '#DC2626', location: 'Delhi', mode: 'Onsite', salary: '₹20L - ₹30L', match: 85, tags: ['Wheelchair Access ✓', 'Flexible Hours ✓'] }
];

export default function JobListings() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const toggleSave = (id) => {
    const next = new Set(savedJobs);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedJobs(next);
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
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px', display: 'flex', gap: '32px' }}>
      
      {/* Skip section link for switch users */}
      <a href="#job-results" className="skip-section-link">Skip to job results</a>
      
      {/* Mobile Filter Button */}
      <div className="mobile-only" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        <AccessibleButton 
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)} 
          style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0 }}
          aria-label="Open job search filters"
          aria-expanded={mobileFilterOpen}
        >
          <Filter size={24} aria-hidden="true" />
        </AccessibleButton>
      </div>

      {/* Sidebar Filters */}
      <aside className={`glass ${mobileFilterOpen ? 'mobile-filter-open' : 'desktop-only'}`} style={{ 
        width: '280px', flexShrink: 0,
        padding: '24px', borderRadius: '16px', height: 'fit-content', position: 'sticky', top: '100px',
        ...(mobileFilterOpen ? { position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 100, borderRadius: 0 } : {})
      }} aria-label="Job search filters">
        
        {mobileFilterOpen && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ margin: 0 }}>Filters</h2>
            <AccessibleButton variant="ghost" onClick={() => setMobileFilterOpen(false)}>Close</AccessibleButton>
          </div>
        )}

        <fieldset style={{ marginBottom: '32px' }}>
          <legend className="sr-only">Search</legend>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search roles..." aria-label="Search job titles or companies" style={{ paddingLeft: '40px' }} />
          </div>
        </fieldset>

        <fieldset style={{ marginBottom: '32px' }}>
          <legend style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Accessibility Features</legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Screen reader compatible', 'Remote work available', 'Flexible hours', 'Wheelchair accessible', 'Sign language support', 'Braille materials'].map(f => (
              <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontWeight: '500', cursor: 'pointer' }}>
                <input type="checkbox" /> {f}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ marginBottom: '32px' }}>
          <legend style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Work Mode</legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['All', 'Remote', 'Hybrid', 'Onsite'].map(m => (
              <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontWeight: '500', cursor: 'pointer' }}>
                <input type="radio" name="workModeFilter" defaultChecked={m === 'All'} /> {m}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ marginBottom: '32px' }}>
          <legend style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Salary Minimum (₹/yr)</legend>
          <input type="range" min="0" max="5000000" step="100000" aria-label="Salary minimum" style={{ width: '100%', accentColor: 'var(--accent-purple)' }} />
        </fieldset>

        <AccessibleButton style={{ width: '100%' }}>Apply Filters</AccessibleButton>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0 }} id="job-results">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <h1 aria-live="polite" style={{ fontSize: '2rem', margin: 0 }}>
            {MOCK_JOBS.length} accessible jobs found
          </h1>
          <div className="desktop-only">
            <label htmlFor="sortJobs" className="sr-only">Sort Jobs</label>
            <select id="sortJobs" style={{ width: 'auto', minHeight: '44px' }}>
              <option>Sort by: Match Score</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Salary (High-Low)</option>
            </select>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {MOCK_JOBS.map(job => {
            const isSaved = savedJobs.has(job.id);
            return (
              <motion.article variants={itemVariants} key={job.id} className="card" style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {/* Logo & Info */}
                <div style={{ flex: '1 1 300px', display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '12px', background: `${job.color}20`, color: job.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.5rem', flexShrink: 0
                  }}>
                    {job.logo}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
                      <Link to={`/jobs/${job.id}`} style={{ color: 'var(--text-primary)' }}>{job.title}</Link>
                    </h2>
                    <div style={{ color: 'var(--text-muted)', fontWeight: '500', marginBottom: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Briefcase size={16} />{job.company}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} />{job.location} ({job.mode})</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {job.tags.map(t => (
                        <span key={t} style={{
                          background: 'rgba(5, 150, 105, 0.1)', color: 'var(--success)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700'
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Score & Actions */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '2rem', fontWeight: '800', color: 'var(--accent-purple)', lineHeight: '1', 
                      background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', color: 'transparent' 
                    }}>{job.match}%</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Match Score</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AccessibleButton 
                      variant={isSaved ? "primary" : "outline"} 
                      onClick={() => toggleSave(job.id)}
                      aria-label={`${isSaved ? 'Remove from' : 'Add to'} saved jobs: ${job.title} at ${job.company}`}
                      aria-pressed={isSaved}
                      style={{ padding: '0 16px' }}
                    >
                      <Bookmark size={20} fill={isSaved ? "white" : "none"} aria-hidden="true" />
                      <span className="sr-only">{isSaved ? 'Saved' : 'Save job'}</span>
                    </AccessibleButton>
                    <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none' }}>
                      <AccessibleButton aria-label={`View details and apply for ${job.title} at ${job.company}`}>
                        View & Apply
                      </AccessibleButton>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
