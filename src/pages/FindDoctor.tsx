import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Simple interface for doctor data
interface Doctor {
  name: string;
  address: string;
  distance: string;
  placeId: string;
}

function FindDoctor() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Refs and hooks
  const searchInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  // Load Google Maps script
  useEffect(() => {
    // Create and add script to document
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_API_KEY'}&libraries=places&language=id`;
    script.async = true;
    script.defer = true;
    
    // Initialize autocomplete when script loads
    script.onload = () => {
      if (!searchInputRef.current) return;
      
      autocompleteRef.current = new google.maps.places.Autocomplete(searchInputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "id" },
      });

      // Listen for place selection
      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Handle place selection
  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    
    // Validate place selection
    if (!place.geometry) {
      toast({
        title: "Error",
        description: "Please select a location from the dropdown",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Search for nearby doctors
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    
    const searchRequest = {
      location: place.geometry.location,
      radius: 5000, // 5km radius
      type: "doctor",
      keyword: "dokter",
    };

    // Perform the search
    service.nearbySearch(searchRequest, (results, status) => {
      setLoading(false);

      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        // Format doctor results
        const nearbyDoctors = results.map((result) => ({
          name: result.name || "Unknown",
          address: result.vicinity || "No address available",
          distance: calculateDistance(
            place.geometry.location.lat(),
            place.geometry.location.lng(),
            result.geometry.location.lat(),
            result.geometry.location.lng()
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

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return `${distance.toFixed(1)} km`;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // JSX - Main component render
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("findDoctor")}</CardTitle>
            <CardDescription>{t("findDoctorDesc")}</CardDescription>
          </CardHeader>
          
          {/* Search Input */}
          <div className="p-6">
            <div className="flex gap-4">
              <Input
                ref={searchInputRef}
                type="text"
                placeholder={t("enterLocation")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePlaceSelect} disabled={loading}>
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Doctor Results */}
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
}

export default FindDoctor;