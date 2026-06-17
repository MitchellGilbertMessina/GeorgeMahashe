const project = {

  name: "project",

  title: "Project",

  type: "document",

  fields: [

    // =================================================
    // BASIC INFO
    // =================================================

    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
    },

    // =================================================
    // SITE ASSIGNMENT
    // Hidden for nested projects
    // =================================================
    {
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
      hidden: ({ document }: any) => !!document?.parentProject,
    },

    // =================================================
    // PROJECT TYPE
    // Only relevant for defunct context projects
    // =================================================
    {
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Artwork", value: "artwork" },
          { title: "Publication", value: "publication" },
          { title: "Residency", value: "residency" },
          { title: "Lecture", value: "lecture" },
          { title: "Other", value: "other" },
        ],
      },
      hidden: ({ document }: any) =>
        !!document?.parentProject || document?.site === "george",
    },

    // =================================================
    // ONLY FOR MAIN PROJECTS
    // =================================================
    {
      name: "shortDescription",
      title: "Short Description",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ document }: any) => !!document?.parentProject,
    },

    // =================================================
    // HIERARCHY
    // =================================================
    {
      name: "parentProject",
      title: "Parent Project",
      type: "reference",
      to: [{ type: "project" }],
    },

    // =================================================
    // ORDERING
    // =================================================
    {
      name: "orderRank",
      title: "Order Rank",
      type: "number",
      hidden: ({ document }: any) => !!document?.parentProject,
    },

    // =================================================
    // PAGE BUILDER
    // =================================================
    {
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "textBlock" },
        { type: "imageBlock" },
        { type: "galleryBlock" },
        { type: "headingBlock" },
        { type: "projectReferenceBlock" },
      ],
    },

    // =================================================
    // SPATIAL FIELDS
    // =================================================
    {
      name: "x",
      title: "X Position",
      type: "number",
      initialValue: 0,
      hidden: ({ document }: any) => !!document?.parentProject,
    },
    {
      name: "y",
      title: "Y Position",
      type: "number",
      initialValue: 0,
      hidden: ({ document }: any) => !!document?.parentProject,
    },
    {
      name: "width",
      title: "Width",
      type: "number",
      initialValue: 400,
      hidden: ({ document }: any) => !!document?.parentProject,
    },
    {
      name: "rotation",
      title: "Rotation",
      type: "number",
      initialValue: 0,
      hidden: ({ document }: any) => !!document?.parentProject,
    },
  ],
};

export default project;