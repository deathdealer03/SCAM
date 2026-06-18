import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../css/hero.css';

export function HeroSection() {
  const [stats, setStats] = useState({
    analyses: '5,500+',
    scams: '2,400+',
    reports: '180+',
  });

  useEffect(() => {
    // Fetch live stats from API
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats({
          analyses: (data.total_analyses || 5500).toLocaleString('en-IN'),
          scams: (data.scams_detected || 2400).toLocaleString('en-IN'),
          reports: (data.reports_submitted || 180).toLocaleString('en-IN'),
        });
      })
      .catch(() => {
        // Use default values on error
      });
  }, []);

  // Stagger text animation
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.1, 1],
      transition: { duration: 4, repeat: Infinity },
    },
  };

  return (
    <section className="hero-section">
      {/* Background glows */}
      <motion.div 
        className="hero-glow-1"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className="hero-glow-2"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="hero-content">
        {/* Badge */}
        <motion.div
          className="hero-badge"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="badge-pulse" />
          Employment Fraud Intelligence Platform
        </motion.div>

        {/* Title - staggered lines */}
        <div className="hero-title-container">
          <motion.h1 className="hero-title">
            <motion.span custom={0} variants={titleVariants} initial="hidden" animate="visible">
              Protect Students From
            </motion.span>
            <br />
            <motion.span 
              custom={1} 
              variants={titleVariants} 
              initial="hidden" 
              animate="visible"
              className="gradient-text"
            >
              Fake Internships & Job Scams
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          variants={titleVariants}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          AI-powered scam detection using machine learning, NLP, fraud analytics, domain intelligence 
          and risk assessment. Protecting India's students from employment fraud.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          className="hero-stats"
          variants={titleVariants}
          custom={3}
          initial="hidden"
          animate="visible"
        >
          <div className="stat">
            <span className="stat-num">{stats.analyses}</span>
            <span className="stat-label">Jobs Analyzed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{stats.scams}</span>
            <span className="stat-label">Scams Detected</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{stats.reports}</span>
            <span className="stat-label">Reports Filed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">96%</span>
            <span className="stat-label">ML Accuracy</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          variants={titleVariants}
          custom={4}
          initial="hidden"
          animate="visible"
        >
          <motion.a 
            href="/analyze-job" 
            className="cta-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            🔍 Analyze Job Posting →
          </motion.a>
          <motion.a 
            href="/login" 
            className="cta-secondary"
            whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            🔐 Sign In
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Dashboard Widget */}
      <motion.div
        className="hero-visual"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
      >
        <div className="dashboard-widget">
          <div className="widget-header">
            <div>
              <span className="widget-dot" />
              <span className="widget-title">ScamShield Monitor</span>
            </div>
            <span className="widget-status">LIVE SCANNING</span>
          </div>

          <div className="widget-alerts">
            <div className="alert alert-critical">
              <span className="alert-indicator" />
              <span className="alert-text">⚠️ Threat Blocked: Fake Google Form</span>
              <span className="alert-score">89%</span>
            </div>
            <div className="alert alert-safe">
              <span className="alert-indicator" />
              <span className="alert-text">✅ Verified Domain: careers.google.com</span>
              <span className="alert-score">98%</span>
            </div>
            <div className="alert alert-suspicious">
              <span className="alert-indicator" />
              <span className="alert-text">🟡 Suspicious: Telegram HR Interview</span>
              <span className="alert-score">54%</span>
            </div>
          </div>

          <div className="widget-footer">
            <span>AI Engine: <strong style={{ color: '#10b981' }}>ACTIVE</strong></span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
