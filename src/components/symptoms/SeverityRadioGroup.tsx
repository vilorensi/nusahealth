import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

interface SeverityRadioGroupProps {
  form: UseFormReturn<any>;
}

export const SeverityRadioGroup = ({ form }: SeverityRadioGroupProps) => {
  return (
    <div>
      <FormLabel id="severity-group">Severity</FormLabel>
      <RadioGroup
        {...form.register("severity")}
        className="flex flex-col space-y-2"
        aria-labelledby="severity-group"
      >
        {["mild", "moderate", "severe"].map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <RadioGroupItem value={level} id={level} />
            <label htmlFor={level} className="capitalize">
              {level}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};