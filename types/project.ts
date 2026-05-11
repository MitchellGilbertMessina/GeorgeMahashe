import { PortableTextBlock } from "next-sanity";

export type DefunctContextEntry = {
  title: string;
  slug?: string;
  description?: string;
  content?: any[];
  images?: {
    asset: {
      url: string;
    };
  }[];
};

export type Project = {
  _id: string;
  _createdAt: string;
  title: string;
  author?: string;
  slug: string;
  frontcover?: string;
  alt?: string;
  content?: any[];

  defunctContextData?: {
    research?: DefunctContextEntry[];

    programming?: {
      commissioned?: DefunctContextEntry[];
      facilitated?: DefunctContextEntry[];
    };

    publishing?: DefunctContextEntry[];
  };
};