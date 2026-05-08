import { defineField, defineType } from "sanity";

export default defineType({
  name: "archiveItem",
  title: "Archive Item",
  type: "document",

  fields: [
    defineField({
      name: "title",
      type: "string",
    }),

    defineField({
      name: "description",
      type: "text",
    }),

    defineField({
      name: "image",
      type: "image",
    }),

    defineField({
      name: "x",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "y",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "width",
      type: "number",
      initialValue: 320,
    }),

    defineField({
      name: "rotation",
      type: "number",
      initialValue: 0,
    }),
  ],
});