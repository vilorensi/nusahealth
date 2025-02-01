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
  const { toast } = useToast();
  const form = useForm<SymptomForm>();

  const onSubmit = async (data: SymptomForm) => {
    setIsLoading(true);
    try {
      // Here we would integrate with an AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(`Based on the symptoms described (${data.symptoms}), considering your ${data.age}-year-old ${data.gender} profile and medical history, it could be a common condition. However, please consult a healthcare professional for an accurate diagnosis, especially given the ${data.severity} severity level and ${data.duration} duration.`);
      toast({
        title: "Analysis Complete",
        description: "Please review the detailed assessment below.",
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
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">AI Symptom Checker</CardTitle>
            <CardDescription className="text-lg">
              Get an initial assessment of your symptoms using our advanced AI system. Remember, this is not a replacement for professional medical advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-accent/20 border-accent">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                If you're experiencing severe or life-threatening symptoms, please seek immediate medical attention or call emergency services.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">What symptoms are you experiencing?</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Please describe your symptoms in detail..."
                          className="min-h-[120px] resize-none"
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
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter your age"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <label htmlFor="male">Male</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <label htmlFor="female">Female</label>
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
                      <FormLabel>How long have you had these symptoms?</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., 2 days, 1 week..."
                          className="w-full"
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
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mild" id="mild" />
                            <label htmlFor="mild">Mild - Noticeable but not interfering with daily activities</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <label htmlFor="moderate">Moderate - Affecting some daily activities</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="severe" id="severe" />
                            <label htmlFor="severe">Severe - Significantly impacting daily life</label>
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
                      <FormLabel>Relevant Medical History</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Please mention any relevant medical conditions, medications, or allergies..."
                          className="min-h-[100px] resize-none"
                        />
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
              <div className="mt-8 p-6 bg-card rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold text-primary mb-3">Assessment Result:</h3>
                <p className="text-card-foreground leading-relaxed">{result}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    This is an AI-generated assessment and should not be considered as medical advice. 
                    Please consult with a healthcare professional for proper diagnosis and treatment.
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