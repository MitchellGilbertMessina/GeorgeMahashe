export const revalidate = 60;

import Image from "next/image";
import Link from "next/link";
import { getPublication } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import type { Publication } from "@/types/publication";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;

  const publication: Publication | null =
    await getPublication(slug);

  if (!publication) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6">
        Publication not found.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-16">

      {/* BACK */}
      <div>
        <Link
          href="/publishing"
          className="text-sm tracking-wide hover:opacity-50 transition"
        >
          ← Back to Publishing
        </Link>
      </div>

      {/* TITLE */}
      <h1 className="font-metana text-4xl">
        {publication.title}
      </h1>

      {/* META */}
      <div className="text-sm opacity-60 space-y-1">
        {publication.publisher && (
          <div>{publication.publisher}</div>
        )}

        {publication.publicationDate && (
          <div>
            {new Date(publication.publicationDate).toLocaleDateString(
              "en-ZA",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </div>
        )}

        {publication.editions && (
          <div>{publication.editions}</div>
        )}
      </div>

      {/* FEATURED IMAGE */}
      {publication.featuredImage && (
        <div className="space-y-2">
          <Image
            src={publication.featuredImage}
            alt={publication.title}
            width={1400}
            height={900}
            className="w-full h-auto"
          />

          {publication.featuredImageCaption && (
            <p className="text-xs opacity-50">
              {publication.featuredImageCaption}
            </p>
          )}
        </div>
      )}

      {/* DESCRIPTION */}
      {publication.description && (
        <div className="prose max-w-none text-sm leading-relaxed">
          <PortableText value={publication.description} />
        </div>
      )}

      {/* ADDITIONAL TEXT */}
      {publication.additionalText && (
        <div className="prose max-w-none text-sm leading-relaxed opacity-90">
          <PortableText value={publication.additionalText} />
        </div>
      )}

      {/* GALLERY */}
      {publication.galleryImages?.length ? (
        <div className="space-y-6">
          {publication.galleryImages.map((img, i) => (
            <div key={i} className="space-y-2">
              <Image
                src={img.url}
                alt={publication.title}
                width={1400}
                height={900}
                className="w-full h-auto"
              />

              {img.caption && (
                <p className="text-xs opacity-50">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {/* EXTERNAL LINKS */}
      {publication.externalLinks?.length ? (
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest opacity-50">
            Links
          </h2>

          <div className="space-y-1">
            {publication.externalLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                className="text-sm hover:opacity-60 transition block"
              >
                {link.label ?? link.url}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {/* BACK (BOTTOM) */}
      <div>
        <Link
          href="/publishing"
          className="text-sm tracking-wide hover:opacity-50 transition"
        >
          ← Back to Publishing
        </Link>
      </div>

    </main>
  );
}