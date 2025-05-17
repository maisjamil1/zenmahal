"use client";

import { useEffect, useState } from "react";
import { Category } from "@/lib/api/types";
import { categoryService } from "@/lib/api/categoryService";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))
          : categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
        }
      </div>
    </section>
  );
}
