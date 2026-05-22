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

          "slug":
            slug.current,

          "heroImage":
            heroImage.asset->url,

          shortDescription,

          x,
          y,
          width,
          rotation,
        }
      `,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
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

          "slug":
            slug.current,

          "heroImage":
            heroImage.asset->url,

          alt,

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
            // IMAGE BLOCKS
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
      
      { slug },
    {
      next: {
        revalidate: 60,
      },
    }
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
    `,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
}

// =====================================================
// EXHIBITIONS
// =====================================================

export async function getExhibitions() {

  try {

    const exhibitions = await client.fetch(

      groq`
        *[_type == "exhibition"]
        | order(startDate desc)
        {
          _id,
          _createdAt,

          title,

          "slug": slug.current,

          venue,
          address,

          startDate,
          endDate,

          "featuredImage": featuredImage.asset->url,

          externalLink,

          relatedProjects[]->{
            _id,
            title,

            "slug": slug.current,

            "heroImage": heroImage.asset->url
          }
        }
      `,
      {},
      {
        next: {
          revalidate: 60,
        },
      }
    );

    return exhibitions ?? [];

  } catch (error) {

    console.error(
      "Failed to fetch exhibitions:",
      error
    );

    return [];
  }
}

// =====================================================
// SINGLE EXHIBITION
// =====================================================

export async function getExhibition(slug: string) {

  try {

    const exhibition = await client.fetch(

      groq`
        *[_type == "exhibition" && slug.current == $slug][0]
        {
          _id,
          _createdAt,

          title,

          "slug": slug.current,

          venue,
          address,

          startDate,
          endDate,

          "featuredImage": featuredImage.asset->url,

          description,

          externalLink,

          relatedProjects[]->{
            _id,
            title,

            "slug": slug.current,

            "heroImage": heroImage.asset->url,

            shortDescription
          }
        }
      `,
      { slug },
      {
        next: {
          revalidate: 60,
        },
      }
    );

    return exhibition ?? null;

  } catch (error) {

    console.error(
      "Failed to fetch exhibition:",
      error
    );

    return null;
  }
}