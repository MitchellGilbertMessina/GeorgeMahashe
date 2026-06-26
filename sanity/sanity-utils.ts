import { Project } from "@/types/project";
import type { Exhibition } from "@/types/exhibition";
import { client } from "./lib/client";
import { groq } from "next-sanity";
import { ProgrammingItem } from "@/types/programming";

// =====================================================
// SITE SETTINGS
// =====================================================


export async function getSiteSettings(siteId: string) {
  return await client.fetch(
    groq`
      *[_type == "siteSettings" && (site == $siteId || site == "defunct" || !defined(site))][0]{
        publishingIntro,
        programmingResidenciesIntro,
        programmingEventsIntro,
        programmingExhibitionsIntro
      }
    `,
    { siteId },
    { next: { revalidate: 60 } }
  );
}

// =====================================================
// ALL MAIN PROJECTS (PROJECTS PAGE)
// =====================================================

export async function getProjects(siteId: string): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      groq`
        *[
          _type == "project"
          && !defined(parentProject)
          && site in [$siteId, "both"]
        ]
        | order(orderRank asc)
        {
          _id,
          _createdAt,
          title,
          "slug": slug.current,
          "heroImage": heroImage.asset->url,
          shortDescription,
          site,
          projectType,
          x,
          y,
          width,
          rotation,
        }
      `,
      { siteId },
      { next: { revalidate: 60 } }
    );
    return projects ?? [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
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

export async function getAbout(siteId: string) {
  return await client.fetch(
    groq`
      *[_type == "about" && site == $siteId][0]{
        bio,
        defunctBio,
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
    `,
    { siteId },
    { next: { revalidate: 60 } }
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

/// =====================================================
// ARCHIVE ITEMS
// =====================================================
export async function getArchiveItems(siteId: string) {
  return await client.fetch(
    groq`
      *[_type == "archiveItem" && site in [$siteId, "both"]]
      | order(_createdAt desc) {
        _id,
        title,
        description,
        mediaType,
        image,
        "imageCaption": image.caption,
        "videoUrl": video.asset->url,
        "audioUrl": audio.asset->url,
        "pdfUrl": pdf.asset->url,
        tags,
        featured,
        date,
        x,
        y,
        width,
        rotation
      }
    `,
    { siteId },
    { next: { revalidate: 60 } }
  );
}

// =====================================================
// HOMEPAGE ITEMS
// =====================================================
export async function getHomepageItems(siteId: string) {
  return await client.fetch(
    groq`
      *[_type == "homepageItem" && site in [$siteId, "both"]]
      | order(_createdAt desc) {
        _id,
        title,
        description,
        mediaType,
        image,
        "imageCaption": image.caption,
        "videoUrl": video.asset->url,
        "audioUrl": audio.asset->url,
        "pdfUrl": pdf.asset->url,
        tags,
        featured,
        date,
        x,
        y,
        width,
        rotation
      }
    `,
    { siteId },
    { next: { revalidate: 60 } }
  );
}

// =====================================================
// EXHIBITIONS
// =====================================================
export async function getExhibitions(siteId: string): Promise<Exhibition[]> {
  try {
    const exhibitions = await client.fetch(
      groq`
        *[_type == "exhibition" && site in [$siteId, "both"]]
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

"featuredImageCaption": featuredImage.caption,

description,
additionalText,

"galleryImages": galleryImages[]{
  "url": asset->url,
  caption
},

          externalLinks[] {
            label,
            url
          },

          relatedProjects[]->{
            _id,
            title,

            "slug": slug.current,

            "heroImage": heroImage.asset->url
          }
        }
      `,
      { siteId },
      { next: { revalidate: 60 } }
    );
    return exhibitions ?? [];
  } catch (error) {
    console.error("Failed to fetch exhibitions:", error);
    return [];
  }
}

// =====================================================
// SINGLE EXHIBITION
// =====================================================

// Replace the getExhibition function in sanity/sanity-utils.ts with this:

export async function getExhibition(slug: string): Promise<Exhibition | null> {
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
          "featuredImageCaption": featuredImage.caption,
          description,
          additionalText,
          "galleryImages": galleryImages[]{
            "url": asset->url,
            caption
          },
          externalLinks[]{
            label,
            url
          },
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
      { next: { revalidate: 60 } }
    );
    return exhibition ?? null;
  } catch (error) {
    console.error("Failed to fetch exhibition:", error);
    return null;
  }
}

// =====================================================
// PUBLICATIONS (DEFUNCT CONTEXT)
// =====================================================

export async function getPublications(siteId: string) {
  return client.fetch(
    groq`
      *[
        _type == "publication" &&
        site in [$siteId, "both"]
      ]
      | order(publicationDate desc)
      {
        _id,
        title,
        "slug": slug.current,
        "featuredImage": featuredImage.asset->url,
        featuredImageCaption,
        description,
        publisher,
        publicationDate,
        externalLinks
      }
    `,
    { siteId },
    { next: { revalidate: 60 } }
  );
}

// =====================================================
// SINGLE PUBLICATION (DEFUNCT CONTEXT)
// =====================================================

export async function getPublication(slug: string) {
  return client.fetch(
    groq`
      *[
        _type == "publication" &&
        slug.current == $slug
      ][0]
      {
        _id,
        title,
        "slug": slug.current,
        "featuredImage": featuredImage.asset->url,
        featuredImageCaption,
        description,
        additionalText,
        galleryImages[]{
          "url": asset->url,
          caption
        },
        publisher,
        editor,
        contributors,
        funders,
        editions,
        availability,
        publicationDate,
        externalLinks
      }
    `,
    { slug },
    { next: { revalidate: 60 } }
  );
}

// =====================================================
// PROGRAMMING LIST (FILTERED BY CATEGORY)
// =====================================================

export async function getProgramming(siteId: string) {
  return await client.fetch(
    groq`
      *[_type == "programming" && site in [$siteId, "both"]]
      | order(startDate desc)
      {
        _id,
        category,
        residencyType,
        subtitle,
        title,
        "slug": slug.current,
        startDate,
        endDate,
        "featuredImage": featuredImage.asset->url,
        featuredImageCaption,
        description,
        venue,
        location
      }
    `,
    { siteId },
    { next: { revalidate: 60 } }
  );
}

// =====================================================
// SINGLE PROGRAMMING ITEM
// =====================================================

export async function getProgrammingItem(
  slug: string
): Promise<ProgrammingItem | null> {
  return await client.fetch(
    groq`
      *[_type == "programming" && slug.current == $slug][0]
      {
        _id,
        title,
        "slug": slug.current,

        category,
        startDate,
        endDate,

        "featuredImage": featuredImage.asset->url,
        featuredImageCaption,

        description,
        additionalText,

        "galleryImages": galleryImages[]{
  "url": asset->url,
  caption
},

        venue,
        location,

       "externalLinks": externalLinks[]{
  label,
  url,
  type
        }
      }
    `,
    { slug },
    { next: { revalidate: 60 } }
  );
}