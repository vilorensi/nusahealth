import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const VaccinationChecker = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pregnant, setPregnant] = useState("no");
  const [chronicConditions, setChronicConditions] = useState("no");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const prompt = `Based on Indonesian Ministry of Health (Kemenkes) regulations, provide vaccination recommendations for a ${age} year old ${gender}${pregnant === "yes" ? ", who is pregnant" : ""}${chronicConditions === "yes" ? ", with chronic conditions" : ""}. Include information about recommended vaccines, schedule, and where to get them in Indonesia. Format the response in clear sections.`;

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a healthcare assistant specializing in Indonesian vaccination guidelines. Provide accurate information based on Kemenkes regulations. Always include a disclaimer about consulting healthcare professionals.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      setResult(data.choices[0].message.content);
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "Kesalahan",
        description: language === 'en' ? 
          "Failed to get recommendations. Please try again." : 
          "Gagal mendapatkan rekomendasi. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C5E1A5]/30 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{language === 'en' ? "Vaccination Checker" : "Pemeriksa Vaksinasi"}</CardTitle>
            <CardDescription>
              {language === 'en' ? 
                "Check recommended vaccinations based on Indonesian health guidelines" : 
                "Periksa rekomendasi vaksinasi berdasarkan pedoman kesehatan Indonesia"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">
                  {language === 'en' ? "Age" : "Usia"}
                </Label>
                <Input
                  id="age"
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={language === 'en' ? "Enter your age" : "Masukkan usia Anda"}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  {language === 'en' ? "Gender" : "Jenis Kelamin"}
                </Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">
                      {language === 'en' ? "Male" : "Laki-laki"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">
                      {language === 'en' ? "Female" : "Perempuan"}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {gender === "female" && (
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? "Are you pregnant?" : "Apakah Anda sedang hamil?"}
                  </Label>
                  <RadioGroup
                    value={pregnant}
                    onValueChange={setPregnant}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pregnant-yes" />
                      <Label htmlFor="pregnant-yes">
                        {language === 'en' ? "Yes" : "Ya"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pregnant-no" />
                      <Label htmlFor="pregnant-no">
                        {language === 'en' ? "No" : "Tidak"}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-2">
                <Label>
                  {language === 'en' ? 
                    "Do you have any chronic conditions?" : 
                    "Apakah Anda memiliki kondisi kronis?"}
                </Label>
                <RadioGroup
                  value={chronicConditions}
                  onValueChange={setChronicConditions}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="chronic-yes" />
                    <Label htmlFor="chronic-yes">
                      {language === 'en' ? "Yes" : "Ya"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="chronic-no" />
                    <Label htmlFor="chronic-no">
                      {language === 'en' ? "No" : "Tidak"}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" disabled={isLoading || !age || !gender} className="w-full">
                {isLoading ? 
                  (language === 'en' ? "Checking..." : "Memeriksa...") : 
                  (language === 'en' ? "Check Recommendations" : "Periksa Rekomendasi")}
              </Button>
            </form>

            {result && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? "Recommendations:" : "Rekomendasi:"}
                </h3>
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VaccinationChecker;