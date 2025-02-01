import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const HealthEducation = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Health Education & Blog</CardTitle>
            <CardDescription>
              Educational resources and articles about various health topics.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default HealthEducation;