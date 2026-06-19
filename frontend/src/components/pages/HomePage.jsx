import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { WorkflowSection } from './WorkflowSection';
import { FeaturesSection } from './FeaturesSection';
import { RecentAlertsSection } from './RecentAlertsSection';
import { FAQSection } from './FAQSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <HeroSection />
        <WorkflowSection />
        <FeaturesSection />
        <RecentAlertsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
