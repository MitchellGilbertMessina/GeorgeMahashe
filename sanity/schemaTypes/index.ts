
import project from '../schemas/project-schema';
import about from '../schemas/about-schema';
import siteSettings from "../schemas/siteSettings";
import archiveItem from "../schemas/archiveItem";

import defunctContext from "../schemas/objects/defunctContext";
import defunctContextEntry from "../schemas/objects/defunctContextEntry";
import defunctProgramming from "../schemas/objects/defunctProgramming";

export const schemaTypes = [
  project,
  about,
  siteSettings,
  archiveItem,

  defunctContext,
  defunctContextEntry,
  defunctProgramming,
  
];
