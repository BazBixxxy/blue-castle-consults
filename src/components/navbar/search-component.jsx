import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-fill from URL if already exists
  const [value, setValue] = useState(searchParams.get("searchTerm") || "");

  // Centralized search function
  const performSearch = () => {
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) {
      params.set("searchTerm", value.trim());
    } else {
      params.delete("searchTerm");
    }
    if (
      pathname === "/products" ||
      pathname === "/chat" ||
      pathname.startsWith("/products/owner")
    ) {
      navigate(`?${params.toString()}`);
    } else {
      navigate(`/products?${params.toString()}`);
    }
  };

  // Handle search on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  // Clear button handler
  const handleClear = (e) => {
    e.stopPropagation(); // Prevent any parent click events
    setValue("");
    const params = new URLSearchParams(window.location.search);
    params.delete("searchTerm");
    navigate(`?${params.toString()}`);
  };

  // Search icon click handler
  const handleSearchClick = () => {
    performSearch();
  };

  return (
    <div className="relative w-full max-w-[300px]">
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10"
      />

      {/* Search Icon */}
      <button
        onClick={handleSearchClick}
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted transition-colors cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Search"
      >
        <Search className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      )}
    </div>
  );
}
