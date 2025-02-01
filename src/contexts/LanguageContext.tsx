import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    symptomChecker: "AI Symptom Checker",
    symptomCheckerDesc: "Get an initial assessment of your symptoms using our advanced AI system",
    healthQA: "AI Health Q&A",
    findDoctor: "Find a Doctor",
    findDoctorDesc: "Search for doctors and healthcare providers near your location",
    drugChecker: "Drug Checker",
    allergyChecker: "Allergy Checker",
    mentalHealth: "Mental Health",
    womensHealth: "Women's Health",
    mensHealth: "Men's Health",
    vaccination: "Vaccination Checker",
    healthEducation: "Health Education",
    welcome: "Free Health Info For All",
    subtitle: "Access reliable, free healthcare information and resources made for Indonesians to make informed decisions about your wellbeing",
    searchPlaceholder: "Search for health services...",
    emergency: "Emergency Contact",
    emergencyDesc: "24/7 Emergency medical assistance",
    findServices: "Find Services",
    findServicesDesc: "Explore our range of healthcare services",
    checkSymptoms: "Check Symptoms",
    checkSymptomsDesc: "Get an AI-powered assessment of your symptoms",
    popularTopics: "Popular Health Topics",
  },
  id: {
    symptomChecker: "Pemeriksa Gejala AI",
    symptomCheckerDesc: "Dapatkan penilaian awal gejala Anda menggunakan sistem AI canggih kami",
    healthQA: "Tanya Jawab Kesehatan AI",
    findDoctor: "Temukan Dokter",
    findDoctorDesc: "Cari dokter dan penyedia layanan kesehatan di sekitar lokasi Anda",
    drugChecker: "Pemeriksa Obat",
    allergyChecker: "Pemeriksa Alergi",
    mentalHealth: "Kesehatan Mental",
    womensHealth: "Kesehatan Wanita",
    mensHealth: "Kesehatan Pria",
    vaccination: "Pemeriksa Vaksinasi",
    healthEducation: "Edukasi Kesehatan",
    welcome: "Info Kesehatan Gratis Untuk Semua",
    subtitle: "Akses informasi dan sumber daya kesehatan yang terpercaya dan gratis untuk masyarakat Indonesia dalam membuat keputusan yang tepat tentang kesehatan Anda",
    searchPlaceholder: "Cari layanan kesehatan...",
    emergency: "Kontak Darurat",
    emergencyDesc: "Bantuan medis darurat 24/7",
    findServices: "Temukan Layanan",
    findServicesDesc: "Jelajahi berbagai layanan kesehatan kami",
    checkSymptoms: "Periksa Gejala",
    checkSymptomsDesc: "Dapatkan penilaian gejala Anda dengan bantuan AI",
    popularTopics: "Topik Kesehatan Populer",
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};