import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AllergyChecker = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Allergy & Food Sensitivity Checker</CardTitle>
            <CardDescription>
              Identify potential allergies and food sensitivities.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default AllergyChecker;