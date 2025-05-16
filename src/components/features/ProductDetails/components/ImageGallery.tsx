"use client";

import { useState } from "react";
import FallbackDirectImage from "@/components/features/Search/components/FallbackDirectImage";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Use a default image if no images are provided
  const galleryImages = images.length > 0 ? images : ["/product-placeholder.png"];
  const selectedImage = galleryImages[selectedImageIndex];

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <FallbackDirectImage
          src={selectedImage}
          fallbackSrc="/product-placeholder.png"
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImageIndex === index ? 'border-lama' : 'border-transparent'}`}
            >
              <FallbackDirectImage
                src={image}
                fallbackSrc="/product-placeholder.png"
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
