import { Metadata } from "next";

type SEOJson = {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};
export function getMetadataFromJson(data: SEOJson): Metadata {
  return {
    title: {
      default: data.title,
      template: "%s | Zen Mahal",
    },
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.openGraph.title,
      description: data.openGraph.description,
      images: [
        {
          url: data.openGraph.image,
          width: 1200,
          height: 630,
          alt: "Zen Mahal Storefront",
        },
      ],
    },
    twitter: {
      card: data.twitter.card as
        | "summary"
        | "summary_large_image"
        | "app"
        | "player",
      title: data.twitter.title,
      description: data.twitter.description,
      images: [data.twitter.image],
    },
  };
}
