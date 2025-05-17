"use client";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
}
