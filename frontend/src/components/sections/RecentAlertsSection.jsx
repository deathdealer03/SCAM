import { motion } from 'framer-motion';
import { MotionSection, staggerContainer, staggerItem } from '../ui/MotionSection';
import '../css/alerts.css';

export function RecentAlertsSection() {
  const alerts = [
    {
      level: 'CRITICAL',
      message: 'WhatsApp "task job" scam — ₹300/task leading to ₹5,000+ deposit demand',
      time: 'Today',
      color: 'critical',
    },
    {
      level: 'HIGH',
      message: 'Fake Infosys offer letters circulating via WhatsApp — AI-generated with fake logos',
      time: 'Yesterday',
      color: 'high',
    },
    {
      level: 'HIGH',
      message: 'Brand impersonation: google-careers-apply.in collecting student data and fees',
      time: '2 days ago',
      color: 'high',
    },
    {
      level: 'MEDIUM',
      message: 'Telegram "crypto trading internship" requiring ₹2000 wallet loading to start',
      time: '3 days ago',
      color: 'medium',
    },
  ];

  const alertVariants = {
    hidden: { opacity: 0, x: -30 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.12, duration: 0.5 },
    }),
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  const getAlertStyles = (color) => {
    const styles = {
      critical: {
        bg: 'rgba(239, 68, 68, 0.08)',
        border: 'rgba(239, 68, 68, 0.2)',
        text: '#fca5a5',
        dot: '#ef4444',
      },
      high: {
        bg: 'rgba(245, 158, 11, 0.08)',
        border: 'rgba(245, 158, 11, 0.2)',
        text: '#fcd34d',
        dot: '#f59e0b',
      },
      medium: {
        bg: 'rgba(99, 102, 241, 0.08)',
        border: 'rgba(99, 102, 241, 0.2)',
        text: '#a5b4fc',
        dot: '#6366f1',
      },
    };
    return styles[color] || styles.medium;
  };

  return (
    <MotionSection className="alerts-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Recent Scam Alerts</h2>
          <p className="section-subtitle">Active threats detected by our community and AI system</p>
        </motion.div>

        {/* Alerts Feed */}
        <motion.div
          className="alerts-feed"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {alerts.map((alert, i) => {
            const styles = getAlertStyles(alert.color);
            return (
              <motion.div
                key={i}
                className="alert-item"
                custom={i}
                variants={alertVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{
                  background: styles.bg,
                  borderColor: styles.border,
                }}
              >
                <motion.div
                  className="alert-dot"
                  style={{ backgroundColor: styles.dot }}
                  variants={pulseVariants}
                  animate="animate"
                />
                <div className="alert-content">
                  <span className="alert-level" style={{ color: styles.text }}>
                    {alert.level}
                  </span>
                  <span className="alert-message" style={{ color: '#e2e8f0' }}>
                    {alert.message}
                  </span>
                </div>
                <span className="alert-time">{alert.time}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="alerts-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/community"
            className="view-reports-link"
            whileHover={{ x: 4 }}
            whileTap={{ x: 0 }}
          >
            View Community Reports →
          </motion.a>
        </motion.div>
      </div>
    </MotionSection>
  );
}
