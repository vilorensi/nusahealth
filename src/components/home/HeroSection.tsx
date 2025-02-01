import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSymptomSearch = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Error",
        description: language === 'en' ? "Please describe your symptoms" : "Silakan jelaskan gejala Anda",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const systemPrompt = 'You are a medical AI assistant performing initial symptom assessment. Provide a brief initial assessment and recommend whether the patient should seek immediate medical attention. Keep the response concise.';
      
      const { data, error } = await supabase.functions.invoke('fetch-openai', {
        body: { message: symptoms, systemPrompt }
      });

      if (error) throw error;
      
      if (!data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from AI');
      }
      
      const response = data.choices[0].message.content;
      navigate(`/symptoms?query=${encodeURIComponent(symptoms)}&initial=${encodeURIComponent(response)}`);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast({
        title: "Error",
        description: language === 'en' 
          ? "Failed to analyze symptoms. Please try again later." 
          : "Gagal menganalisis gejala. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSymptomSearch();
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.015]" />
        <div className="absolute h-64 w-64 -left-32 -top-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute h-64 w-64 -right-32 -bottom-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute h-64 w-64 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <span className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              {t('welcome')}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center flex-1 w-full bg-gray-50/50 rounded-xl px-4 group">
                <Search className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                <input
                  type="text"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Describe your symptoms...' : 'Jelaskan gejala Anda...'}
                  className="w-full p-4 bg-transparent outline-none text-gray-800 placeholder-gray-400 focus:placeholder-purple-300 transition-all"
                />
              </div>
              <Button 
                onClick={handleSymptomSearch}
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Search className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Analyzing...' : 'Menganalisis...'}
                  </>
                ) : (
                  language === 'en' ? 'Check Symptoms' : 'Periksa Gejala'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;