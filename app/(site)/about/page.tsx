export const revalidate = 60;

import { getAbout } from "@/sanity/sanity-utils";
import AboutTabs from "@/./components/about/AboutTabs";

export default async function AboutPage() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const about = await getAbout(siteId);

  if (!about) {
    return (
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <p className="opacity-50">No about content found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="max-w-5xl mx-auto px-6 pt-1 text-2xl font-bold">
        {about.title}
      </h1>
      <AboutTabs data={about} />
    </div>
  );
}