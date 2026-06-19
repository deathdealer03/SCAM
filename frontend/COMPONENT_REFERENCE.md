# ScamShield V2 - Component Reference

## Motion Components

### MotionSection
Reusable wrapper for sections with standard animation pattern.

```jsx
<MotionSection id="section-id" className="custom-class">
  {/* Content */}
</MotionSection>
```

**Props:**
- `id` - Section identifier
- `className` - Additional CSS classes
- Auto-applies: `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`

### Animation Presets

```javascript
// staggerContainer - Use as parent for multiple animated children
{
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// staggerItem - Use for individual children
{
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
}

// slideUp - For upward animations
{
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
}

// scaleIn - For scaling animations
{
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5 } 
  },
}
```

## Homepage Sections

### HeroSection
- File: `components/sections/HeroSection.jsx`
- CSS: `components/css/hero.css`
- Features:
  - Floating dashboard widget
  - Staggered title reveal
  - Live stats counter
  - CTA buttons with hover effects
  - Animated background glows

### WorkflowSection
- File: `components/sections/WorkflowSection.jsx`
- CSS: `components/css/workflow.css`
- Features:
  - 6-step AI pipeline visualization
  - Animated connection paths
  - Detailed workflow cards
  - Hover effects on cards

### FeaturesSection
- File: `components/sections/FeaturesSection.jsx`
- CSS: `components/css/features.css`
- Features:
  - 4 feature cards (removed Recruiter Checker)
  - Hover lift effect
  - Glow backgrounds
  - Interactive arrow indicators

**Cards:**
1. 🛡️ Scam Detection
2. 🌐 Domain Intelligence (REPLACED Recruiter Checker)
3. 📄 PDF Reports
4. 👥 Community Reporting

### RecentAlertsSection
- File: `components/sections/RecentAlertsSection.jsx`
- CSS: `components/css/alerts.css`
- Features:
  - Staggered alert feed
  - Color-coded severity levels
  - Pulse animation on critical alerts
  - Hover interactions

### FAQSection
- File: `components/sections/FAQSection.jsx`
- CSS: `components/css/faq.css`
- Features:
  - Smooth accordion expand/collapse
  - Framer Motion height animation
  - One-open policy (auto-closes others)
  - 6 FAQ items

### CTASection
- File: `components/sections/CTASection.jsx`
- CSS: `components/css/cta.css`
- Features:
  - Particle background (Antigravity alternative)
  - 80 animated particles
  - Purple color gradient
  - Wave motion effect

## Community Page Components

### CommunityPage
- File: `components/pages/CommunityPage.jsx`
- Main wrapper that combines:
  - Hero section
  - Stats cards
  - CTA banner
  - DomainIntelligenceTool
  - CommunityReportsDisplay

### DomainIntelligenceTool
- File: `components/sections/DomainIntelligenceTool.jsx`
- CSS: `components/css/domain-tool.css`
- Features:
  - Domain input form
  - Async API call to `/domain-check`
  - Trust level badge
  - Rule-based age analysis
  - SSL verification
  - Brand impersonation detection
  - Recommendation text
  - Trust level legend

**Trust Levels:**
- < 6 months: 🔴 High Risk
- 6-24 months: 🟡 Suspicious
- 24-60 months: 🟠 Moderate Trust
- 60-120 months: 🟢 Trusted
- 120+ months: ✅ Highly Trusted

### CommunityReportsDisplay
- File: `components/sections/CommunityReportsDisplay.jsx`
- CSS: `components/css/community-reports.css`
- Features:
  - Full-text search
  - Risk level filtering
  - Sort options (Recent, Most Reported, Confidence)
  - Individual report cards
  - Community confidence scoring
  - Empty state handling
  - Loading states

**Search Filters:**
- Company name
- Website
- Description
- Scam type

**Sort Options:**
- Most Recent (default)
- Most Reported (by count)
- Highest Confidence

## Layout Components

### Navbar
- File: `components/sections/Navbar.jsx`
- CSS: `components/css/navbar.css`
- Features:
  - Fixed positioning
  - Glass morphism background
  - Brand logo and text
  - Navigation links
  - Sign in button
  - Responsive mobile menu (can be enhanced)

### Footer
- File: `components/sections/Footer.jsx`
- CSS: `components/css/footer.css`
- Features:
  - Brand section
  - Navigation links
  - Company info
  - Staggered animations

## Styling Guidelines

### CSS Variables (Set in components)
```css
--neon-blue: #6366f1;
--neon-purple: #8b5cf6;
--neon-green: #10b981;
--neon-amber: #f59e0b;
--dark-card: rgba(22, 22, 39, 0.45);
--glass-border: rgba(255, 255, 255, 0.08);
```

### Common Patterns

**Glass Morphism Cards:**
```css
background: rgba(22, 22, 39, 0.45);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
backdrop-filter: blur(15px);
```

**Gradient Text:**
```css
background: linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #6366f1 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**Smooth Transitions:**
```css
transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
```

## API Integration

### Stats Endpoint
```javascript
fetch('/api/stats')
  .then(res => res.json())
  .then(data => {
    // data.total_analyses
    // data.scams_detected
    // data.reports_submitted
  })
```

### Community Reports Endpoint
```javascript
fetch('/api/community-reports')
  .then(res => res.json())
  .then(data => {
    // data.reports - array of report objects
    // data.stats - stats object
  })
```

### Domain Check Endpoint
```javascript
fetch('/domain-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ domain: 'example.com' })
})
```

## Common Issues & Solutions

### Animations not triggering
- Ensure parent has `whileInView` with `viewport={{ once: true }}`
- Check that element is actually in viewport
- Verify Framer Motion is imported

### Slow animations on mobile
- Use `will-change: transform` for animated elements
- Reduce particle count for CTA section
- Use `GPU-accelerated` properties (transform, opacity)

### Layout shift on hover
- Set fixed sizes for hover-scaled elements
- Use `transform` instead of `width/height` changes
- Avoid border additions on hover

### Staggered animations not working
- Wrap children with `motion.div` or `motion.section`
- Use `custom` prop with variants
- Ensure parent has `variants={{ show: { staggerChildren } }}`

## Browser Compatibility

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile: iOS Safari 14+, Chrome Android latest

## Performance Tips

1. Use `once: true` in viewport to stop re-animating
2. Use `will-change` sparingly (only on animated elements)
3. Avoid animating on mount for scroll-heavy pages
4. Use CSS transforms instead of position changes
5. Lazy load community reports if > 100 items
