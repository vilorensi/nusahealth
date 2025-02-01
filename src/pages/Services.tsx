import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  MessageSquare, 
  User, 
  Pill, 
  AlertCircle, 
  Heart, 
  Syringe, 
  BookOpen 
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Stethoscope,
      title: t("symptomChecker"),
      description: t("symptomCheckerDesc"),
      link: "/symptoms",
      color: "text-primary",
    },
    {
      icon: MessageSquare,
      title: t("healthQA"),
      description: "Get expert answers to your health questions",
      link: "/health-qa",
      color: "text-blue-600",
    },
    {
      icon: User,
      title: t("findDoctor"),
      description: "Find healthcare providers near you",
      link: "/find-doctor",
      color: "text-green-600",
    },
    {
      icon: Pill,
      title: t("drugChecker"),
      description: "Check medicine information and interactions",
      link: "/drug-checker",
      color: "text-purple-600",
    },
    {
      icon: AlertCircle,
      title: t("allergyChecker"),
      description: "Identify potential allergies and sensitivities",
      link: "/allergy-checker",
      color: "text-red-600",
    },
    {
      icon: Heart,
      title: t("mentalHealth"),
      description: "Mental health resources and assessments",
      link: "/mental-health",
      color: "text-pink-600",
    },
    {
      icon: Heart,
      title: t("womensHealth"),
      description: "Women's health information and resources",
      link: "/womens-health",
      color: "text-rose-600",
    },
    {
      icon: Heart,
      title: t("mensHealth"),
      description: "Men's health information and resources",
      link: "/mens-health",
      color: "text-indigo-600",
    },
    {
      icon: Syringe,
      title: t("vaccination"),
      description: "Vaccination schedules and recommendations",
      link: "/vaccination-checker",
      color: "text-cyan-600",
    },
    {
      icon: BookOpen,
      title: t("healthEducation"),
      description: "Health education resources and articles",
      link: "/health-education",
      color: "text-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">Our Health Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.link} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={service.link}>
                    <Button className="w-full">
                      Access Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;