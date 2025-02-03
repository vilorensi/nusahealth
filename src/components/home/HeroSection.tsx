import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Cloud = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none opacity-20 ${className}`}>
    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full blur-xl" />
  </div>
);

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
        body: { 
          message: symptoms, 
          systemPrompt,
          model: "gpt-4o-mini"
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      if (!data?.choices?.[0]?.message?.content) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from AI');
      }
      
      const response = data.choices[0].message.content;
      navigate(`/symptoms?query=${encodeURIComponent(symptoms)}&initial=${encodeURIComponent(response)}`);
    } catch (error: any) {
      console.error('Error analyzing symptoms:', error);
      toast({
        title: "Error",
        description: language === 'en' 
          ? `Failed to analyze symptoms: ${error.message}` 
          : `Gagal menganalisis gejala: ${error.message}`,
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
    <div className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#F2FCE2]/80 via-white to-[#E2F5E9]/80 overflow-hidden px-4 md:px-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.015]" />
        <div className="absolute h-48 w-48 md:h-64 md:w-64 -left-24 -top-24 bg-[#F2FCE2] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
        <div className="absolute h-48 w-48 md:h-64 md:w-64 -right-24 -bottom-24 bg-[#E2F5E9] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute h-48 w-48 md:h-64 md:w-64 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D4F2EA] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000" />
        
        <Cloud className="animate-cloud top-1/4" />
        <Cloud className="animate-cloud animation-delay-2000 top-1/3" />
        <Cloud className="animate-cloud animation-delay-4000 top-2/3" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-in px-4">
            <span className="inline-block text-gray-800 drop-shadow-lg">
              {t('welcome')}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed animate-slide-in font-medium drop-shadow-sm px-4" style={{ animationDelay: '0.2s' }}>
            {t('subtitle')}
          </p>

          <div className="max-w-2xl mx-auto px-4 transform hover:scale-105 transition-all duration-300 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 bg-white/60 backdrop-blur-md p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center flex-1 w-full bg-white/50 rounded-xl px-4 group">
                <Search className="text-gray-400 group-hover:text-[#A7D7A5] transition-colors" />
                <input
                  type="text"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Describe your symptoms...' : 'Jelaskan gejala Anda...'}
                  className="w-full p-3 md:p-4 bg-transparent outline-none text-gray-800 placeholder-gray-400 focus:placeholder-[#A7D7A5]/70 transition-all"
                />
              </div>
              <Button 
                onClick={handleSymptomSearch}
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-[#F2FCE2] to-[#E2F5E9] hover:from-[#E2F5E9] hover:to-[#F2FCE2] text-gray-800 font-medium px-6 py-3 md:px-8 md:py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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