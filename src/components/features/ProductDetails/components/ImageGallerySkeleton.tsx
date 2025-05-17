"use client";

export default function ImageGallerySkeleton() {
  return (
    <div className="w-full">
      {/* Main Image Skeleton */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-200 rounded-lg animate-pulse mb-4"></div>
      
      {/* Thumbnails Skeleton */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="w-20 h-20 flex-shrink-0 rounded-md bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
