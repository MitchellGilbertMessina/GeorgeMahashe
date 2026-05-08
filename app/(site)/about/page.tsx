import { getAbout } from "@/sanity/sanity-utils";
import AboutTabs from "@/./components/about/AboutTabs";

export default async function AboutPage() {
  const data = await getAbout();

  return (
    <div>
      <h1 className="max-w-5xl mx-auto px-6 pt-1 text-2xl font-bold">
        {data.title}
      </h1>

      <AboutTabs data={data} />
    </div>
  );
}