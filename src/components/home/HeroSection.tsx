import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [symptoms, setSymptoms] = useState("");
  const navigate = useNavigate();

  const handleSymptomSearch = () => {
    if (symptoms.trim()) {
      navigate(`/symptoms?query=${encodeURIComponent(symptoms)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSymptomSearch();
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-8 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[60vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
      <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 font-display">
          {t('welcome')}
        </h1>
        <p className="text-lg sm:text-xl text-black mb-8 px-4">
          {t('subtitle')}
        </p>
        <div className="max-w-xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg gap-2">
            <div className="flex items-center w-full">
              <Search className="text-gray-400 ml-2 hidden sm:block" />
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? 'Describe your symptoms...' : 'Jelaskan gejala Anda...'}
                className="flex-1 p-2 sm:p-3 outline-none bg-transparent text-black w-full text-center sm:text-left"
              />
            </div>
            <Button 
              onClick={handleSymptomSearch}
              className="bg-accent hover:bg-accent/90 text-black w-full sm:w-auto"
            >
              {language === 'en' ? 'Check Symptoms' : 'Periksa Gejala'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;