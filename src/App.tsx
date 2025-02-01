import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Symptoms from "./pages/Symptoms";
import HealthQA from "./pages/HealthQA";
import FindDoctor from "./pages/FindDoctor";
import DrugChecker from "./pages/DrugChecker";
import AllergyChecker from "./pages/AllergyChecker";
import MentalHealth from "./pages/MentalHealth";
import WomensHealth from "./pages/WomensHealth";
import MensHealth from "./pages/MensHealth";
import VaccinationChecker from "./pages/VaccinationChecker";
import HealthEducation from "./pages/HealthEducation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/health-qa" element={<HealthQA />} />
            <Route path="/find-doctor" element={<FindDoctor />} />
            <Route path="/drug-checker" element={<DrugChecker />} />
            <Route path="/allergy-checker" element={<AllergyChecker />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/womens-health" element={<WomensHealth />} />
            <Route path="/mens-health" element={<MensHealth />} />
            <Route path="/vaccination-checker" element={<VaccinationChecker />} />
            <Route path="/health-education" element={<HealthEducation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;