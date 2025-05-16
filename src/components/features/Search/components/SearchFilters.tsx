"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "../store/searchStore";
import { Button } from "@/components/ui/button";

export default function SearchFilters() {
  const {
    categories,
    minPrice,
    maxPrice,
    searchParams,
    setSearchTerm,
    setCategory,
    setPriceRange,
    resetFilters,
    fetchCategories,
  } = useSearchStore();

  const [searchTerm, setLocalSearchTerm] = useState(searchParams.title || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.categorySlug || "",
  );
  const [priceRange, setLocalPriceRange] = useState({
    min: searchParams.price_min || 0,
    max: searchParams.price_max || 10000,
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Sync local state with search params when they change (e.g., from URL)
  useEffect(() => {
    setLocalSearchTerm(searchParams.title || "");
    setSelectedCategory(searchParams.categorySlug || "");
    setLocalPriceRange({
      min: searchParams.price_min || 0,
      max: searchParams.price_max || 10000,
    });
  }, [searchParams]);

  // Handle search term input
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  // Handle search term submission
  const handleSearchSubmit = () => {
    setSearchTerm(searchTerm);
    // Trigger search immediately when search term is submitted
    setTimeout(() => {
      useSearchStore.getState().searchProducts();
    }, 0);
  };

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    setCategory(categorySlug);
    // Trigger search immediately when category changes
    setTimeout(() => {
      useSearchStore.getState().searchProducts();
    }, 0);
  };

  // Handle price range changes
  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value) || 0;
    setLocalPriceRange((prev) => ({ ...prev, min }));
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value) || 10000;
    setLocalPriceRange((prev) => ({ ...prev, max }));
  };

  // Apply price range filter
  const handlePriceRangeApply = () => {
    setPriceRange(priceRange.min, priceRange.max);
    // Trigger search immediately when price range is applied
    setTimeout(() => {
      useSearchStore.getState().searchProducts();
    }, 0);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setLocalSearchTerm("");
    setSelectedCategory("");
    setLocalPriceRange({ min: 0, max: 10000 });
    resetFilters();
    // Trigger search immediately when filters are reset
    setTimeout(() => {
      useSearchStore.getState().searchProducts();
    }, 0);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Search Term */}
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search
        </label>
        <div className="flex">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search products..."
            className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lama"
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          />
          <Button
            onClick={handleSearchSubmit}
            className="bg-blue-400 px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lama"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={handlePriceMinChange}
            min="0"
            placeholder="Min"
            className="w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lama"
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={handlePriceMaxChange}
            min="0"
            placeholder="Max"
            className="w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lama"
          />
        </div>
        <button
          onClick={handlePriceRangeApply}
          className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          Apply Price Range
        </button>
      </div>

      {/* Reset Filters */}
      <button
        onClick={handleResetFilters}
        className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
}
