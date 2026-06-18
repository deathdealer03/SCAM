import { motion } from 'framer-motion';
import '../css/navbar.css';

export function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        <motion.a
          href="/"
          className="navbar-brand"
          whileHover={{ scale: 1.05 }}
        >
          <span className="brand-logo">⚔️</span>
          <span className="brand-text">ScamShield</span>
        </motion.a>

        <div className="navbar-links">
          <motion.a href="/" whileHover={{ color: '#a5b4fc' }} className="nav-link">
            Home
          </motion.a>
          <motion.a href="/analyze-job" whileHover={{ color: '#a5b4fc' }} className="nav-link">
            Analyze
          </motion.a>
          <motion.a href="/community" whileHover={{ color: '#a5b4fc' }} className="nav-link">
            Community
          </motion.a>
          <motion.a href="/domain-check" whileHover={{ color: '#a5b4fc' }} className="nav-link">
            Domain Check
          </motion.a>
        </div>

        <div className="navbar-actions">
          <motion.a
            href="/login"
            className="nav-login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
