import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/home/HeroSection";
import QuickAccessSection from "../components/home/QuickAccessSection";
import UsabilityScorecard from "../components/home/UsabilityScorecard";
import { useLanguage } from "../contexts/LanguageContext";

const Index = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C5E1A5]/30 to-white">
      <Navbar />
      
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Globe2 className="w-4 h-4" />
          {language.toUpperCase()}
        </Button>
      </div>

      <HeroSection />
      <QuickAccessSection />
      <div className="container mx-auto px-4 pb-8">
        <UsabilityScorecard />
      </div>
      <Footer />
    </div>
  );
};

export default Index;