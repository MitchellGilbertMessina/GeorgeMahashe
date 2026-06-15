export const revalidate = 60;

import { getHomepageItems } from "@/sanity/sanity-utils";
import DraggableCanvas from "@/app/(site)/archive/DraggableCanvas";

export default async function Home() {
  const items = await getHomepageItems();
  return <DraggableCanvas items={items} />;
}