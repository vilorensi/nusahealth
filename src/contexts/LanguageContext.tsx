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
    symptomChecker: string;
    healthQA: string;
    findDoctor: string;
    drugChecker: string;
    allergyChecker: string;
    mentalHealth: string;
    womensHealth: string;
    mensHealth: string;
    vaccination: string;
    healthEducation: string;
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    welcome: "Welcome to NusaHealth",
    subtitle: "Trusted health information for Indonesian community",
    searchPlaceholder: "Search health information...",
    checkSymptoms: "Check Symptoms",
    checkSymptomsDesc: "Recognize your symptoms and get initial medical advice",
    findServices: "Find Services",
    findServicesDesc: "Find nearby health facilities in your location",
    emergency: "Emergency",
    emergencyDesc: "Need immediate medical help? Contact emergency number",
    popularTopics: "Popular Health Topics",
    symptomChecker: "AI Symptom Checker",
    healthQA: "AI Health Q&A",
    findDoctor: "Find a Doctor",
    drugChecker: "Drug Checker",
    allergyChecker: "Allergy Checker",
    mentalHealth: "Mental Health",
    womensHealth: "Women's Health",
    mensHealth: "Men's Health",
    vaccination: "Vaccination",
    healthEducation: "Health Education",
  },
  id: {
    welcome: "Selamat Datang di NusaHealth",
    subtitle: "Informasi kesehatan terpercaya untuk masyarakat Indonesia",
    searchPlaceholder: "Cari informasi kesehatan...",
    checkSymptoms: "Cek Gejala",
    checkSymptomsDesc: "Kenali gejala Anda dan dapatkan saran medis awal",
    findServices: "Temukan Layanan",
    findServicesDesc: "Cari fasilitas kesehatan terdekat di lokasi Anda",
    emergency: "Darurat",
    emergencyDesc: "Butuh bantuan medis segera? Hubungi nomor darurat",
    popularTopics: "Topik Kesehatan Populer",
    symptomChecker: "Cek Gejala AI",
    healthQA: "Tanya Jawab Kesehatan AI",
    findDoctor: "Cari Dokter",
    drugChecker: "Cek Obat",
    allergyChecker: "Cek Alergi",
    mentalHealth: "Kesehatan Mental",
    womensHealth: "Kesehatan Wanita",
    mensHealth: "Kesehatan Pria",
    vaccination: "Vaksinasi",
    healthEducation: "Edukasi Kesehatan",
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