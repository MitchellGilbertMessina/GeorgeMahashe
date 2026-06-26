import { notFound } from "next/navigation";
import { getProgrammingItem } from "@/sanity/sanity-utils";

import RichText from "@/components/RichText";
import Image from "next/image";
import type { ProgrammingItem } from "@/types/programming";

export const revalidate = 60;

export default async function ProgrammingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item: ProgrammingItem | null = await getProgrammingItem(slug);

  if (!item) return notFound();

  if (item.category === "event") return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <header className="space-y-2">
        <h1 className="font-metana text-3xl">{item.title}</h1>

        <p className="text-sm opacity-60">
          {item.venue && <span>{item.venue}</span>}
          {item.startDate && (
            <span>
              {" "}
              • {new Date(item.startDate).toLocaleDateString("en-ZA")}
            </span>
          )}
        </p>
      </header>

      {item.featuredImage && (
        <div className="space-y-2">
          <Image
            src={item.featuredImage}
            alt={item.title}
            width={1600}
            height={1000}
            className="w-full h-auto"
          />

          {item.featuredImageCaption && (
            <p className="text-xs opacity-60 italic">
              {item.featuredImageCaption}
            </p>
          )}
        </div>
      )}

      {item.description && <RichText value={item.description} />}

      {item.additionalText && <RichText value={item.additionalText} />}

      {item.galleryImages?.length ? (
        <div className="space-y-8">
          {item.galleryImages.map((img, i) => (
            <div key={i} className="space-y-2">
              <Image
                src={img.url}
                alt={img.caption || item.title}
                width={1600}
                height={1000}
                className="w-full h-auto"
              />
              {img.caption && (
                <p className="text-xs opacity-60 italic">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {item.externalLinks?.length ? (
        <div className="pt-6 border-t space-y-2">
          {item.externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm underline"
            >
              {link.label || "External Link"} →
            </a>
          ))}
        </div>
      ) : null}
    </main>
  );
}