"use client";

export default function ProductInfoSkeleton() {
  return (
    <div className="w-full">
      {/* Category Skeleton */}
      <div className="mb-2">
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Title Skeleton */}
      <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>

      {/* Price Skeleton */}
      <div className="h-7 w-20 bg-gray-200 animate-pulse rounded mb-4"></div>

      {/* Description Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Add to Cart Button Skeleton */}
      <div className="mb-6">
        <div className="h-12 w-36 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Product Details Skeleton */}
      <div className="border-t border-gray-200 pt-6">
        <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
