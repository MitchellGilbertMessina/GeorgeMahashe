import { defineField, defineType } from "sanity";

export default defineType({
  name: "archiveItem",
  title: "Archive Item",
  type: "document",

  fields: [

    // =================================================
    // TITLE
    // =================================================

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    // =================================================
    // DESCRIPTION
    // =================================================

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    // =================================================
    // MEDIA TYPE
    // =================================================

    defineField({
      name: "mediaType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
          { title: "Audio", value: "audio" },
          { title: "PDF", value: "pdf" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),

    // IMAGE ONLY
    defineField({
      name: "image",
      type: "image",
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),

    // VIDEO ONLY
    defineField({
      name: "video",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      options: { accept: "video/*" },
    }),

    // AUDIO ONLY
    defineField({
      name: "audio",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "audio",
      options: { accept: "audio/*" },
    }),

    // PDF ONLY
    defineField({
      name: "pdf",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "pdf",
      options: { accept: ".pdf" },
    }),


    // =================================================
    // TAGS
    // =================================================

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",

      of: [{ type: "string" }],

      options: {
        layout: "tags",
      },
    }),

    // =================================================
    // FEATURED
    // =================================================

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",

      initialValue: false,
    }),

    // =================================================
    // DATE
    // =================================================

    defineField({
      name: "date",
      title: "Date",
      type: "datetime",

      initialValue: () => new Date().toISOString(),
    }),

    // =================================================
    // LAYOUT SETTINGS
    // =================================================

    defineField({
      name: "x",
      title: "X Position",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "y",
      title: "Y Position",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "width",
      title: "Width",
      type: "number",
      initialValue: 320,
    }),

    defineField({
      name: "rotation",
      title: "Rotation",
      type: "number",
      initialValue: 0,
    }),

    // =================================================
    // SITE SETTINGS - GEORGE / DEFUNCT / BOTH
    // =================================================
    defineField({
      name: "site",
      title: "Site",
      type: "string",
      options: {
        list: [
          { title: "George Mahashe", value: "george" },
          { title: "Defunct Context", value: "defunct" },
        ],
        layout: "radio",
      },
      initialValue: () => process.env.NEXT_PUBLIC_SITE_ID ?? "george",
    }),
  ],

  // ===================================================
  // PREVIEW
  // ===================================================

  preview: {

    select: {
      title: "title",
      media: "image",
      mediaType: "mediaType",
      tags: "tags",
    },

    prepare(selection) {

      const {
        title,
        media,
        mediaType,
        tags,
      } = selection;

      return {

        title: title || "Untitled",

        subtitle: [
          mediaType,
          tags?.slice(0, 3)?.join(", "),
        ]
          .filter(Boolean)
          .join(" • "),

        media,
      };
    },
  },


});