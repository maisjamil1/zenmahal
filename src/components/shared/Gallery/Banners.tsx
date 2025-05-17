"use client";

import React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type BannersSliderProps = {
  images: ReactImageGalleryItem[];
  height?: string | number;
  autoPlay?: boolean;
  showNav?: boolean;
  showThumbnails?: boolean;
  showPlayButton?: boolean;
  showFullscreenButton?: boolean;
  slideInterval?: number;
};

const BannersSlider: React.FC<BannersSliderProps> = ({
  images,
  height,
  autoPlay = true,
  showNav = false,
  showThumbnails = false,
  showPlayButton = false,
  showFullscreenButton = false,
  slideInterval = 3000,
}) => {
  const galleryWrapperStyle = {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  };

  const renderItem = (item: ReactImageGalleryItem) => {
    return (
      <div className="image-gallery-image">
        <img
          src={item.original}
          alt={item.originalAlt || ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#f8f8f8",
          }}
        />
      </div>
    );
  };

  return (
    <div style={galleryWrapperStyle}>
      <ImageGallery
        items={images}
        autoPlay={autoPlay}
        showNav={showNav}
        showThumbnails={showThumbnails}
        showPlayButton={showPlayButton}
        showFullscreenButton={showFullscreenButton}
        slideInterval={slideInterval}
        renderItem={renderItem}
      />
    </div>
  );
};

export default BannersSlider;
