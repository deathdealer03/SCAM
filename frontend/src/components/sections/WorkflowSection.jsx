import { motion } from 'framer-motion';
import { MotionSection, staggerContainer, staggerItem } from '../ui/MotionSection';
import '../css/workflow.css';

export function WorkflowSection() {
  const steps = [
    { icon: '📝', label: 'Job Posting', color: '#6366f1' },
    { icon: '🔤', label: 'NLP Analysis', color: '#8b5cf6' },
    { icon: '⚙️', label: 'Fraud Engine', color: '#ef4444' },
    { icon: '📊', label: 'Risk Score', color: '#f59e0b' },
    { icon: '🤖', label: 'AI Explanation', color: '#10b981' },
    { icon: '📄', label: 'Intel Report', color: '#06b6d4' },
  ];

  const detailCards = [
    {
      icon: '📝',
      num: '01',
      title: 'NLP Analysis',
      description: 'TF-IDF + Logistic Regression scans job description for scam-like language patterns',
      weight: 'Weight: 10%',
      bgColor: 'rgba(99,102,241,0.15)',
    },
    {
      icon: '🔑',
      num: '02',
      title: 'Keyword Scoring',
      description: '40+ weighted fraud keywords checked — from "registration fee" to "WhatsApp HR"',
      weight: 'Weight: 40%',
      bgColor: 'rgba(239,68,68,0.15)',
    },
    {
      icon: '🌐',
      num: '03',
      title: 'Domain Risk',
      description: 'URL analyzed for trusted portals, brand impersonation, free hosting & shorteners',
      weight: 'Weight: 30%',
      bgColor: 'rgba(16,185,129,0.15)',
    },
    {
      icon: '💰',
      num: '04',
      title: 'Salary Anomaly',
      description: 'Unrealistically high salary promises are a classic scam signal — we detect them',
      weight: 'Weight: 20%',
      bgColor: 'rgba(245,158,11,0.15)',
    },
    {
      icon: '🤖',
      num: '05',
      title: 'Groq AI Explanation',
      description: 'LLaMA 3.1 generates plain-English explanations of why a job was flagged',
      weight: 'Powered by Groq',
      bgColor: 'rgba(139,92,246,0.15)',
    },
    {
      icon: '📄',
      num: '06',
      title: 'Intelligence Report',
      description: 'Downloadable PDF fraud intelligence report with all risk factors and recommendations',
      weight: 'ReportLab PDF',
      bgColor: 'rgba(6,182,212,0.15)',
    },
  ];

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hover: {
      y: -8,
      boxShadow: '0 12px 40px rgba(99, 102, 241, 0.2)',
      borderColor: 'rgba(99, 102, 241, 0.4)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <MotionSection id="workflow" className="workflow-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Fraud Detection Workflow</h2>
          <p className="section-subtitle">6-layer AI protection running simultaneously on every submission</p>
        </motion.div>

        {/* Workflow Pipeline */}
        <motion.div
          className="workflow-pipeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, i) => (
            <div key={i} className="pipeline-item">
              <motion.div
                className="pipeline-step"
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-label">{step.label}</div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  className="pipeline-arrow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Detailed Cards Grid */}
        <motion.div
          className="workflow-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {detailCards.map((card, i) => (
            <motion.div
              key={i}
              className="workflow-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <div className="card-icon-wrapper" style={{ background: card.bgColor }}>
                <span className="card-icon">{card.icon}</span>
              </div>
              <div className="card-number">{card.num}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <div className="card-footer">{card.weight}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
