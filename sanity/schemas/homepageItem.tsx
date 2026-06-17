import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepageItem",
  title: "Homepage Item",
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
      rows: 3,
    }),
    // Optional: link this item to a project
    defineField({
      name: "project",
      title: "Related Project",
      type: "reference",
      to: [{ type: "project" }],
    }),
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
    defineField({
      name: "image",
      type: "image",
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "video",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "audio",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "audio",
      options: { accept: "audio/*" },
    }),
    defineField({
      name: "pdf",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "pdf",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
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
          { title: "defunct context", value: "defunct" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "george",
    }),

  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      mediaType: "mediaType",
      tags: "tags",
    },
    prepare(selection) {
      const { title, media, mediaType, tags } = selection;
      return {
        title: title || "Untitled",
        subtitle: [mediaType, tags?.slice(0, 3)?.join(", ")]
          .filter(Boolean)
          .join(" • "),
        media,
      };
    },
  },
});