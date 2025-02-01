import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/symptoms", label: "Symptom Checker" },
    { path: "/health-qa", label: "Health Q&A" },
    { path: "/find-doctor", label: "Find Doctor" },
    { path: "/drug-checker", label: "Drug Checker" },
    { path: "/allergy-checker", label: "Allergy Checker" },
    { path: "/mental-health", label: "Mental Health" },
    { path: "/womens-health", label: "Women's Health" },
    { path: "/mens-health", label: "Men's Health" },
    { path: "/vaccination-checker", label: "Vaccination" },
    { path: "/health-education", label: "Health Education" },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary text-xl font-bold">SehatIndonesia</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-secondary hover:text-primary px-3 py-2 text-sm font-medium"
              >
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
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
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