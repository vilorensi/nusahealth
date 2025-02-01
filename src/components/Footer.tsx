import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-primary/30 to-secondary/30 text-gray-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('aboutNusaHealth')}
            </h3>
            <p className="text-gray-600">
              {t('aboutDesc')}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/symptoms" className="text-gray-600 hover:text-primary transition-colors duration-300">
                  {t('symptomChecker')}
                </Link>
              </li>
              <li>
                <Link to="/find-doctor" className="text-gray-600 hover:text-primary transition-colors duration-300">
                  {t('findDoctor')}
                </Link>
              </li>
              <li>
                <Link to="/health-qa" className="text-gray-600 hover:text-primary transition-colors duration-300">
                  {t('healthQA')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('contactUs')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>info@nusahealth.id</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('disclaimer')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('disclaimerText')}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} NusaHealth Indonesia. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;