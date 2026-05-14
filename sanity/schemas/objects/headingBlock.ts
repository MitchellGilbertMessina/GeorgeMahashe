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
  preview: {

  select: {
    heading: "heading",
  },

  prepare({
    heading,
  }: {
    heading?: string;
  }) {

    return {

      title:
        `Heading Block`,

      subtitle:
        heading
          ? heading
          : "Untitled Heading",
    };
  },
},
});