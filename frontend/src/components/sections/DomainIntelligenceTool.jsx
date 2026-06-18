import { motion } from 'framer-motion';
import { useState } from 'react';
import '../css/domain-tool.css';

export function DomainIntelligenceTool() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/domain-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTrustLevel = (age) => {
    if (age < 6) return { level: 'High Risk', color: 'critical', emoji: '🔴' };
    if (age < 24) return { level: 'Suspicious', color: 'high', emoji: '🟡' };
    if (age < 60) return { level: 'Moderate Trust', color: 'medium', emoji: '🟠' };
    if (age < 120) return { level: 'Trusted', color: 'trusted', emoji: '🟢' };
    return { level: 'Highly Trusted', color: 'safe', emoji: '✅' };
  };

  return (
    <section className="domain-tool-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">🌐 Domain Intelligence</h2>
          <p className="section-subtitle">Analyze website domain age, SSL status, and detect brand impersonation</p>
        </motion.div>

        <motion.div
          className="domain-tool-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="domain-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter domain (e.g., google.com or careers.google.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="domain-input"
                disabled={loading}
              />
              <motion.button
                type="submit"
                className="domain-submit-btn"
                disabled={loading || !domain.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Analyzing...' : '🔍 Analyze Domain'}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div
              className="domain-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              className="domain-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="result-header">
                <h3>{result.domain}</h3>
                <span className={`trust-badge trust-${getTrustLevel(result.age_months).color}`}>
                  {getTrustLevel(result.age_months).emoji} {getTrustLevel(result.age_months).level}
                </span>
              </div>

              <div className="result-grid">
                <div className="result-item">
                  <span className="result-label">📅 Domain Age</span>
                  <span className="result-value">{result.age_months} months old</span>
                  <span className="result-confidence">
                    {result.age_months < 6 && '⚠️ Very New - High Risk'}
                    {result.age_months >= 6 && result.age_months < 24 && '⚡ Recent - Verify Carefully'}
                    {result.age_months >= 24 && result.age_months < 60 && '✓ Moderate Age'}
                    {result.age_months >= 60 && '✓ Established Domain'}
                  </span>
                </div>

                <div className="result-item">
                  <span className="result-label">🔒 SSL Certificate</span>
                  <span className="result-value">
                    {result.has_ssl ? '✅ Valid' : '❌ Missing'}
                  </span>
                  <span className="result-confidence">
                    {result.has_ssl ? 'HTTPS is active' : 'No SSL - Red flag'}
                  </span>
                </div>

                <div className="result-item">
                  <span className="result-label">🆔 Domain Registrar</span>
                  <span className="result-value">{result.registrar || 'Unknown'}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">🚩 Suspicious TLD</span>
                  <span className="result-value">
                    {result.is_suspicious_tld ? '⚠️ Yes' : '✓ No'}
                  </span>
                </div>

                {result.brand_impersonation_risk && (
                  <div className="result-item brand-impersonation">
                    <span className="result-label">🎭 Brand Impersonation Risk</span>
                    <span className="result-value">⚠️ Detected</span>
                    <span className="result-confidence">
                      Domain closely resembles a popular brand
                    </span>
                  </div>
                )}
              </div>

              <div className="result-recommendation">
                <h4>💡 Recommendation</h4>
                <p>
                  {result.age_months < 6
                    ? 'This domain is very new. Be extremely cautious. Verify the company independently before sharing any information.'
                    : result.has_ssl
                      ? 'Domain has SSL protection and reasonable age. Still verify company details independently.'
                      : 'This domain lacks SSL protection. Avoid entering sensitive information. Verify with official company channels.'}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Score Legend */}
        <motion.div
          className="trust-legend"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="legend-item">
            <span className="legend-color critical" /> &lt; 6 months: High Risk
          </div>
          <div className="legend-item">
            <span className="legend-color high" /> 6 months - 2 years: Suspicious
          </div>
          <div className="legend-item">
            <span className="legend-color medium" /> 2 - 5 years: Moderate Trust
          </div>
          <div className="legend-item">
            <span className="legend-color trusted" /> 5 - 10 years: Trusted
          </div>
          <div className="legend-item">
            <span className="legend-color safe" /> 10+ years: Highly Trusted
          </div>
        </motion.div>

        <div className="domain-disclaimer">
          <p>
            ⓘ ScamShield does not provide 100% accuracy. Always verify company details independently
            with official channels before sharing personal or financial information.
          </p>
        </div>
      </div>
    </section>
  );
}
