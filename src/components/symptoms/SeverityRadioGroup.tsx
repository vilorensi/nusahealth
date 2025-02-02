import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

interface SeverityRadioGroupProps {
  form: UseFormReturn<any>;
}

export const SeverityRadioGroup = ({ form }: SeverityRadioGroupProps) => {
  const { t } = useLanguage();

  return (
    <div>
      <FormLabel id="severity-group">{t('severity')}</FormLabel>
      <RadioGroup
        defaultValue={form.getValues("severity")}
        onValueChange={(value) => form.setValue("severity", value)}
        className="flex flex-col space-y-2"
        aria-labelledby="severity-group"
      >
        {["mild", "moderate", "severe"].map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <RadioGroupItem value={level} id={level} />
            <label htmlFor={level} className="capitalize">
              {t(level)}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};