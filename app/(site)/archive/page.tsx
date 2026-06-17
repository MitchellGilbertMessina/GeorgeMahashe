export const revalidate = 60;

import { getArchiveItems } from "@/sanity/sanity-utils";
import DraggableCanvas from "./DraggableCanvas";

export default async function ArchivePage() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const items = await getArchiveItems(siteId);
  return <DraggableCanvas items={items} />;
}
