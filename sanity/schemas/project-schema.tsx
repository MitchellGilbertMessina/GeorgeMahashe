const project = {
  name: "project",
  title: "Project",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },

    {
      name: "author",
      title: "Author",
      type: "string",
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" }
    },

    {
      name: "frontcover",
      title: "Front Cover",
      type: "image",
    },

    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      options: { source: "title" }
    },

    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },

    // ADD THIS
    {
      name: "defunctContextData",
      title: "defunct context data",
      type: "defunctContext",

      // Optional but recommended
      //hidden: ({ document }: any) =>
      //  document?.title !== "Defunct Context",
    },
  ]
}

export default project;