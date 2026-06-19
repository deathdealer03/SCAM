import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import '../css/cta.css';

/**
 * Particle component for Antigravity-style background
 */
function ParticleBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles
    const generatedParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (Math.random() - 0.5) * 50, 0],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function CTASection() {
  return (
    <section className="cta-section">
      {/* Particle Background - Only behind the text */}
      <ParticleBackground />

      <div className="cta-content">
        <motion.h2
          className="cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Start Protecting Yourself Today
        </motion.h2>
        <motion.p
          className="cta-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join thousands of Indian students using ScamShield AI to verify job postings and avoid fraud.
          Free forever.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="/signup"
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 Get Started Free
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
