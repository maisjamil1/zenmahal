"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import SearchFilters from "./SearchFilters";

export default function MobileFilterToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleFilters}
        className="flex items-center gap-2 bg-lama text-white px-4 py-2 rounded-md mb-4 w-full justify-center"
      >
        {isOpen ? (
          <>
            <X size={18} /> Close Filters
          </>
        ) : (
          <>
            <SlidersHorizontal size={18} /> Show Filters
          </>
        )}
      </button>

      {isOpen && (
        <div className="mb-6">
          <SearchFilters />
        </div>
      )}
    </div>
  );
}
