"use client";

import Link from "next/link";
import AddToCartHandler from "@/components/features/ShoppingCart/components/AddToCartHandler";
import FallbackDirectImage from "./FallbackDirectImage";

interface SearchProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  mainImageUrl: string;
  hoverImageUrl?: string;
  description?: string;
}

export default function SearchProductCard({
  id,
  slug,
  name,
  price,
  mainImageUrl = "/product-placeholder.png",
  hoverImageUrl,
  description,
}: SearchProductCardProps) {
  return (
    <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
      <Link href={`/products/${id}`} className={"block min-h-[450px]"}>
        <div className="relative w-full h-80">
          <FallbackDirectImage
            src={mainImageUrl}
            fallbackSrc="/product-placeholder.png"
            alt={name}
            className="absolute object-cover rounded-md w-full h-full z-10 hover:opacity-0 transition-opacity ease duration-500"
          />
          {hoverImageUrl && (
            <FallbackDirectImage
              src={hoverImageUrl}
              fallbackSrc="/product-placeholder.png"
              alt={name}
              className="absolute object-cover rounded-md w-full h-full"
            />
          )}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium">{name}</span>
        </div>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </Link>
        <div className="block font-semibold text-sm">Price : ${price}</div>

      <AddToCartHandler
        data={{
          id,
          slug,
          name,
          price,
          mainImageUrl,
          hoverImageUrl,
          description,
        }}
        TriggerBtn={({ onClick }) => (
          <button
            onClick={onClick}
            className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-purple-600 hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        )}
      />
    </div>
  );
}
