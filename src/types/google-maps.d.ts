declare namespace google.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  interface LatLngBounds {
    extend(latLng: LatLng): LatLngBounds;
  }
  
  namespace places {
    class Autocomplete {
      constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
      addListener(eventName: string, handler: Function): void;
      getPlace(): PlaceResult;
    }

    interface PlaceResult {
      geometry?: PlaceGeometry;
      name?: string;
      formatted_address?: string;
      vicinity?: string;
      place_id?: string;
    }
    
    interface PlaceGeometry {
      location?: LatLng;
      viewport?: LatLngBounds;
    }

    interface AutocompleteOptions {
      types?: string[];
      componentRestrictions?: {
        country: string | string[];
      };
    }

    enum PlacesServiceStatus {
      OK = "OK",
      ZERO_RESULTS = "ZERO_RESULTS",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      INVALID_REQUEST = "INVALID_REQUEST"
    }

    class PlacesService {
      constructor(attrContainer: HTMLDivElement | Map);
      nearbySearch(
        request: PlacesSearchRequest,
        callback: (results: PlaceResult[], status: PlacesServiceStatus) => void
      ): void;
    }

    interface PlacesSearchRequest {
      location: LatLng;
      radius: number;
      type?: string;
      keyword?: string;
    }
  }
}