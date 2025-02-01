import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/topics" className="text-secondary hover:text-primary px-3 py-2 text-sm font-medium">
              Topik Kesehatan
            </Link>
            <Link to="/services" className="text-secondary hover:text-primary px-3 py-2 text-sm font-medium">
              Layanan Kesehatan
            </Link>
            <Link to="/symptoms" className="text-secondary hover:text-primary px-3 py-2 text-sm font-medium">
              Cek Gejala
            </Link>
            <a href="tel:119" className="flex items-center text-accent hover:text-primary px-3 py-2 text-sm font-medium">
              <Phone size={16} className="mr-1" />
              119
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
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
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/topics"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary"
            >
              Topik Kesehatan
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary"
            >
              Layanan Kesehatan
            </Link>
            <Link
              to="/symptoms"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary"
            >
              Cek Gejala
            </Link>
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