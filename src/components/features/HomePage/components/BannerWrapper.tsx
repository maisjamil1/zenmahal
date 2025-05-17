"use client";
import dynamic from "next/dynamic";
import {
  banner4,
  banner5,
  banner6,
} from "@/components/features/HomePage/assets";
import Container from "@/components/ui/Container";

const BannersSlider = dynamic(
  () => import("@/components/shared/Gallery/Banners"),
  { ssr: false },
);
const BannerWrapper = () => {
  const bannerImages = [
    { original: banner6.src, thumbnail: banner6.src },
    { original: banner4.src, thumbnail: banner4.src },
    { original: banner5.src, thumbnail: banner5.src },
  ];

  return (
    <Container>
      <div className="w-full mx-auto overflow-hidden h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
        <div className="w-full h-full">
          <BannersSlider
            images={bannerImages}
            showNav={false}
            showThumbnails={false}
          />
        </div>
      </div>
    </Container>
  );
};

export default BannerWrapper;
