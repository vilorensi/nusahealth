import { Phone, Hospital, Stethoscope } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <QuickAccessCard
          to="/symptoms"
          icon={Stethoscope}
          title={t('checkSymptoms')}
          description={t('checkSymptomsDesc')}
        />
        <QuickAccessCard
          to="/find-doctor"
          icon={Hospital}
          title={t('findServices')}
          description={t('findServicesDesc')}
        />
        <QuickAccessCard
          icon={Phone}
          title={t('emergency')}
          description={t('emergencyDesc')}
          iconColor="accent"
          action={
            <a
              href="tel:119"
              className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg"
            >
              <Phone size={20} className="mr-2" />
              119
            </a>
          }
        />
      </div>
    </div>
  );
};

export default QuickAccessSection;