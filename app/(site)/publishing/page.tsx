export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getPublications, getSiteSettings } from "@/sanity/sanity-utils";
import type { Publication } from "@/types/publication";

// =====================================================
// PAGE
// =====================================================

export default async function PublishingPage() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "defunct";

  const [publications, settings] = await Promise.all([
    getPublications(siteId),
    getSiteSettings(siteId),
  ]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* HEADER */}
      <section className="space-y-10">
        <h1 className="font-metana text-xs uppercase tracking-widest opacity-50">
          Publishing
        </h1>

        {/* INTRO TEXT (SANITY CONTROLLED) */}
        {settings?.publishingIntro && (
          <div className="max-w-2xl text-sm opacity-70 leading-relaxed">
            <PortableText value={settings.publishingIntro} />
          </div>
        )}

        {/* LIST */}
        <div className="space-y-20">
          {publications.map((pub: Publication) => (
            <PublicationCard key={pub._id} publication={pub} />
          ))}
        </div>

        {/* EMPTY STATE */}
        {publications.length === 0 && (
          <p className="opacity-40 text-sm">No publications yet.</p>
        )}
      </section>
    </main>
  );
}

// =====================================================
// CARD
// =====================================================

function PublicationCard({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <Link
      href={`/publishing/${publication.slug}`}
      className="block group"
    >
      <article className="space-y-4">
        {/* TITLE */}
        <h2 className="font-metana text-2xl group-hover:opacity-60 transition">
          {publication.title}
        </h2>

        {/* META */}
        <div className="text-sm opacity-50">
          {publication.publisher && (
            <span>{publication.publisher}</span>
          )}

          {publication.publicationDate && (
            <span>
              {" "}
              •{" "}
              {new Date(publication.publicationDate).toLocaleDateString(
                "en-ZA",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          )}
        </div>

        {/* IMAGE */}
        {publication.featuredImage && (
          <Image
            src={publication.featuredImage}
            alt={publication.title}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        )}

        {/* DESCRIPTION PREVIEW */}
        {publication.description?.[0]?.children?.[0]?.text && (
          <p className="text-sm opacity-70 max-w-2xl">
            {publication.description[0].children[0].text}
          </p>
        )}

        {/* CTA */}
        <div className="text-xs uppercase tracking-widest opacity-50">
          View Publication →
        </div>
      </article>
    </Link>
  );
}