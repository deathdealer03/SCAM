import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MotionSection, staggerContainer, staggerItem } from '../ui/MotionSection';
import '../css/faq.css';

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'Is ScamShield AI free to use?',
      answer: 'Yes. ScamShield AI is completely free for all students. Create an account, analyze as many job postings as you want, and download PDF reports — all at no cost.',
    },
    {
      question: 'How accurate is the fraud detection?',
      answer: 'Our ML ensemble achieves 96% accuracy on our training dataset of 5,500+ job postings. The model combines NLP (TF-IDF + Logistic Regression), keyword scoring (40+ signals), domain risk analysis and salary anomaly detection.',
    },
    {
      question: 'What does Groq AI do in the analysis?',
      answer: 'Groq AI (powered by LLaMA 3.1) generates natural-language explanations of the ML analysis. It explains WHY a job was flagged, provides specific safety recommendations, and gives a recruiter assessment. Critically, Groq does NOT perform classification — the ML model is always the source of truth for the risk score and verdict.',
    },
    {
      question: 'Can I analyze a job posting URL directly?',
      answer: 'Yes! Our web scraper supports automatic extraction from Internshala, LinkedIn, Naukri, Indeed, and most generic job sites. Just paste the URL in the analysis form and click "Fetch Job Details" to auto-fill all fields.',
    },
    {
      question: 'What should I do if I\'ve already paid a scammer?',
      answer: 'File a complaint at cybercrime.gov.in immediately. Also report to your bank to potentially freeze the transaction. Then report the company on ScamShield to warn other students. Never pay again — legitimate employers do not ask for money.',
    },
    {
      question: 'How do I report a scam company?',
      answer: 'Go to the Report Scam page (accessible from the navbar after logging in). Fill in the company name, website, and description of the fraud. Your report helps protect other students and will be reviewed by our admin team.',
    },
  ];

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  return (
    <MotionSection id="faq" className="faq-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about ScamShield AI</p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="faq-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="faq-item"
              custom={i}
              variants={faqVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.button
                className="faq-question"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
              >
                <span>{faq.question}</span>
                <motion.span
                  className="faq-arrow"
                  animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence mode="wait">
                {expandedIndex === i && (
                  <motion.div
                    className="faq-answer-wrapper"
                    variants={expandVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
