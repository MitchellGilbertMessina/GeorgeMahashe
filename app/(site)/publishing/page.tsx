export const revalidate = 60;

import Image from "next/image";
import Link from "next/link";
import { getPublications } from "@/sanity/sanity-utils";
import type { PortableTextBlock } from "@portabletext/types";
import type { Publication } from "@/types/publication";

// =====================================================
// PAGE
// =====================================================

export default async function PublishingPage() {
    const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
    const publications: Publication[] =
        await getPublications(siteId);

    return (
        <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">
            <section className="space-y-12">
                <h1 className="font-metana text-xs uppercase tracking-widest opacity-50">
                    Publishing
                </h1>

                <div className="space-y-20">
                    {publications.map((pub) => (
                        <PublicationCard key={pub._id} publication={pub} />
                    ))}
                </div>

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
                            {new Date(
                                publication.publicationDate
                            ).toLocaleDateString("en-ZA", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
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

                {/* DESCRIPTION PREVIEW (simple for now) */}
                {publication.description && (
                    <p className="text-sm opacity-70 max-w-2xl">
                        {publication.description?.[0]?.children?.[0]?.text ??
                            ""}
                    </p>
                )}

                <div className="text-xs uppercase tracking-widest opacity-50">
                    View Publication →
                </div>
            </article>
        </Link>
    );
}