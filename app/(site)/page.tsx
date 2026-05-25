export const revalidate = 60;

import { getArchiveItems } from "@/sanity/sanity-utils";
import ArchiveCanvas from "@/app/(site)/archive/ArchiveCanvas";

export default async function Home() {
  const items = await getArchiveItems();
  return <ArchiveCanvas items={items} />;
} 