"use client";

export default function CategoryCardSkeleton() {
  return (
    <div className="block overflow-hidden rounded-lg shadow-md animate-pulse">
      <div className="relative h-40 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
