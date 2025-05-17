"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-lama text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </Container>
  );
}
