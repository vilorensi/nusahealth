import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const HealthQA = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Health Q&A</CardTitle>
            <CardDescription>
              Ask health-related questions and get AI-powered answers based on reliable medical information.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default HealthQA;