import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ResultDisplayProps {
  result: string | null;
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  if (!result) return null;

  return (
    <div
      className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-primary/20"
      role="region"
      aria-label="Assessment Result"
    >
      <h3 className="text-lg font-semibold mb-3">Assessment Result</h3>
      <p className="whitespace-pre-wrap">{result}</p>
      <div className="mt-4 pt-4 border-t border-primary/10">
        <Alert variant="warning" className="bg-accent/10 border-accent/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Medical Disclaimer</AlertTitle>
          <AlertDescription className="text-sm text-primary/60">
            This is an AI-generated assessment and should not replace professional medical advice. 
            Please consult with a qualified healthcare provider for proper diagnosis and treatment.
            In case of emergency, contact emergency services immediately.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};