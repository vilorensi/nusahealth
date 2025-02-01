import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SymptomForm } from "@/components/symptoms/SymptomForm";
import { ResultDisplay } from "@/components/symptoms/ResultDisplay";

const Symptoms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (data: any) => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    if (!data.symptoms.trim()) {
      toast({
        title: "Error",
        description: "Please describe your symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: 'system',
              content: 'You are a medical AI assistant performing initial symptom assessment. Provide clear analysis and always include a disclaimer about consulting healthcare professionals.'
            },
            {
              role: 'user',
              content: `Patient Information:
                Age: ${data.age}
                Gender: ${data.gender}
                Symptoms: ${data.symptoms}
                Duration: ${data.duration}
                Severity: ${data.severity}
                Medical History: ${data.medicalHistory}
                
                Please provide an initial assessment of these symptoms.`
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms');
      }

      const responseData = await response.json();
      setResult(responseData.choices[0].message.content);
      toast({
        title: "Assessment Complete",
        description: "Please review the detailed analysis below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please check your API key and try again.",
        variant: "destructive",
      });
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C5E1A5]/30 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8" role="main">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{t('symptomChecker')}</CardTitle>
            <CardDescription className="text-base md:text-lg">
              {t('symptomCheckerDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert 
              className="mb-6 bg-[#F4A261]/20 border-[#F4A261]"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                If you are experiencing severe symptoms or believe you have a medical emergency,
                please contact emergency services immediately or visit the nearest emergency room.
                This tool is for informational purposes only and should not replace professional medical advice.
              </AlertDescription>
            </Alert>

            <SymptomForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              apiKey={apiKey}
              setApiKey={setApiKey}
            />

            <ResultDisplay result={result} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Symptoms;