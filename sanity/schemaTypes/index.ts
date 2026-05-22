import project from '../schemas/project-schema';
import about from '../schemas/about-schema';
import siteSettings from "../schemas/siteSettings";
import archiveItem from "../schemas/archiveItem";
import { exhibitionSchema } from "../schemas/exhibition-schema";


import textBlock from "../schemas/objects/textBlock";
import headingBlock from "../schemas/objects/headingBlock";
import imageBlock from "../schemas/objects/imageBlock";
import galleryBlock from "../schemas/objects/galleryBlock";
import projectReferenceBlock from "../schemas/objects/projectReferenceBlock";

export const schemaTypes = [
  project,
  about,
  siteSettings,
  archiveItem,
  exhibitionSchema,

  textBlock,
  headingBlock,
  imageBlock,
  galleryBlock,
  projectReferenceBlock,
];