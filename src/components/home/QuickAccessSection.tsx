import { Phone, Hospital, Stethoscope } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-[#e0e7ff] to-white py-16 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[300px] w-[300px] rounded-full bg-purple-200/30 -left-20 top-0 blur-3xl animate-float" />
        <div className="absolute h-[250px] w-[250px] rounded-full bg-blue-200/30 right-0 bottom-0 blur-3xl animate-float animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            {t('ourServices')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('servicesDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <QuickAccessCard
            to="/symptoms"
            icon={Stethoscope}
            title={t('checkSymptoms')}
            description={t('checkSymptomsDesc')}
            iconColor="primary"
          />
          <QuickAccessCard
            to="/find-doctor"
            icon={Hospital}
            title={t('findServices')}
            description={t('findServicesDesc')}
            iconColor="secondary"
          />
          <QuickAccessCard
            icon={Phone}
            title={t('emergency')}
            description={t('emergencyDesc')}
            iconColor="accent"
            action={
              <a
                href="tel:119"
                className="inline-flex items-center text-purple-500 hover:text-purple-600 font-semibold text-lg group"
              >
                <Phone className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                119
              </a>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default QuickAccessSection;