import { Phone, Hospital, Stethoscope } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 py-16 md:py-24 lg:py-32 overflow-hidden px-4 md:px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-primary/20 -left-48 top-0 blur-3xl animate-float" />
        <div className="absolute h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-secondary/20 right-0 bottom-0 blur-3xl animate-float animation-delay-2000" />
        <div className="absolute h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-accent/20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <QuickAccessCard
            to="/symptoms"
            icon={Stethoscope}
            title={t('checkSymptoms')}
            description={t('checkSymptomsDesc')}
            iconColor="primary"
            delay={0}
            className="h-full"
          />
          <QuickAccessCard
            to="/find-doctor"
            icon={Hospital}
            title={t('findServices')}
            description={t('findServicesDesc')}
            iconColor="secondary"
            delay={200}
            className="h-full"
          />
          <QuickAccessCard
            icon={Phone}
            title={t('emergency')}
            description={t('emergencyDesc')}
            iconColor="accent"
            delay={400}
            className="h-full"
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