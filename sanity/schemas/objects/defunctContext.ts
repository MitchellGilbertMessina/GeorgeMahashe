// schemas/objects/defunctContext.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "defunctContext",
  title: "Defunct Context",
  type: "object",

  fields: [
    defineField({
      name: "research",
      title: "Research",
      type: "array",
      of: [{ type: "defunctContextEntry" }],
    }),

    defineField({
      name: "programming",
      title: "Programming",
      type: "defunctProgramming",
    }),

    defineField({
      name: "publishing",
      title: "Publishing",
      type: "array",
      of: [{ type: "defunctContextEntry" }],
    }),
  ],
});