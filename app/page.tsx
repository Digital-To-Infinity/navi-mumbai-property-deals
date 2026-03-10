import HeroSection from "@/components/Home/HeroSection";
import AdvancedSearch from "@/components/Home/AdvancedSearch";
import BuySection from "@/components/Home/BuySection";
import RentSection from "@/components/Home/RentSection";
import SaleSection from "@/components/Home/SaleSection";
import OurStory from "@/components/Home/OurStory";
import CallToAction from "@/components/common/CallToAction";
import BlogSection from "@/components/Home/BlogSection";
import ShortBreak from "@/components/Home/ShortBreak";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white">
      <HeroSection />
      <AdvancedSearch />
      <OurStory />
      <BuySection />
      <SaleSection />
      <RentSection />
      <BlogSection />
      <ShortBreak />
      <CallToAction />
    </main>
  );
}
