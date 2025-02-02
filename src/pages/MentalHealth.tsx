import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const questions = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
  },
  {
    id: 2,
    text: "How often have you had little interest or pleasure in doing things?",
  },
  {
    id: 3,
    text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
  },
  {
    id: 4,
    text: "How often have you felt tired or had little energy?",
  },
  {
    id: 5,
    text: "How often have you had poor appetite or overeating?",
  },
];

const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
];

const MentalHealth = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
      
      const { data, error } = await supabase.functions.invoke('mental-health-assessment', {
        body: { score, answers }
      });

      if (error) throw error;

      setResult(data.analysis);
      toast({
        title: "Assessment Complete",
        description: "Your mental health assessment has been analyzed.",
      });
    } catch (error) {
      console.error('Error analyzing mental health assessment:', error);
      toast({
        title: "Error",
        description: "Failed to analyze your responses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C5E1A5]/30 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Mental Health Assessment</CardTitle>
            <CardDescription>
              This quick assessment can help determine your current stress levels and provide personalized recommendations.
              Note: This is not a diagnostic tool and should not replace professional medical advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {questions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <Label className="text-base">{question.text}</Label>
                  <RadioGroup
                    onValueChange={(value) => 
                      setAnswers(prev => ({ ...prev, [question.id]: value }))
                    }
                    value={answers[question.id]}
                  >
                    {options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                        <Label htmlFor={`q${question.id}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              <Button 
                type="submit" 
                disabled={isSubmitting || Object.keys(answers).length !== questions.length}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Responses...
                  </>
                ) : (
                  "Get Assessment"
                )}
              </Button>
            </form>

            {result && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold mb-2">Assessment Result:</h3>
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MentalHealth;