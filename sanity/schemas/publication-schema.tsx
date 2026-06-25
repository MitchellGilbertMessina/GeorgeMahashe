import { defineType, defineField } from "sanity";

export const publicationSchema = defineType({
  name: "publication",
  title: "Publications",
  type: "document",

  fields: [
    // =====================================================
    // TITLE
    // =====================================================
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // =====================================================
    // SLUG
    // =====================================================
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // =====================================================
    // FEATURED IMAGE
    // =====================================================
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "featuredImageCaption",
      title: "Featured Image Caption",
      type: "string",
    }),

    // =====================================================
    // SHORT DESCRIPTION (for cards/lists)
    // =====================================================
    defineField({
      name: "description",
      title: "Short Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    // =====================================================
    // ADDITIONAL TEXT (long-form editorial content)
    // =====================================================
    defineField({
      name: "additionalText",
      title: "Additional Text",
      type: "array",
      of: [{ type: "block" }],
    }),

    // =====================================================
    // GALLERY IMAGES
    // =====================================================
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional image caption",
            }),
          ],
        },
      ],
    }),

    // =====================================================
    // METADATA
    // =====================================================

    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
    }),

    defineField({
      name: "editor",
      title: "Editor",
      type: "string",
    }),

    defineField({
      name: "contributors",
      title: "Contributors",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "funders",
      title: "Funders",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "editions",
      title: "Edition Info",
      type: "string",
    }),

    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
    }),

    // =====================================================
    // DATE
    // =====================================================
    defineField({
      name: "publicationDate",
      title: "Publication Date",
      type: "datetime",
    }),

    // =====================================================
    // EXTERNAL LINKS (including downloads)
    // =====================================================
    defineField({
      name: "externalLinks",
      title: "External Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Label",
            }),
            defineField({
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Link", value: "link" },
                  { title: "Download", value: "download" },
                ],
              },
              initialValue: "link",
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      subtitle: "publisher",
    },
  },
});