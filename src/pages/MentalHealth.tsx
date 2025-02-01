import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const MentalHealth = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Mental Health & Stress Test</CardTitle>
            <CardDescription>
              Assess your mental well-being and stress levels.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default MentalHealth;