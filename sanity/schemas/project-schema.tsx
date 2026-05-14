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

      options: {
        source: "title",
      },
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
    // ONLY FOR MAIN PROJECTS
    // =================================================

    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",

      hidden: ({ document }: any) =>
        !!document?.parentProject,
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
    // ONLY FOR MAIN PROJECTS
    // =================================================

    {
      name: "orderRank",
      title: "Order Rank",
      type: "number",

      hidden: ({ document }: any) =>
        !!document?.parentProject,
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
    // ONLY USED FOR MAIN PROJECTS CANVAS
    // =================================================

    {
      name: "x",
      title: "X Position",

      type: "number",

      initialValue: 0,

      hidden: ({ document }: any) =>
        !!document?.parentProject,
    },

    {
      name: "y",
      title: "Y Position",

      type: "number",

      initialValue: 0,

      hidden: ({ document }: any) =>
        !!document?.parentProject,
    },

    {
      name: "width",
      title: "Width",

      type: "number",

      initialValue: 400,

      hidden: ({ document }: any) =>
        !!document?.parentProject,
    },

    {
      name: "rotation",
      title: "Rotation",

      type: "number",

      initialValue: 0,

      hidden: ({ document }: any) =>
        !!document?.parentProject,
    },
  ],
};

export default project;