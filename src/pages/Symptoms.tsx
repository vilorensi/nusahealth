import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";

interface SymptomForm {
  symptoms: string;
  duration: string;
  severity: string;
  age: string;
  gender: string;
  medicalHistory: string;
}

const Symptoms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const { toast } = useToast();
  const form = useForm<SymptomForm>({
    defaultValues: {
      symptoms: "",
      duration: "",
      severity: "",
      age: "",
      gender: "",
      medicalHistory: "",
    }
  });
  const { t } = useLanguage();

  const onSubmit = async (data: SymptomForm) => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Perplexity API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
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
            <CardTitle>{t('symptomChecker')}</CardTitle>
            <CardDescription>
              {t('symptomCheckerDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-[#F4A261]/20 border-[#F4A261]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('important')}</AlertTitle>
              <AlertDescription>
                {t('emergencyWarning')}
              </AlertDescription>
            </Alert>

            <div className="mb-6">
              <FormLabel>Perplexity API Key</FormLabel>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Perplexity API key"
                className="mt-1"
              />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('symptomsLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('symptomsPlaceholder')}
                          className="min-h-[120px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('age')}</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder={t('agePlaceholder')} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('gender')}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <label htmlFor="male">{t('male')}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <label htmlFor="female">{t('female')}</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('duration')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t('durationPlaceholder')} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('severity')}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mild" id="mild" />
                            <label htmlFor="mild">{t('mild')}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <label htmlFor="moderate">{t('moderate')}</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="severe" id="severe" />
                            <label htmlFor="severe">{t('severe')}</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('medicalHistory')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('medicalHistoryPlaceholder')}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('analyzing')}
                    </>
                  ) : (
                    t('checkSymptoms')
                  )}
                </Button>
              </form>
            </Form>

            {result && (
              <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold mb-3">{t('assessmentResult')}</h3>
                <p className="whitespace-pre-wrap">{result}</p>
                <div className="mt-4 pt-4 border-t border-primary/10">
                  <p className="text-sm text-primary/60">
                    {t('aiDisclaimer')}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Symptoms;