
import project from '../schemas/project-schema';
import about from '../schemas/about-schema';
import siteSettings from "../schemas/siteSettings";
import archiveItem from "../schemas/archiveItem";

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

  textBlock,
  headingBlock,
  imageBlock,
  galleryBlock,
  projectReferenceBlock,


];
