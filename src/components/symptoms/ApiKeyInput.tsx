import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput = ({ value, onChange }: ApiKeyInputProps) => {
  return (
    <div className="mb-6">
      <FormLabel htmlFor="apiKey">OpenAI API Key</FormLabel>
      <Input
        id="apiKey"
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your OpenAI API key"
        className="mt-1"
        aria-required="true"
        aria-describedby="apikey-description"
      />
      <p id="apikey-description" className="text-sm text-muted-foreground mt-1">
        Required to analyze symptoms using AI
      </p>
    </div>
  );
};