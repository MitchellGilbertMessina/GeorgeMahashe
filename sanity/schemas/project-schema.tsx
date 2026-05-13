const project = {
  name: "project",
  title: "Project",
  type: "document",

  fields: [
    // BASIC INFO

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
      name: "author",
      title: "Author",
      type: "string",
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

    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    },

    // PROJECT TYPE

    {
      name: "projectType",
      title: "Project Type",
      type: "string",

      options: {
        list: [
          { title: "Main Project", value: "main-project" },
          { title: "Research", value: "research" },
          { title: "Programming", value: "programming" },
          { title: "Publishing", value: "publishing" },
          { title: "Workshop", value: "workshop" },
          { title: "Residency", value: "residency" },
          { title: "Lecture / Talk", value: "lecture" },
          { title: "Subproject", value: "subproject" },
        ],
      },
    },

    // HIERARCHY

    {
      name: "parentProject",
      title: "Parent Project",
      type: "reference",
      to: [{ type: "project" }],
    },

    // ORDERING

    {
      name: "orderRank",
      title: "Order Rank",
      type: "number",
    },

    // FLEXIBLE PAGE BUILDER

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

    // SPATIAL FIELDS FOR LAYOUT (USED IN PAGE BUILDER BLOCKS)
    {
      name: "x",
      title: "X Position",
      type: "number",
      initialValue: 0,
    },

    {
      name: "y",
      title: "Y Position",
      type: "number",
      initialValue: 0,
    },

    {
      name: "width",
      title: "Width",
      type: "number",
      initialValue: 400,
    },

    {
      name: "rotation",
      title: "Rotation",
      type: "number",
      initialValue: 0,
    },
  ],
};

export default project;