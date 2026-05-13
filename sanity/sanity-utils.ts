import { Project } from "@/types/project";
import { client } from "./lib/client";
import { groq } from "next-sanity";

// =====================================================
// ALL MAIN PROJECTS (PROJECTS PAGE)
// =====================================================

export async function getProjects(): Promise<Project[]> {

  try {

    const projects = await client.fetch(

      groq`
        *[
          _type == "project"
          && !defined(parentProject)
        ]
        | order(orderRank asc)
        {

          _id,
          _createdAt,

          title,

          "slug": slug.current,

          "heroImage":
            heroImage.asset->url,

          shortDescription,

          projectType,

          x,
          y,
          width,
          rotation,
        }
      `
    );

    return projects ?? [];

  } catch (error) {

    console.error(
      "Failed to fetch projects:",
      error
    );

    return [];
  }
}

// =====================================================
// SINGLE PROJECT
// =====================================================

export async function getProject(
  slug: string
): Promise<Project | null> {

  try {

    const project = await client.fetch(

      groq`
        *[
          _type == "project"
          && slug.current == $slug
        ][0]{

          _id,
          _createdAt,

          title,
          author,

          "slug": slug.current,

          "heroImage":
            heroImage.asset->url,

          alt,

          shortDescription,

          projectType,
          orderRank,

          // =====================================
          // PARENT PROJECT
          // =====================================

          parentProject->{
            _id,
            title,

            "slug":
              slug.current
          },

          // =====================================
          // PAGE BUILDER
          // =====================================

          pageBuilder[]{

            ...,

            // =================================
            // IMAGE BLOCK IMAGE RESOLUTION
            // =================================

            image{
              asset->{
                url
              }
            },

            images[]{
              asset->{
                url
              }
            },

            // =================================
            // EMBEDDED PROJECTS
            // =================================

            project->{

              _id,

              title,

              "slug":
                slug.current,

              "heroImage":
                heroImage.asset->url,

              alt,

              shortDescription,

              // =============================
              // NESTED PAGE BUILDER
              // =============================

              pageBuilder[]{

                ...,

                image{
                  asset->{
                    url
                  }
                },

                images[]{
                  asset->{
                    url
                  }
                },

                // =========================
                // ONE MORE DEPTH LEVEL
                // =========================

                project->{

                  _id,

                  title,

                  "slug":
                    slug.current,

                  "heroImage":
                    heroImage.asset->url,

                  alt,

                  shortDescription,

                  pageBuilder[]{

                    ...,

                    image{
                      asset->{
                        url
                      }
                    },

                    images[]{
                      asset->{
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      { slug }
    );

    return project ?? null;

  } catch (error) {

    console.error(
      "Failed to fetch project:",
      error
    );

    return null;
  }
}

// =====================================================
// ABOUT
// =====================================================

export async function getAbout() {

  return await client.fetch(

    groq`
      *[_type == "about"][0]{

        bio,

        contactDetails,

        exhibitions,

        publishedTexts,

        otherWebsites[]{

          title,
          description,
          url,

          image{
            asset->{
              url
            }
          }
        }
      }
    `
  );
}

// =====================================================
// HOMEPAGE IMAGES
// =====================================================

export async function getHomepageImages() {

  const data = await client.fetch(

    groq`
      *[_type == "siteSettings"][0]{

        homepageImages[]{

          asset->{
            url
          }
        }
      }
    `
  );

  return data?.homepageImages ?? [];
}

// =====================================================
// ARCHIVE ITEMS
// =====================================================

export async function getArchiveItems() {

  return await client.fetch(

    groq`
      *[_type == "archiveItem"]
      | order(_createdAt desc) {

        _id,

        title,

        description,

        image,

        x,
        y,

        width,

        rotation
      }
    `
  );
}