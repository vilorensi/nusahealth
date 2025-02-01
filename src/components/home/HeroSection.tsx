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
      
      console.log('Calling fetch-openai function with symptoms:', symptoms);
      
      const { data, error } = await supabase.functions.invoke('fetch-openai', {
        body: { message: symptoms, systemPrompt }
      });

      console.log('Response from fetch-openai:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      if (!data?.choices?.[0]?.message?.content) {
        console.error('Invalid response format:', data);
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
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e9d5ff] via-[#ddd6fe] to-[#e0e7ff] animate-gradient-x">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
          <div className="h-[500px] w-[500px] rounded-full bg-purple-300/20 absolute top-[20%] -left-[100px] blur-3xl animate-blob" />
          <div className="h-[500px] w-[500px] rounded-full bg-blue-300/20 absolute bottom-[20%] -right-[100px] blur-3xl animate-blob animation-delay-2000" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {t('welcome')}
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-800 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-xl gap-3 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center w-full bg-gray-50/50 rounded-xl px-4 group">
                  <Search className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={language === 'en' ? 'Describe your symptoms...' : 'Jelaskan gejala Anda...'}
                    className="w-full p-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 focus:placeholder-purple-300 transition-all"
                  />
                </div>
                <Button 
                  onClick={handleSymptomSearch}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
    </div>
  );
};

export default HeroSection;