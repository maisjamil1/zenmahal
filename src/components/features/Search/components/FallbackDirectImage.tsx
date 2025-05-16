'use client';

import { useState } from 'react';

type FallbackDirectImageProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

export default function FallbackDirectImage({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '' 
}: FallbackDirectImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
