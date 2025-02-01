import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FindDoctor = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Find a Doctor</CardTitle>
            <CardDescription>
              Locate healthcare providers near you based on specialty and location.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default FindDoctor;