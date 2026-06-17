export const revalidate = 60;

import { getHomepageItems } from "@/sanity/sanity-utils";
import DraggableCanvas from "@/app/(site)/archive/DraggableCanvas";

export default async function Home() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const items = await getHomepageItems(siteId);
  return <DraggableCanvas items={items} />;
}