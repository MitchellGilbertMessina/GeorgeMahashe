import type { PortableTextBlock } from "@portabletext/types";

export type ResidencyType =
  | "convened"
  | "visiting"
  | "pavilion";

export type ProgrammingCategory =
  | "residency"
  | "event"
  | "exhibition";

export type ProgrammingImage = {
  url: string;
  caption?: string;
};

export type ProgrammingLink = {
  label?: string;
  url: string;
  type?: string;
};

export type ProgrammingItem = {
  _id: string;
  title: string;
  slug: string;

  category: ProgrammingCategory;

  residencyType?: ResidencyType;
  subtitle?: string;

  venue?: string;

  startDate?: string;
  endDate?: string;

  featuredImage?: string;
  featuredImageCaption?: string;

  description?: PortableTextBlock[];
  additionalText?: PortableTextBlock[];

  galleryImages?: {
    url: string;
    caption?: string;
  }[];

  externalLinks?: ProgrammingLink[];
};