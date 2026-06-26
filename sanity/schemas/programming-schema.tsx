import { defineType, defineField } from "sanity";

export const programmingSchema = defineType({
    name: "programming",
    title: "Programming",
    type: "document",

    fields: [

        // =====================================================
        // SITE
        // =====================================================
        defineField({
            name: "site",
            title: "Site",
            type: "string",
            options: {
                list: [
                    { title: "George Mahashe", value: "george" },
                    { title: "Defunct Context", value: "defunct" },
                    { title: "Both", value: "both" },
                ],
                layout: "radio",
            },
            initialValue: "defunct",
            hidden: ({ document }) => Boolean((document as any)?.parentProject),
        }),
        // =====================================================
        // CATEGORY
        // =====================================================
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Residency", value: "residency" },
                    { title: "Event", value: "event" },
                    { title: "Exhibition", value: "exhibition" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),

        // =====================================================
        // RESIDENCY TYPE (CONDITIONAL)
        // =====================================================
        defineField({
            name: "residencyType",
            title: "Residency Type",
            type: "string",
            options: {
                list: [
                    {
                        title: "Convened Residency",
                        value: "convened",
                    },
                    {
                        title: "Visiting Residency",
                        value: "visiting",
                    },
                    {
                        title: "Pavilion Occupation",
                        value: "pavilion",
                    },
                ],
                layout: "radio",
            },
            hidden: ({ document }) =>
                (document as any)?.category !== "residency",
        }),

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
        // SUBTITLE (CONDITIONAL)
        // =====================================================
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            hidden: ({ document }) =>
                (document as any)?.category !== "event",
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
        // DATES
        // =====================================================
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "date",
        }),

        defineField({
            name: "endDate",
            title: "End Date",
            type: "date",
        }),

        // =====================================================
        // FEATURED IMAGE
        // =====================================================
        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "featuredImageCaption",
            title: "Featured Image Caption",
            type: "string",
        }),

        // =====================================================
        // SHORT DESCRIPTION
        // =====================================================
        defineField({
            name: "description",
            title: "Short Description",
            type: "array",
            of: [{ type: "block" }],
        }),

        // =====================================================
        // ADDITIONAL TEXT
        // =====================================================
        defineField({
            name: "additionalText",
            title: "Additional Text",
            type: "array",
            of: [{ type: "block" }],
            hidden: ({ document }) =>
                (document as any)?.category === "event",
        }),

        // =====================================================
        // GALLERY IMAGES
        // =====================================================
        defineField({
            name: "galleryImages",
            title: "Gallery Images",
            type: "array",
            of: [
                defineField({
                    name: "imageItem",
                    title: "Image Item",
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
            ],
            hidden: ({ document }) =>
                (document as any)?.category === "event",
        }),


        // =====================================================
        // VENUE / LOCATION
        // =====================================================
        defineField({
            name: "venue",
            title: "Venue",
            type: "string",
        }),

        // =====================================================
        // EXTERNAL LINKS
        // =====================================================
        defineField({
            name: "externalLinks",
            title: "External Links",
            type: "array",
            of: [
                defineField({
                    name: "externalLink",
                    title: "External Link",
                    type: "object",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                        }),
                        defineField({
                            name: "url",
                            title: "URL",
                            type: "url",
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
                }),
            ],
        }),

        // =====================================================
        // ENABLE DETAIL PAGE (READ-ONLY)
        // =====================================================

        defineField({
            name: "showDetailPage",
            title: "Enable Detail Page",
            type: "boolean",
            initialValue: ({ document }) =>
                (document as any)?.category !== "event",
            readOnly: true,
            hidden: true,
        }),
    ],
});