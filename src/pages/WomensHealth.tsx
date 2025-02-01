import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const WomensHealth = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Women's Health</CardTitle>
            <CardDescription>
              Information and resources specific to women's health concerns.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default WomensHealth;