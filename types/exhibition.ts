import type { PortableTextBlock } from "@portabletext/types";

export type Exhibition = {
  _id: string;
  title: string;
  slug: string;

  venue?: string;
  address?: string;

  startDate: string;
  endDate: string;

  featuredImage?: string;
  featuredImageCaption?: string;

  description?: PortableTextBlock[];
  additionalText?: PortableTextBlock[];

  galleryImages?: {
    url: string;
    caption?: string;
  }[];

  externalLinks?: {
    label?: string;
    url: string;
  }[];

  relatedProjects?: {
    _id: string;
    title: string;
    slug: string;
    heroImage?: string;
    shortDescription?: string;
  }[];
};