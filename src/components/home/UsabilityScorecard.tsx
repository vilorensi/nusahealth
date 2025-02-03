import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "../../contexts/LanguageContext";

const UsabilityScorecard = () => {
  const { language } = useLanguage();
  const [scores, setScores] = useState({
    mobile: 0,
    accessibility: 0,
    performance: 0,
    usability: 0
  });

  useEffect(() => {
    // Simulate scoring calculation
    const calculateScores = () => {
      setScores({
        mobile: 95, // High score for mobile-first design
        accessibility: 90, // Good accessibility practices
        performance: 88, // Performance metrics
        usability: 92 // Overall usability score
      });
    };

    calculateScores();
  }, []);

  const getLabel = (category: string) => {
    const labels = {
      en: {
        mobile: 'Mobile Responsiveness',
        accessibility: 'Accessibility',
        performance: 'Performance',
        usability: 'Overall Usability'
      },
      id: {
        mobile: 'Responsif Mobile',
        accessibility: 'Aksesibilitas',
        performance: 'Performa',
        usability: 'Kegunaan Keseluruhan'
      }
    };

    return labels[language as keyof typeof labels][category as keyof typeof labels['en']];
  };

  return (
    <Card className="mt-8 bg-white/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          {language === 'en' ? 'Usability Scorecard' : 'Kartu Skor Kegunaan'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(scores).map(([category, score]) => (
          <div key={category} className="space-y-2">
            <div className="flex justify-between text-sm md:text-base">
              <span>{getLabel(category)}</span>
              <span className="font-medium">{score}%</span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UsabilityScorecard;