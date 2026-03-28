import { AnnouncementBar } from "../components/AnnouncementBar";
import { BenefitsSection } from "../components/BenefitsSection";
import { CartDrawer } from "../components/CartDrawer";
import { FAQSection } from "../components/FAQSection";
import { FeaturedProduct } from "../components/FeaturedProduct";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { ReviewsSection } from "../components/ReviewsSection";
import { SocialProofBar } from "../components/SocialProofBar";
import { UrgencySection } from "../components/UrgencySection";

export function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofBar />
        <FeaturedProduct />
        <BenefitsSection />
        <ReviewsSection />
        <UrgencySection />
        <FAQSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
