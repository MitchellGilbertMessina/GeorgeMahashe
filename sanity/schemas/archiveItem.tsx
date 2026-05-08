import { defineField, defineType } from "sanity";

export default defineType({
  name: "archiveItem",
  title: "Archive Item",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // Initial positioning
    defineField({
      name: "x",
      title: "Initial X Position",
      type: "number",
    }),

    defineField({
      name: "y",
      title: "Initial Y Position",
      type: "number",
    }),

    defineField({
      name: "width",
      title: "Width",
      type: "number",
    }),
  ],
});