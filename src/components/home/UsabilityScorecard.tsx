import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "../../contexts/LanguageContext";

const UsabilityScorecard = () => {
  const [scores, setScores] = useState({
    desirability: "",
    usability: "",
    viability: "",
  });
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleScoreChange = (category: string, value: string) => {
    setScores((prev) => ({ ...prev, [category]: value }));
    toast({
      title: language === 'en' ? "Thank you for your feedback!" : "Terima kasih atas penilaian Anda!",
      description: language === 'en' 
        ? "Your rating helps us improve our healthcare services." 
        : "Penilaian Anda membantu kami meningkatkan layanan kesehatan.",
    });
  };

  const ScoreOption = ({ category, value, label, description }: { 
    category: string; 
    value: string; 
    label: string; 
    description: string;
  }) => (
    <div className="flex items-start space-x-2">
      <RadioGroupItem 
        value={value} 
        id={`${category}-${value}`}
        className="mt-1"
      />
      <div className="flex flex-col">
        <Label htmlFor={`${category}-${value}`} className="font-medium">
          {label}
        </Label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  const categories = {
    desirability: {
      title: language === 'en' ? "Health Information Clarity" : "Kejelasan Informasi Kesehatan",
      question: language === 'en' 
        ? "How comfortable are you with understanding our health information?" 
        : "Seberapa nyaman Anda memahami informasi kesehatan kami?",
      options: {
        fail: {
          label: language === 'en' ? "Needs Improvement" : "Perlu Perbaikan",
          description: language === 'en' 
            ? "I find it difficult to understand the health information provided" 
            : "Saya kesulitan memahami informasi kesehatan yang diberikan"
        },
        good: {
          label: language === 'en' ? "Satisfactory" : "Memuaskan",
          description: language === 'en'
            ? "I can understand most health information but some terms are unclear"
            : "Saya dapat memahami sebagian besar informasi kesehatan tetapi beberapa istilah tidak jelas"
        },
        exceeded: {
          label: language === 'en' ? "Excellent" : "Sangat Baik",
          description: language === 'en'
            ? "The health information is very clear and easy to understand"
            : "Informasi kesehatan sangat jelas dan mudah dipahami"
        }
      }
    },
    usability: {
      title: language === 'en' ? "Navigation Ease" : "Kemudahan Navigasi",
      question: language === 'en'
        ? "How easy is it to find and use our health services?"
        : "Seberapa mudah menemukan dan menggunakan layanan kesehatan kami?",
      options: {
        fail: {
          label: language === 'en' ? "Difficult" : "Sulit",
          description: language === 'en'
            ? "I struggle to find and use the health services"
            : "Saya kesulitan menemukan dan menggunakan layanan kesehatan"
        },
        good: {
          label: language === 'en' ? "Manageable" : "Cukup Mudah",
          description: language === 'en'
            ? "I can find most services but sometimes need help"
            : "Saya dapat menemukan sebagian besar layanan tetapi terkadang membutuhkan bantuan"
        },
        exceeded: {
          label: language === 'en' ? "Very Easy" : "Sangat Mudah",
          description: language === 'en'
            ? "I can easily find and use all health services"
            : "Saya dapat dengan mudah menemukan dan menggunakan semua layanan kesehatan"
        }
      }
    },
    viability: {
      title: language === 'en' ? "Service Effectiveness" : "Efektivitas Layanan",
      question: language === 'en'
        ? "How well do our health services meet your needs?"
        : "Seberapa baik layanan kesehatan kami memenuhi kebutuhan Anda?",
      options: {
        fail: {
          label: language === 'en' ? "Below Expectations" : "Di Bawah Harapan",
          description: language === 'en'
            ? "The services don't meet my healthcare needs"
            : "Layanan tidak memenuhi kebutuhan kesehatan saya"
        },
        good: {
          label: language === 'en' ? "Meets Expectations" : "Memenuhi Harapan",
          description: language === 'en'
            ? "The services meet most of my healthcare needs"
            : "Layanan memenuhi sebagian besar kebutuhan kesehatan saya"
        },
        exceeded: {
          label: language === 'en' ? "Exceeds Expectations" : "Melebihi Harapan",
          description: language === 'en'
            ? "The services exceed my healthcare needs"
            : "Layanan melebihi kebutuhan kesehatan saya"
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {language === 'en' ? "Help Us Improve Our Healthcare Services" : "Bantu Kami Meningkatkan Layanan Kesehatan"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(categories).map(([category, { title, question, options }]) => (
          <div key={category} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{question}</p>
            </div>
            <RadioGroup
              value={scores[category as keyof typeof scores]}
              onValueChange={(value) => handleScoreChange(category, value)}
              className="space-y-4"
            >
              <ScoreOption
                category={category}
                value="fail"
                label={options.fail.label}
                description={options.fail.description}
              />
              <ScoreOption
                category={category}
                value="good"
                label={options.good.label}
                description={options.good.description}
              />
              <ScoreOption
                category={category}
                value="exceeded"
                label={options.exceeded.label}
                description={options.exceeded.description}
              />
            </RadioGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UsabilityScorecard;