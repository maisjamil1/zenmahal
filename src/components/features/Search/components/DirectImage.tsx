"use client";

interface DirectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DirectImage({ src, alt, className = "" }: DirectImageProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
    />
  );
}
