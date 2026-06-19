import { motion } from 'framer-motion';
import { MotionSection, staggerContainer, staggerItem } from '../ui/MotionSection';
import '../css/features.css';

export function FeaturesSection() {
  const features = [
    {
      icon: '🛡️',
      title: 'Scam Detection',
      description: 'ML + NLP ensemble detecting 40+ fraud signals with 96% accuracy',
      href: '/analyze-job',
      glow: 'rgba(99, 102, 241, 0.2)',
    },
    {
      icon: '🌐',
      title: 'Domain Intelligence',
      description: 'SSL check, brand impersonation detection, free host and shortener analysis',
      href: '/domain-check',
      glow: 'rgba(16, 185, 129, 0.2)',
    },
    {
      icon: '📄',
      title: 'PDF Reports',
      description: 'Downloadable fraud intelligence reports with full analysis breakdown',
      href: '/analyze-job',
      glow: 'rgba(139, 92, 246, 0.2)',
    },
    {
      icon: '👥',
      title: 'Community Reporting',
      description: 'Report scams, browse community alerts and help protect other students',
      href: '/community',
      glow: 'rgba(245, 158, 11, 0.2)',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <MotionSection id="features" className="features-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Platform Features</h2>
          <p className="section-subtitle">A complete employment fraud intelligence toolkit for Indian students</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="features-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, i) => (
            <motion.a
              key={i}
              href={feature.href}
              className="feature-card"
              variants={cardVariants}
              whileHover="hover"
              custom={i}
            >
              <motion.div
                className="feature-glow"
                style={{ background: feature.glow }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              />
              <span className="feature-emoji">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <motion.div
                className="feature-arrow"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
