import type { PortableTextBlock } from "@portabletext/types";

export type PublicationGalleryImage = {
  url: string;
  caption?: string;
};

export type PublicationExternalLink = {
  label?: string;
  url: string;
};

export type Publication = {
  _id: string;
  title: string;
  slug: string;

  featuredImage?: string;
  featuredImageCaption?: string;

  description?: PortableTextBlock[];
  additionalText?: PortableTextBlock[];

  galleryImages?: PublicationGalleryImage[];

  externalLinks?: PublicationExternalLink[];

  contributors?: string[];
  publisher?: string;
  editor?: string;
  funders?: string[];
  editions?: string;
  availability?: string;

  publicationDate?: string;
};