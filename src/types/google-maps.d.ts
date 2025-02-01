declare namespace google.maps {
  interface LatLngBounds {
    extend(latLng: LatLng): LatLngBounds;
  }
  
  namespace places {
    interface PlaceResult {
      geometry?: places.PlaceGeometry;
      name?: string;
      formatted_address?: string;
    }
    
    interface PlaceGeometry {
      location?: LatLng;
      viewport?: LatLngBounds;
    }
  }
}