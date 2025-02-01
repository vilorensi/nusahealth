import { Search, Phone, Hospital, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Selamat Datang di SehatIndonesia
          </h1>
          <p className="text-xl text-white mb-8">
            Informasi kesehatan terpercaya untuk masyarakat Indonesia
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-lg p-2">
              <Search className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Cari informasi kesehatan..."
                className="flex-1 p-2 outline-none"
              />
              <button className="bg-accent text-white px-6 py-2 rounded-md hover:bg-opacity-90">
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Symptom Checker */}
          <Link to="/symptoms" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Stethoscope className="text-primary w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">Cek Gejala</h3>
            </div>
            <p className="text-gray-600">
              Kenali gejala Anda dan dapatkan saran medis awal
            </p>
          </Link>

          {/* Find Services */}
          <Link to="/services" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Hospital className="text-primary w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">Temukan Layanan</h3>
            </div>
            <p className="text-gray-600">
              Cari fasilitas kesehatan terdekat di lokasi Anda
            </p>
          </Link>

          {/* Emergency */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Phone className="text-accent w-8 h-8" />
              <h3 className="text-xl font-semibold ml-3">Darurat</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Butuh bantuan medis segera? Hubungi nomor darurat
            </p>
            <a
              href="tel:119"
              className="inline-flex items-center text-accent hover:text-primary font-semibold"
            >
              <Phone size={16} className="mr-1" />
              119
            </a>
          </div>
        </div>
      </div>

      {/* Health Topics Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Topik Kesehatan Populer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Covid-19",
              "Diabetes",
              "Hipertensi",
              "Kesehatan Mental",
              "Gizi & Diet",
              "Kesehatan Anak",
              "Vaksinasi",
              "Pertolongan Pertama",
            ].map((topic) => (
              <Link
                key={topic}
                to={`/topics/${topic.toLowerCase().replace(/ /g, "-")}`}
                className="p-4 border rounded-lg text-center hover:bg-muted transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;