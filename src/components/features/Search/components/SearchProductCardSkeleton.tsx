"use client";

export default function SearchProductCardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-80 bg-gray-200 rounded-md"></div>
      
      {/* Title and price skeleton */}
      <div className="flex justify-between mt-2">
        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
      
      {/* Description skeleton */}
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      
      {/* Button skeleton */}
      <div className="h-8 bg-gray-200 rounded-2xl w-1/3 mt-2"></div>
    </div>
  );
}
