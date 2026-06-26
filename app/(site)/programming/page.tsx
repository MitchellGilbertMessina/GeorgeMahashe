export const revalidate = 60;

import ProgrammingTabs from "@/components/programming/ProgrammingTabs";
import { getProgramming } from "@/sanity/sanity-utils";
import type { ProgrammingItem } from "@/types/programming";

export default async function ProgrammingPage() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";

  const items: ProgrammingItem[] = await getProgramming(siteId);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-metana text-xs uppercase tracking-widest opacity-50 mb-10">
        Programming
      </h1>

      <ProgrammingTabs items={items} />
    </main>
  );
}