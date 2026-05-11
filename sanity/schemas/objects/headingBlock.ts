import { defineType } from "sanity";

export default defineType({
  name: "headingBlock",
  title: "Heading Block",
  type: "object",

  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
  ],
});