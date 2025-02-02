import { useState } from "react";
import { Menu, X, Phone, Stethoscope, MessageSquare, User, Pill, AlertCircle, Heart, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { path: "/symptoms", label: t('symptoms'), icon: Stethoscope },
    { path: "/health-qa", label: t('qa'), icon: MessageSquare },
    { path: "/find-doctor", label: t('doctor'), icon: User },
    { path: "/drug-checker", label: t('medication'), icon: Pill },
    { path: "/allergy-checker", label: t('allergy'), icon: AlertCircle },
    { path: "/mental-health", label: t('mental'), icon: Heart },
    { path: "/vaccination-checker", label: t('vaccine'), icon: Syringe },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="bg-gradient-to-r from-[#34C759] to-[#30D158] bg-clip-text text-transparent text-xl font-bold hover:from-[#30D158] hover:to-[#34C759] transition-all duration-300">
                nusahealth
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center text-[#111111] hover:text-[#34C759] px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
            <a
              href="tel:119"
              className="flex items-center text-[#111111] hover:text-[#34C759] px-3 py-2 text-sm font-medium transition-colors duration-300"
            >
              <Phone size={16} className="mr-1" />
              119
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#111111] hover:text-[#34C759] transition-colors duration-300"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#111111] hover:text-[#34C759] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
            <a
              href="tel:119"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-[#111111] hover:text-[#34C759] transition-colors duration-300"
            >
              <Phone size={16} className="mr-1" />
              119
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;