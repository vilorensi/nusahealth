import { Search, Phone, Hospital, Stethoscope, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C5E1A5]/30 to-white">
      <Navbar />
      
      {/* Language Switcher */}
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t('welcome')}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {t('subtitle')}
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <Search className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="flex-1 p-2 outline-none bg-transparent"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {language === 'en' ? 'Search' : 'Cari'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Symptom Checker */}
          <Link 
            to="/symptoms" 
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Stethoscope className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold ml-4 text-primary">{t('checkSymptoms')}</h3>
            </div>
            <p className="text-gray-600 text-lg">
              {t('checkSymptomsDesc')}
            </p>
          </Link>

          {/* Find Services */}
          <Link 
            to="/services" 
            className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <Hospital className="text-secondary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold ml-4 text-secondary">{t('findServices')}</h3>
            </div>
            <p className="text-gray-600 text-lg">
              {t('findServicesDesc')}
            </p>
          </Link>

          {/* Emergency */}
          <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Phone className="text-accent w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold ml-4 text-accent">{t('emergency')}</h3>
            </div>
            <p className="text-gray-600 text-lg mb-4">
              {t('emergencyDesc')}
            </p>
            <a
              href="tel:119"
              className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg"
            >
              <Phone size={20} className="mr-2" />
              119
            </a>
          </div>
        </div>
      </div>

      {/* Health Topics Section */}
      <div className="bg-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            {t('popularTopics')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Covid-19",
              "Diabetes",
              "Hipertensi",
              "Kesehatan Mental",
              "Gizi & Diet",
              "Kesehatan Anak",
              "Vaksinasi",
              "Pertolongan Pertama",
            ].map((topic) => (
              <Link
                key={topic}
                to={`/topics/${topic.toLowerCase().replace(/ /g, "-")}`}
                className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl text-center hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20 text-gray-700 hover:text-primary font-medium text-lg"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;