"use client";

import Link from "next/link";
import { NAVIGATION_LINKS } from "@/components/layout/utils/constants";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <h1 className="text-2xl font-bold ">
              <span className={"text-blue-500"}>Zen</span>
              <span className="text-2xl font-bold text-gray-800 ">mahal</span>
            </h1>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {NAVIGATION_LINKS.map((route) => (
              <li>
                <Link
                  href={route.href}
                  className="hover:underline me-4 md:me-6"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
