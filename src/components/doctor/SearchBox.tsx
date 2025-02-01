import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBox = ({ onSearch, isLoading }: SearchBoxProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('location') as string;
    if (query) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        name="location"
        placeholder="Enter your location..."
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        <Search className="w-4 h-4 mr-2" />
        {isLoading ? "Searching..." : "Find Doctors"}
      </Button>
    </form>
  );
};