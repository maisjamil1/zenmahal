"use client";

import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

type Crumb = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 w-full overflow-x-auto">
      <ol className="flex items-center space-x-1 md:space-x-3 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center truncate max-w-xs">
              {index !== 0 && (
                <ChevronRight size={16} className="text-gray-400 mx-1" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-lama truncate"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-500 truncate">{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
