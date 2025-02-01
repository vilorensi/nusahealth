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
    important: "Important Notice",
    emergencyWarning: "If you're experiencing severe or life-threatening symptoms, please seek immediate medical attention or call emergency services.",
    symptomsLabel: "What symptoms are you experiencing?",
    symptomsPlaceholder: "Please describe your symptoms in detail...",
    age: "Age",
    agePlaceholder: "Enter your age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    duration: "How long have you had these symptoms?",
    durationPlaceholder: "e.g., 2 days, 1 week...",
    severity: "How severe are your symptoms?",
    mild: "Mild - Noticeable but not interfering with daily activities",
    moderate: "Moderate - Affecting some daily activities",
    severe: "Severe - Significantly impacting daily life",
    medicalHistory: "Relevant Medical History",
    medicalHistoryPlaceholder: "Please mention any relevant medical conditions, medications, or allergies...",
    analyzing: "Analyzing Symptoms...",
    checkSymptoms: "Check Symptoms",
    assessmentResult: "Assessment Result",
    aiDisclaimer: "This is an AI-generated assessment and should not be considered as medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.",
  },
  id: {
    symptomChecker: "Pemeriksa Gejala AI",
    symptomCheckerDesc: "Dapatkan penilaian awal gejala Anda menggunakan sistem AI canggih kami",
    important: "Pemberitahuan Penting",
    emergencyWarning: "Jika Anda mengalami gejala yang parah atau mengancam jiwa, segera cari bantuan medis atau hubungi layanan darurat.",
    symptomsLabel: "Gejala apa yang Anda alami?",
    symptomsPlaceholder: "Mohon jelaskan gejala Anda secara detail...",
    age: "Usia",
    agePlaceholder: "Masukkan usia Anda",
    gender: "Jenis Kelamin",
    male: "Laki-laki",
    female: "Perempuan",
    duration: "Sudah berapa lama Anda mengalami gejala ini?",
    durationPlaceholder: "contoh: 2 hari, 1 minggu...",
    severity: "Seberapa parah gejala Anda?",
    mild: "Ringan - Terasa tapi tidak mengganggu aktivitas sehari-hari",
    moderate: "Sedang - Mempengaruhi beberapa aktivitas sehari-hari",
    severe: "Parah - Sangat mempengaruhi kehidupan sehari-hari",
    medicalHistory: "Riwayat Medis yang Relevan",
    medicalHistoryPlaceholder: "Mohon sebutkan kondisi medis, obat-obatan, atau alergi yang relevan...",
    analyzing: "Menganalisis Gejala...",
    checkSymptoms: "Periksa Gejala",
    assessmentResult: "Hasil Penilaian",
    aiDisclaimer: "Ini adalah penilaian yang dihasilkan AI dan tidak boleh dianggap sebagai saran medis. Silakan berkonsultasi dengan profesional kesehatan untuk diagnosis dan pengobatan yang tepat.",
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
