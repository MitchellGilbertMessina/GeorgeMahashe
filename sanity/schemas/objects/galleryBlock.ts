import { defineType } from "sanity";

export default defineType({
  name: "galleryBlock",
  title: "Gallery Block",
  type: "object",

  fields: [
    {
      name: "images",
      title: "Images",
      type: "array",

      of: [{ type: "image" }],
    },
  ],
});