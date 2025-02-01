declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions);
    }

    class Marker {
      constructor(options: MarkerOptions);
    }

    class Geocoder {
      constructor();
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    class PlacesService {
      constructor(attrContainer: HTMLDivElement | Map);
      nearbySearch(request: PlacesSearchRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus, pagination: PlaceSearchPagination) => void): void;
    }

    class Autocomplete {
      constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
      addListener(eventName: string, handler: Function): void;
      getPlace(): PlaceResult;
    }

    interface MapOptions {
      center: LatLng | LatLngLiteral;
      zoom: number;
      [key: string]: any;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      [key: string]: any;
    }

    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface PlaceResult {
      geometry?: {
        location: LatLng;
      };
      name?: string;
      vicinity?: string;
      place_id?: string;
    }

    interface PlacesSearchRequest {
      location: LatLng | LatLngLiteral;
      radius: number;
      type?: string;
      keyword?: string;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
      placeId?: string;
      [key: string]: any;
    }

    interface GeocoderResult {
      geometry: {
        location: LatLng;
      };
    }

    interface PlaceSearchPagination {
      hasNextPage: boolean;
      nextPage(): void;
    }

    interface AutocompleteOptions {
      types?: string[];
      componentRestrictions?: {
        country: string | string[];
      };
    }

    enum PlacesServiceStatus {
      OK,
      ZERO_RESULTS,
      OVER_QUERY_LIMIT,
      REQUEST_DENIED,
      INVALID_REQUEST,
    }

    enum GeocoderStatus {
      OK,
      ZERO_RESULTS,
      OVER_QUERY_LIMIT,
      REQUEST_DENIED,
      INVALID_REQUEST,
    }
  }
}