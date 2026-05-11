import { defineType } from "sanity";

export default defineType({
  name: "textBlock",
  title: "Text Block",
  type: "object",

  fields: [
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});