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
  preview: {

    select: {
      content: "content",
    },

    prepare({
      content,
    }: {
      content?: any[];
    }) {

      const firstBlock =
        content?.find(
          (block) =>
            block._type === "block"
        );

      const text =
        firstBlock?.children
          ?.map((child: any) => child.text)
          .join("");

      return {

        title:
          "Text Block",

        subtitle:
          text
            ? text.slice(0, 80) + "..."
            : "Empty Text Block",
      };
    },
  },
});