"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchStore } from "../store/searchStore";

export default function SearchFilters() {
  const {
    categories,
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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setLocalSearchTerm(searchParams.title || "");
    setSelectedCategory(searchParams.categorySlug || "");
    setLocalPriceRange({
      min: searchParams.price_min || 0,
      max: searchParams.price_max || 10000,
    });
  }, [searchParams]);

  // Type-safe debounce function that works with any function signature
  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      useSearchStore.getState().searchProducts();
    }, 500),
    [setSearchTerm],
  );

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setLocalSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    setCategory(categorySlug);
    setTimeout(() => {
      useSearchStore.getState().searchProducts();
    }, 0);
  };

  const debouncedPriceRange = useCallback(
    debounce((min: number, max: number) => {
      setPriceRange(min, max);
      useSearchStore.getState().searchProducts();
    }, 500),
    [setPriceRange],
  );

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value) || 0;
    setLocalPriceRange((prev) => {
      const newRange = { ...prev, min };
      debouncedPriceRange(newRange.min, newRange.max);
      return newRange;
    });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value) || 10000;
    setLocalPriceRange((prev) => {
      const newRange = { ...prev, max };
      debouncedPriceRange(newRange.min, newRange.max);
      return newRange;
    });
  };

  const handleResetFilters = () => {
    setLocalSearchTerm("");
    setSelectedCategory("");
    setLocalPriceRange({ min: 0, max: 10000 });
    resetFilters();
    setTimeout(() => {
      useSearchStore.getState().searchProducts();
    }, 0);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

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
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lama"
          />
        </div>
      </div>

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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <div className="flex items-center space-x-2">
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
      </div>

      <button
        onClick={handleResetFilters}
        className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
}
