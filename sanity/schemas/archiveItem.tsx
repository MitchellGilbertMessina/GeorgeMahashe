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
      title: "Media Type",
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

    // =================================================
    // IMAGE
    // =================================================

    defineField({
      name: "image",
      title: "Image",
      type: "image",

      options: {
        hotspot: true,
      },

      fields: [

        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),

    // =================================================
    // VIDEO
    // =================================================

    defineField({
      name: "video",
      title: "Video",
      type: "file",

      options: {
        accept: "video/*",
      },
    }),

    // =================================================
    // AUDIO
    // =================================================

    defineField({
      name: "audio",
      title: "Audio",
      type: "file",

      options: {
        accept: "audio/*",
      },
    }),

    // =================================================
    // PDF
    // =================================================

    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",

      options: {
        accept: ".pdf",
      },
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