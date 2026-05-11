import { Project } from "@/types/project";
import { createClient, groq } from "next-sanity";
import { client } from "./lib/client";

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      groq`*[_type == "project"]{
        _id,
        _createdAt,
        title,
        author,
        "slug": slug.current,
        "frontcover": frontcover.asset->url,
        alt,
        content
      }`
    ); 

    return projects ?? [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProject(slug: string): Promise<Project> {
  try {
    const project = await client.fetch(
      groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author,
        "slug": slug.current,
        "frontcover": frontcover.asset->url,
        alt,
        content,

        defunctContextData{
          research[]{
            title,
            "slug": slug.current,
            description,
            content,
            images[]{
              asset->{
                url
              }
            }
          },

          programming{
            commissioned[]{
              title,
              "slug": slug.current,
              description,
              content,
              images[]{
                asset->{
                  url
                }
              }
            },

            facilitated[]{
              title,
              "slug": slug.current,
              description,
              content,
              images[]{
                asset->{
                  url
                }
              }
            }
          },

          publishing[]{
            title,
            "slug": slug.current,
            description,
            content,
            images[]{
              asset->{
                url
              }
            }
          }
        }
      }`,
      { slug }
    );

    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null as any;
  }
}

export async function getAbout() {
  return await client.fetch(
    `*[_type == "about"][0]{
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
    }`
  );
}

export async function getHomepageImages() {
  const data = await client.fetch(`
    *[_type == "siteSettings"][0]{
      homepageImages[]{
        asset->{
          url
        }
      }
    }
  `);

  return data?.homepageImages ?? [];
}


export async function getArchiveItems() {
  const query = `
    *[_type == "archiveItem"] | order(_createdAt desc) {
      _id,
      title,
      description,
      image,
      x,
      y,
      width,
      rotation
    }
  `;

  return await client.fetch(query);
}