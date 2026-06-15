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

  galleryImages?: {
    url: string;
    caption?: string;
  }[];

  relatedProjects?: {
    _id: string;
    title: string;
    slug: string;
    heroImage?: string;
  }[];
};