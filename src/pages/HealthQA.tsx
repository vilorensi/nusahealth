import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { getAIResponse } from "@/utils/aiHelpers";

const HealthQA = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter your question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const systemPrompt = 'You are a medical AI assistant. Provide accurate, clear, and concise health information. Always include a disclaimer that users should consult healthcare professionals for medical advice.';
      const response = await getAIResponse(question, systemPrompt);
      setAnswer(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again later.",
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
            <CardTitle>Health Q&A</CardTitle>
            <CardDescription>
              Ask any health-related questions and get AI-powered answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  placeholder="Type your health question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Answer...
                  </>
                ) : (
                  "Ask Question"
                )}
              </Button>
            </form>

            {answer && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Answer:</h3>
                <p className="whitespace-pre-wrap">{answer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HealthQA;