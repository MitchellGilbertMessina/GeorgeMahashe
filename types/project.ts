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