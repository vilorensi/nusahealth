import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { SeverityRadioGroup } from "./SeverityRadioGroup";
import { GenderRadioGroup } from "./GenderRadioGroup";
import { useLanguage } from "@/contexts/LanguageContext";

interface SymptomFormData {
  symptoms: string;
  duration: string;
  severity: string;
  age: string;
  gender: string;
  medicalHistory: string;
}

interface SymptomFormProps {
  onSubmit: (data: SymptomFormData) => void;
  isLoading: boolean;
}

export const SymptomForm = ({ onSubmit, isLoading }: SymptomFormProps) => {
  const form = useForm<SymptomFormData>();
  const { t } = useLanguage();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium mb-2">
              {t('describeSymptoms')}
            </label>
            <Textarea
              id="symptoms"
              {...form.register("symptoms", { required: true })}
              placeholder={t('symptomsPlaceholder')}
              className="min-h-[120px] resize-y"
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                {t('age')}
              </label>
              <Input
                id="age"
                type="number"
                {...form.register("age", { required: true })}
                placeholder={t('agePlaceholder')}
                min="0"
                max="150"
                aria-required="true"
              />
            </div>

            <GenderRadioGroup form={form} />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-2">
              {t('durationOfSymptoms')}
            </label>
            <Input
              id="duration"
              {...form.register("duration", { required: true })}
              placeholder={t('durationPlaceholder')}
              aria-required="true"
            />
          </div>

          <SeverityRadioGroup form={form} />

          <div>
            <label htmlFor="medicalHistory" className="block text-sm font-medium mb-2">
              {t('medicalHistory')}
            </label>
            <Textarea
              id="medicalHistory"
              {...form.register("medicalHistory", { required: true })}
              placeholder={t('medicalHistoryPlaceholder')}
              className="min-h-[100px] resize-y"
              aria-required="true"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>{t('analyzingSymptoms')}</span>
            </>
          ) : (
            t('analyzeSymptoms')
          )}
        </Button>
      </form>
    </Form>
  );
};