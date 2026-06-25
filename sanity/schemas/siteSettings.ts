import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Site Settings"
    }),

    defineField({
      name: "publishingIntro",
      title: "Publishing Intro Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});