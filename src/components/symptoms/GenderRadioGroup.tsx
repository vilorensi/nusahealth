import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

interface GenderRadioGroupProps {
  form: UseFormReturn<any>;
}

export const GenderRadioGroup = ({ form }: GenderRadioGroupProps) => {
  return (
    <div>
      <FormLabel id="gender-group">Gender</FormLabel>
      <RadioGroup
        {...form.register("gender")}
        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
        aria-labelledby="gender-group"
      >
        {["male", "female"].map((gender) => (
          <div key={gender} className="flex items-center space-x-2">
            <RadioGroupItem value={gender} id={gender} />
            <label htmlFor={gender} className="capitalize">
              {gender}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};