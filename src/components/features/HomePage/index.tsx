"use client";
import { useState, useEffect } from "react";
import Searchbar from "@/components/features/HomePage/Searchbar";
import dynamic from "next/dynamic";
import BannerSkeleton from "./components/BannerSkeleton";
import {
  banner4,
  banner5,
  banner6,
} from "@/components/features/HomePage/assets";
import Offers from "@/components/features/HomePage/components/Offers";
import Categories from "@/components/features/HomePage/components/Categories";
import Container from "@/components/ui/Container";

const BannersSlider = dynamic(
  () => import("@/components/shared/Gallery/Banners"),
  { ssr: false },
);

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const bannerImages = [
    { original: banner6.src, thumbnail: banner6.src },
    { original: banner4.src, thumbnail: banner4.src },
    { original: banner5.src, thumbnail: banner5.src },
  ];

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Searchbar />
      <Container>
        <div className="w-full mx-auto overflow-hidden h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
          {!isMounted || isLoading ? (
            <BannerSkeleton />
          ) : (
            <div className="w-full h-full">
              <BannersSlider
                images={bannerImages}
                showNav={false}
                showThumbnails={false}
              />
            </div>
          )}
        </div>
        <Offers />
        <Categories />
      </Container>
    </>
  );
};

export default HomePage;
