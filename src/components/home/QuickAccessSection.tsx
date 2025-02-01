import { Phone, Hospital, Stethoscope } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 py-24 sm:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[500px] w-[500px] rounded-full bg-primary/30 -left-48 top-0 blur-3xl animate-float" />
        <div className="absolute h-[400px] w-[400px] rounded-full bg-secondary/30 right-0 bottom-0 blur-3xl animate-float animation-delay-2000" />
        <div className="absolute h-[300px] w-[300px] rounded-full bg-accent/30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickAccessCard
            to="/symptoms"
            icon={Stethoscope}
            title={t('checkSymptoms')}
            description={t('checkSymptomsDesc')}
            iconColor="primary"
            delay={0}
          />
          <QuickAccessCard
            to="/find-doctor"
            icon={Hospital}
            title={t('findServices')}
            description={t('findServicesDesc')}
            iconColor="secondary"
            delay={200}
          />
          <QuickAccessCard
            icon={Phone}
            title={t('emergency')}
            description={t('emergencyDesc')}
            iconColor="accent"
            delay={400}
            action={
              <a
                href="tel:119"
                className="inline-flex items-center text-secondary hover:text-primary font-semibold text-lg group"
              >
                <Phone className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 animate-wave" />
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