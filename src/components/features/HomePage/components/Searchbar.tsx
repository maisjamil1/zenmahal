"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { getSearchUrl } from "@/components/features/HomePage/utils";

export default function Searchbar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) router.push(getSearchUrl({ title: searchText }));
  };

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl items-center rounded-full shadow-md border border-gray-300 overflow-hidden bg-white"
      >
        <div className="pl-3">
          <Search size={20} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search for anything"
          className="flex-grow px-3 py-2 text-sm md:text-base text-gray-800 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5 transition-all duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
}
