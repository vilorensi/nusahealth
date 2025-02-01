import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#EEF2FF] text-[#303031] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About NusaHealth</h3>
            <p className="text-gray-700">
              Providing reliable health information and connecting you with healthcare services across Indonesia.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/symptoms" className="text-gray-700 hover:text-black">Symptom Checker</Link></li>
              <li><Link to="/find-doctor" className="text-gray-700 hover:text-black">Find a Doctor</Link></li>
              <li><Link to="/health-qa" className="text-gray-700 hover:text-black">Health Q&A</Link></li>
              <li><Link to="/blog" className="text-gray-700 hover:text-black">Health Articles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                <span>Emergency: 119</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Mail size={16} />
                <span>info@nusahealth.id</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Disclaimer</h3>
            <p className="text-gray-700 text-sm">
              The information provided on this website is for general informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} NusaHealth Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;