import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "../../contexts/LanguageContext";

const UsabilityScorecard = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleRating = (value: number) => {
    setRating(value);
    toast({
      title: language === 'en' ? "Thank you for your feedback!" : "Terima kasih atas penilaian Anda!",
      description: language === 'en' 
        ? "Your rating helps us improve our service." 
        : "Penilaian Anda membantu kami meningkatkan layanan.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-center text-xl md:text-2xl">
          {language === 'en' 
            ? "How would you rate your experience?" 
            : "Bagaimana penilaian Anda terhadap layanan kami?"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant="ghost"
              className="p-2 hover:bg-transparent focus:outline-none"
              onClick={() => handleRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(null)}
            >
              <Star
                className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${
                  (hoveredRating !== null ? value <= hoveredRating : value <= (rating || 0))
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </Button>
          ))}
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          {language === 'en'
            ? "Your feedback helps us improve our services"
            : "Masukan Anda membantu kami meningkatkan layanan"}
        </p>
      </CardContent>
    </Card>
  );
};

export default UsabilityScorecard;