import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DrugChecker = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Medicine & Drug Checker</CardTitle>
            <CardDescription>
              Check drug interactions, side effects, and usage information.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default DrugChecker;