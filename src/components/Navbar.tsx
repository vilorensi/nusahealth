import { useState } from "react";
import { Menu, X, Phone, Stethoscope, MessageSquare, User, Pill, AlertCircle, Heart, Syringe, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { path: "/symptoms", label: "Symptoms", icon: Stethoscope },
    { path: "/health-qa", label: "Q&A", icon: MessageSquare },
    { path: "/find-doctor", label: "Doctor", icon: User },
    { path: "/drug-checker", label: "Medication", icon: Pill },
    { path: "/allergy-checker", label: "Allergy", icon: AlertCircle },
    { path: "/mental-health", label: "Mental", icon: Heart },
    { path: "/vaccination-checker", label: "Vaccine", icon: Syringe },
    { path: "/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[#333333] text-xl font-bold">nusahealth</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center text-[#333333] hover:text-primary px-3 py-2 text-sm font-medium"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
            <a
              href="tel:119"
              className="flex items-center text-accent hover:text-primary px-3 py-2 text-sm font-medium"
            >
              <Phone size={16} className="mr-1" />
              119
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary"
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
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
            <a
              href="tel:119"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-accent hover:text-primary"
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