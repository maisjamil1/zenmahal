"use client";

import Link from "next/link";
import Image from "next/image";
import AddToCartHandler from "@/components/features/ShoppingCart/components/AddToCartHandler";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  mainImageUrl: string;
  hoverImageUrl?: string;
  description?: string;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  mainImageUrl = "/product.png",
  hoverImageUrl,
  description,
}: ProductCardProps) {
  return (
    <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
      <Link href={`/${slug}`}>
        <div className="relative w-full h-80">
          <Image
            src={mainImageUrl}
            alt={name}
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
          />
          {hoverImageUrl && (
            <Image
              src={hoverImageUrl}
              alt={name}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium">{name}</span>
          <span className="font-semibold">${price}</span>
        </div>
        {description && (
          <div className="text-sm text-gray-500">{description}</div>
        )}
      </Link>

      <AddToCartHandler
        data={{
          id,
          slug,
          name,
          price,
          mainImageUrl,
          hoverImageUrl,
          description
        }}
        TriggerBtn={({ onClick }) => (
          <button
            onClick={onClick}
            className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        )}
      />
    </div>
  );
}
