import Image from "next/image";
import Link from "next/link";

import type { ProgrammingItem } from "@/types/programming";
import type {
  PortableTextBlock,
  PortableTextSpan,
} from "@portabletext/types";

function formatDateRange(start?: string, end?: string) {
  if (!start || !end) return "";

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

function getDescriptionPreview(description?: PortableTextBlock[]) {
  if (!description?.length) return "";

  const firstBlock = description.find(
    (block) => block._type === "block"
  );

  if (
    !firstBlock ||
    !("children" in firstBlock) ||
    !Array.isArray(firstBlock.children)
  ) {
    return "";
  }

  return firstBlock.children
    .map((child) => {
      if (typeof child === "object" && child && "text" in child) {
        return (child as PortableTextSpan).text ?? "";
      }
      return "";
    })
    .join("");
}

export default function ExhibitionCard({
  item,
}: {
  item: ProgrammingItem;
}) {
  const dateRange = formatDateRange(item.startDate, item.endDate);
  const preview = getDescriptionPreview(item.description);

  return (
    <Link
      href={`/programming/${item.slug}`}
      className="block group"
    >
      <article className="space-y-4 border-t border-gray-200 pt-6">

        {/* TITLE */}
        <h2 className="font-metana text-2xl group-hover:opacity-80 transition">
          {item.title}
        </h2>

        {/* META */}
        <div className="text-sm opacity-60 space-y-1">
          {dateRange && <div>{dateRange}</div>}

          {item.venue && <div>{item.venue}</div>}
        </div>

        {/* IMAGE */}
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
              <p className="text-xs italic opacity-60">
                {item.featuredImageCaption}
              </p>
            )}
          </div>
        )}

        {/* DESCRIPTION PREVIEW */}
        {preview && (
          <p className="text-sm leading-relaxed max-w-3xl">
            {preview}
          </p>
        )}

        {/* CTA */}
        <div className="text-xs uppercase tracking-widest opacity-50">
          View Exhibition →
        </div>

      </article>
    </Link>
  );
}