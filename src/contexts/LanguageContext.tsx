import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    subtitle: "Free healthcare information for Indonesians to make better health decisions",
    searchPlaceholder: "Search for health services...",
    emergency: "Emergency Contact",
    emergencyDesc: "24/7 Emergency medical assistance",
    findServices: "Find Nearest Doctor",
    findServicesDesc: "Locate healthcare professionals near you",
    checkSymptoms: "Check Symptoms",
    checkSymptomsDesc: "Get an AI-powered assessment of your symptoms",
    popularTopics: "Popular Health Topics",
    aboutNusaHealth: "About NusaHealth",
    aboutDesc: "Providing reliable health information and connecting you with healthcare services across Indonesia",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    disclaimer: "Disclaimer",
    disclaimerText: "The information provided on this website is for general informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.",
    allRightsReserved: "All rights reserved",
    describeSymptoms: "Describe your symptoms",
    symptomsPlaceholder: "Please describe your symptoms in detail...",
    age: "Age",
    agePlaceholder: "Enter your age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    durationOfSymptoms: "Duration of Symptoms",
    durationPlaceholder: "How long have you had these symptoms?",
    severity: "Severity",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
    medicalHistory: "Medical History",
    medicalHistoryPlaceholder: "Any relevant medical history or conditions...",
    analyzeSymptoms: "Analyze Symptoms",
    analyzingSymptoms: "Analyzing...",
    symptoms: "Symptoms",
    qa: "Q&A",
    doctor: "Find Doctor",
    medication: "Medication",
    allergy: "Allergy",
    mental: "Mental Health",
    vaccine: "Vaccination"
  },
  id: {
    symptomChecker: "Pemeriksa Gejala AI",
    symptomCheckerDesc: "Dapatkan penilaian awal gejala Anda menggunakan sistem AI kami",
    healthQA: "Tanya Jawab Kesehatan AI",
    findDoctor: "Temukan Dokter",
    findDoctorDesc: "Cari dokter dan penyedia layanan kesehatan di lokasi Anda",
    drugChecker: "Pemeriksa Obat",
    allergyChecker: "Pemeriksa Alergi",
    mentalHealth: "Kesehatan Mental",
    womensHealth: "Kesehatan Wanita",
    mensHealth: "Kesehatan Pria",
    vaccination: "Pemeriksa Vaksinasi",
    healthEducation: "Edukasi Kesehatan",
    welcome: "Info Kesehatan Gratis Untuk Semua",
    subtitle: "Informasi kesehatan gratis untuk masyarakat Indonesia",
    searchPlaceholder: "Cari layanan kesehatan...",
    emergency: "Kontak Darurat",
    emergencyDesc: "Bantuan medis darurat 24/7",
    findServices: "Temukan Dokter Terdekat",
    findServicesDesc: "Temukan profesional kesehatan di dekat Anda",
    checkSymptoms: "Periksa Gejala",
    checkSymptomsDesc: "Dapatkan penilaian gejala dengan AI",
    popularTopics: "Topik Kesehatan Populer",
    aboutNusaHealth: "Tentang NusaHealth",
    aboutDesc: "Menyediakan informasi kesehatan terpercaya dan menghubungkan Anda dengan layanan kesehatan di Indonesia",
    quickLinks: "Tautan Cepat",
    contactUs: "Hubungi Kami",
    disclaimer: "Peringatan",
    disclaimerText: "Informasi yang disediakan di situs web ini hanya untuk tujuan informasi umum. Ini tidak dimaksudkan sebagai pengganti saran medis profesional.",
    allRightsReserved: "Hak cipta dilindungi undang-undang",
    describeSymptoms: "Jelaskan gejala Anda",
    symptomsPlaceholder: "Mohon jelaskan gejala Anda secara detail...",
    age: "Usia",
    agePlaceholder: "Masukkan usia Anda",
    gender: "Jenis Kelamin",
    male: "Laki-laki",
    female: "Perempuan",
    durationOfSymptoms: "Durasi Gejala",
    durationPlaceholder: "Sudah berapa lama Anda mengalami gejala ini?",
    severity: "Tingkat Keparahan",
    mild: "Ringan",
    moderate: "Sedang",
    severe: "Berat",
    medicalHistory: "Riwayat Medis",
    medicalHistoryPlaceholder: "Riwayat medis atau kondisi yang relevan...",
    analyzeSymptoms: "Analisis Gejala",
    analyzingSymptoms: "Menganalisis...",
    symptoms: "Gejala",
    qa: "Tanya Jawab",
    doctor: "Cari Dokter",
    medication: "Obat",
    allergy: "Alergi",
    mental: "Kesehatan Mental",
    vaccine: "Vaksinasi"
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

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