"use client";

import SearchProductCard from "./SearchProductCard";
import { Product } from "@/lib/api/types";

interface ProductCardAdapterProps {
  product: Product;
}

export default function ProductCardAdapter({ product }: ProductCardAdapterProps) {
  // Map API product to SearchProductCard props
  console.log({product})
  const productCardProps = {
    id: product.id.toString(),
    slug: product.slug,
    name: product.title,
    price: product.price,
    // Use the first image as main image, will fallback to placeholder if it fails to load
    mainImageUrl: product.images && product.images.length > 0 ? (product?.images?.[0] ||  product?.images?.[1]) : "",
    // Use the second image as hover image if available
    hoverImageUrl: product.images && product.images.length > 0 ?  (product?.images?.[1] || product?.images?.[0]) : "",
    description: product.description ? 
      (product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '')) : 
      'No description available'
  };

  return <SearchProductCard {...productCardProps} />;
}
