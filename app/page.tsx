import HeroSection from "@/components/Home/HeroSection";
import AdvancedSearch from "@/components/Home/AdvancedSearch";
import BuySection from "@/components/Home/BuySection";
import OurStory from "@/components/Home/OurStory";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import CallToAction from "@/components/Home/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white">
      <HeroSection />
      <AdvancedSearch />
      <OurStory />
      <BuySection />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}
