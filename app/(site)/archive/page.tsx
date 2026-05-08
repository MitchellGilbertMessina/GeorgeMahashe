import { getArchiveItems } from "@/sanity/sanity-utils";
import ArchiveCanvas from "./ArchiveCanvas";

export default async function ArchivePage() {
  const items = await getArchiveItems();

  return <ArchiveCanvas items={items} />;
}
