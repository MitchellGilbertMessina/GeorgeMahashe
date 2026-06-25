import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import {
  getExhibition,
  getExhibitions,
} from "@/sanity/sanity-utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const exhibitions = await getExhibitions(siteId);

  return exhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}

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

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    notFound();
  }

  const relatedProject = exhibition.relatedProjects?.[0];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* TOP NAV */}

      <div className="mb-10 flex justify-between gap-4 flex-wrap">

        <Link
          href="/exhibitions"
          className="
            text-sm
            tracking-wide
            hover:opacity-50
            transition-opacity
          "
        >
          ← Back to Exhibitions
        </Link>

      </div>

      {/* TITLE */}

      <h1 className="font-metana text-4xl mb-4">
        {exhibition.title}
      </h1>

      {/* DATES */}

      <div className="text-sm opacity-60 mb-2">
        {formatDateRange(
          exhibition.startDate,
          exhibition.endDate
        )}
      </div>

      {/* VENUE */}

      {exhibition.venue && (
        <div className="text-sm opacity-60 mb-10">
          {exhibition.venue}

          {exhibition.address &&
            `, ${exhibition.address}`}
        </div>
      )}

      {/* FEATURED IMAGE */}

      {exhibition.featuredImage && (
        <div className="mb-2">
          <Image
            src={exhibition.featuredImage}
            alt={exhibition.title}
            width={1400}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* FEATURED IMAGE CAPTION */}

      {exhibition.featuredImageCaption && (
        <div className="text-xs opacity-50 mb-10">
          {exhibition.featuredImageCaption}
        </div>
      )}

      {/* DESCRIPTION */}

      {exhibition.description && (
        <div className="prose prose-neutral max-w-none mb-16">
          <PortableText value={exhibition.description} />
        </div>
      )}

      {/* ADDITIONAL TEXT */}
      {exhibition.additionalText && (
        <div className="prose prose-neutral max-w-none mt-16">
          <PortableText value={exhibition.additionalText} />
        </div>
      )}

      {/* GALLERY IMAGES */}

      {exhibition.galleryImages?.length ? (
        <section className="space-y-10 mb-16">

          {exhibition.galleryImages.map(
            (
              image: {
                url: string;
                caption?: string;
              },
              index: number
            ) => (
              <figure
                key={index}
                className="space-y-2"
              >
                <Image
                  src={image.url}
                  alt={image.caption ?? ""}
                  width={1400}
                  height={1000}
                  className="w-full h-auto"
                />

                {image.caption && (
                  <figcaption className="text-xs opacity-50">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            )
          )}

        </section>
      ) : null}

      {/* EXTERNAL LINKS */}

      {exhibition.externalLinks?.length ? (
        <section className="mb-16">

          <h2 className="font-metana text-sm mb-4">
            Links
          </h2>

          <div className="space-y-2">

            {exhibition.externalLinks.map(
              (
                link: {
                  label?: string;
                  url: string;
                },
                index: number
              ) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  tracking-wide
                  hover:opacity-50
                  transition-opacity
                 "
                >
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />

                  {link.label ?? link.url}
                </a>
              )
            )}

          </div>

        </section>
      ) : null}

      {/* BOTTOM NAV */}

      <div className="pt-10 flex justify-between gap-4 flex-wrap">

        <Link
          href="/exhibitions"
          className="
            text-sm
            tracking-wide
            hover:opacity-50
            transition-opacity
          "
        >
          ← Back to Exhibitions
        </Link>

        {relatedProject && (
          <Link
            href={`/projects/${relatedProject.slug}`}
            className="
              text-sm
              tracking-wide
              hover:opacity-50
              transition-opacity
            "
          >
            Forward to Projects - {relatedProject.title} →
          </Link>
        )}

      </div>

    </main>
  );
}