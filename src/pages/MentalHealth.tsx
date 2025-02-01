import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate score
    const score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    
    let recommendation = "";
    if (score <= 4) {
      recommendation = "Your symptoms suggest minimal depression. Continue monitoring your mental health and practice self-care.";
    } else if (score <= 9) {
      recommendation = "Your symptoms suggest mild depression. Consider talking to a mental health professional and implementing self-care strategies.";
    } else if (score <= 14) {
      recommendation = "Your symptoms suggest moderate depression. It's recommended to consult with a mental health professional for proper evaluation and support.";
    } else {
      recommendation = "Your symptoms suggest moderately severe depression. Please seek professional help as soon as possible.";
    }

    setResult(recommendation);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Mental Health Assessment</CardTitle>
            <CardDescription>
              This quick assessment can help determine if you might benefit from professional support.
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
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Get Assessment"
                )}
              </Button>
            </form>

            {result && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold mb-2">Assessment Result:</h3>
                <p className="mb-4">{result}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Coping Strategies:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Practice regular exercise and maintain a healthy diet</li>
                    <li>Establish a consistent sleep schedule</li>
                    <li>Try meditation or mindfulness exercises</li>
                    <li>Stay connected with friends and family</li>
                    <li>Consider joining support groups</li>
                    <li>Limit alcohol and avoid recreational drugs</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MentalHealth;