"use client";

import { useEffect } from "react";
import { useSearchStore } from "../store/searchStore";
import ProductCardAdapter from "./ProductCardAdapter";

export default function SearchResults() {
  const { products, isLoading, searchProducts } = useSearchStore();

  // Fetch products when component mounts or search params change
  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lama mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
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
