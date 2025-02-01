import { Phone, Hospital, Stethoscope } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-white via-purple-50 to-blue-50 py-24 sm:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[500px] w-[500px] rounded-full bg-purple-200/30 -left-48 top-0 blur-3xl animate-blob" />
        <div className="absolute h-[400px] w-[400px] rounded-full bg-blue-200/30 right-0 bottom-0 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute h-[300px] w-[300px] rounded-full bg-pink-200/30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-gradient-x">
            {t('ourServices')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('servicesDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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