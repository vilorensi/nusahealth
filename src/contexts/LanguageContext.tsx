import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'id';

type Translations = {
  [key in Language]: {
    welcome: string;
    subtitle: string;
    searchPlaceholder: string;
    checkSymptoms: string;
    checkSymptomsDesc: string;
    findServices: string;
    findServicesDesc: string;
    emergency: string;
    emergencyDesc: string;
    popularTopics: string;
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    welcome: "Welcome to SehatIndonesia",
    subtitle: "Trusted health information for Indonesian community",
    searchPlaceholder: "Search health information...",
    checkSymptoms: "Check Symptoms",
    checkSymptomsDesc: "Recognize your symptoms and get initial medical advice",
    findServices: "Find Services",
    findServicesDesc: "Find nearby health facilities in your location",
    emergency: "Emergency",
    emergencyDesc: "Need immediate medical help? Contact emergency number",
    popularTopics: "Popular Health Topics",
  },
  id: {
    welcome: "Selamat Datang di SehatIndonesia",
    subtitle: "Informasi kesehatan terpercaya untuk masyarakat Indonesia",
    searchPlaceholder: "Cari informasi kesehatan...",
    checkSymptoms: "Cek Gejala",
    checkSymptomsDesc: "Kenali gejala Anda dan dapatkan saran medis awal",
    findServices: "Temukan Layanan",
    findServicesDesc: "Cari fasilitas kesehatan terdekat di lokasi Anda",
    emergency: "Darurat",
    emergencyDesc: "Butuh bantuan medis segera? Hubungi nomor darurat",
    popularTopics: "Topik Kesehatan Populer",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
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
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};