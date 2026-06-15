// sanity/schemas/exhibition-schema.ts

import { defineField, defineType } from "sanity";

export const exhibitionSchema = defineType({
    name: "exhibition",
    title: "Exhibitions",
    type: "document",

    fields: [

        // =====================================================
        // TITLE
        // =====================================================

        defineField({
            name: "title",
            title: "Exhibition Title",
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
        // VENUE
        // =====================================================

        defineField({
            name: "venue",
            title: "Venue",
            type: "string",
        }),

        // =====================================================
        // ADDRESS
        // =====================================================

        defineField({
            name: "address",
            title: "Address",
            type: "string",
        }),

        // =====================================================
        // START DATE
        // =====================================================

        defineField({
            name: "startDate",
            title: "Start Date",
            type: "datetime",

            validation: (Rule) => Rule.required(),
        }),

        // =====================================================
        // END DATE
        // =====================================================

        defineField({
            name: "endDate",
            title: "End Date",
            type: "datetime",

            validation: (Rule) =>
                Rule.required().custom((endDate, context) => {

                    const startDate = context.document?.startDate as string;
                    const end = endDate as string;

                    if (!startDate || !end) {
                        return true;
                    }

                    return new Date(end) >= new Date(startDate)
                        ? true
                        : "End date must be after start date";
                }),
        }),

        // =====================================================
        // FEATURED IMAGE
        // =====================================================

        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "caption",
                    title: "Caption",
                    type: "string",
                }),
            ],
        }),

        // =====================================================
        // DESCRIPTION
        // =====================================================

        defineField({
            name: "description",
            title: "Description",
            type: "array",

            of: [
                {
                    type: "block",
                },
            ],
        }),

        // =====================================================
        // INSTALLATION IMAGES
        // =====================================================

        defineField({
            name: "galleryImages",
            title: "Installation Images",
            type: "array",

            of: [
                {
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
                },
            ],
        }),

        // =====================================================
        // RELATED PROJECTS
        // =====================================================

        defineField({
            name: "relatedProjects",
            title: "Related Projects",
            description:
                "Link projects associated with this exhibition.",

            type: "array",

            of: [
                {
                    type: "reference",
                    to: [{ type: "project" }],
                },
            ],
        }),

    ],

    // =====================================================
    // PREVIEW
    // =====================================================

    preview: {
        select: {
            title: "title",
            venue: "venue",
            media: "featuredImage",
            startDate: "startDate",
        },

        prepare(selection) {

            const { title, venue, media, startDate } = selection;

            const formattedDate = startDate
                ? new Date(startDate).toLocaleDateString("en-ZA", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
                : "";

            return {
                title,
                subtitle: venue
                    ? `${venue} • ${formattedDate}`
                    : formattedDate,
                media,
            };
        },
    },
});