import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import "../styles/FindDoctor.css";

// Simple interface for doctor data
interface Doctor {
  name: string;
  address: string;
  distance: string;
  placeId: string;
}

// Define missing Google Maps types
interface PlaceResult extends google.maps.places.PlaceResult {
  geometry?: google.maps.places.PlaceGeometry;
  vicinity?: string;
}

function FindDoctor() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  
  // Refs for Google Maps
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { toast } = useToast();

  // Load Google Maps script
  useEffect(() => {
    // Create API key input if not set
    if (!apiKey) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=id`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (!searchInputRef.current) return;
      
      autocompleteRef.current = new google.maps.places.Autocomplete(searchInputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "id" },
      });

      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  // Handle place selection
  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace() as PlaceResult;
    
    if (!place.geometry) {
      toast({
        title: "Error",
        description: "Please select a location from the dropdown",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    searchNearbyDoctors(place);
  };

  // Search for nearby doctors
  const searchNearbyDoctors = (place: PlaceResult) => {
    if (!place.geometry?.location) return;

    const service = new google.maps.places.PlacesService(document.createElement("div"));
    
    const searchRequest = {
      location: place.geometry.location,
      radius: 5000,
      type: "doctor",
      keyword: "dokter",
    };

    service.nearbySearch(searchRequest, (results, status) => {
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

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371;
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

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="find-doctor">
      <Navbar />
      <main className="container">
        {!apiKey ? (
          <div className="api-key-input">
            <h2>Enter Google Maps API Key</h2>
            <input
              type="text"
              placeholder="Enter your Google Maps API Key"
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <p className="text-sm text-gray-500 mt-2">
              You need to provide a Google Maps API key to use this feature.
              Get one from the Google Cloud Console.
            </p>
          </div>
        ) : (
          <>
            <div className="search-card">
              <h1>Find a Doctor</h1>
              <div className="search-input">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Enter your location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="search-button"
                  onClick={handlePlaceSelect}
                  disabled={loading}
                >
                  <Search className="w-4 h-4" />
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {doctors.length > 0 && (
              <div className="doctor-grid">
                {doctors.map((doctor) => (
                  <div key={doctor.placeId} className="doctor-card">
                    <h2 className="doctor-name">{doctor.name}</h2>
                    <div className="doctor-address">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {doctor.address}
                        <br />
                        <span className="doctor-distance">Distance: {doctor.distance}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default FindDoctor;