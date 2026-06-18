import { motion } from 'framer-motion';
import '../css/footer.css';

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="footer">
      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className="footer-brand" variants={itemVariants}>
          <span className="footer-logo">⚔️</span>
          <span>ScamShield AI</span>
          <span className="footer-tag">by Graphura India Pvt. Ltd.</span>
        </motion.div>

        <motion.div className="footer-links" variants={itemVariants}>
          <a href="/" className="footer-link">
            Home
          </a>
          <a href="/analyze-job" className="footer-link">
            Analyze Job
          </a>
          <a href="/community" className="footer-link">
            Community
          </a>
          <a href="/domain-check" className="footer-link">
            Domain Check
          </a>
        </motion.div>

        <motion.div className="footer-note" variants={itemVariants}>
          Employment Fraud Intelligence Platform · NLP + ML + Groq AI · 96% Accuracy · Protecting India's
          Students
        </motion.div>
      </motion.div>
    </footer>
  );
}
