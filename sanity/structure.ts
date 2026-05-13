import type { StructureResolver } from "sanity/structure";


export const structure: StructureResolver = (S) =>

  S.list()
    .title("Content")

    .items([

      // MAIN PROJECTS

      S.listItem()
        .title("Main Projects")

        .child(

          S.documentTypeList("project")
            .title("Main Projects")

            .filter(
              '_type == "project" && !defined(parentProject)'
            )

            .defaultOrdering([
              { field: "orderRank", direction: "asc" }
            ])
        ),

      // NESTED PROJECTS

      S.listItem()
        .title("Nested Projects")

        .child(

          S.documentTypeList("project")
            .title("Nested Projects")

            .filter(
              '_type == "project" && defined(parentProject)'
            )

            .defaultOrdering([
              { field: "orderRank", direction: "asc" }
            ])
        ),

      // DIVIDER

      S.divider(),

      // OTHER DOCUMENT TYPES

      S.documentTypeListItem("about"),

      S.documentTypeListItem("archiveItem"),

      S.documentTypeListItem("siteSettings"),
    ]);