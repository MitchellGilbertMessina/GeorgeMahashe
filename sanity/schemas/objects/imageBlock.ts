import { defineType } from "sanity";

export default defineType({
  name: "imageBlock",
  title: "Image Block",
  type: "object",

  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },

    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
});