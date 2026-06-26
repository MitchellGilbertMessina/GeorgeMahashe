export type ProgrammingItem = {
  _id: string;
  title: string;
  slug: string;
  category: "residency" | "event" | "exhibition";

  startDate?: string;
  endDate?: string;

  featuredImage?: string;
  featuredImageCaption?: string;

  description?: any;

  venue?: string;
  location?: string;
};