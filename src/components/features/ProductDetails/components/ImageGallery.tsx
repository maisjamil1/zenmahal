"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "@/styles/gallery.css";
import ImageGallerySkeleton from "@/components/features/ProductDetails/components/ImageGallerySkeleton";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [isMounted, setIsMounted] = useState(false);

  const galleryImages =
    images.length > 0 ? images : ["/product-placeholder.png"];

  const formattedImages: ReactImageGalleryItem[] = galleryImages.map(
    (image, index) => ({
      original: image,
      thumbnail: image,
      originalAlt: `${productName} - Image ${index + 1}`,
      thumbnailAlt: `${productName} - Thumbnail ${index + 1}`,
      originalOnError: (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "/product-placeholder.png";
      },
      thumbnailOnError: (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "/product-placeholder.png";
      },
    }),
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderItem = (item: ReactImageGalleryItem) => {
    return (
      <div
        className="image-gallery-image"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={item.original}
          alt={item.originalAlt || ""}
          onError={(e) => {
            e.currentTarget.src = "/product-placeholder.png";
          }}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            margin: "auto",
          }}
        />
      </div>
    );
  };

  const renderThumbInner = (item: ReactImageGalleryItem) => {
    return (
      <img
        src={item.thumbnail}
        alt={item.thumbnailAlt || ""}
        onError={(e) => {
          e.currentTarget.src = "/product-placeholder.png";
        }}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    );
  };

  const galleryProps = {
    items: formattedImages,
    showPlayButton: false,
    showFullscreenButton: true,
    renderItem: renderItem,
    renderThumbInner: renderThumbInner,
    useBrowserFullscreen: false,
    showNav: galleryImages.length > 1,
    showThumbnails: galleryImages.length > 1,
    thumbnailPosition: "bottom" as "bottom" | "left" | "right" | "top",
  };

  return (
    <div className="w-full product-gallery">
      {isMounted ? (
        <ImageGallery {...galleryProps} />
      ) : (
        <ImageGallerySkeleton />
      )}
    </div>
  );
}
