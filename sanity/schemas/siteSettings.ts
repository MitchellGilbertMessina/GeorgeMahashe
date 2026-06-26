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
      initialValue: "Site Settings",
    }),

    // =========================
    // PUBLISHING
    // =========================
    defineField({
      name: "publishingIntro",
      title: "Publishing Intro Text",
      type: "array",
      of: [{ type: "block" }],
    }),

    // =========================
    // PROGRAMMING
    // =========================

    defineField({
      name: "programmingResidenciesIntro",
      title: "Programming – Residencies Intro",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "programmingEventsIntro",
      title: "Programming – Events Intro",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "programmingExhibitionsIntro",
      title: "Programming – Exhibitions Intro",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});