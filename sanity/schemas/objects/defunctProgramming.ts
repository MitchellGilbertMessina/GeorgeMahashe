// schemas/objects/defunctProgramming.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "defunctProgramming",
  title: "Programming",
  type: "object",

  fields: [
    defineField({
      name: "commissioned",
      title: "Commissioned Programming",
      type: "array",
      of: [{ type: "defunctContextEntry" }],
    }),

    defineField({
      name: "facilitated",
      title: "Facilitated Programming",
      type: "array",
      of: [{ type: "defunctContextEntry" }],
    }),
  ],
});