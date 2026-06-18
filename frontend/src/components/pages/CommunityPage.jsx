import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DomainIntelligenceTool } from './DomainIntelligenceTool';
import { CommunityReportsDisplay } from './CommunityReportsDisplay';
import '../css/community.css';

export function CommunityPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    uniqueCompanies: 0,
    avgConfidence: 0,
  });

  useEffect(() => {
    // Fetch community reports from Flask API
    fetch('/api/community-reports')
      .then(res => res.json())
      .then(data => {
        setReports(data.reports || []);
        setStats({
          totalReports: data.stats?.total_reports || 0,
          uniqueCompanies: data.stats?.unique_companies || 0,
          avgConfidence: Math.round(data.stats?.avg_confidence || 0),
        });
      })
      .catch(() => {
        // Fallback data
        setReports([]);
        setStats({
          totalReports: 0,
          uniqueCompanies: 0,
          avgConfidence: 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="community-page">
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        {/* Hero Section */}
        <section className="community-hero">
          <div className="hero-bg-glow" />
          <div className="community-hero-content">
            <motion.div
              className="community-badge"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="badge-pulse" />
              Community Intelligence Center
            </motion.div>
            <motion.h1
              className="community-hero-title"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              Community Scam Reports & Intelligence
            </motion.h1>
            <motion.p
              className="community-hero-subtitle"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Real reports from real students. Help protect the community by sharing your experience
              with fraudulent recruiters and fake job postings.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="community-stats-section">
          <div className="stats-grid">
            {[
              {
                icon: '⚠️',
                label: 'Recent Reports',
                value: stats.totalReports,
                trend: 'Community submissions',
                color: 'red',
              },
              {
                icon: '🏢',
                label: 'Unique Companies',
                value: stats.uniqueCompanies,
                trend: 'Reported in feed',
                color: 'blue',
              },
              {
                icon: '🛡️',
                label: 'Community Status',
                value: 'Protected',
                trend: 'Active monitoring',
                color: 'green',
              },
              {
                icon: '📊',
                label: 'Avg Confidence',
                value: `${stats.avgConfidence}%`,
                trend: 'Report verification',
                color: 'yellow',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`stat-card stat-${stat.color}`}
                custom={i}
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-body">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-trend">{stat.trend}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="community-cta-banner">
          <motion.div
            className="cta-banner-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>⚠️ Encountered a Scam Job Posting?</h3>
            <p>Report it to protect other students. Takes less than 60 seconds.</p>
          </motion.div>
          <motion.a
            href="/report-scam"
            className="cta-submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            + Submit Report
          </motion.a>
        </section>

        {/* Domain Intelligence Tool */}
        <DomainIntelligenceTool />

        {/* Community Reports Display */}
        <CommunityReportsDisplay reports={reports} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}
