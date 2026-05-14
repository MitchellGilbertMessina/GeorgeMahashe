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
  preview: {

    select: {
      images: "images",
    },

    prepare({
      images,
    }: {
      images?: any[];
    }) {

      const count =
        images?.length || 0;

      return {

        title:
          "Gallery Block",

        subtitle:
          `${count} image${count === 1 ? "" : "s"
          }`,
      };
    },
  },
});