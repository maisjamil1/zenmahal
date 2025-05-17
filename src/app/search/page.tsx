"use client";

import { useEffect, useState } from "react";
import SearchFilters from "@/components/features/Search/components/SearchFilters";
import SearchResults from "@/components/features/Search/components/SearchResults";
import PaginationHandler from "@/components/features/Search/components/PaginationHandler";
import SearchParamsInitializer from "@/components/features/Search/components/SearchParamsInitializer";
import MobileFilterToggle from "@/components/features/Search/components/MobileFilterToggle";
import { useSearchStore } from "@/components/features/Search/store/searchStore";

export default function SearchPage() {
  const { products, searchProducts, searchParams } = useSearchStore();
  const [totalItems, setTotalItems] = useState(0);

  // Initial search when page loads
  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  // Update total items when products change
  useEffect(() => {
    // In a real app, you might get the total count from the API
    // For now, we'll just use the products length as an approximation
    setTotalItems(products.length * 3); // Multiply by 3 to simulate more pages for testing
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Initialize search params from URL */}
      <SearchParamsInitializer />

      <h1 className="text-3xl font-bold mb-8">Search Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle - only visible on small screens */}
        <MobileFilterToggle />

        {/* Filters sidebar - hidden on small screens, visible on large screens */}
        <div className="hidden lg:block lg:w-1/4">
          <SearchFilters />
        </div>

        {/* Search results */}
        <div className="w-full lg:w-3/4">
          {/* Active filters summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Active Filters</h2>
            <div className="flex flex-wrap gap-2">
              {searchParams.title && (
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  Search: {searchParams.title}
                </div>
              )}
              {searchParams.categorySlug && (
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  Category: {searchParams.categorySlug}
                </div>
              )}
              {searchParams.price_min !== undefined &&
                searchParams.price_min > 0 && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    Min Price: ${searchParams.price_min}
                  </div>
                )}
              {searchParams.price_max !== undefined &&
                searchParams.price_max < 10000 && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    Max Price: ${searchParams.price_max}
                  </div>
                )}
            </div>
          </div>

          <SearchResults />
          <PaginationHandler totalItems={totalItems} />
        </div>
      </div>
    </div>
  );
}
