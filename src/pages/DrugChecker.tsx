import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DrugChecker = () => {
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
      // Fetch API key from Supabase
      const { data: secretData, error: secretError } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', 'openai_api_key')
        .single();

      if (secretError || !secretData) {
        throw new Error('Failed to fetch API key');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secretData.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: 'system',
              content: 'You are a medical AI assistant specializing in medication information. Provide accurate information about medications, their uses, and potential interactions. Always include a disclaimer about consulting healthcare professionals.'
            },
            {
              role: 'user',
              content: question
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data.choices[0].message.content);
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
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Medicine & Drug Information</CardTitle>
            <CardDescription>
              Ask questions about medications, interactions, and side effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="drug-question" className="block text-sm font-medium mb-2">
                  Your Question
                </label>
                <Textarea
                  id="drug-question"
                  placeholder="Ask about drug interactions, side effects, or usage information..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={isLoading}>
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
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
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

export default DrugChecker;