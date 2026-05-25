export const revalidate = 60;

import Image from "next/image";
import { getExhibitions } from "@/sanity/sanity-utils";
import RichText from "@/components/RichText";
import type { PortableTextBlock } from "@portabletext/types";

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
// PAGE
// =====================================================

export default async function ExhibitionsPage() {
  const exhibitions: Exhibition[] = await getExhibitions();

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
  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-metana text-3xl">{exhibition.title}</h3>
        <ExhibitionMeta exhibition={exhibition} />
      </div>

      {exhibition.featuredImage && (
        <div className="space-y-2">
          <Image
            src={exhibition.featuredImage}
            alt={exhibition.title}
            width={1500}
            height={1500}
            className="w-full h-auto"
          />

          {exhibition.featuredImageCaption && (
            <p className="text-xs opacity-40">
              {exhibition.featuredImageCaption}
            </p>
          )}
        </div>
      )}

      {exhibition.description && (
        <RichText value={exhibition.description} />
      )}

      {exhibition.externalLinks?.length ? (
        <div className="flex flex-wrap gap-4 pt-2">
          {exhibition.externalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide opacity-40 hover:opacity-80 transition"
            >
              {link.label || "More Info"} ↗
            </a>
          ))}
        </div>
      ) : null}
    </article>
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
    <article className="border-t border-gray-200 pt-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h3 className="font-metana text-xl">{exhibition.title}</h3>
          <ExhibitionMeta exhibition={exhibition} />
        </div>

        <span className="text-sm opacity-50 shrink-0">
          {formatDateRange(exhibition.startDate, exhibition.endDate)}
        </span>
      </div>
    </article>
  );
}