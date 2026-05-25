import type { SanityImageSource } from "./sanity";

export type PageBuilderBlock =
  | {
      _type: "textBlock";
      content: any[];
    }

  | {
      _type: "headingBlock";
      heading: string;
    }

  | {
      _type: "imageBlock";
      image: {
        asset: {
          url: string;
        };
      };
      caption?: string;
    }

  | {
      _type: "galleryBlock";
      images: {
        asset: {
          url: string;
        };
      }[];
    };

export type Project = {
  _id: string;
  _createdAt: string;

  title: string;
  slug: string;

  author?: string;

  heroImage?: string;

  alt?: string;

  shortDescription?: string;

  projectType?: string;

  orderRank?: number;

  parentProject?: {
    _id: string;
    title: string;
    slug: string;
  };

  pageBuilder?: PageBuilderBlock[];
};

export type ArchiveItem = {
  _id: string;

  title?: string;

  description?: string;

  mediaType?: "image" | "video" | "audio" | "pdf";

  image?: SanityImageSource;

  imageCaption?: string;

  videoUrl?: string;

  audioUrl?: string;

  pdfUrl?: string;

  tags?: string[];

  featured?: boolean;

  date?: string;

  x: number;
  y: number;
  width: number;
  rotation?: number;
};