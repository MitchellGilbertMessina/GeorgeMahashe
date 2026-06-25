export const revalidate = 60;

import Image from "next/image";
import { getExhibitions } from "@/sanity/sanity-utils";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

// =====================================================
// TYPES
// =====================================================

type Exhibition = {
  _id: string;
  title: string;
  slug: string;

  venue?: string;
  address?: string;

  startDate: string;
  endDate: string;

  featuredImage?: string;
  featuredImageCaption?: string;

  description?: PortableTextBlock[];

  externalLinks?: {
    label?: string;
    url: string;
  }[];
};

// =====================================================
// DATE FORMATTER
// =====================================================

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);

  const opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return `${s.toLocaleDateString("en-ZA", opts)} – ${e.toLocaleDateString(
    "en-ZA",
    opts
  )}`;
}

// =====================================================
// DESCRIPTION PREVIEW
// =====================================================

function getDescriptionPreview(
  description?: PortableTextBlock[]
) {
  if (!description?.length) return "";

  const firstBlock = description.find(
    (block) => block._type === "block"
  );

  if (
    firstBlock &&
    "children" in firstBlock &&
    Array.isArray(firstBlock.children)
  ) {
    return firstBlock.children
      .map((child: any) => child.text)
      .join("");
  }

  return "";
}

// =====================================================
// PAGE
// =====================================================

export default async function ExhibitionsPage() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const exhibitions = await getExhibitions(siteId);

  const now = new Date();

  const upcoming = exhibitions.filter((e) => new Date(e.startDate) > now);

  const current = exhibitions.filter(
    (e) =>
      new Date(e.startDate) <= now && new Date(e.endDate) >= now
  );

  const past = exhibitions.filter((e) => new Date(e.endDate) < now);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* CURRENT */}
      {current.length > 0 && (
        <section>
          <h2 className="font-metana text-xs uppercase tracking-widest opacity-50 mb-10">
            Current
          </h2>

          <div className="space-y-24">
            {current.map((exhibition) => (
              <FeaturedExhibitionCard
                key={exhibition._id}
                exhibition={exhibition}
              />
            ))}
          </div>
        </section>
      )}

      {/* UPCOMING */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="font-metana text-xs uppercase tracking-widest opacity-50 mb-10">
            Upcoming
          </h2>

          <div className="space-y-24">
            {upcoming.map((exhibition) => (
              <FeaturedExhibitionCard
                key={exhibition._id}
                exhibition={exhibition}
              />
            ))}
          </div>
        </section>
      )}

      {/* PAST */}
      {past.length > 0 && (
        <section>
          <h2 className="font-metana text-xs uppercase tracking-widest opacity-50 mb-10">
            Past
          </h2>

          <div className="space-y-8">
            {past.map((exhibition) => (
              <PastExhibitionCard
                key={exhibition._id}
                exhibition={exhibition}
              />
            ))}
          </div>
        </section>
      )}

      {exhibitions.length === 0 && (
        <p className="opacity-40 text-sm">No exhibitions yet.</p>
      )}
    </main>
  );
}

// =====================================================
// META
// =====================================================

function ExhibitionMeta({ exhibition }: { exhibition: Exhibition }) {
  return (
    <>
      <div className="text-sm opacity-50">
        {formatDateRange(exhibition.startDate, exhibition.endDate)}
      </div>

      {exhibition.venue && (
        <div className="text-sm opacity-60">
          {exhibition.venue}
          {exhibition.address ? `, ${exhibition.address}` : ""}
        </div>
      )}
    </>
  );
}

// =====================================================
// FEATURED
// =====================================================

function FeaturedExhibitionCard({
  exhibition,
}: {
  exhibition: Exhibition;
}) {
  const descriptionPreview = getDescriptionPreview(
    exhibition.description
  );

  return (
    <Link
      href={`/exhibitions/${exhibition.slug}`}
      className="
    block
    group
  "
    >
      <article className="space-y-4">

        {/* TITLE + META */}

        <div className="space-y-2">
          <h3 className="font-metana text-3xl">
            {exhibition.title}
          </h3>

          <ExhibitionMeta exhibition={exhibition} />
        </div>

        {/* IMAGE */}

        {exhibition.featuredImage && (
          <div className="space-y-2">

            <Image
              src={exhibition.featuredImage}
              alt={exhibition.title}
              width={1200}
              height={800}
              className="w-full h-auto"
            />

            {/* IMAGE CAPTION */}

            {exhibition.featuredImageCaption && (
              <p className="text-xs opacity-50">
                {exhibition.featuredImageCaption}
              </p>
            )}

          </div>
        )}

        {/* DESCRIPTION PREVIEW */}

        {descriptionPreview && (
          <div className="max-w-3xl">
            <p className="text-sm leading-relaxed">
              {descriptionPreview}
            </p>
          </div>
        )}

        {/* VIEW EXHIBITION */}

        <div className="text-xs uppercase tracking-widest opacity-50">
          View Exhibition →
        </div>

      </article>
    </Link>
  );
}

// =====================================================
// PAST
// =====================================================
function PastExhibitionCard({
  exhibition,
}: {
  exhibition: Exhibition;
}) {
  return (
    <Link
      href={`/exhibitions/${exhibition.slug}`}
      className="block group"
    >
      <article className="border-t border-gray-200 pt-6">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

          {/* LEFT SIDE */}
          <div className="space-y-2">

            <h3 className="font-metana text-xl">
              {exhibition.title}
            </h3>

            <ExhibitionMeta exhibition={exhibition} />

            <div className="text-xs uppercase tracking-widest opacity-50">
              View →
            </div>

          </div>

        </div>

      </article>
    </Link>
  );
}