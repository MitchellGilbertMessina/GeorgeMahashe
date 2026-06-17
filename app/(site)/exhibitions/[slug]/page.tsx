export const revalidate = 60;

import { getExhibitions } from "@/sanity/sanity-utils";

export async function generateStaticParams() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const exhibitions = await getExhibitions(siteId);

  return exhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}