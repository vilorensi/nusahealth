import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  name: string;
  address: string;
  distance: string;
  placeId: string;
}

const FindDoctor = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY'}&libraries=places&language=id`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadGoogleMapsScript();
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "id" },
    });

    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      toast({
        title: "Error",
        description: "Please select a location from the dropdown",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const service = new google.maps.places.PlacesService(document.createElement("div"));
    const request = {
      location: place.geometry.location,
      radius: 5000,
      type: "doctor",
      keyword: "dokter",
    };

    service.nearbySearch(request, (results, status) => {
      setLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const nearbyDoctors = results.map((result) => ({
          name: result.name || "Unknown",
          address: result.vicinity || "No address available",
          distance: calculateDistance(
            place.geometry!.location!.lat(),
            place.geometry!.location!.lng(),
            result.geometry!.location!.lat(),
            result.geometry!.location!.lng()
          ),
          placeId: result.place_id || "",
        }));
        setDoctors(nearbyDoctors);
        
        toast({
          title: "Success",
          description: `Found ${nearbyDoctors.length} doctors near your location`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No doctors found in your area",
          variant: "destructive",
        });
      }
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return `${distance.toFixed(1)} km`;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("findDoctor") || "Find a Doctor"}</CardTitle>
            <CardDescription>
              {t("findDoctorDesc") || "Search for healthcare providers near you"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                ref={inputRef}
                type="text"
                placeholder={t("enterLocation") || "Enter your location..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePlaceSelect} disabled={loading}>
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {doctors.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <Card key={doctor.placeId} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>
                      {doctor.address}
                      <br />
                      Distance: {doctor.distance}
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FindDoctor;