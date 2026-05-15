import { defineType } from "sanity";
import { MultiImageUpload } from "../../../components/MultiImageUpload";

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
      components: {
        input: MultiImageUpload, // 👈 plug in here
      },
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