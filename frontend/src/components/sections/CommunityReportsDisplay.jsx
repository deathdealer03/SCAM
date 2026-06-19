import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import '../css/community-reports.css';

export function CommunityReportsDisplay({ reports, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filter and search reports
  const filteredReports = useMemo(() => {
    let filtered = reports;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.company?.toLowerCase().includes(query) ||
          report.website?.toLowerCase().includes(query) ||
          report.description?.toLowerCase().includes(query) ||
          report.scam_type?.toLowerCase().includes(query)
      );
    }

    // Risk level filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter((report) => {
        const level = report.risk_level?.toLowerCase() || 'medium';
        return level === selectedFilter;
      });
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'reports') {
      filtered.sort((a, b) => (b.report_count || 0) - (a.report_count || 0));
    } else if (sortBy === 'confidence') {
      filtered.sort((a, b) => (b.confidence_score || 0) - (a.confidence_score || 0));
    }

    return filtered;
  }, [reports, searchQuery, selectedFilter, sortBy]);

  const getConfidenceLabel = (count) => {
    if (count < 3) return { color: 'low', label: 'Low', emoji: '⚠️' };
    if (count < 8) return { color: 'medium', label: 'Medium', emoji: '⚡' };
    if (count < 15) return { color: 'high', label: 'High', emoji: '✓' };
    return { color: 'critical', label: 'Critical', emoji: '🔴' };
  };

  const reportVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <section className="community-reports-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">📢 Community Reports Feed</h2>
          <p className="section-subtitle">Latest scam alerts submitted by community members</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="reports-controls"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search by company name, website, or scam type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div className="filter-group">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="reports">Most Reported</option>
              <option value="confidence">Highest Confidence</option>
            </select>
          </div>
        </motion.div>

        {/* Reports List */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading community reports...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-icon">📭</div>
            <h3>No Reports Found</h3>
            <p>
              {searchQuery
                ? 'No reports match your search. Try different keywords.'
                : 'Be the first to help the community by reporting a scam job posting.'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="reports-list"
            variants={{ show: { staggerChildren: 0.05 } }}
            initial="hidden"
            animate="show"
          >
            {filteredReports.map((report, i) => {
              const confidenceInfo = getConfidenceLabel(report.report_count || 1);
              return (
                <motion.div
                  key={report.id || i}
                  className="report-card"
                  custom={i}
                  variants={reportVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="report-header">
                    <div className="report-title-section">
                      <h3 className="report-company">{report.company}</h3>
                      <span className={`risk-badge risk-${report.risk_level?.toLowerCase() || 'medium'}`}>
                        ⚠️ {report.risk_level || 'Medium'}
                      </span>
                    </div>
                    <span className="report-date">
                      {new Date(report.created_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  <div className="report-details">
                    {report.website && (
                      <div className="detail-item">
                        <span className="detail-icon">🌐</span>
                        <span className="detail-text">{report.website.substring(0, 60)}</span>
                      </div>
                    )}
                    {report.scam_type && (
                      <div className="detail-item">
                        <span className="detail-icon">🏷️</span>
                        <span className="detail-text">{report.scam_type}</span>
                      </div>
                    )}
                  </div>

                  <p className="report-description">
                    {report.description}
                    {report.description?.length > 200 && '...'}
                  </p>

                  <div className="report-footer">
                    <div className="report-stats">
                      <span className="stat">
                        👥 <strong>{report.report_count || 1}</strong> reports
                      </span>
                      <span className={`confidence confidence-${confidenceInfo.color}`}>
                        {confidenceInfo.emoji} {confidenceInfo.label} Confidence
                      </span>
                    </div>
                    {report.website && (
                      <motion.a
                        href="/domain-check"
                        className="detail-link"
                        whileHover={{ x: 4 }}
                      >
                        🔍 Analyze Domain →
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Results count */}
        {!loading && filteredReports.length > 0 && (
          <motion.div
            className="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Showing {filteredReports.length} of {reports.length} reports
          </motion.div>
        )}
      </div>
    </section>
  );
}
