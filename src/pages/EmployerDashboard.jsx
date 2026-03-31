import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, UserPlus, CheckCircle } from 'lucide-react';
import { AccessibleButton } from '../App';

export default function EmployerDashboard() {
  const [desc, setDesc] = useState('');
  
  // Accessibility Checklist States
  const [checks, setChecks] = useState({
    p1: false, p2: false, p3: false, p4: false,
    d1: false, d2: false, d3: false, d4: false,
    s1: false, s2: false, s3: false, s4: false,
  });

  const toggleCheck = (id) => setChecks({...checks, [id]: !checks[id]});
  
  const score = Object.values(checks).filter(Boolean).length;
  const maxScore = 12;
  const scorePct = (score / maxScore) * 100;
  
  let scoreColor = 'var(--danger)';
  if (scorePct >= 80) scoreColor = 'var(--success)';
  else if (scorePct >= 50) scoreColor = 'var(--accent-amber)';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Header section */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" aria-labelledby="dashboard-heading">
        <h1 id="dashboard-heading" style={{ fontSize: '3rem', marginBottom: '16px' }}>Welcome, TechCorp India</h1>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Accessibility Score: 87/100</h2>
            <div role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100" style={{ height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '87%' }} 
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--success)' }} 
              />
            </div>
          </div>
          <div style={{ padding: '12px 24px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--success)', borderRadius: '12px', fontWeight: '700' }}>
            Inclusive Employer Status: Silver 🥈
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <motion.div variants={itemVariants} className="card" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={32} color="var(--accent-purple)" aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>12</div>
            <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '8px' }}>Active Postings</div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={32} color="var(--accent-teal)" aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>847</div>
            <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '8px' }}>Total Applications</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserPlus size={32} color="var(--success)" aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>23</div>
            <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '8px' }}>PwD Hired This Year</div>
          </div>
        </motion.div>
      </motion.section>

      {/* Post a Job Form */}
      <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Post a New Job</h2>
        
        <div className="card" style={{ padding: '48px', position: 'relative', overflow: 'hidden' }}>
          <form onSubmit={e => e.preventDefault()}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>
              <div>
                <label htmlFor="jobTitle">Job Title</label>
                <input id="jobTitle" type="text" required />
              </div>
              <div>
                <label htmlFor="company">Company Name</label>
                <input id="company" type="text" value="TechCorp India" readOnly disabled style={{ opacity: 0.7 }} />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input id="location" type="text" required />
              </div>
              
              <fieldset style={{ gridColumn: '1 / -1' }}>
                <legend style={{ marginBottom: '16px' }}>Work Mode</legend>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                    <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" name="empWorkMode" value={mode} required /> {mode}
                    </label>
                  ))}
                </div>
              </fieldset>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="jobDesc" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Job Description
                  <span id="charCount" style={{ color: desc.length > 5000 ? 'var(--danger)' : 'var(--text-muted)' }}>{desc.length}/5000</span>
                </label>
                <textarea 
                  id="jobDesc" 
                  rows={6} 
                  required 
                  aria-describedby="charCount"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <fieldset>
                  <legend style={{ marginBottom: '16px' }}>Salary Range (₹ / year)</legend>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="empSalaryMin" className="sr-only">Minimum Salary</label>
                      <input id="empSalaryMin" type="number" placeholder="Min" required />
                    </div>
                    <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>to</span>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="empSalaryMax" className="sr-only">Maximum Salary</label>
                      <input id="empSalaryMax" type="number" placeholder="Max" required />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '48px 0' }} />

            {/* Workplace Accessibility Checklist - The most important feature */}
            <div aria-labelledby="checklist-heading" style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '24px', margin: '0 -16px' }}>
              <h2 id="checklist-heading" style={{ fontSize: '2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <CheckCircle size={32} color="var(--accent-purple)" /> Workplace Accessibility Checklist
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
                Check all that apply. These are shown as verification badges on your job listing and help candidates assess fit accurately. Honest reporting builds trust.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                
                <fieldset className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
                  <legend style={{ fontSize: '1.25rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Physical Accessibility</legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.p1} onChange={() => toggleCheck('p1')} /> Wheelchair accessible entrance</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.p2} onChange={() => toggleCheck('p2')} /> Accessible restrooms</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.p3} onChange={() => toggleCheck('p3')} /> Elevator access</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.p4} onChange={() => toggleCheck('p4')} /> Accessible parking</label>
                  </div>
                </fieldset>

                <fieldset className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
                  <legend style={{ fontSize: '1.25rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Digital Accessibility</legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.d1} onChange={() => toggleCheck('d1')} /> Screen reader compatible tools</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.d2} onChange={() => toggleCheck('d2')} /> Video captions on all meetings</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.d3} onChange={() => toggleCheck('d3')} /> Closed captioning in interviews</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.d4} onChange={() => toggleCheck('d4')} /> Large print materials available</label>
                  </div>
                </fieldset>

                <fieldset className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
                  <legend style={{ fontSize: '1.25rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Support & Flexibility</legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.s1} onChange={() => toggleCheck('s1')} /> Flexible working hours</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.s2} onChange={() => toggleCheck('s2')} /> Remote work available</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.s3} onChange={() => toggleCheck('s3')} /> Sign language interpreter</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}><input type="checkbox" checked={checks.s4} onChange={() => toggleCheck('s4')} /> Dedicated accessibility coordinator</label>
                  </div>
                </fieldset>
              </div>

              <div style={{ marginTop: '48px', padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: `2px solid ${scoreColor}` }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: '700', fontSize: '1.2rem', color: scoreColor }}>
                   <span>Accessibility Score: {score}/{maxScore} checks completed</span>
                   <span>{scorePct.toFixed(0)}%</span>
                 </div>
                 <div role="progressbar" aria-valuenow={score} aria-valuemin="0" aria-valuemax={maxScore} style={{ height: '16px', background: 'var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <motion.div 
                      key={score}
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePct}%` }}
                      transition={{ type: 'spring' }}
                      style={{ height: '100%', background: scoreColor }}
                    />
                 </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px' }}>
              <AccessibleButton style={{ minHeight: '60px', padding: '0 48px', fontSize: '1.25rem' }}>Publish Job Listing</AccessibleButton>
            </div>
          </form>
        </div>
      </motion.section>

    </div>
  );
}
