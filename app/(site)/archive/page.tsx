export const revalidate = 60;

import { getArchiveItems } from "@/sanity/sanity-utils";
import DraggableCanvas from "./DraggableCanvas";

export default async function ArchivePage() {
  const items = await getArchiveItems();

  return <DraggableCanvas items={items} />;
}
