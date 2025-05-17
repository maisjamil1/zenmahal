"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "@/styles/gallery.css";

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
    })
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
        <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
      )}


    </div>
  );
}
