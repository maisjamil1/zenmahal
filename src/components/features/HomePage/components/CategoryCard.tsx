"use client";
import Link from "next/link";
import { Category } from "@/lib/api/types";
import FallbackDirectImage from "@/components/features/Search/components/FallbackDirectImage";
import { getSearchUrl } from "@/components/features/HomePage/utils";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const href = getSearchUrl({ categorySlug: category.slug });

  return (
    <Link
      href={href}
      className="block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <FallbackDirectImage
          src={category.image}
          fallbackSrc="/product-placeholder.png"
          alt={category.name}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg">
              {category.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
