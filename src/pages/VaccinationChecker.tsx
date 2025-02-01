import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const VaccinationChecker = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Vaccination & Health Screening Checker</CardTitle>
            <CardDescription>
              Check recommended vaccinations and health screenings based on your profile.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default VaccinationChecker;