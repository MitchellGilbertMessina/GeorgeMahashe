import { defineType } from "sanity";

export default defineType({
    name: "projectReferenceBlock",
    title: "Project Reference Block",
    type: "object",

    fields: [
        {
            name: "project",
            title: "Project",
            type: "reference",

            to: [{ type: "project" }],

            options: {
                filter: 'defined(parentProject)'
            },

            validation: (Rule) => Rule.required(),
        },

        {
            name: "layout",
            title: "Layout",
            type: "string",
            options: {
                list: [
                    { title: "Inline", value: "inline" },
                    { title: "Full Width", value: "full" },
                    { title: "Floating", value: "floating" },
                ],
                layout: "radio",
            },
            initialValue: "inline",
        },
    ],
    preview: {
        select: {
            title: "project.title",
            image: "project.heroImage",
        },

        prepare({ title, image }) {
            return {
                title: "Project Reference",
                subtitle: title || "Untitled Project",
                media: image,
            };
        },
    },
});