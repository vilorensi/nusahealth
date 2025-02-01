import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SearchBox } from "@/components/doctor/SearchBox";
import { DoctorList } from "@/components/doctor/DoctorList";

interface Doctor {
  name: string;
  address: string;
  distance: string;
}

const FindDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual Google Places API integration
      // This is a placeholder response
      setDoctors([
        {
          name: "Dr. Sarah Johnson",
          address: "123 Medical Center, Jakarta",
          distance: "0.5 km away"
        },
        {
          name: "Dr. Michael Chen",
          address: "456 Health Clinic, Jakarta",
          distance: "1.2 km away"
        }
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find doctors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C5E1A5]/30 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Find a Doctor Near You</CardTitle>
            <CardDescription>
              Search for healthcare providers in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchBox onSearch={handleSearch} isLoading={isLoading} />
            <DoctorList doctors={doctors} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FindDoctor;