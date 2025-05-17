"use client";

import { useEffect } from "react";
import { useSearchStore } from "../store/searchStore";
import ProductCardAdapter from "./ProductCardAdapter";
import SearchProductCardSkeleton from "./SearchProductCardSkeleton";

export default function SearchResults() {
  const { products, isLoading, searchProducts } = useSearchStore();

  // Fetch products when component mounts or search params change
  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  if (isLoading) {
    return (
      <>
        <div className="mb-6 flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-1/5 animate-pulse"></div>
        </div>
        
        <div className="flex flex-wrap gap-6">
          {/* Generate 8 skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SearchProductCardSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-gray-700">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        <button 
          onClick={() => useSearchStore.getState().resetFilters()} 
          className="mt-4 px-4 py-2 bg-lama text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div className="text-gray-600">
          <span className="font-medium">{products.length}</span> products found
        </div>
        <div className="text-sm text-gray-500">
          Showing page {useSearchStore.getState().currentPage}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCardAdapter key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
