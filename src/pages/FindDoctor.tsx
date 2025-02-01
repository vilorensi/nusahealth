import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  name: string;
  address: string;
  distance: string;
}

const FindDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement actual Google Places API integration
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

  const popularServices = [
    "GP (General practice)",
    "Psychiatry",
    "Pharmacy",
    "COVID-19 vaccine clinic",
    "Physiotherapy",
    "Pathology",
    "Hospitals",
    "Urgent care service"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F2D5]/30 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Service Finder</h1>
          <p className="text-center text-lg mb-12">
            Indonesia's most comprehensive directory of healthcare professionals and services.
          </p>

          <form onSubmit={handleSearch} className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Search by service or name</label>
                <Input
                  type="text"
                  placeholder="e.g., GP, dentist, pediatrician..."
                  className="w-full"
                />
              </div>
              <div className="w-px bg-gray-200 hidden md:block" />
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Enter suburb or postcode</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Location..."
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              <div className="md:self-end">
                <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Search by popular services</h2>
            <div className="flex flex-wrap gap-3">
              {popularServices.map((service, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full hover:bg-primary/20"
                  onClick={() => {
                    const form = document.querySelector('form');
                    if (form) form.requestSubmit();
                  }}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>

          {doctors.length > 0 && (
            <div className="space-y-4">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.address}</p>
                  <p className="text-sm text-primary-foreground mt-2">{doctor.distance}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindDoctor;