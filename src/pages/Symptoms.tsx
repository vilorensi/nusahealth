import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";

interface SymptomForm {
  symptoms: string;
  duration: string;
  severity: string;
}

const Symptoms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<SymptomForm>();

  const onSubmit = async (data: SymptomForm) => {
    setIsLoading(true);
    try {
      // Here we would integrate with an AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult("Based on the symptoms described, it could be a common cold. However, please consult a healthcare professional for an accurate diagnosis.");
      toast({
        title: "Analysis Complete",
        description: "Please review the results below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>AI Symptom Checker</CardTitle>
            <CardDescription>
              Describe your symptoms and get an initial assessment. Remember, this is not a replacement for professional medical advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What symptoms are you experiencing?</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full min-h-[100px] p-3 border rounded-md"
                          placeholder="Describe your symptoms in detail..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How long have you had these symptoms?</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., 2 days, 1 week..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How severe are your symptoms?</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Select severity...</option>
                          <option value="mild">Mild</option>
                          <option value="moderate">Moderate</option>
                          <option value="severe">Severe</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    "Check Symptoms"
                  )}
                </Button>
              </form>
            </Form>

            {result && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Assessment Result:</h3>
                <p>{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Symptoms;