import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([

      // =============================================
      // GEORGE MAHASHE
      // =============================================

      S.listItem()
        .title("George Mahashe")
        .child(
          S.list()
            .title("George Mahashe")
            .items([

              S.listItem()
                .title("Homepage Items")
                .child(
                  S.documentTypeList("homepageItem")
                    .title("George — Homepage Items")
                    .filter('_type == "homepageItem" && site in ["george", "both"]')
                ),

              S.listItem()
                .title("Projects")
                .child(
                  S.documentTypeList("project")
                    .title("George — Projects")
                    .filter(
                      '_type == "project" && !defined(parentProject) && site in ["george", "both"]'
                    )
                    .defaultOrdering([{ field: "orderRank", direction: "asc" }])
                ),

              S.listItem()
                .title("Exhibitions")
                .child(
                  S.documentTypeList("exhibition")
                    .title("George — Exhibitions")
                    .filter('_type == "exhibition" && site in ["george", "both"]')
                ),

              S.listItem()
                .title("About")
                .child(
                  S.documentTypeList("about")
                    .title("George — About")
                    .filter('_type == "about" && site == "george"')
                ),

              S.listItem()
                .title("Archive Items")
                .child(
                  S.documentTypeList("archiveItem")
                    .title("George — Archive Items")
                    .filter('_type == "archiveItem" && site in ["george", "both"]')
                ),
            ])
        ),

      S.divider(),

      // =============================================
      // DEFUNCT CONTEXT
      // =============================================

      S.listItem()
        .title("defunct context")
        .child(
          S.list()
            .title("defunct context")
            .items([

              S.listItem()
                .title("Homepage Items")
                .child(
                  S.documentTypeList("homepageItem")
                    .title("Defunct — Homepage Items")
                    .filter('_type == "homepageItem" && site in ["defunct", "both"]')
                ),

              S.listItem()
                .title("Projects")
                .child(
                  S.documentTypeList("project")
                    .title("defunct — Projects")
                    .filter(
                      '_type == "project" && !defined(parentProject) && site in ["defunct", "both"]'
                    )
                    .defaultOrdering([{ field: "orderRank", direction: "asc" }])
                ),
                
              S.listItem()
                .title("Programming")
                .child(
                  S.documentTypeList("programming")
                    .title("defunct — Programming")
                    .filter('_type == "programming" && site in ["defunct", "both"]')
                ),

              S.listItem()
                .title("Publications")
                .child(
                  S.documentTypeList("publication")
                    .title("defunct — Publications")
                    .filter('_type == "publication" && site in ["defunct", "both"]')
                ),

              S.listItem()
                .title("About")
                .child(
                  S.documentTypeList("about")
                    .title("Defunct — About")
                    .filter('_type == "about" && site == "defunct"')
                ),

              S.listItem()
                .title("Archive Items")
                .child(
                  S.documentTypeList("archiveItem")
                    .title("defunct — Archive Items")
                    .filter('_type == "archiveItem" && site in ["defunct", "both"]')
                ),
            ])
        ),

      S.divider(),

      // =============================================
      // SHARED / STRUCTURAL
      // =============================================

      S.listItem()
        .title("Nested Projects")
        .child(
          S.documentTypeList("project")
            .title("Nested Projects")
            .filter('_type == "project" && defined(parentProject)')
            .defaultOrdering([{ field: "orderRank", direction: "asc" }])
        ),

      S.documentTypeListItem("about"),
      S.documentTypeListItem("siteSettings"),

      S.listItem()
        .title("⚠️ All Projects (debug)")
        .child(
          S.documentTypeList("project")
            .title("All Projects")
            .filter('_type == "project" && !defined(parentProject)')
        ),

      S.listItem()
        .title("⚠️ All Homepage Items (debug)")
        .child(
          S.documentTypeList("homepageItem")
            .title("All Homepage Items")
        ),

      S.listItem()
        .title("⚠️ All Archive Items (debug)")
        .child(
          S.documentTypeList("archiveItem")
            .title("All Archive Items")


        ),

      S.listItem()
        .title("⚠️ All Exhibitions Items (debug)")
        .child(
          S.documentTypeList("exhibition")
            .title("All Exhibitions Items")

        ),

      S.listItem()
        .title("⚠️ All Publications Items (debug)")
        .child(
          S.documentTypeList("publication")
            .title("All Publications Items")

        ),
    ]);


