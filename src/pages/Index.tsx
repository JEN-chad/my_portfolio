import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import BuildLogsSection from "@/components/BuildLogsSection";
import FooterSection from "@/components/FooterSection";
import DoodleCursor from "@/components/DoodleCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DoodleCursor />
      <Header />
      <HeroSection />
      <SkillsSection />
      <BuildLogsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
